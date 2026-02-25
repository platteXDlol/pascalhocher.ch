import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import Specs from './pages/Specs'
import Projekte from './pages/Projekte'
import Impressum from './pages/Impressum'

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="specs" element={<Specs />} />
          <Route path="projekte" element={<Projekte />} />
          <Route path="impressum" element={<Impressum />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}
