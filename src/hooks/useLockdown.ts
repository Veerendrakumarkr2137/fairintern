import { useEffect } from 'react';

/**
 * Strict Browser Lockdown Hook
 * Detects: Tab switching, Copy/Paste, Context Menu, and Fullscreen Exit via Esc.
 */
export const useLockdown = (onViolation: (type: string) => void) => {
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
      onViolation(e.type.toUpperCase() + '_ATTEMPT');
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        onViolation('TAB_SWITCH');
      }
    };

    const handleFullscreenExit = () => {
      if (!document.fullscreenElement) {
        onViolation('FULLSCREEN_EXIT');
      }
    };

    // Advanced: DevTools detection via window resize threshold
    const handleResize = () => {
      const threshold = 160;
      if (window.outerWidth - window.innerWidth > threshold || 
          window.outerHeight - window.innerHeight > threshold) {
        onViolation('DEVTOOLS_POTENTIAL');
      }
    };

    // Attach production-ready listeners
    document.addEventListener('copy', preventDefault);
    document.addEventListener('paste', preventDefault);
    document.addEventListener('contextmenu', preventDefault);
    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('fullscreenchange', handleFullscreenExit);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('copy', preventDefault);
      document.removeEventListener('paste', preventDefault);
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('fullscreenchange', handleFullscreenExit);
      window.removeEventListener('resize', handleResize);
    };
  }, [onViolation]);
};
