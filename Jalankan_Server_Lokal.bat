@echo off
title Server Lokal Undangan Digital
echo ========================================================
echo   Menjalankan Server Lokal Undangan Digital...
echo   Alamat: http://localhost:8000
echo   (Tutup jendela ini jika sudah selesai)
echo ========================================================
start "" "http://localhost:8000"
python -m http.server 8000
pause

