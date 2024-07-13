import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Map from './pages/Map'
import { AircraftProvider } from './context/AircraftContext'

function App() {

  return (
    <>
    <AircraftProvider>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Map />} />
                {/* <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </BrowserRouter>
       </AircraftProvider>
    </>
  )
}

export default App
