"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/loading-spinner";
import { client } from "@/lib/client";
import { format, formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  ArrowRight,
  BarChart2,
  Clock,
  Database,
  History,
  Link2,
  Loader2,
  Trash2,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { DashboardEmptyState } from "./Dashboard-empty-state";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const isImageUrl = (url: string) => {
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("/")
  );
};

export const DashboardPageContent = () => {
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
const router = useRouter();

interface HandleLinkClickProps {
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  href: string;
}

const handleLinkClick = ({ event, href }: HandleLinkClickProps) => {
  event.preventDefault();
  setLoading(true);
  router.push(href);
};

  const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => {
      const res = await client.category.getEventCategories.$get();
      const { categories } = await res.json();
      return categories;
    },
  });
  

  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation(
    {
      mutationFn: async (name: string) => {
        await client.category.deleteCategory.$post({ name });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-event-categories"] });
        setDeletingCategory(null);
        toast.custom((t) => (
          <AnimatePresence>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="relative group flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-100 p-4 pl-3 pr-5 rounded-xl border border-red-300 shadow-lg hover:shadow-red-400/40  transition-all duration-300"
            >
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-200 rounded-t-xl overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 4, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-red-600 to-orange-600 origin-left"
                />
              </div>
        
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative flex-shrink-0 p-2 bg-white rounded-lg shadow-sm border border-red-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x-circle text-red-600"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </motion.div>
        
              {/* Text content */}
             
                <div className="space-y-0.5">
                  <h3 className="font-semibold text-red-800 text-[15px] tracking-tight">
                    Category Deleted
                  </h3>
                  <p className="text-sm text-red-500 font-medium">
                    Successfully removed from your collection!
                  </p>
                </div>
        
        
              {/* Glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 -z-10 bg-gradient-to-r from-red-300/20 to-orange-300/20 rounded-xl blur-sm"
              />
            </motion.div>
          </AnimatePresence>
        ));
        
      },
    }
  );

  if (isEventCategoriesLoading) {
    return (
      <div className="flex items-start justify-center flex-1 h-screen w-full">
        <img src="/ULoad.gif" alt="Loading..." />
      </div>
    );
  }
  if (!categories || categories.length === 0) {
    return <DashboardEmptyState />;
  }
  return (
    <>
      {loading ? (
      <div className="h-screen w-full max-w-screen overflow-hidden box-border flex justify-center items-center p-4 ">
      <img 
        src="/2iFb.gif" 
        alt="Loading..." 
        className="max-w-full h-auto object-contain"
      />
    </div>
  ) : ( <div>


      <ul className="grid w-full grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:p-8">
        {categories.map((category) => (
          <li
            key={category.id}
            className="relative group transition-all duration-300 hover:-translate-y-1.5"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-400/20 to-purple-400/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 animate-gradient-x" />
            </div>

            {/* Main card container */}
            <div className="relative h-full bg-white rounded-xl shadow-2xl shadow-brand-100/30  ring-1 ring-gray-900/5 hover:shadow-2xl  transition-all duration-300 overflow-hidden">
              <div className="p-6">
                {/* Category header */}
                <div className="relative mb-6 pb-6 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gray-100 ">
                  <div className="flex items-center gap-4">
                    <div
                      className="size-14 rounded-xl flex items-center justify-center ring-2 ring-white/50  shadow-lg backdrop-blur-sm bg-white/30 "
                      style={{
                        backgroundColor: category.color
                          ? `#${category.color.toString(16).padStart(6, "0")}`
                          : undefined,
                      }}
                    >
                      {category.emoji && isImageUrl(category.emoji) ? (
                        <img
                          src={category.emoji}
                          alt={category.name}
                          className="w-8 h-8"
                        />
                      ) : (
                        <span className="text-2xl ">
                          {category.emoji || "📂"}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 ">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Created {format(category.createdAt, "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats container */}
                <div className="space-y-4 mb-6">
                  <div className="relative p-3 rounded-lg bg-gray-50/50  hover:bg-gray-100  transition-colors group/stat">
                    <div className="flex items-center">
                      <Clock className="size-5 mr-3 text-brand-500  shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 ">
                          Last Activity
                        </p>
                        <p className="text-sm text-gray-500">
                          {category.lastPing
                            ? `${formatDistanceToNow(category.lastPing)} ago`
                            : "Never"}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30  to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 -skew-x-12" />
                  </div>

                  <div className="relative p-3 rounded-lg bg-gray-50/50  hover:bg-gray-100  transition-colors group/stat">
                    <div className="flex items-center">
                      <Database className="size-5 mr-3 text-brand-500  shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 ">
                          Unique Fields
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 ">
                            {category.uniqueFieldCount || 0}
                          </span>
                          <div className="h-1.5 flex-1 bg-gray-200  rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-500  transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  (category.uniqueFieldCount || 0) * 10,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative p-3 rounded-lg bg-gray-50/50  hover:bg-gray-100  transition-colors group/stat">
                    <div className="flex items-center">
                      <BarChart2 className="size-5 mr-3 text-brand-500  shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 ">
                          Monthly Events
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 ">
                            {category.eventsCount || 0}
                          </span>
                          <div className="h-1.5 flex-1 bg-gray-200  rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500  transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  (category.eventsCount || 0) * 2,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <Link
                    href={`/dashboard/category/${category.name}`}
                    onClick={(e) => handleLinkClick({ event: e, href: `/dashboard/category/${category.name}` })}
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                      className:
                        "group flex items-center gap-1.5 border border-slate-200 shadow-sm text-slate-600 bg-white hover:bg-slate-200   py-2 rounded-lg transition-all h-[40px]",
                    })}
                  >
                    <span className="relative overflow-hidden h-6 w-auto flex items-center">
                      <span className="block text-black transform transition-all duration-300 group-hover:-translate-y-6 opacity-100 group-hover:opacity-0">
                        Explore
                      </span>
                      <span className="absolute text-black left-0 transform transition-all duration-300 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                        View all
                      </span>
                    </span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 text-black" />
                  
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-red-600 hover:bg-white  transition-colors p-2"
                    aria-label={`Delete ${category.name} category`}
                    onClick={() => setDeletingCategory(category.name)}
                  >
                    <Trash2 className="size-5" />
                  </Button>
                </div>
              </div>

              {/* Hover effect particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute size-1.5 bg-brand-400/20  rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float-${i % 2 ? "x" : "y"} 6s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        showModal={!!deletingCategory}
        setShowModal={() => setDeletingCategory(null)}
        className="max-w-md"
      >
        <div className="p-8 space-y-8">
          {/* Icon Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center size-16 rounded-full bg-red-100/80  border-8 border-red-50/50 ">
              <AlertTriangle className="size-8 text-red-600  animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900  tracking-tighter">
              Delete Category
              <span className="block text-lg font-medium text-red-600  mt-1">
                Irreversible Action
              </span>
            </h2>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <p className="text-gray-600  leading-relaxed">
              You're about to permanently delete
              <span className="font-semibold text-gray-900  mx-1.5">
                "{deletingCategory}"
              </span>
              and all its contents. This will immediately remove:
            </p>
            <div className="py-3 space-y-2 text-sm text-gray-500 ">
              <p className="flex items-center justify-center gap-2">
                <Database className="size-4" />
                All associated data points
              </p>
              <p className="flex items-center justify-center gap-2">
                <History className="size-4" />
                Activity history
              </p>
              <p className="flex items-center justify-center gap-2">
                <Link2 className="size-4" />
                Connected integrations
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-gray-100 ">
            <Button
              variant="outline"
              onClick={() => setDeletingCategory(null)}
              className="w-full sm:w-auto hover:bg-gray-50  border-gray-200  hover:border-gray-300  transition-all"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deletingCategory && deleteCategory(deletingCategory)
              }
              disabled={isDeletingCategory}
              className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600  shadow-lg shadow-red-100  hover:shadow-red-200  transition-all"
            >
              {isDeletingCategory ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Trash2 className="size-4" />
                  <span>Delete Forever</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </Modal>
      </div>
       )}
    </>
  );
};
