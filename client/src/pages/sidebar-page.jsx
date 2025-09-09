import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
const Sidebar = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </div>
  );
};

export default Sidebar;
