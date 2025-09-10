import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronDown,
  ChevronsRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Define menu items
const menuItems = [
  {
    title: "Menus",
    submenus: [
      { title: "Add New Menu", url: "/addmenu" },
      { title: "Category", url: "/category" },
      { title: "Menu List", url: "/menu-list" },
    ],
  },
  {
    title: "Order",
    submenus: [
      { title: "New Order", url: "/order/new" },
      { title: "Order List", url: "/order/list" },
      { title: "Order Settings", url: "/order/settings" },
    ],
  },
  {
    title: "Customers",
    submenus: [
      { title: "New Order", url: "/order/new" },
      { title: "Order List", url: "/order/list" },
      { title: "Order Settings", url: "/order/settings" },
    ],
  },
  {
    title: "Home",
    icon: Home,
    url: "/home",
  },
  {
    title: "Inbox",
    icon: Inbox,
    url: "/inbox",
  },
  {
    title: "Calendar",
    icon: Calendar,
    url: "/calendar",
  },
  {
    title: "Search",
    icon: Search,
    url: "/search",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export function AppSidebar() {
  return (
    <div className="flex h-screen">
      <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
        <SidebarHeader className="bg-[#ffffff]">
          <div className="flex justify-end py-4 px-2">
            <img className="h-12 w-auto" src="/logo-dark-text.png" alt="Logo" />
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-[#ffffff]">
          <SidebarMenu>
            {menuItems.map((item, idx) => (
              <div key={idx}>
                {item.submenus ? (
                  <Collapsible
                    defaultOpen={item.title === "Menus"}
                    className="group/collapsible"
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <div className="flex w-full  justify-between items-end-safe hover:text-blue-400">
                          <p className=" mx-20 text-lg font-semibold">{item.title}</p>

                          <ChevronDown className=" h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-0 group-data-[state=closed]/collapsible:-rotate-90" />
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:max-h-0 data-[state=open]:max-h-[500px]">
                      <SidebarMenuSub>
                        {item.submenus.map((sub, subIdx) => (
                          <SidebarMenuSubItem key={subIdx}>
                            <div className="flex mt-4 items-center gap-2 text-gray-600 hover:text-blue-400">
                              <ChevronsRight className="mx-8" />
                              <Link to={sub.url}>{sub.title}</Link>
                            </div>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton>
                    <div className="flex mt-4 items-center gap-2 text-gray-600 hover:text-blue-400">
                      {item.icon && <item.icon className="mx-8 h-4 w-4" />}
                      <Link to={item.url}>{item.title}</Link>
                    </div>
                  </SidebarMenuButton>
                )}
              </div>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <div className="fixed top-8 left-4 z-50">
        <SidebarTrigger className="p-2 bg-white rounded-md shadow-md">
          <Menu className="text-gray-700 cursor-pointer  " />
        </SidebarTrigger>
      </div>
    </div>
  );
}
