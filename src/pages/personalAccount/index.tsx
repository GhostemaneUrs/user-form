import { useEffect } from 'react'
import { useStep } from '../../hooks/useStep'
import { useAuth } from '../../hooks/useAuth'
import { Account } from '../../components/account'
import { Location } from '../../components/location'
import { Personal } from '../../components/personal'
import { Stepper, Step } from '@material-tailwind/react'

const PersonalAccount = () => {
  const { user } = useAuth()
  const { steps, description, step } = useStep()

  useEffect(() => {
    step(Number(user?.step))
  }, [user])

  return (
    <main className='w-full max-w-[1440px] m-auto pl-4 h-full'>
      <div className='h-[calc(100vh-160px)] md:h-[calc(100vh-150px)] pr-4 w-full flex isScroll overflow-x-hidden justify-between'>
        <div className='flex flex-col xl:flex-row xl:justify-between w-full max-w-[1440px] gap-4 flex-1-auto m-0-auto'>
          <div className='flex flex-col w-full h-full'>
            <Stepper activeStep={steps} className='mb-3'>
              <Step className='shadow-none cursor-pointer'>
                <span className='material-icons'>person</span>
              </Step>
              <Step className='shadow-none cursor-pointer'>
                <span className='material-icons'>mail</span>
              </Step>
              <Step className='shadow-none cursor-pointer'>
                <span className='material-icons'>home</span>
              </Step>
            </Stepper>
            <div className='w-full flex flex-col xl:flex-row h-full xl:justify-between gap-2 pb-4'>
              <div
                className={`bg-white w-full border solid rounded-2xl p-4 ${
                  steps !== 2 ? 'xl:h-full' : 'h-full'
                } flex xl:max-w-[750px]`}
              >
                {steps === 2 && <Location />}
                {steps === 1 && <Account />}
                {steps === 0 && <Personal />}
              </div>
              <div className='bg-white xl:max-w-[300px] h-max rounded-lg border solid w-full p-4 '>
                <span>{description}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PersonalAccount
