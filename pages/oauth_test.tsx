import Head from 'next/head';
import { useEffect } from 'react';

import { naverOauthAPI } from 'api/oauth';

const TestPage = () => {
  // TODO: hooks로 빼는 것도 고려중
  useEffect(() => {
    const token = location.hash?.split('=')[1]?.split('&')[0];
    if (!token) return;

    naverOauthAPI.getProfileNextAPI(token);
  }, []);

  return (
    <>
      <Head>
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
          integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
          crossOrigin="anonymous"
          async
        />
      </Head>
    </>
  );
};

export default TestPage;
