// pages/_app.tsx
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { useUserStore } from '../store/user'; // 更新为你的 userStore 的路径
import type { AppProps, AppContext } from 'next/app'; // 引入 AppProps 类型
import { getSession } from 'next-auth/react'; // 引入 getSession 函数

function MyApp({ Component, pageProps }: AppProps) {
  const { session, status } = pageProps;
  // console.log("init session",session,status)
  const { user, updateSession } = useUserStore();

  useEffect(() => {
    updateSession(session);
  }, [session, status]);

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  return {
    pageProps: {
      ...context.ctx.query,
      session: await getSession(context.ctx),
    },
  };
};

export default MyApp;
