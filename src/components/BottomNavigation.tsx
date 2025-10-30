import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const getValue = () => {
    switch (location.pathname) {
      case '/':
        return 0
      case '/favorites':
        return 1
      case '/history':
        return 2
      default:
        return 0
    }
  }

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000 
      }} 
      elevation={3}
    >
      <BottomNavigation
        value={getValue()}
        onChange={(event, newValue) => {
          switch (newValue) {
            case 0:
              navigate('/')
              break
            case 1:
              navigate('/favorites')
              break
            case 2:
              navigate('/history')
              break
          }
        }}
        showLabels
      >
        <BottomNavigationAction
          label="首頁"
        />
        <BottomNavigationAction
          label="收藏"
        />
        <BottomNavigationAction
          label="歷史"
        />
      </BottomNavigation>
    </Paper>
  )
}
