const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function handle(r) {
  if (!r.ok) {
    const t = await r.text();
    throw new Error(t || r.statusText);
  }
  return r.json();
}

export const api = {
  get: (p) => fetch(`${API}${p}`).then(handle),
  post: (p, body) =>
    fetch(`${API}${p}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(handle),
};
