import { NavLink, useNavigate } from 'react-router-dom';
import { CHAVES_STORAGE } from '../utilitarios/storage';

function Navbar() {
  const navigate = useNavigate();

  function sairDoSistema() {
    localStorage.removeItem(CHAVES_STORAGE.USUARIO_LOGADO);
    navigate('/login');
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <img src="/img/logo1.png" alt="Cafofo dos Peludos" />

        <div>
          <strong>Portal Cafofo</strong>
          <span>Gestão de adoções</span>
        </div>
      </div>

      <nav className="admin-sidebar-menu">
        <NavLink to="/dashboard">
          <span>01</span>
          Dashboard
        </NavLink>

        <NavLink to="/pets">
          <span>02</span>
          Peludos
        </NavLink>

        <NavLink to="/tutores">
          <span>03</span>
          Interessados
        </NavLink>

        <NavLink to="/solicitacoes">
          <span>04</span>
          Solicitações
        </NavLink>

        <NavLink to="/relatorio">
          <span>05</span>
          Relatório
        </NavLink>
      </nav>

      <div className="admin-sidebar-footer">
        <NavLink to="/" className="admin-sidebar-site">
          Ver site público
        </NavLink>

        <button type="button" onClick={sairDoSistema}>
          Sair do portal
        </button>
      </div>
    </aside>
  );
}

export default Navbar;