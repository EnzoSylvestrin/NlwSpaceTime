import { ReactNode } from 'react';

import '../styles/globals.css';

import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJamJuree } from 'next/font/google'

import Hero from '@/components/Hero';
import Profile from '@/components/Profile';
import SignIn from '@/components/SignIn';
import Copyright from '@/components/Copyright';
import { cookies } from 'next/headers';

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' });

const baiJamJuree = BaiJamJuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree'
});

export const metadata = {
  title: 'Nlw',
  description: 'Site criado no nlw da rocketseat',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = cookies().has('token');

  return (
    <html lang="pt">
      <body className={`${roboto.variable} ${baiJamJuree.variable} text-gray-100 bg-gray-900 font-sans`}>
        <main className="grid grid-cols-2 min-h-screen">
          <div className="flex flex-col items-start justify-between px-28 py-16 overflow-hidden relative border-r border-white/10 bg-[url('../assets/stars.svg')] bg-cover">

            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 rounded-full blur-full translate-x-1/2 bg-purple-700 opacity-50" />
            <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes"></div>

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <Copyright />
          </div>

          <div className="flex flex-col max-h-screen bg-[url(../assets/stars.svg)] bg-cover overflow-y-scroll">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

export default RootLayout;
