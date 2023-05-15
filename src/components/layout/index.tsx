import { useLocation } from 'react-router-dom'
import { Header } from '../header'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const { pathname } = location
  return (
    <div className='flex flex-col min-h-screen w-full'>
      {pathname !== '/sign-in' && pathname !== '/sign-up' && <Header />}
      <main className='w-full flex flex-1-auto'>{children}</main>
    </div>
  )
}
