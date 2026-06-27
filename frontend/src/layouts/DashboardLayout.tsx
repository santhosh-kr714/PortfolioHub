import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  FolderGit2, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Link as LinkIcon, 
  Palette, 
  LineChart, 
  Settings as SettingsIcon, 
  LogOut, 
  Search, 
  Bell, 
  Moon, 
  Sun,
  Menu,
  Mail,
  Shield,
  Bot,
  Globe,
  Blocks
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
  { icon: Briefcase, label: 'Projects', path: '/dashboard/projects' },
  { icon: Award, label: 'Skills', path: '/dashboard/skills' },
  { icon: Code2, label: 'Experience', path: '/dashboard/experience' },
  { icon: GraduationCap, label: 'Education', path: '/dashboard/education' },
  { icon: Award, label: 'Certificates', path: '/dashboard/certificates' },
  { icon: Award, label: 'Achievements', path: '/dashboard/achievements' },
  { icon: LinkIcon, label: 'Resume', path: '/dashboard/resume' },
  { icon: LinkIcon, label: 'Social Links', path: '/dashboard/social-links' },
  { icon: Palette, label: 'Theme', path: '/dashboard/theme' },
  { icon: SettingsIcon, label: 'Settings', path: '/dashboard/settings' },
];

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-950 border-r border-white/10 text-gray-300">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
          P
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          PortfolioHub
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative overflow-hidden ${
                  isActive 
                    ? 'text-white bg-white/10 font-medium' 
                    : 'hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
          
          {user?.role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-colors font-medium mt-4 ${
                  isActive 
                    ? 'bg-purple-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Shield className="w-5 h-5 mr-3" />
              Admin Panel
            </NavLink>
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all w-full text-left"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-black text-white' : 'bg-gray-50 text-gray-900'} flex transition-colors duration-300`}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 z-40 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navigation */}
        <header className={`h-16 ${isDarkMode ? 'bg-black/50 border-white/10' : 'bg-white/80 border-gray-200'} backdrop-blur-xl border-b sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors`}>
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg lg:hidden hover:bg-white/5 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full max-w-md flex-1">
              <Search className="w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none focus:outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors relative group"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-gray-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
            
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-black" />
            </button>

            <div className="h-8 w-px bg-white/10 mx-1 hidden sm:block" />

            <div className="flex items-center gap-3 pl-1 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center p-0.5 shadow-md">
                {user?.profile_image ? (
                  <img src={user.profile_image} alt={user.full_name} className="w-full h-full rounded-full object-cover border-2 border-black" />
                ) : (
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-2 border-black">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium leading-none mb-1">{user?.full_name || 'User'}</p>
                <p className="text-xs text-gray-500 leading-none">@{user?.username || 'username'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 flex overflow-hidden bg-[#0a0a0a]">
          <div className="w-full overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
