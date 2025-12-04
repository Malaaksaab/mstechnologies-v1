import { useState, useCallback, useRef } from 'react';

interface ThrottleOptions {
  /** Minimum time between submissions in milliseconds */
  minInterval?: number;
  /** Maximum submissions allowed in the time window */
  maxSubmissions?: number;
  /** Time window for counting submissions in milliseconds */
  timeWindow?: number;
}

interface ThrottleResult {
  /** Whether form submission is currently allowed */
  canSubmit: boolean;
  /** Time remaining until next submission is allowed (ms) */
  cooldownRemaining: number;
  /** Number of submissions remaining in current window */
  submissionsRemaining: number;
  /** Call this when form is submitted */
  recordSubmission: () => boolean;
  /** Reset the throttle state */
  reset: () => void;
}

export const useFormThrottle = (options: ThrottleOptions = {}): ThrottleResult => {
  const {
    minInterval = 3000, // 3 seconds between submissions
    maxSubmissions = 5, // Max 5 submissions
    timeWindow = 60000, // Per minute
  } = options;

  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const submissionTimesRef = useRef<number[]>([]);
  const lastSubmissionRef = useRef<number>(0);
  const cooldownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const cleanOldSubmissions = useCallback(() => {
    const now = Date.now();
    submissionTimesRef.current = submissionTimesRef.current.filter(
      time => now - time < timeWindow
    );
  }, [timeWindow]);

  const canSubmit = useCallback(() => {
    const now = Date.now();
    cleanOldSubmissions();
    
    // Check minimum interval
    if (now - lastSubmissionRef.current < minInterval) {
      return false;
    }
    
    // Check max submissions in window
    if (submissionTimesRef.current.length >= maxSubmissions) {
      return false;
    }
    
    return true;
  }, [cleanOldSubmissions, minInterval, maxSubmissions]);

  const recordSubmission = useCallback(() => {
    if (!canSubmit()) {
      return false;
    }
    
    const now = Date.now();
    lastSubmissionRef.current = now;
    submissionTimesRef.current.push(now);
    
    // Start cooldown timer
    setCooldownRemaining(minInterval);
    
    if (cooldownIntervalRef.current) {
      clearInterval(cooldownIntervalRef.current);
    }
    
    cooldownIntervalRef.current = setInterval(() => {
      setCooldownRemaining(prev => {
        const newValue = Math.max(0, prev - 100);
        if (newValue === 0 && cooldownIntervalRef.current) {
          clearInterval(cooldownIntervalRef.current);
          cooldownIntervalRef.current = null;
        }
        return newValue;
      });
    }, 100);
    
    return true;
  }, [canSubmit, minInterval]);

  const reset = useCallback(() => {
    submissionTimesRef.current = [];
    lastSubmissionRef.current = 0;
    setCooldownRemaining(0);
    if (cooldownIntervalRef.current) {
      clearInterval(cooldownIntervalRef.current);
      cooldownIntervalRef.current = null;
    }
  }, []);

  cleanOldSubmissions();
  const submissionsRemaining = Math.max(0, maxSubmissions - submissionTimesRef.current.length);

  return {
    canSubmit: canSubmit(),
    cooldownRemaining,
    submissionsRemaining,
    recordSubmission,
    reset,
  };
};
