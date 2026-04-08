import { useState, useCallback, useRef } from 'react';

export type ViolationType = 
  | 'TAB_SWITCH' 
  | 'AUDIO_VIOLATION' 
  | 'COPY_ATTEMPT' 
  | 'PASTE_ATTEMPT' 
  | 'CONTEXTMENU_ATTEMPT'
  | 'FULLSCREEN_EXIT'
  | 'DEVTOOLS_POTENTIAL';

interface StrikeState {
  count: number;
  lastViolation: ViolationType | null;
  isTerminated: boolean;
  showWarning: boolean;
  logs: Array<{ type: ViolationType, timestamp: number }>;
}

export const useStrikeManager = (maxStrikes = 3) => {
  const [state, setState] = useState<StrikeState>({
    count: 0,
    lastViolation: null,
    isTerminated: false,
    showWarning: false,
    logs: []
  });

  const warningTimeoutRef = useRef<number | null>(null);

  const addStrike = useCallback((type: ViolationType) => {
    setState(prev => {
      if (prev.isTerminated) return prev;

      const newCount = prev.count + 1;
      const newLogs = [...prev.logs, { type, timestamp: Date.now() }];
      const isTerminated = newCount >= maxStrikes;

      // Log to server (Simulated)
      console.log(`[PROCTOR EVENT] ${type} logged for user. Strike ${newCount}`);
      
      return {
        count: newCount,
        lastViolation: type,
        isTerminated,
        showWarning: !isTerminated,
        logs: newLogs
      };
    });

    // Auto-hide warning after 5 seconds
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    warningTimeoutRef.current = window.setTimeout(() => {
      setState(prev => ({ ...prev, showWarning: false }));
    }, 5000);
  }, [maxStrikes]);

  const resetStrikes = useCallback(() => {
    setState({
      count: 0,
      lastViolation: null,
      isTerminated: false,
      showWarning: false,
      logs: []
    });
  }, []);

  return { state, addStrike, resetStrikes };
};
