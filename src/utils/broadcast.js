const CHANNEL_NAME = 'qr_menu_sync_channel';

let broadcastChannel = null;

if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
  } catch (e) {
    console.warn('BroadcastChannel initialization failed, falling back to localStorage events', e);
  }
}

export function subscribeToSync(onMessageCallback) {
  if (typeof window === 'undefined') return () => {};

  const handleMessage = (event) => {
    if (event.data && typeof onMessageCallback === 'function') {
      onMessageCallback(event.data);
    }
  };

  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleMessage);
  }

  // Fallback for browsers or cross-domain / window sync via localStorage
  const handleStorageEvent = (e) => {
    if (e.key === 'qr_menu_sync_event' && e.newValue) {
      try {
        const payload = JSON.parse(e.newValue);
        if (typeof onMessageCallback === 'function') {
          onMessageCallback(payload);
        }
      } catch (err) {
        console.error('Failed to parse sync storage event', err);
      }
    }
  };

  window.addEventListener('storage', handleStorageEvent);

  return () => {
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleMessage);
    }
    window.removeEventListener('storage', handleStorageEvent);
  };
}

export function dispatchSyncEvent(type, payload) {
  const syncData = {
    type,
    payload,
    timestamp: Date.now(),
    senderId: Math.random().toString(36).substring(2, 9)
  };

  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage(syncData);
    } catch (err) {
      console.warn('Failed to postMessage via BroadcastChannel', err);
    }
  }

  // Also trigger storage event for tabs listening on localStorage changes
  try {
    localStorage.setItem('qr_menu_sync_event', JSON.stringify(syncData));
  } catch (e) {
    // Ignore storage quota errors
  }
}
