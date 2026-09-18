import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import "./Layout.css";

// Layout compartilhado por todas as páginas que têm a sidebar.
// Cada página nova que precisar da sidebar vira uma rota filha
// dentro do <Route element={<Layout />}> no App.jsx, sem precisar
// repetir <div className="layout-financas"><Sidebar />...</div> em cada rota.
function Layout() {
  return (
    <div className="layout-financas">
      <Sidebar />
      <div className="layout-financas__conteudo">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;