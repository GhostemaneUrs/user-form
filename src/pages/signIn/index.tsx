import * as yup from 'yup'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { Fragment, useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { UserValuesType } from '../../types/user'

const SignIn = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [valuesSignIn, setValuesSignIn] = useState<UserValuesType>({
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
    validate: values => validateValues(values, 'remember'),
    validationSchema: validateSchema,
    onSubmit: async (values, { resetForm }) => {
      await signIn(values.email, values.password)
        .then(() => {
          resetForm()
          navigate('/personal-account')
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            Swal.fire({
              timer: 1500,
              icon: 'error',
              title: 'Oops...',
              showConfirmButton: false,
              text: 'Correo electrónico o contraseña incorrecta'
            })
          } else {
            Swal.fire({
              timer: 1500,
              icon: 'error',
              title: 'Oops...',
              showConfirmButton: false,
              text: 'No se pudo iniciar sesión, intente nuevamente'
            })
          }
        })
    }
  })

  const validateValues = (values: UserValuesType, exception?: string) => {
    Object.entries(values).some(value => {
      if (value[0] !== exception) {
        if (!value[1] || value[1] === '') {
          setIsValid(true)
          return true
        } else {
          setIsValid(false)
          return false
        }
      }
    })
  }

  useEffect(() => {
    setIsLoaded(true)
    setTimeout(() => {
      setIsLoaded(false)
    }, 2000)
  }, [])

  return (
    <Fragment>
      <div className='w-full xl:w-2/4 bg-white min-h-screen flex flex-col justify-center items-center'>
        <div className='w-full max-w-[560px] px-4 m-auto'>
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
            <h1 className='font-semibold text-black text-4xl'>
              Iniciar sesión
            </h1>
          </div>
          <form
            noValidate
            className='w-full flex flex-col gap-2'
            onSubmit={formik.handleSubmit}
          >
            <div className='w-full flex flex-col gap-1 relative'>
              <label htmlFor='email' className='text-black text-base font-bold'>
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
                className='w-full border solid border-sky-gray-40 py-3 px-6 rounded-full outline-none text-base placeholder:text-sky-gray-30'
              />
              <span
                className={`material-icons text-sky-gray-50 text-[25px] cursor-pointer absolute top right-5 transform translate-y-[40px]`}
              >
                person
              </span>
              {formik.touched.email && formik.errors.email && (
                <span className='text-[15px] text-sky-red-90 px-2'>
                  {formik.errors?.email}
                </span>
              )}
            </div>
            <div className='w-full flex flex-col gap-1 relative mb-5'>
              <label
                htmlFor='password'
                className='text-black text-base font-bold'
              >
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
                    setValuesSignIn({
                      ...valuesSignIn,
                      password: e.target.value
                    })
                  }}
                  type={viewPassword ? 'text' : 'password'}
                  className='w-full border solid border-sky-gray-40 py-3 px-6 rounded-full outline-none text-base placeholder:text-sky-gray-30'
                />
                <span
                  className={`material-icons text-sky-gray-50 text-[25px] cursor-pointer absolute top right-5 transform translate-y-[50%]`}
                  onClick={() => {
                    setViewPassword(!viewPassword)
                  }}
                >
                  {viewPassword ? 'visibility_off' : 'visibility'}
                </span>
              </div>
            </div>
            <div className='w-full flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-8'>
              <div className='flex items-center gap-3'>
                <input
                  id='remember'
                  type='checkbox'
                  {...formik.getFieldProps('remember')}
                  checked={formik.values.remember}
                  value={String(formik.values.remember)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.handleChange(e)
                    setValuesSignIn({
                      ...valuesSignIn,
                      remember: e.target.checked
                    })
                  }}
                  className='w-5 h-5 accent-sky-blue-90'
                />
                <label
                  htmlFor='remember'
                  className='text-sky-gray-50 text-base'
                >
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
              disabled={isValid}
              className={`w-full bg-[#2196F3] hover:bg-[#317cba] flex justify-center items-center text-white text-base py-[12px] px-12 gap-4 rounded-full shadow-sky-buttons font-semibold disabled:opacity-80 ${
                isValid && 'cursor-not-allowed'
              }`}
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      <div className='linear-gradient-sign w-2/4 h-full min-h-screen hidden xl:block' />
    </Fragment>
  )
}

export default SignIn
