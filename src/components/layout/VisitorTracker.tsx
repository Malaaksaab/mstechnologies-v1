import { useVisitorTracking } from '@/hooks/useVisitorTracking';

export const VisitorTracker = () => {
  // This component just initializes the tracking
  useVisitorTracking();
  return null;
};
