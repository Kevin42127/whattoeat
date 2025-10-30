import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material'
import { categoryLabels, priceLabels } from '../data/foodData'
import { useStorage } from '../hooks/useStorage'

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useStorage()
  const [searchQuery, setSearchQuery] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  // 搜尋功能
  const filteredFavorites = favorites.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    food.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleRemoveFavorite = (foodId: string, foodName: string) => {
    removeFavorite(foodId)
    setSnackbarMessage(`已從收藏中移除「${foodName}」`)
    setSnackbarOpen(true)
  }

  const handleClearAll = () => {
    favorites.forEach(food => removeFavorite(food.id))
    setSnackbarMessage('已清空所有收藏')
    setSnackbarOpen(true)
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          我的收藏
        </Typography>

      {/* 搜尋欄 */}
      <TextField
        fullWidth
        placeholder="搜尋收藏的美食..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        color="primary"
        sx={{ mb: 3 }}
      />

      {/* 統計資訊 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="body1" color="primary">
          共 {favorites.length} 個收藏
          {searchQuery && ` • 找到 ${filteredFavorites.length} 個結果`}
        </Typography>
        {favorites.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearAll}
          >
            清空收藏
          </Button>
        )}
      </Box>

      {/* 收藏列表 */}
      {filteredFavorites.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" gutterBottom color="primary">
              {searchQuery ? '找不到符合搜尋條件的美食' : '還沒有收藏任何美食'}
            </Typography>
            <Typography variant="body2" color="primary">
              {searchQuery 
                ? '試試其他關鍵字或清除搜尋條件'
                : '去首頁抽選一些美食加入收藏吧！'
              }
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {filteredFavorites.map((food) => (
            <Grid item xs={12} sm={6} md={4} key={food.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap>
                    {food.name}
                  </Typography>
                  <Typography variant="body2" color="primary" paragraph>
                    {food.description}
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={0.5} mb={1}>
                    <Chip
                      label={categoryLabels[food.category]}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={priceLabels[food.price]}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveFavorite(food.id, food.name)}
                  >
                    移除
                  </Button>
                </CardActions>
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
