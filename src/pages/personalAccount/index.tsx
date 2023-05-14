import { useState } from 'react'
import { Account } from '../../components/account'
import { Location } from '../../components/location'
import { Personal } from '../../components/personal'
import { Stepper, Step } from '@material-tailwind/react'
import { HomeIcon, CogIcon, UserIcon } from '@heroicons/react/24/outline'

const PersonalAccount = () => {
  const [stepper, setStepper] = useState(0)

  return (
    <main className='w-full h-full flex flex-col overflow-x-hidden items-center'>
      <div className='flex flex-col xl:flex-row justify-center items-center w-full py-3 px-4 sm:pl-8 sm:pr-4 max-w-[1440px] gap-4 flex-1-auto m-0-auto'>
        <div className='flex flex-col gap-4 w-full h-full'>
          <Stepper activeStep={stepper}>
            <Step onClick={() => setStepper(0)}>
              <HomeIcon className='h-5 w-5' />
            </Step>
            <Step onClick={() => setStepper(1)}>
              <UserIcon className='h-5 w-5' />
            </Step>
            <Step onClick={() => setStepper(2)}>
              <CogIcon className='h-5 w-5' />
            </Step>
          </Stepper>
          <div className='bg-white w-full border solid rounded-2xl p-4 flex '>
            {stepper === 2 && <Location />}
            {stepper === 1 && <Account />}
            {stepper === 0 && <Personal />}
          </div>
        </div>
      </div>
    </main>
  )
}

export default PersonalAccount
