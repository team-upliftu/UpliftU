node(16くらいが良さそう)とnpmをインストール

https://qiita.com/futaro0405/items/d8042854e6ab201845cc
まずはプロジェクト作成
```
npm create install
```
プロジェクト名を入力
```
? Project name: » vite-project
```
使用するフレームワークを選択．（今回はreact）
```
? Select a framework: » - Use arrow-keys. Return to submit.
    Vanilla
    Vue
>   React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others

```
variantの選択
```
? Select a variant: » - Use arrow-keys. Return to submit.
>   TypeScript
    TypeScript + SWC
    JavaScript
    JavaScript + SWC

```
最後にこれ
```
cd vite-project
npm i
npm run dev
```