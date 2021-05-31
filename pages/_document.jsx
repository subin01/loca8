import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="A simple traceable locket with a QR code that helps to locate your misplaced asset. Purchase this safety accessory and attach it to your assets!"
          />
          <meta name="keywords" content="QR, QR Code, Tags, Locket, Pet, Pet Tags, India, Lost & Found" />
          <meta property="og:image" content="https://loca8.me/Loca8-logo-circle.png" />
          <meta
            property="og:description"
            content="A simple traceable locket with a QR code that helps to locate your misplaced asset. Purchase this safety accessory and attach it to your assets!"
          />
          <meta property="og:title" content="Loca8 Tags" />
          <meta property="og:locale" content="en-IN" />
          <meta name="twitter:title" content="Loca8 Tags - A simple traceable locket with a QR code" />
          <meta name="theme-color" content="#7ac298" />
          <meta charset="utf-8" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,700;1,200&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
