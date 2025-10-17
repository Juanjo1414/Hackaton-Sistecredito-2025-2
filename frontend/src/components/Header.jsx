export default function Header() {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-indigo-600 grid place-items-center text-white font-bold">
          NN
        </div>
        <div>
          <h1 className="text-xl font-extrabold leading-tight">NeuralNinjas</h1>
          <p className="text-xs text-gray-500 -mt-1">SISTETIENDA · Panel del Tendero</p>
        </div>
      </div>
      <div className="text-xs text-gray-500">MVP Hackathon</div>
    </header>
  );
}
