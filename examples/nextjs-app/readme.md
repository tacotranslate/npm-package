# TacoTranslate in a Next.js app

See this example live at [demo.tacotranslate.com](https://demo.tacotranslate.com).

## Running this example

First, replace the `apiKey` in `createTacoTranslateClient` with your own. Then, ensure the `path` in `getStaticProps` corresponds with the path URL. Finally, run these commands:

```
npm install
npm run dev
```

## What languages are supported?

Any language inside the `locales` array is supported. To stop supporting a language, simply remove it from `locales` in `next.config.js`, and it will be disallowed inside your app.
