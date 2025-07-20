
import React from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import { MobileNavigation } from './MobileNavigation';

interface MobileOptimizedLayoutProps {
  children: React.ReactNode;
}

export const MobileOptimizedLayout: React.FC<MobileOptimizedLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      {isMobile && <MobileNavigation />}
      
      <main className={`${isMobile ? 'pb-20 pt-16' : ''} transition-all duration-300 flex-1`}>
        {children}
      </main>

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
