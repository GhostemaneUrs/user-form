import Swal from 'sweetalert2'
import { IconContext } from 'react-icons'
import { useAuth } from '../../hooks/useAuth'
import { useStep } from '../../hooks/useStep'
import { AiOutlinePoweroff } from 'react-icons/ai'
export const Header = () => {
  const { logout } = useAuth()
  const { steps } = useStep()
  return (
    <header className='w-full bg-white border-b solid mb-4'>
      <nav className='flex justify-end items-center py-4 px-4  max-w-[1440px] m-auto'>
        <IconContext.Provider
          value={{ className: 'text-black text-3xl cursor-pointer' }}
        >
          <AiOutlinePoweroff
            onClick={() => {
              Swal.fire({
                icon: 'error',
                showCloseButton: true,
                confirmButtonText: 'Cerrar sesión',
                text: '¿Estás seguro que deseas cerrar sesión?',
                customClass: {
                  confirmButton: 'error-question-button'
                }
              }).then(result => {
                if (result.isConfirmed) {
                  logout()
                }
              })
            }}
          />
        </IconContext.Provider>
      </nav>
      <div className='shadow border-t solid'>
        <div className='flex justify-between items-center py-4 px-4  max-w-[1440px] m-auto'>
          <div className='flex gap-1'>
            <span className='font-bold text-base'>Registro</span>
          </div>
          <span className='font-bold text-base'>Paso {steps + 1} de 3</span>
        </div>
      </div>
    </header>
  )
}
