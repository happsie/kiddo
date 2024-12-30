import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from 'react-router'
import {Food} from './modules/tracking/components/Food.tsx'
import {Menu} from "@core/components/menu/Menu.tsx";
import {Home} from "./modules/home/components/Home.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/track/food" element={<Food/>}/>
      </Routes>
      <Menu/>
    </BrowserRouter>
  </StrictMode>,
)
