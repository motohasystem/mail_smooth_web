@echo off
set docker_container=app_ms

if "%1"=="start" goto start
if "%1"=="stop" goto stop
if "%1"=="exec" goto exec
goto error_message

:start
echo $ docker compose start
docker compose start
goto end

:stop
echo $ docker compose stop
docker compose stop
goto end

:exec
echo このプロジェクトはdockerにログインしない設定です。
goto end
@REM echo $ docker compose exec %docker_container% bash
@REM docker compose exec %docker_container% bash
@REM goto end

:error_message
echo 指定のコマンド %1 は未定義です。start / stop / exec のいずれかを指定してください。

:end
echo access to: https://localhost:4444/mail_smooth_web/index.html
