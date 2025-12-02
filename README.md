# MailSmooth

メルマガを音声読み上げ用に最適化するテキスト前処理ツール

https://motohasystem.github.io/mail_smooth_web/

## 概要

MailSmoothは、メールマガジン（メルマガ）をテキスト音声変換（TTS）で聴く際の体験を向上させるためのWebアプリケーションです。PWA対応で、オフラインでも利用可能です。

## 主な機能

- **URL置換**: 長いURL文字列を `(URL)` に短縮し、読み上げ時のノイズを軽減
- **セパレータ除去**: 区切り線（`====`, `----`, `━━━━` など）の繰り返し記号を除去
- **テキスト分割**: 指定した文字数でテキストをページ分割
- **ヘッダー/フッター削除**: 不要なヘッダー・フッター部分をパターン指定で自動削除
- **共有ターゲット**: 他のアプリからテキストを直接受け取り可能（Android対応）

## 対応する区切り記号

```
─────────────────
━━━━━━━━━━━━━━━━━
==================================
┏━━━━━━━━━━━━━━━━
```

## 使い方

1. 左側の入力エリアにメルマガのテキストを貼り付け
2. 必要に応じて見出しや分割文字数を設定
3. 中央の「変換」ボタンをクリック
4. 右側の出力エリアに整形されたテキストが表示
5. ページボタンで分割されたテキストを切り替え
6. 「コピー」ボタンでクリップボードにコピー

## 開発

### 必要な環境

- Node.js 18以上
- npm

### セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動（ホットリロード対応）
npm run dev

# プロダクションビルド
npm run build

# テストの実行
npm test
```

### ビルド出力

プロダクションビルドは `/docs` ディレクトリに出力されます（GitHub Pages用）。

### 技術スタック

- **言語**: TypeScript
- **バンドラー**: Parcel v2
- **テスト**: Jest
- **スタイリング**: カスタムCSS（Editorial Dark Design System）

## ライセンス

MIT License

Copyright (c) 2024 MotohaSystem

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
