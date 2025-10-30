import { createTheme } from '@mui/material/styles'

// 清新橘色系主題
export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B35', // 活力橘
      light: '#FF8A65',
      dark: '#E64A19',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#757575', // 中灰
      light: '#BDBDBD',
      dark: '#424242',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5', // 淺灰背景
      paper: '#FFFFFF', // 卡片背景
    },
    text: {
      primary: '#212121', // 深灰黑
      secondary: '#757575', // 中灰
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          // 未選中（color=default）也使用品牌色外觀
          '&.MuiChip-colorDefault': {
            color: '#FF6B35',
            backgroundColor: 'transparent',
            border: '1px solid #FF6B35',
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 53, 0.08)',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF6B35',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF6B35',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF6B35',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FF6B35',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '::placeholder': {
            color: '#FF6B35',
            opacity: 1,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '::placeholder': {
            color: '#FF6B35',
            opacity: 1,
          },
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        icon: false,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          alignItems: 'center',
        },
        icon: {
          color: '#FFFFFF',
        },
        action: {
          color: '#FFFFFF',
        },
        standardSuccess: {
          backgroundColor: '#FF6B35',
          color: '#FFFFFF',
        },
        standardInfo: {
          backgroundColor: '#FF6B35',
          color: '#FFFFFF',
        },
        standardWarning: {
          backgroundColor: '#FF6B35',
          color: '#FFFFFF',
        },
        standardError: {
          backgroundColor: '#FF6B35',
          color: '#FFFFFF',
        },
        filledSuccess: {
          backgroundColor: '#FF6B35',
          color: '#FFFFFF',
        },
        filledInfo: {
          backgroundColor: '#FF6B35',
          color: '#FFFFFF',
        },
        filledWarning: {
          backgroundColor: '#FF6B35',
          color: '#FFFFFF',
        },
        filledError: {
          backgroundColor: '#FF6B35',
          color: '#FFFFFF',
        },
        outlinedSuccess: {
          borderColor: '#FF6B35',
          color: '#FF6B35',
        },
        outlinedInfo: {
          borderColor: '#FF6B35',
          color: '#FF6B35',
        },
        outlinedWarning: {
          borderColor: '#FF6B35',
          color: '#FF6B35',
        },
        outlinedError: {
          borderColor: '#FF6B35',
          color: '#FF6B35',
        },
      },
    },
  },
})
