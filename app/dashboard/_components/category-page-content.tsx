"use client";

import { Event, EventCategory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { EmptyCategoryState } from "./empty-category-state";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { client } from "@/lib/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  BarChart,
} from "lucide-react";
import { isAfter, isToday, startOfMonth, startOfWeek } from "date-fns";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface CategoryPageContentProps {
  hasEvents: boolean;
  category: EventCategory;
}

export const CategoryPageContent = ({
  hasEvents: initialHasEvents,
  category,
}: CategoryPageContentProps) => {
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);

  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">(
    "today"
  );

  // https://localhost:3000/dashboard/category/sale?page=5&limit=30
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "30", 10);

  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  });

  const { data: pollingData } = useQuery({
    queryKey: ["category", category.name, "hasEvents"],
    initialData: { hasEvents: initialHasEvents },
  });

  const { data, isFetching } = useQuery({
    queryKey: [
      "events",
      category.name,
      pagination.pageIndex,
      pagination.pageSize,
      activeTab,
    ],
    queryFn: async () => {
      const res = await client.category.getEventsByCategoryName.$get({
        name: category.name,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        timeRange: activeTab,
      });

      return await res.json();
    },
    refetchOnWindowFocus: false,
    enabled: pollingData.hasEvents,
  });

  const columns: ColumnDef<Event>[] = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "Category",
        cell: () => <span>{category.name || "Uncategorized"}</span>,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Date
              <ArrowUpDown className="ml-2 size-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return new Date(row.getValue("createdAt")).toLocaleString();
        },
      },
      ...(data?.events[0]
        ? Object.keys(data.events[0].fields as object).map((field) => ({
            accessorFn: (row: Event) =>
              (row.fields as Record<string, any>)[field],
            header: field,
            cell: ({ row }: { row: Row<Event> }) =>
              (row.original.fields as Record<string, any>)[field] || "-",
          }))
        : []),
      {
        accessorKey: "deliveryStatus",
        header: "Delivery Status",
        cell: ({ row }) => (
          <span
            className={cn("px-2 py-1 rounded-full text-xs font-semibold", {
              "bg-green-100 text-green-800":
                row.getValue("deliveryStatus") === "DELIVERED",
              "bg-red-100 text-red-800":
                row.getValue("deliveryStatus") === "FAILED",
              "bg-yellow-100 text-yellow-800":
                row.getValue("deliveryStatus") === "PENDING",
            })}
          >
            {row.getValue("deliveryStatus")}
          </span>
        ),
      },
    ],

    [category.name, data?.events]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: data?.events || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.eventsCount || 0) / pagination.pageSize),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", (pagination.pageIndex + 1).toString());
    searchParams.set("limit", pagination.pageSize.toString());
    router.push(`?${searchParams.toString()}`, { scroll: false });
  }, [pagination, router]);

  const numericFieldSums = useMemo(() => {
    if (!data?.events || data.events.length === 0) return {};

    const sums: Record<
      string,
      {
        total: number;
        thisWeek: number;
        thisMonth: number;
        today: number;
      }
    > = {};

    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 0 });
    const monthStart = startOfMonth(now);

    data.events.forEach((event) => {
      const eventDate = event.createdAt;

      Object.entries(event.fields as object).forEach(([field, value]) => {
        if (typeof value === "number") {
          if (!sums[field]) {
            sums[field] = { total: 0, thisWeek: 0, thisMonth: 0, today: 0 };
          }

          sums[field].total += value;

          if (
            isAfter(eventDate, weekStart) ||
            eventDate.getTime() === weekStart.getTime()
          ) {
            sums[field].thisWeek += value;
          }

          if (
            isAfter(eventDate, monthStart) ||
            eventDate.getTime() === monthStart.getTime()
          ) {
            sums[field].thisMonth += value;
          }

          if (isToday(eventDate)) {
            sums[field].today += value;
          }
        }
      });
    });

    return sums;
  }, [data?.events]);

  const NumericFieldSumCards = () => {
    if (Object.keys(numericFieldSums).length === 0) return null;

    return Object.entries(numericFieldSums).map(([field, sums]) => {
      const relevantSum =
        activeTab === "today"
          ? sums.today
          : activeTab === "week"
          ? sums.thisWeek
          : sums.thisMonth;

      return (
        <Card key={field}>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </p>
            <BarChart className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-2xl font-bold">{relevantSum.toFixed(2)}</p>
            <p className="text-xs/5 text-muted-foreground">
              {activeTab === "today"
                ? "today"
                : activeTab === "week"
                ? "this week"
                : "this month"}
            </p>
          </div>
        </Card>
      );
    });
  };

  if (!pollingData.hasEvents) {
    return <EmptyCategoryState categoryName={category.name} />;
  }
  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as "today" | "week" | "month");
        }}
      >
        <TabsList className="mb-4 bg-muted/50 h-12 w-full flex flex-wrap gap-2">
          <TabsTrigger
            value="today"
            className="data-[state=active]:bg-background flex-1 min-w-[100px] max-w-[200px] text-sm md:text-base"
          >
            Today
          </TabsTrigger>
          <TabsTrigger
            value="week"
            className="data-[state=active]:bg-background flex-1 min-w-[100px] max-w-[200px] text-sm md:text-base"
          >
            This Week
          </TabsTrigger>
          <TabsTrigger
            value="month"
            className="data-[state=active]:bg-background flex-1 min-w-[100px] max-w-[200px] text-sm md:text-base"
          >
            This Month
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {/* Total Events Card */}
            <Card className="bg-gradient-to-br from-background to-muted/50 shadow-lg p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">Total Events</p>
                <BarChart className="size-4 md:size-5" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold">
                  {data?.eventsCount || 0}
                </p>
                <p className="text-xs mt-1">
                  {activeTab === "today"
                    ? "Today"
                    : activeTab === "week"
                    ? "This Week"
                    : "This Month"}
                </p>
              </div>
            </Card>
            <Card
              className={cn(
                "group relative overflow-hidden bg-gradient-to-br from-background/80 to-primary/10",
                "cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
                "border border-muted/30 hover:border-primary/50",
                "transform-gpu"
              )}
              onClick={() => {
                setIsNavigating(true);
                router.push(`/dashboard/category/${category.name}/analytics`);
              }}
            >
              {isNavigating && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="flex items-center justify-center">
                    <img src="/Yu5t.gif" alt="Loading..." className="w-20 h-20" />
                  </div>
                </div>
              )}

              {/* Animated background elements */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <BarChart className="size-5 text-primary transition-transform group-hover:scale-110" />
                    </div>
                    <p className="text-sm font-medium bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                      Detailed Analytics
                    </p>
                  </div>
                  <span className="text-muted-foreground/50 group-hover:text-primary transition-colors">
                    →
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    Explore
                  </h3>
                  <p className="text-xs text-muted-foreground/80 transition-colors group-hover:text-muted-foreground">
                    View{" "}
                    {activeTab === "today"
                      ? "today's"
                      : activeTab === "week"
                      ? "weekly"
                      : "monthly"}{" "}
                    trends in depth with interactive visualizations
                  </p>
                </div>

                {/* Animated grid pattern */}
                <div className="absolute right-0 bottom-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg
                    viewBox="0 0 100 100"
                    className="text-primary"
                    fill="currentColor"
                  >
                    <path d="M0 0H100V100H0V0Z" strokeWidth="0" />
                    <path
                      d="M0 0L100 100M100 0L0 100"
                      strokeWidth="2"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </Card>
            {/* Numeric Field Cards */}
            <NumericFieldSumCards />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-4 md:gap-6">
        <div className="border-b pb-3 md:pb-4">
          <h1 className="text-2xl md:text-3xl font-bold">Event Overview</h1>
        </div>

        <Card className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <Table className="min-w-[800px] md:min-w-full">
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="py-3 px-4 text-sm md:text-base"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {isFetching ? (
                  [...Array(5)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {columns.map((_, cellIndex) => (
                        <TableCell key={cellIndex} className="py-3 px-4">
                          <div className="h-4 md:h-5 bg-muted/25 animate-pulse rounded" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        className="hover:bg-muted/25 transition-colors border-t"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="py-3">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="hover:bg-transparent">
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center text-muted-foreground py-8"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex flex-wrap gap-3 py-4 md:py-6">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 md:flex-none gap-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || isFetching}
          >
            <ArrowLeft className="size-4" />
            <span className="sr-only md:not-sr-only">Previous</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex-1 md:flex-none gap-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || isFetching}
          >
            <span className="sr-only md:not-sr-only">Next</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};