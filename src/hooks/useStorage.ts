import { useState, useEffect } from 'react'
import { Food, DrawResult } from '../types'

export function useStorage() {
  const [favorites, setFavorites] = useState<Food[]>([])
  const [history, setHistory] = useState<DrawResult[]>([])

  // 載入資料
  useEffect(() => {
    const loadFavorites = () => {
      const saved = localStorage.getItem('foodFavorites')
      if (saved) {
        setFavorites(JSON.parse(saved))
      }
    }

    const loadHistory = () => {
      const saved = localStorage.getItem('foodHistory')
      if (saved) {
        setHistory(JSON.parse(saved))
      }
    }

    loadFavorites()
    loadHistory()
  }, [])

  // 新增收藏
  const addFavorite = (food: Food) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === food.id)
    if (!isAlreadyFavorite) {
      const newFavorites = [...favorites, { ...food, isFavorite: true }]
      setFavorites(newFavorites)
      localStorage.setItem('foodFavorites', JSON.stringify(newFavorites))
      return true
    }
    return false
  }

  // 移除收藏
  const removeFavorite = (foodId: string) => {
    const newFavorites = favorites.filter(fav => fav.id !== foodId)
    setFavorites(newFavorites)
    localStorage.setItem('foodFavorites', JSON.stringify(newFavorites))
  }

  // 檢查是否已收藏
  const isFavorite = (foodId: string) => {
    return favorites.some(fav => fav.id === foodId)
  }

  // 新增歷史記錄
  const addToHistory = (food: Food) => {
    const newResult: DrawResult = {
      food,
      timestamp: new Date(),
    }
    
    const newHistory = [newResult, ...history].slice(0, 50) // 最多保留 50 筆
    setHistory(newHistory)
    localStorage.setItem('foodHistory', JSON.stringify(newHistory))
  }

  // 清除歷史記錄
  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('foodHistory')
  }

  return {
    favorites,
    history,
    addFavorite,
    removeFavorite,
    isFavorite,
    addToHistory,
    clearHistory,
  }
}
