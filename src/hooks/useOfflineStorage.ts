import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface OfflineReport {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  severity: string;
  images: File[];
  timestamp: string;
  synced: boolean;
}

export function useOfflineStorage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineReports, setOfflineReports] = useState<OfflineReport[]>([]);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load offline reports from localStorage on mount
    loadOfflineReports();

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Connection Restored",
        description: "You're back online! Syncing your offline reports...",
      });
      syncOfflineReports();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're Offline",
        description: "Don't worry! You can still submit reports. They'll be saved and synced when you're back online.",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineReports = () => {
    try {
      const stored = localStorage.getItem('offline-reports');
      if (stored) {
        setOfflineReports(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load offline reports:', error);
    }
  };

  const saveOfflineReport = async (reportData: Omit<OfflineReport, 'id' | 'timestamp' | 'synced'>) => {
    const report: OfflineReport = {
      ...reportData,
      id: `offline-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      synced: false
    };

    const updatedReports = [...offlineReports, report];
    setOfflineReports(updatedReports);
    
    try {
      localStorage.setItem('offline-reports', JSON.stringify(updatedReports));
      
      toast({
        title: isOnline ? "Report Submitted" : "Report Saved Offline",
        description: isOnline 
          ? "Your disaster report has been submitted successfully."
          : "Your report has been saved offline and will be submitted when connection is restored.",
      });

      // If online, try to sync immediately
      if (isOnline) {
        syncOfflineReports();
      } else {
        // Register for background sync when connection is restored
        if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
          const registration = await navigator.serviceWorker.ready;
          // Type assertion for background sync
          await (registration as any).sync.register('disaster-report-sync');
        }
      }

      return report;
    } catch (error) {
      console.error('Failed to save offline report:', error);
      toast({
        title: "Error Saving Report",
        description: "Failed to save your report. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const syncOfflineReports = async () => {
    if (syncInProgress || !isOnline) return;

    setSyncInProgress(true);
    const unsyncedReports = offlineReports.filter(report => !report.synced);

    if (unsyncedReports.length === 0) {
      setSyncInProgress(false);
      return;
    }

    let syncedCount = 0;
    const updatedReports = [...offlineReports];

    for (const report of unsyncedReports) {
      try {
        // Simulate API call - replace with actual endpoint
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mark as synced
        const reportIndex = updatedReports.findIndex(r => r.id === report.id);
        if (reportIndex !== -1) {
          updatedReports[reportIndex].synced = true;
          syncedCount++;
        }
      } catch (error) {
        console.error('Failed to sync report:', report.id, error);
      }
    }

    // Update storage and state
    setOfflineReports(updatedReports);
    localStorage.setItem('offline-reports', JSON.stringify(updatedReports));

    if (syncedCount > 0) {
      toast({
        title: "Reports Synced",
        description: `Successfully synced ${syncedCount} offline report(s).`,
      });
    }

    setSyncInProgress(false);
  };

  const getOfflineReportsCount = () => {
    return offlineReports.filter(report => !report.synced).length;
  };

  const clearSyncedReports = () => {
    const unsyncedReports = offlineReports.filter(report => !report.synced);
    setOfflineReports(unsyncedReports);
    localStorage.setItem('offline-reports', JSON.stringify(unsyncedReports));
  };

  return {
    isOnline,
    offlineReports,
    syncInProgress,
    saveOfflineReport,
    syncOfflineReports,
    getOfflineReportsCount,
    clearSyncedReports
  };
}