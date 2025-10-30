import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material'
import { categoryLabels, priceLabels } from '../data/foodData'
import { DrawResult } from '../types'
import { useStorage } from '../hooks/useStorage'

export default function HistoryPage() {
  const { history, clearHistory } = useStorage()
  const [searchQuery, setSearchQuery] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  // 搜尋功能
  const filteredHistory = history.filter(result =>
    result.food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.food.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // 格式化時間
  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return '剛剛'
    if (minutes < 60) return `${minutes} 分鐘前`
    if (hours < 24) return `${hours} 小時前`
    if (days < 7) return `${days} 天前`
    
    return new Date(date).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleClearHistory = () => {
    clearHistory()
    setSnackbarMessage('已清空所有歷史記錄')
    setSnackbarOpen(true)
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          抽選記錄
        </Typography>

      {/* 搜尋欄 */}
      <TextField
        fullWidth
        placeholder="搜尋抽選記錄..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        color="primary"
        sx={{ mb: 3 }}
      />

      {/* 統計資訊 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="body1" color="primary">
          共 {history.length} 次抽選
          {searchQuery && ` • 找到 ${filteredHistory.length} 個結果`}
        </Typography>
        {history.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearHistory}
          >
            清空記錄
          </Button>
        )}
      </Box>

      {/* 歷史記錄列表 */}
      {filteredHistory.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" gutterBottom color="primary">
              {searchQuery ? '找不到符合搜尋條件的記錄' : '還沒有抽選記錄'}
            </Typography>
            <Typography variant="body2" color="primary">
              {searchQuery 
                ? '試試其他關鍵字或清除搜尋條件'
                : '去首頁開始抽選美食吧！'
              }
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {filteredHistory.map((result, index) => (
            <Grid item xs={12} key={`${result.food.id}-${index}`}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {result.food.name}
                  </Typography>
                  <Typography variant="body2" color="primary" paragraph>
                    {result.food.description}
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={0.5} mb={1}>
                    <Chip
                      label={categoryLabels[result.food.category]}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={priceLabels[result.food.price]}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="caption" color="primary">
                    {formatTime(result.timestamp)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

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
