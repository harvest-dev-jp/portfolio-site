# Harvest Portfolio Site

AIとWeb技術を活用し、業務の効率化・見える化を支援するための個人ポートフォリオサイトです。

業務システム開発とプロジェクトマネジメントの経験をもとに、Next.js、TypeScript、Tailwind CSSを使って制作しています。

## Overview

このサイトでは、自己紹介、制作したWebアプリ、使用技術などを公開しています。

現在は以下のプロジェクトを掲載しています。

- Harvest Portfolio Site
- 動的リタイアメント・シミュレーター
- ふるさと納税シミュレーション＋

## Concept

Harvestでは、次の3つを大切にしています。

- **業務を見える化する**  
  複雑な情報や判断材料を整理し、必要なことがひと目で分かる形にします。

- **使いやすく整える**  
  現場で迷わず使えるように、シンプルで分かりやすい画面を大切にします。

- **AIとWebで支援する**  
  AIとWeb技術を活用し、日々の業務改善や判断をサポートします。

## Projects

### Harvest Portfolio Site

Next.js、TypeScript、Tailwind CSSで制作した個人ポートフォリオサイトです。

### 動的リタイアメント・シミュレーター

投資・年金・インフレを考慮して、将来の資産推移を試算するWebアプリです。

### ふるさと納税シミュレーション＋

iDeCoや住宅ローン控除も考慮できる、ふるさと納税上限額の試算アプリです。

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- GitHub
- Vercel

## Directory Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── about/
│   │   └── page.tsx
│   ├── works/
│   │   ├── page.tsx
│   │   ├── featured/
│   │   │   └── page.tsx
│   │   └── furusato-tax/
│   │       └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── RetirementSimulator.tsx
│   └── furusato-tax/
└── lib/
    └── furusato-tax/
