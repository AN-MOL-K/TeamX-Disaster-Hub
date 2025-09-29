// Service Worker for offline functionality
const CACHE_NAME = 'disaster-hub-v1';
const STATIC_CACHE = 'disaster-hub-static-v1';
const DYNAMIC_CACHE = 'disaster-hub-dynamic-v1';

// Files to cache for offline usage
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/OIP.webp',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  // Add critical pages
  '/login',
  '/signup',
  '/share-info',
  '/profile',
  '/disaster-info'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .catch(err => console.log('Service Worker: Cache failed', err))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE) {
            console.log('Service Worker: Clearing old cache', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return response;
        }

        // Try to fetch from network
        return fetch(event.request)
          .then(fetchResponse => {
            // Check if valid response
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }

            // Clone the response for caching
            const responseToCache = fetchResponse.clone();

            // Cache dynamic content
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return fetchResponse;
          })
          .catch(() => {
            // Network failed, try to serve a fallback page
            if (event.request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Background sync for offline data submission
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'disaster-report-sync') {
    event.waitUntil(syncDisasterReports());
  }
});

// Sync offline disaster reports when connection is restored
async function syncDisasterReports() {
  try {
    const offlineReports = await getOfflineReports();
    
    for (const report of offlineReports) {
      try {
        // Attempt to submit the report
        await submitReportToServer(report);
        // Remove from offline storage after successful submission
        await removeOfflineReport(report.id);
        
        // Notify user of successful sync
        self.registration.showNotification('Report Submitted', {
          body: `Your disaster report "${report.title}" has been submitted successfully.`,
          icon: '/OIP.webp',
          badge: '/OIP.webp'
        });
      } catch (error) {
        console.log('Failed to sync report:', report.id, error);
      }
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// Helper functions for offline storage
async function getOfflineReports() {
  // This would integrate with IndexedDB
  return JSON.parse(localStorage.getItem('offline-reports') || '[]');
}

async function removeOfflineReport(reportId) {
  const reports = await getOfflineReports();
  const filteredReports = reports.filter(r => r.id !== reportId);
  localStorage.setItem('offline-reports', JSON.stringify(filteredReports));
}

async function submitReportToServer(report) {
  // This would be the actual API call
  const response = await fetch('/api/reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(report)
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
}