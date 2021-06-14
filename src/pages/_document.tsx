import { Children } from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ServerStyleSheets } from "@material-ui/styles";
import createEmotionServer from "@emotion/server/create-instance";

const getCache = () => {
  const cache = createCache({ key: "css", prepend: true });
  cache.compat = true;

  return cache;
};

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    const cache = getCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(sheets.collect(<App {...props} />)),
          // Take precedence over the CacheProvider in our custom _app.js
          enhanceComponent: (Component) => (props) =>
            (
              <CacheProvider value={cache}>
                <Component {...props} />
              </CacheProvider>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      const emotionStyles = extractCriticalToChunks(initialProps.html);
      const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
          data-emotion={`${style.key} ${style.ids.join(" ")}`}
          key={style.key}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      ));
      return {
        ...initialProps,
        styles: [
          ...Children.toArray(initialProps.styles),
          sheets.getStyleElement(),
          sheet.getStyleElement(),
          ...emotionStyleTags,
        ],
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400;1,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
