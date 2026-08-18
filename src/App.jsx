import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Sobre from './Sobre';
import Contato from './Contato';
import CriarConta from './CriarConta';
import Login from './Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Header /><Home /></>} />
      <Route path="/sobre" element={<><Header /><Sobre /></>} />
      <Route path="/contato" element={<><Header /><Contato /></>} />
      <Route path="/criar-conta" element={<CriarConta />} />
      <Route path="/entrar" element={<Login />} />
    </Routes>
  );
}

export default App;