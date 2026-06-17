import { Navigate } from 'react-router-dom';
import { CHAVES_STORAGE } from '../utilitarios/storage';

function PrivateRoute({ children }) {
  const usuarioLogado = localStorage.getItem(CHAVES_STORAGE.USUARIO_LOGADO);

  // Se não houver usuário logado, redireciona para o login.
  if (!usuarioLogado) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;