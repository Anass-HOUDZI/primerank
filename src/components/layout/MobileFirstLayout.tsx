import React from 'react';
import { useResponsiveBreakpoints } from '../mobile/TouchOptimized';
import { cn } from '@/lib/utils';

interface MobileFirstLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileFirstLayout: React.FC<MobileFirstLayoutProps> = ({ 
  children, 
  className 
}) => {
  const { isMobile, isTablet, isDesktop, breakpoint } = useResponsiveBreakpoints();

  return (
    <div 
      className={cn(
        // Base mobile-first layout
        "min-h-screen w-full",
        // Touch optimizations
        "touch-manipulation",
        // Responsive spacing
        "px-3 sm:px-4 lg:px-6",
        "py-4 sm:py-6 lg:py-8",
        // Safe areas for mobile devices
        "safe-area-top safe-area-bottom",
        className
      )}
      data-breakpoint={breakpoint}
      style={{
        // Prevent overscroll on mobile
        overscrollBehavior: 'contain',
        // Optimize touch response
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {children}
      
      {/* Development helper - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-[9999] bg-black/80 text-white px-2 py-1 rounded text-xs font-mono">
          {breakpoint} - {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
        </div>
      )}
    </div>
  );
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  minItemWidth?: string;
  gap?: 'sm' | 'md' | 'lg';
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  minItemWidth = '280px',
  gap = 'md'
}) => {
  const gapClasses = {
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  };

  return (
    <div 
      className={cn(
        "grid w-full",
        gapClasses[gap],
        className
      )}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minItemWidth}), 1fr))`
      }}
    >
      {children}
    </div>
  );
};

// Touch-friendly button wrapper
interface TouchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const TouchButton: React.FC<TouchButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className,
  variant = 'primary'
}) => {
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // Base touch-optimized styling
        "min-h-[44px] min-w-[44px] px-4 py-2",
        "rounded-lg font-medium",
        "transition-all duration-200",
        "touch-manipulation",
        "active:scale-95",
        // Variant styling
        variantClasses[variant],
        // Disabled state
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      style={{
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {children}
    </button>
  );
};