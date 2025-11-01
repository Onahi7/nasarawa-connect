import { 
  Home, 
  Settings, 
  Users, 
  Image, 
  MessageSquare, 
  BarChart3,
  FileText,
  Megaphone,
  Eye,
  LogOut,
  Layout,
  Crown
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const adminItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Homepage Content", url: "/admin/homepage-content", icon: Layout },
  { title: "Team Members", url: "/admin/members", icon: Users },
  { title: "Hero Images", url: "/admin/hero-images", icon: Image },
  { title: "Announcements", url: "/admin/announcements", icon: Megaphone },
  { title: "Site Settings", url: "/admin/settings", icon: Settings },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
];

const quickActions = [
  { title: "Elder Omaku", url: "/admin/homepage-content?section=elder-omaku", icon: Crown, external: false },
  { title: "View Site", url: "/", icon: Eye, external: false },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/admin") {
      return currentPath === "/admin";
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    return isActive(path) 
      ? "bg-napps-blue text-white font-medium" 
      : "hover:bg-gray-100 text-gray-700";
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-white border-r">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="NAPPS Logo" 
              className="w-8 h-8 rounded-lg object-contain"
            />
            {state !== "collapsed" && (
              <div>
                <h2 className="font-bold text-gray-900">NAPPS Admin</h2>
                <p className="text-xs text-gray-500">Content Management</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-medium">
            {state !== "collapsed" ? "Content Management" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/admin"}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${getNavClass(item.url)}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {state !== "collapsed" && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-medium">
            {state !== "collapsed" ? "Quick Actions" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-700"
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {state !== "collapsed" && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button 
                    onClick={() => {/* Add logout logic */}}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors hover:bg-red-50 text-red-600"
                  >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {state !== "collapsed" && <span className="truncate">Logout</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}