import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="google-site-verification" content="99mpFUhDwp3fbSwfP2Av_0G3wngv-NELlBE_H3iJOqY" />
        <script async src='https://developers.kakao.com/sdk/js/kakao.js' />
        <script async src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Head>
    </Html>
  )
}
