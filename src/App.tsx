import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import BottomNavigation from './components/BottomNavigation'
import HomePage from './pages/HomePage'
import FavoritesPage from './pages/FavoritesPage'
import HistoryPage from './pages/HistoryPage'
import ResultPage from './pages/ResultPage'

function App() {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      paddingBottom: '80px' // 為底部導航留出空間
    }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/result/:foodId" element={<ResultPage />} />
      </Routes>
      <BottomNavigation />
    </Box>
  )
}

export default App
