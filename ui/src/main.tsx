import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Menu } from "@components/menu/Menu.tsx";
import { Home } from "./pages/home/Home.tsx";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
               </Routes>
                <Menu />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
)
