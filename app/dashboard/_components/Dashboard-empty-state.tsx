import { CreateEventCategoryModal } from "@/components/create-event-category-modal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { client } from "@/lib/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const DashboardEmptyState = () => {
  const queryClient = useQueryClient()
  const CustomToast = ({gifSrc }: { gifSrc: string }) => (
    <div className="flex items-center">
      <img src={gifSrc} alt="Toast GIF" className="w-60 h-50" />
    </div>
    );
  

  const { mutate: insertQuickstartCategories, isPending } = useMutation({
    mutationFn: async () => {
      await client.category.insertQuickstartCategories.$post()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
      toast(<CustomToast gifSrc={"/output-cat.gif"} />);
    },

    
  })
  
 
  return (
    <Card className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-8 pb-24">
      <div className="flex justify-center w-full">
        <img
          src="/Pak.gif"
          alt="No categories"
          className="size-48 -mt-24"
        />
      </div>

      <h1 className="mt-2 text-2xl/8 font-medium tracking-tight text-gray-900">
        No Event Categories Yet
      </h1>

      <p className="text-md text-gray-600 max-w-prose mt-2 mb-8">
        Start tracking events by creating your first category.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          variant="outline"
          className="flex items-center space-x-2 w-full sm:w-auto"
          onClick={() => insertQuickstartCategories()}
          disabled={isPending}
        >
          <span className="size-8"> 
            <img src="/rocket_animated.gif" alt="" />
          </span>
          <span>{isPending ? "Creating..." : "Quickstart"}</span>
        </Button>

        <CreateEventCategoryModal containerClassName="w-full sm:w-auto">
          <Button className="flex items-center space-x-2 w-full sm:w-auto">
            <span>Add Category</span>
          </Button>
        </CreateEventCategoryModal>
      </div>
    </Card>
  )
}