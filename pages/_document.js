import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        const setInitialTheme = `
        function getUserPreference() {
          if(window.localStorage.getItem('theme')) {
            return window.localStorage.getItem('theme')
          }
          return window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light'
        }
        document.body.dataset.theme = getUserPreference();
      `;
        return (
            <Html>
                <Head>
                    <meta name='viewport' content="width=device-width, initial-scale=1"></meta>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
<link href="https://fonts.googleapis.com/css2?family=Gluten:wght@200;300;600&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                    <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument