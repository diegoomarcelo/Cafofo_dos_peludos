import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="admin-shell">
      <Navbar />

      <main className="admin-content">{children}</main>
    </div>
  );
}

export default Layout;