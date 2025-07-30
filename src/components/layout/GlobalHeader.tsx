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
      } else if (segments[0] === 'about') {
        breadcrumbs.push({ name: 'À propos', path: '/about' });
      } else if (segments[0] === 'contact') {
        breadcrumbs.push({ name: 'Contact', path: '/contact' });
      }
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo and Brand */}
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <span className="hidden font-bold sm:inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PrimeRank
            </span>
          </Link>
        </div>

        {/* Mobile Logo */}
        <div className="mr-2 flex md:hidden">
          <Link to="/" className="mr-2 flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
          </Link>
        </div>

        {/* Breadcrumbs - Only show if not on home page */}
        {breadcrumbs.length > 0 && (
          <nav className="hidden md:flex items-center space-x-1 text-sm text-muted-foreground">
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

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 ml-6">
          <Link 
            to="/about" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            À propos
          </Link>
          <Link 
            to="/contact" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher un outil..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm pl-10 pr-4 py-2.5 text-sm transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground md:w-[300px] lg:w-[400px]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Theme Toggle */}
        <div className="flex items-center space-x-2 ml-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Changer le thème</span>
          </Button>
        </div>
      </div>
    </header>
  );
};