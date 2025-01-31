import DashboardPage from "@/components/Dashboard-page";
import React from "react";
import { DashboardPageContent } from "./_components/Dashboard-Page-Content";
import { CreateEventCategoryModal } from "@/components/create-event-category-modal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardPage
      cta={
        <CreateEventCategoryModal>
          <button className="w-full sm:w-fit bg-black hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
            <PlusIcon className="inline-block size-5 mr-2 align-middle transition-transform duration-200" />
            <span className="align-middle">Add Category</span>
          </button>
        </CreateEventCategoryModal>
      }
      title="Dashboard"
    >
      <DashboardPageContent />
    </DashboardPage>
  );
};

export default Dashboard;
