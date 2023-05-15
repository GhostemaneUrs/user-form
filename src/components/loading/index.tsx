import { Fragment } from 'react'
import { ClipLoader } from 'react-spinners'

interface LoadingProps {
  state: boolean
}

export const Loading = ({ state }: LoadingProps) => {
  return (
    <Fragment>
      {state && (
        <div className='bg-[#FFFFFF] opacity-[1] h-full w-full absolute z-[15]'>
          <div className='flex justify-center items-center w-full h-full'>
            <div className='absolute'>
              <ClipLoader color='#2196F3' loading={state} size='170px' />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}
