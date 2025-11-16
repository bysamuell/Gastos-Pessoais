function Layout({ children, onLogout }) {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          <div className="dashboard-logo">💸</div>
          <div>
            <h2>Gastos Pessoais</h2>
            <p>Seu painel de controle financeiro</p>
          </div>
        </div>
        {onLogout && (
          <button type="button" onClick={onLogout} className="dashboard-logout">
            Sair
          </button>
        )}
      </aside>
      <main className="dashboard-main">{children}</main>
    </div>
  );
}

export default Layout;
