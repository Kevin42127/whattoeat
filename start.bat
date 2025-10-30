@echo off
echo 🍽️ 啟動「今天吃什麼」網站版應用程式...
echo.
echo 正在安裝依賴套件...
call npm install
if %errorlevel% neq 0 (
    echo 安裝失敗，請檢查 Node.js 是否已安裝
    pause
    exit /b 1
)

echo.
echo 依賴安裝完成！
echo 正在啟動開發伺服器...
echo 請稍候，應用程式將在瀏覽器中自動打開
echo.
echo 如果瀏覽器沒有自動打開，請手動訪問：
echo http://localhost:3000
echo.

call npm run dev