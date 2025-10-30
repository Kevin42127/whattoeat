import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Typography, Button, Snackbar, Alert } from '@mui/material'
import { foodDatabase } from '../data/foodData'
import { useStorage } from '../hooks/useStorage'

export default function HomePage() {
  const navigate = useNavigate()
  const { addToHistory } = useStorage()
  const [isLoading, setIsLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  // 載入篩選設定
  useEffect(() => {
    // 因移除篩選，清空舊有篩選狀態
    localStorage.removeItem('foodFilters')
  }, [])

  // 隨機抽選邏輯
  const drawRandomFood = async () => {
    setIsLoading(true)
    
    try {
      // 直接從完整資料庫抽選
      const randomIndex = Math.floor(Math.random() * foodDatabase.length)
      const selectedFood = foodDatabase[randomIndex]
      const message = `抽選到：${selectedFood.name}`

      // 加入歷史記錄
      await addToHistory(selectedFood)

      // 顯示抽選結果訊息
      setSnackbarMessage(message)
      setSnackbarOpen(true)

      // 導航到結果頁面
      navigate(`/result/${selectedFood.id}`)
      
    } catch (error) {
      console.error('抽選失敗:', error)
      setSnackbarMessage('抽選失敗，請重試')
      setSnackbarOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* 置中區塊：標題 / 副標題 / 抽選按鈕 */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          今天吃什麼？
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mb: 3 }}>
          隨機抽選幫你決定今天的美食
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={drawRandomFood}
          disabled={isLoading}
        >
          抽選
        </Button>
      </Box>

      

      {/* 提示訊息 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}
