import { useEffect, useState } from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import { api } from '../lib/api';

function money(v) {
  try {
    return v.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  } catch {
    return `$${v}`;
  }
}

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [customer, setCustomer] = useState(null);
  const [amount, setAmount] = useState('');
  const [ticket, setTicket] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  const cargarMetrics = async () => {
    try {
      const m = await api.get('/admin/metrics');
      setMetrics(m);
    } catch {}
  };

  const buscar = async () => {
    if (!query.trim()) return alert('Ingresa cédula o teléfono');
    try {
      setLoading(true);
      const data = await api.get(`/merchant/customer/${query.trim()}`);
      setCustomer(data);
      setTicket(null);
      setAmount('');
    } catch (e) {
      alert(e.message || 'No encontrado');
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  const vender = async () => {
    if (!customer) return alert('Consulta un cliente primero');
    const val = Number(amount);
    if (!val || val <= 0) return alert('Monto inválido');
    try {
      setLoading(true);
      const tk = await api.post('/merchant/sale', { personId: customer.personId, amount: val });
      setTicket(tk);
      const data = await api.get(`/merchant/customer/${query.trim()}`);
      setCustomer(data);
      setAmount('');
    } catch (e) {
      alert(e.message || 'Error al vender');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMetrics();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen text-gray-900">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Onboardings" value={metrics?.onboardings ?? '-'} />
        <StatCard label="Aprobaciones" value={metrics?.approvals ?? '-'} />
        <StatCard label="Score Promedio" value={metrics?.avg_score ?? '-'} />
        <StatCard label="Compras Abiertas" value={metrics?.open_purchases ?? '-'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Consultar cliente */}
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
          <div className="font-semibold mb-3">Consultar cliente</div>
          <div className="flex gap-2 mb-3">
            <input
              className="border rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Cédula o teléfono"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="px-4 py-2 rounded-2xl shadow font-medium transition bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={buscar}
              disabled={loading}
            >
              Buscar
            </button>
          </div>

          {customer && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
                <div className="text-xs text-gray-500">Cliente</div>
                <div className="font-bold">{customer.name}</div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
                <div className="text-xs text-gray-500">Estado</div>
                <div className="font-bold">{customer.state}</div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
                <div className="text-xs text-gray-500">Banda</div>
                <div className="font-bold">{customer.band}</div>
              </div>
              <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
                <div className="text-xs text-gray-500">Disponible</div>
                <div className="font-bold">{money(customer.available)}</div>
              </div>
            </div>
          )}
        </div>

        {/* Registrar venta */}
        <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
          <div className="font-semibold mb-3">Registrar venta</div>
          <div className="flex gap-2 mb-3">
            <input
              className="border rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="number"
              min={0}
              placeholder="Monto"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="px-4 py-2 rounded-2xl shadow font-medium transition bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={vender}
              disabled={loading}
            >
              Confirmar
            </button>
          </div>

          {ticket && (
            <div className="p-3 rounded-2xl bg-green-50 border border-green-200">
              <div className="text-sm text-green-800 font-semibold">Venta registrada</div>
              <div className="text-sm">
                Ticket: <b>{ticket.ticketId}</b>
              </div>
              <div className="text-sm">
                Vence: <b>{new Date(ticket.dueDate).toLocaleDateString()}</b>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
