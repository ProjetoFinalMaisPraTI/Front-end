import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Sobre from './pages/About/About';
import Contact from './pages/Contact/Contact';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Login from './pages/Login/Login';
import Transactions from './pages/Transactions/Transactions';
import NewHome from './pages/NewHome/NewHome';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Header /><Home /></>} />
      <Route path="/sobre" element={<><Header /><Sobre /></>} />
      <Route path="/contato" element={<><Header /><Contact /></>} />
      <Route path="/criar-conta" element={<CreateAccount />} />
      <Route path="/entrar" element={<Login />} />

      {/* Todas as páginas que usam a sidebar entram aqui dentro, como
          rotas do Layout. Pra adicionar uma página nova com
          sidebar, precisa de uma linha nova aqui, o Layout
          (components/Layout/Layout.jsx) cuida de renderizar a
          Sidebar . */}
      <Route element={<Layout />}>
        <Route path="/movimentacoes" element={<Transactions />} />
        <Route path="/newhome" element={<NewHome />} />
      </Route>
    </Routes>
  );
}

export default App;