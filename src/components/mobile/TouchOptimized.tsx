import React from 'react';
import { cn } from '@/lib/utils';

interface TouchOptimizedProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const TouchOptimized: React.FC<TouchOptimizedProps> = ({ 
  children, 
  className, 
  onClick, 
  disabled = false 
}) => {
  return (
    <div
      className={cn(
        // Base touch optimization
        "touch-manipulation",
        // Minimum touch target size (44px recommended by Apple/Google)
        "min-h-[44px] min-w-[44px]",
        // Touch feedback
        "active:scale-95 transition-transform duration-150",
        // Disabled state
        disabled && "opacity-50 pointer-events-none",
        // Additional spacing for better touch targets
        "p-2",
        className
      )}
      onClick={onClick}
      style={{
        // Prevent text selection on touch
        WebkitUserSelect: 'none',
        userSelect: 'none',
        // Prevent callout on touch
        WebkitTouchCallout: 'none',
        // Prevent tap highlight
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {children}
    </div>
  );
};

// Hook for responsive breakpoints
export const useResponsiveBreakpoints = () => {
  const [breakpoint, setBreakpoint] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('xs');

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 480) setBreakpoint('xs');
      else if (width < 768) setBreakpoint('sm');
      else if (width < 1024) setBreakpoint('md');
      else if (width < 1280) setBreakpoint('lg');
      else if (width < 1536) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2Xl: breakpoint === '2xl',
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
  };
};