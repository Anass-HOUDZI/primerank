
import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import { MobileNavigation } from './MobileNavigation';

interface MobileOptimizedLayoutProps {
  children: React.ReactNode;
}

export const MobileOptimizedLayout: React.FC<MobileOptimizedLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {isMobile && <MobileNavigation />}
      
      <main className={`${isMobile ? 'pb-20 pt-16' : ''} transition-all duration-300`}>
        {children}
      </main>

      {/* Pull-to-refresh indicator */}
      {isMobile && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-30 opacity-0 transition-opacity duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Safe area styles using Tailwind classes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .safe-area-pb {
            padding-bottom: env(safe-area-inset-bottom);
          }
          .safe-area-pt {
            padding-top: env(safe-area-inset-top);
          }
        `
      }} />
    </div>
  );
};
