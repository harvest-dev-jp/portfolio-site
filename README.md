# Harvest Portfolio Site

個人開発エンジニア向けのポートフォリオサイトです。Next.js、TypeScript、Tailwind CSSを使用して構築されています。

## 🌟 特徴

- **モダンなデザイン**: Harvestブランドの落ち着いた雰囲気を表現
- **レスポンシブ対応**: モバイル、タブレット、デスクトップに対応
- **高速パフォーマンス**: Next.jsのSSR/SSGで高速化
- **Vercel対応**: Vercelへの簡単デプロイに対応
- **TypeScript**: 型安全な開発
- **Tailwind CSS**: ユーティリティファーストなスタイリング

## 📂 プロジェクト構成

```
src/
├── app/
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # ホームページ
│   ├── globals.css         # グローバルスタイル
│   ├── about/
│   │   └── page.tsx        # Aboutページ
│   ├── works/
│   │   └── page.tsx        # Worksページ
│   └── contact/
│       └── page.tsx        # Contactページ
└── components/
    ├── Navigation.tsx      # ナビゲーション
    └── Footer.tsx          # フッター
```

## 🎨 Harvestブランド

### コンセプト
- **実り**: 困難を乗り越えたプロジェクトが生み出す成果
- **信頼**: 高い品質とセキュリティを備えた確実なソリューション
- **AI活用**: 最新のAI技術を活用した革新的な実装
- **落ち着いた雰囲気**: シンプルで分かりやすい、清潔なデザイン

### カラーパレット
```
harvest-50:  #faf8f6
harvest-100: #f5f0eb
harvest-200: #e8ddf6
harvest-300: #dcc9bc
harvest-400: #c8a88a
harvest-500: #b89870
harvest-600: #a0815e
harvest-700: #7d6349
harvest-800: #644e3a
harvest-900: #4a3829
```

## 🚀 セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 3. 本番ビルド

```bash
npm run build
npm start
```

## 📄 ページ構成

### Home (`/`)
- ブランド紹介
- 最近のプロジェクトプレビュー
- CTA（Call to Action）

### About (`/about`)
- プロフィール
- 専門分野と使用技術
- Harvestのコンセプト詳細
- 経歴

### Works (`/works`)
- プロジェクト一覧
- プロジェクト詳細（使用技術など）
- 統計情報

### Contact (`/contact`)
- お問い合わせフォーム
- 代替連絡方法（メール、GitHub、Twitter）
- FAQ

## 🔧 技術スタック

- **フレームワーク**: [Next.js 15](https://nextjs.org/)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **リンター**: [ESLint](https://eslint.org/)
- **ビルドツール**: [Next.js](https://nextjs.org/)

## 📝 カスタマイズ方法

### ブランドカラーの変更

`tailwind.config.ts` の `colors.harvest` を編集してください。

```typescript
harvest: {
  50: "#faf8f6",
  100: "#f5f0eb",
  // ... 他の色
}
```

### サイト情報の変更

各ページのコンテンツを直接編集してください。

- ホームページ: `src/app/page.tsx`
- Aboutページ: `src/app/about/page.tsx`
- Worksページ: `src/app/works/page.tsx`
- Contactページ: `src/app/contact/page.tsx`

### メール機能の実装

`src/app/contact/page.tsx` の フォーム送信ロジックを実装してください。

```typescript
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  // メール送信処理をここに実装
};
```

例えば、SendGridやMailgunなどのサービスを利用できます。

## 🌐 Vercelでのデプロイ

### デプロイ手順

1. GitHub にプロジェクトをプッシュ
2. [Vercel](https://vercel.com/) にアクセス
3. "Import Project" をクリック
4. GitHub リポジトリを選択
5. デプロイをクリック

### 環境変数の設定

必要な環境変数は Vercel のプロジェクト設定から追加してください。

## 📜 ライセンス

MIT

## 👤 GitHub

[harvest-dev-jp](https://github.com/harvest-dev-jp)

---

**Harvest** - 実り、信頼、AI活用、落ち着いた雰囲気を追求するポートフォリオサイト
