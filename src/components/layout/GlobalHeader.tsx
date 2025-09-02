import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Home, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { allTools } from '@/data/tools';

interface GlobalHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  searchQuery = '',
  onSearchChange,
  showSearch = true
}) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    // Ne pas afficher les breadcrumbs sur la page d'accueil
    if (path === '/') {
      return [];
    }
    
    const breadcrumbs = [{ name: 'Accueil', path: '/' }];
    
    if (segments.length > 0) {
      if (segments[0] === 'tools' && segments[1]) {
        const toolId = segments[1];
        const tool = allTools.find(t => t.id === toolId);
        
        if (tool) {
          breadcrumbs.push({ name: tool.category, path: '/' });
          breadcrumbs.push({ name: tool.name, path: location.pathname });
        } else {
          breadcrumbs.push({ name: 'Outils', path: '/' });
          breadcrumbs.push({ name: 'Outil', path: location.pathname });
        }
      }
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 max-w-screen-2xl items-center px-3 sm:px-4">
        {/* Mobile-First Logo */}
        <div className="flex items-center mr-2 sm:mr-4">
          <Link to="/" className="flex items-center space-x-2 py-1">
            <img 
              src="/lovable-uploads/595fb195-c669-4167-9cef-2cf309337f07.png" 
              alt="PrimeRank" 
              className="h-7 sm:h-8 w-auto"
            />
          </Link>
        </div>

        {/* Breadcrumbs - Only show on larger screens */}
        {breadcrumbs.length > 0 && (
          <nav className="hidden lg:flex items-center space-x-1 text-sm text-muted-foreground mr-4">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.path}>
                {index > 0 && <span className="mx-1">/</span>}
                <Link 
                  to={item.path}
                  className={`hover:text-foreground transition-colors ${
                    index === breadcrumbs.length - 1 ? 'text-foreground font-medium' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Spacer to push items to the right */}
        <div className="flex-1" />

        {/* Search Bar - Desktop Only */}
        {showSearch && (
          <div className="hidden md:flex items-center mr-2 sm:mr-4 flex-1 max-w-xs sm:max-w-sm lg:max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2.5 sm:left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full rounded-lg sm:rounded-xl border border-input bg-background/50 backdrop-blur-sm pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground touch-manipulation"
              />
            </div>
          </div>
        )}

        {/* Navigation Links - Responsive */}
        <div className="hidden sm:flex items-center space-x-2 lg:space-x-4 mr-2">
          <Link 
            to="/about" 
            className="text-xs lg:text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-1 touch-manipulation"
          >
            À propos
          </Link>
          <Link 
            to="/contact" 
            className="text-xs lg:text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-1 touch-manipulation"
          >
            Contact
          </Link>
        </div>

        {/* Theme Toggle - Mobile Optimized */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-8 w-8 sm:h-9 sm:w-9 touch-manipulation"
          >
            <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Changer le thème</span>
          </Button>
        </div>
      </div>
    </header>
  );
};