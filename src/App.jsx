import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Sobre from './pages/About/About';
import Contact from './pages/Contact/Contact';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Login from './pages/Login/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Header /><Home /></>} />
      <Route path="/sobre" element={<><Header /><Sobre /></>} />
      <Route path="/contato" element={<><Header /><Contact /></>} />
      <Route path="/criar-conta" element={<CreateAccount />} />
      <Route path="/entrar" element={<Login />} />
    </Routes>
  );
}

export default App;