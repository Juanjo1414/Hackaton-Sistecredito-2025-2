export default function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {sub ? <div className="text-xs text-gray-400 mt-1">{sub}</div> : null}
    </div>
  );
}
