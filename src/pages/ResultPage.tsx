import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material'
import { foodDatabase, categoryLabels, priceLabels, mealTimeLabels } from '../data/foodData'
import { Food } from '../types'
import { useStorage } from '../hooks/useStorage'

export default function ResultPage() {
  const { foodId } = useParams<{ foodId: string }>()
  const navigate = useNavigate()
  const { addFavorite, removeFavorite, isFavorite } = useStorage()
  const [food, setFood] = useState<Food | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [filterInfo, setFilterInfo] = useState<string>('')

  useEffect(() => {
    if (foodId) {
      const foundFood = foodDatabase.find(f => f.id === foodId)
      if (foundFood) {
        setFood(foundFood)
        
        // 從 localStorage 讀取篩選條件信息
        const savedFilters = localStorage.getItem('foodFilters')
        if (savedFilters) {
          const filters = JSON.parse(savedFilters)
          const descriptions = []
          
          if (filters.categories && filters.categories.length > 0) {
            const categoryNames = filters.categories.map((cat: string) => categoryLabels[cat as keyof typeof categoryLabels]).join('、')
            descriptions.push(categoryNames)
          }
          
          if (filters.priceRanges && filters.priceRanges.length > 0) {
            const priceNames = filters.priceRanges.map((price: string) => priceLabels[price as keyof typeof priceLabels]).join('、')
            descriptions.push(priceNames)
          }
          
          if (filters.mealTimes && filters.mealTimes.length > 0) {
            const mealTimeNames = filters.mealTimes.map((mealTime: string) => mealTimeLabels[mealTime as keyof typeof mealTimeLabels]).join('、')
            descriptions.push(mealTimeNames)
          }
          
          if (descriptions.length > 0) {
            setFilterInfo(descriptions.join(' + '))
          }
        }
      } else {
        navigate('/')
      }
    }
  }, [foodId, navigate])

  if (!food) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography>載入中...</Typography>
      </Container>
    )
  }

  const handleToggleFavorite = () => {
    if (isFavorite(food.id)) {
      removeFavorite(food.id)
      setSnackbarMessage('已從收藏中移除')
    } else {
      addFavorite(food)
      setSnackbarMessage('已加入收藏')
    }
    setSnackbarOpen(true)
  }

  const handleDrawAgain = () => {
    navigate('/')
  }

  const handleViewFavorites = () => {
    navigate('/favorites')
  }

  const handleViewHistory = () => {
    navigate('/history')
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* 返回按鈕 */}
      <Button
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        ← 返回首頁
      </Button>

      {/* 美食標題 */}
      <Card sx={{ mb: 3, textAlign: 'center', py: 4 }}>
        <Typography variant="h3" component="h1" fontWeight="bold" color="primary">
          {food.name}
        </Typography>
        
        {filterInfo && (
          <Typography variant="body2" color="primary" sx={{ mt: 2, fontStyle: 'italic' }}>
            從「{filterInfo}」中抽選
          </Typography>
        )}
      </Card>

      {/* 操作按鈕 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="outlined"
              onClick={handleDrawAgain}
            >
              再抽一次
            </Button>
            <Button
              variant="contained"
              onClick={handleToggleFavorite}
              color={isFavorite(food.id) ? 'error' : 'primary'}
            >
              {isFavorite(food.id) ? '已收藏' : '加入收藏'}
            </Button>
            <Button
              variant="text"
              href="https://forms.gle/ervLGoYQwmJPriW2A"
              target="_blank"
              rel="noopener noreferrer"
            >
              回饋表單
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 快速導航 */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            快速導航
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleViewFavorites}
              >
                我的收藏
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleViewHistory}
              >
                抽選記錄
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 提示訊息 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}
