const API_BASE = '/api';

async function requestJson(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return response.json();
}

export async function getRestaurantSnapshot() {
  return requestJson('/restaurant');
}

export async function saveRestaurantSnapshot(snapshot) {
  return requestJson('/restaurant', {
    method: 'PUT',
    body: JSON.stringify(snapshot)
  });
}

export async function resetRestaurantSnapshot() {
  return requestJson('/restaurant/reset', { method: 'POST' });
}
