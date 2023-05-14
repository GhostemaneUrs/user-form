import * as yup from 'yup'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import google from '../../assets/icons/google.svg'
import { SignValues } from '../../types/userValues'

const SignIn = () => {
  const navigate = useNavigate()
  const { signIn, signInWithGoogle } = useAuth()
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [valuesSignIn, setValuesSignIn] = useState<SignValues>({
    email: '',
    password: '',
    remember: false
  })

  const [viewPassword, setViewPassword] = useState<boolean>(false)

  const validateSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Ingrese un correo electrónico válido'
      )
      .required('El correo electrónico es requerido')
  })

  const formik = useFormik({
    enableReinitialize: isLoaded,
    initialValues: valuesSignIn,
    validationSchema: validateSchema,
    onSubmit: async values => {
      await signIn(values.email, values.password).then(() => {
        console.log('Iniciaste sesión')
      })
    }
  })

  useEffect(() => {
    setIsLoaded(true)
    setTimeout(() => {
      setIsLoaded(false)
    }, 2000)
  }, [])

  return (
    <div className='w-full max-w-[760px] px-4 sm:px-11 m-auto'>
      <div className='flex justify-end items-center mb-6 xl:mb-8'>
        <p className='text-sky-gray-50'>
          No tengo una cuenta!{' '}
          <span
            className='text-sky-blue-70 cursor-pointer hover:text-sky-blue-80'
            onClick={() => {
              navigate('/sign-up')
            }}
          >
            Registrarme
          </span>
        </p>
      </div>
      <div className='mb-4 sm:mb-6'>
        <h1 className='font-semibold text-black text-4xl'>Iniciar sesión</h1>
      </div>
      <div className='b-4 xl:mb-8'>
        <span
          className='w-full bg-gradient-to-t from-sky-blue-70 to-sky-blue-90 flex justify-center items-center text-white text-base py-[12px] px-8 pl-3 gap-4 rounded-full shadow-sky-buttons cursor-pointer'
          onClick={async () => {
            await signInWithGoogle()
          }}
        >
          <img src={google} alt='google-icon' />
          Con Google
        </span>
      </div>
      <div className='mb-2 sm:mb-5'>
        <span className='text-sky-gray-50 text-base'>
          O inicia sesión con tu correo y contraseña
        </span>
      </div>
      <form
        noValidate
        className='w-full flex flex-col gap-4'
        onSubmit={formik.handleSubmit}
      >
        <div className='w-full flex flex-col gap-3 relative'>
          <label htmlFor='email' className='text-black text-lg font-bold'>
            Correo electrónico
          </label>
          <input
            id='email'
            type='text'
            placeholder='Escriba aquí'
            {...formik.getFieldProps('email')}
            value={formik.values.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              formik.handleChange(e)
              setValuesSignIn({ ...valuesSignIn, email: e.target.value })
            }}
            className='w-full border solid border-sky-gray-40 py-3 px-6 rounded-full outline-none text-lg placeholder:text-sky-gray-30'
          />
          <span
            className={`material-icons text-sky-gray-50 text-[28px] cursor-pointer absolute top right-8 transform translate-y-[50px]`}
          >
            person
          </span>
          {formik.touched.email && formik.errors.email && (
            <span className='text-[15px] text-sky-red-90 px-2'>
              {formik.errors?.email}
            </span>
          )}
        </div>
        <div className='w-full flex flex-col gap-3 relative sm:mb-4'>
          <label htmlFor='password' className='text-black text-lg font-bold'>
            Contraseña
          </label>
          <div className='relative'>
            <input
              id='password'
              placeholder='************'
              {...formik.getFieldProps('password')}
              value={formik.values.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.handleChange(e)
                setValuesSignIn({ ...valuesSignIn, password: e.target.value })
              }}
              type={viewPassword ? 'text' : 'password'}
              className='w-full border solid border-sky-gray-40 py-3 px-6 rounded-full outline-none text-lg placeholder:text-sky-gray-30 pr-12'
            />
            <span
              className={`material-icons text-sky-gray-50 text-[28px] cursor-pointer absolute top right-8 transform translate-y-[50%]`}
              onClick={() => {
                setViewPassword(!viewPassword)
              }}
            >
              {viewPassword ? 'visibility_off' : 'visibility'}
            </span>
          </div>
        </div>
        <div className='w-full flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-2 sm:mb-8'>
          <div className='flex items-center gap-3'>
            <input
              id='remember'
              type='checkbox'
              {...formik.getFieldProps('remember')}
              checked={formik.values.remember}
              value={String(formik.values.remember)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.handleChange(e)
                setValuesSignIn({ ...valuesSignIn, remember: e.target.checked })
              }}
              className='w-5 h-5 accent-sky-blue-90'
            />
            <label htmlFor='remember' className='text-sky-gray-50 text-base'>
              Recordarme
            </label>
          </div>
          <div>
            <span className='text-sky-blue-70 hover:text-sky-blue-80 text-base cursor-pointer'>
              ¿Olvidaste tu contraseña?
            </span>{' '}
          </div>
        </div>
        <button
          type='submit'
          className='w-full bg-gradient-to-t from-sky-blue-70 to-sky-blue-90 flex justify-center items-center text-white text-base py-[12px] px-12 gap-4 rounded-full shadow-sky-buttons font-semibold'
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}

export default SignIn
