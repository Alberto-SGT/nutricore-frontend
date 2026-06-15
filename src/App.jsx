import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/habitos" element={<div style={{padding: '2rem', color: '#e0e0e0'}}>Hábitos — próximamente</div>} />
          <Route path="/alimentos" element={<div style={{padding: '2rem', color: '#e0e0e0'}}>Alimentos — próximamente</div>} />
          <Route path="/perfil" element={<div style={{padding: '2rem', color: '#e0e0e0'}}>Perfil — próximamente</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
