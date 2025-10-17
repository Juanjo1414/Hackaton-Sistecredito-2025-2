import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [auth, setAuth] = useState(false);
  return auth ? <Dashboard /> : <Login onOk={() => setAuth(true)} />;
}
