import { useState } from 'react';
import { api } from '../lib/api';

export default function Login({ onOk }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const go = async () => {
    if (!phone.trim()) return alert('Ingresa un teléfono');
    try {
      setLoading(true);
      await api.post('/merchant/login', { phone: phone.trim() });
      onOk();
    } catch (e) {
      alert(e.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-gray-50 text-gray-900">
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Ingreso Tendero</h2>
        <input
          className="border rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          onClick={go}
          disabled={loading}
          className="px-4 py-2 rounded-2xl shadow font-medium transition bg-indigo-600 text-white hover:bg-indigo-700 w-full"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </div>
    </div>
  );
}
