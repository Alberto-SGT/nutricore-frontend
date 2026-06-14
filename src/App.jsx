import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Login — próximamente</div>} />
        <Route path="/habitos" element={<div>Hábitos — próximamente</div>} />
        <Route path="/alimentos" element={<div>Alimentos — próximamente</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
