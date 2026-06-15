import { NavLink, Outlet } from 'react-router-dom'
import './MainLayout.css'

function MainLayout() {
  return (
    <div className="layout">

      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-title">NutriCore</div>
          <div className="sidebar-logo-sub">v1.0.0 · local</div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Acceso
          </NavLink>
          <NavLink to="/habitos" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Hábitos
          </NavLink>
          <NavLink to="/alimentos" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Alimentos
          </NavLink>
          <NavLink to="/perfil" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Perfil
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="status-dot"></div>
          Sistema activo
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>

    </div>
  )
}

export default MainLayout
