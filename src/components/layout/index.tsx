interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className='w-full flex justify-center items-center min-h-screen bg-[#F6F7FB]'>
      {children}
    </main>
  )
}
