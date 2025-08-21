import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Menu, Moon, Sun, User, ShoppingCart, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

const FitVerseNavbarLogo = () => {
  return (
    <Link
      to="/"
      className="relative z-20 mr-4 flex items-center space-x-3 px-2 py-1 text-sm font-normal hover:scale-105 transition-transform duration-200"
    >
      <img
        src="/fitverse-logo.png"
        alt="FitVerse Logo"
        width={45}
        height={45}
        className="object-contain"
      />
      <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden md:block">
        FitVerse
      </span>
    </Link>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const { 
    user, 
    isAuthenticated, 
    theme, 
    toggleTheme, 
    setSidebarOpen, 
    sidebarOpen,
    unreadCount,
    cart 
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Gyms', link: '/gyms' },
    { name: 'Tracker', link: '/tracker' },
    { name: 'Nutrition', link: '/nutrition' },
    { name: 'Store', link: '/store' },
  ];

  const handleNavItemClick = (link: string) => {
    // Navigation is handled by Link components, no need for manual navigation
  };

  return (
    <ResizableNavbar className="fixed inset-x-0 top-0 z-50 w-full">
      {/* Desktop Navigation */}
      <NavBody className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center">
          <FitVerseNavbarLogo />
        </div>
        
        <NavItems 
          items={navItems} 
          onItemClick={() => {}} 
          className="text-foreground"
        />

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative hover:bg-accent"
          >
            <motion.div
              key={theme}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </motion.div>
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative hover:bg-accent">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-primary">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Notifications */}
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="relative hover:bg-accent">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-destructive animate-pulse">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Avatar */}
              <Link to="/profile">
                <Button variant="ghost" className="relative p-1 hover:bg-accent">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <NavbarButton variant="secondary" className="text-sm">
                  Login
                </NavbarButton>
              </Link>
              <Link to="/register">
                <NavbarButton 
                  variant="primary" 
                  className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 shadow-lg text-sm"
                >
                  Get Started
                </NavbarButton>
              </Link>
            </div>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MobileNavHeader className="px-4 py-3">
          <FitVerseNavbarLogo />
          <div className="flex items-center gap-3">
            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 hover:bg-accent shrink-0"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          className="px-6 py-6"
        >
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              to={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-foreground hover:text-primary transition-colors py-2 text-base font-medium"
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className="flex w-full flex-col gap-4 pt-6 border-t border-border">
              <div className="flex flex-col gap-3">
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="relative w-full justify-start">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart
                    {cartItemsCount > 0 && (
                      <Badge className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
                
                <Link to="/notifications" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="relative w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Alerts
                    {unreadCount > 0 && (
                      <Badge className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>
              
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarButton variant="secondary" className="w-full justify-start">
                  <Avatar className="h-6 w-6 mr-3">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  Profile
                </NavbarButton>
              </Link>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-4 pt-6 border-t border-border">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarButton variant="secondary" className="w-full">
                  Login
                </NavbarButton>
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarButton 
                  variant="primary"
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                >
                  Get Started
                </NavbarButton>
              </Link>
            </div>
          )}
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
};

export default Navbar;