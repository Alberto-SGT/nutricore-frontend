import { useState } from 'react'
import './Login.css'

function Login() {
  const [tab, setTab] = useState('login')

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-title">Acceso</div>
        <div className="login-subtitle">// identifícate para continuar</div>

        <div className="login-tabs">
          <button
            className={tab === 'login' ? 'login-tab active' : 'login-tab'}
            onClick={() => setTab('login')}
          >
            Login
          </button>
          <button
            className={tab === 'registro' ? 'login-tab active' : 'login-tab'}
            onClick={() => setTab('registro')}
          >
            Registro
          </button>
        </div>

        {tab === 'login' && (
          <div>
            <div className="login-field">
              <label className="login-label">Email</label>
              <input className="login-input" type="email" placeholder="usuario@email.com" />
            </div>
            <div className="login-field">
              <label className="login-label">Contraseña</label>
              <input className="login-input" type="password" placeholder="••••••••" />
            </div>
            <button className="login-btn">Iniciar sesión →</button>
            <div className="login-hint">
              ¿Sin cuenta? <span onClick={() => setTab('registro')}>Regístrate aquí</span>
            </div>
          </div>
        )}

        {tab === 'registro' && (
          <div>
            <div className="login-field">
              <label className="login-label">Nombre</label>
              <input className="login-input" type="text" placeholder="Tu nombre" />
            </div>
            <div className="login-field">
              <label className="login-label">Email</label>
              <input className="login-input" type="email" placeholder="usuario@email.com" />
            </div>
            <div className="login-field">
              <label className="login-label">Contraseña</label>
              <input className="login-input" type="password" placeholder="••••••••" />
            </div>
            <button className="login-btn">Crear cuenta →</button>
            <div className="login-hint">
              ¿Ya tienes cuenta? <span onClick={() => setTab('login')}>Inicia sesión</span>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Login
