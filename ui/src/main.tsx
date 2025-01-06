import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Food } from './modules/tracking/components/Food.tsx'
import { Menu } from "@core/components/menu/Menu.tsx";
import { Home } from "./modules/home/components/Home.tsx";
import { History } from './modules/history/components/History.tsx'
import { Statistics } from './modules/statistics/components/Statistics.tsx'
import { Settings } from './modules/settings/components/Settings.tsx'
import { Sleep } from './modules/tracking/components/Sleep.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track/food" element={<Food />} />
        <Route path="/track/sleep" element={<Sleep />} />
        <Route path="/history" element={<History />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Menu />
    </BrowserRouter>
  </StrictMode>,
)
