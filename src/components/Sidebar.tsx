import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, BarChart, Settings, ChevronLeft, ChevronRight, Bot, X, Phone, Target, GraduationCap, 
  ChevronDown, // For dropdown indicator
  Mail, // E-mail Marketing
  Filter, // Tráfego Pago/Orgânico (using Filter as placeholder)
  Zap, // Automations
  Users2, // Influenciadores / ICP and Persona
  Building, // Company Analysis
  ClipboardList, // Sales Script / Proposals
  Award, // Sales Coach / Deals / Conversions
  Search // Prospection (using Search as placeholder)
} from 'lucide-react';

// New hierarchical navigation structure
const navigationHierarchy = [
  { name: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' }, // Keep Dashboard top-level
  { 
    name: 'Prospection', 
    icon: Search, 
    subItems: [
      { name: 'Inbound Lead Gen', view: 'prospection/inbound' },
      { name: 'Outbound Lead Gen', view: 'prospection/outbound' },
      { name: 'E-mail Marketing', icon: Mail, view: 'prospection/email' },
      { name: 'Tráfego Pago', icon: Filter, view: 'prospection/paid' },
      { name: 'Tráfego Orgânico', icon: Filter, view: 'prospection/organic' },
    ] 
  },
  { 
    name: 'Automations', 
    icon: Zap, 
    subItems: [
      { name: 'CRM Automation', view: 'automations/crm' },
    ] 
  },
   { name: 'Leads', icon: Users, view: 'leads' }, // Keep Leads top-level
   { name: 'Calls', icon: Phone, view: 'calls' }, // Keep Calls top-level
  { 
    name: 'Call Planning', 
    icon: Calendar, // Using Calendar as placeholder
    subItems: [
      { name: 'Influenciadores', icon: Users2, view: 'callPlanning/influencers' },
      { name: 'Company Analysis', icon: Building, view: 'callPlanning/companyAnalysis' },
    ] 
  },
  { 
    name: 'Sales Training', 
    icon: GraduationCap, 
    view: 'salesTraining', // Keep main link functional
    subItems: [
      { name: 'ICP and Persona', icon: Users2, view: 'salesTraining/icp' },
      { name: 'Sales Coach', icon: Award, view: 'salesTraining/coach' },
      { name: 'Sales Script', icon: ClipboardList, view: 'salesTraining/script' },
      // Add other training items here if they need separate views
    ] 
  },
  { 
    name: 'Deals', 
    icon: DollarSign, // Using DollarSign as placeholder
    subItems: [
      { name: 'Proposals', icon: ClipboardList, view: 'deals/proposals' },
      { name: 'Conversions', icon: Award, view: 'conversion' }, // Link to existing conversion view
    ] 
  },
  { name: 'Analytics', icon: BarChart, view: 'analytics' }, // Keep Analytics top-level
  { name: 'Settings', icon: Settings, view: 'settings' }, // Keep Settings top-level
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ isOpen, onClose, currentView, onNavigate }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // State to track open categories
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Function to toggle category open/closed state
  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // Function to handle navigation, closing sidebar on mobile
  const handleNavigation = (view: string) => {
     onNavigate(view);
     if (window.innerWidth < 768) { 
       onClose();
     }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden dark:bg-gray-900 dark:bg-opacity-75"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'} 
          md:relative md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:z-0
        `}
      >
        {/* Sidebar Content */}
        <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-indigo-600 flex-shrink-0" />
              {!isCollapsed && (
                <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">CRM Pro</span>
              )}
            </div>
            <button
              className="md:hidden p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigationHierarchy.map((item) => {
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isCategoryOpen = openCategories[item.name] || false;
                // Check if the current view starts with the item's view (for highlighting parent)
                const isActiveParent = hasSubItems && currentView.startsWith(item.view || item.name.toLowerCase()); 
                const isActiveItem = !hasSubItems && currentView === item.view;

                return (
                  <div key={item.name}>
                    {/* Main Item / Category Header */}
                    <button
                      onClick={() => {
                        if (hasSubItems) {
                          toggleCategory(item.name);
                          // Optionally navigate to a default sub-view or category overview if item.view is defined
                          if (item.view && !isCollapsed) handleNavigation(item.view); 
                        } else if (item.view) {
                          handleNavigation(item.view);
                        }
                      }}
                      className={`${
                        isActiveItem || (isActiveParent && !isCollapsed) // Highlight parent only if expanded
                          ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      } group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md w-full transition-colors duration-150`}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`${
                            isActiveItem || (isActiveParent && !isCollapsed) ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                          } flex-shrink-0 h-6 w-6`}
                        />
                        {!isCollapsed && (
                          <span className="ml-3">{item.name}</span>
                        )}
                      </div>
                      {/* Dropdown Indicator */}
                      {hasSubItems && !isCollapsed && (
                        <ChevronDown 
                          className={`h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300 transform transition-transform duration-150 ${
                            isCategoryOpen ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </button>

                    {/* Sub Items (Collapsible) */}
                    {hasSubItems && isCategoryOpen && !isCollapsed && (
                      <div className="mt-1 ml-5 pl-4 border-l border-gray-200 dark:border-gray-600 space-y-1">
                        {item.subItems?.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={() => handleNavigation(subItem.view)}
                            className={`${
                              currentView === subItem.view
                                ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300' 
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                            } group flex items-center px-2 py-1.5 text-sm font-medium rounded-md w-full transition-colors duration-150`}
                          >
                            {subItem.icon && (
                               <subItem.icon className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
                            )}
                            <span>{subItem.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Collapse Button */}
          <div className="hidden md:block flex-shrink-0 p-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full p-2 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-150"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
