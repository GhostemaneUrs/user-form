import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { Fragment, useState } from 'react'
import { useFormik } from 'formik'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { UserValuesType } from '../../types/user'

const SignUp = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [isValid, setIsValid] = useState<boolean>(true)
  const [valuesSignUp] = useState<UserValuesType>({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [viewPassword, setViewPassword] = useState<boolean>(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState<boolean>(false)

  const validateSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Ingrese un correo electrónico válido'
      )
      .required('El correo electrónico es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
    confirmPassword: Yup.string()
      .required('La contraseña es requerida')
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
  })

  const formik = useFormik({
    initialValues: valuesSignUp,
    validationSchema: validateSchema,
    validate: values => validateValues(values),
    onSubmit: async (values, { resetForm }) => {
      await signUp(values.email, values.password)
        .then(() => {
          resetForm()
          navigate('/personal-account')
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              showConfirmButton: false,
              text: 'El correo electrónico ya está en uso'
            })
          } else {
            Swal.fire({
              timer: 1500,
              icon: 'error',
              title: 'Oops...',
              showConfirmButton: false,
              text: 'No se pudo crear el usuario'
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

  return (
    <Fragment>
      <div className='w-full xl:w-2/4 bg-white min-h-screen flex flex-col justify-center items-center'>
        <div className='w-full max-w-[560px] px-4 m-auto'>
          <div className='flex justify-end items-center mb-6 xl:mb-8'>
            <p className='text-sky-gray-50'>
              Tengo una cuenta!{' '}
              <span
                className='text-sky-blue-70 cursor-pointer hover:text-sky-blue-80'
                onClick={() => {
                  navigate('/')
                }}
              >
                Iniciar sesión
              </span>
            </p>
          </div>
          <div className='mb-4 sm:mb-6'>
            <h1 className='font-semibold text-black text-4xl'>
              Crea tu cuenta
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
                }}
                className='w-full border solid border-sky-gray-40 py-3 px-6 rounded-full outline-none text-base placeholder:text-sky-gray-30'
              />
              <span
                className={`material-icons text-sky-gray-50 text-[25px] cursor-pointer absolute top right-5 transform translate-y-[40px]`}
              >
                person
              </span>
              {formik.touched.email && formik.errors.email && (
                <span className='text-sm text-sky-red-90 px-2'>
                  {formik.errors?.email}
                </span>
              )}
            </div>
            <div className='w-full flex flex-col gap-1 relative'>
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
                {formik.touched.password && formik.errors.password && (
                  <span className='text-sm text-sky-red-90 px-2'>
                    {formik.errors?.password}
                  </span>
                )}
              </div>
            </div>
            <div className='w-full flex flex-col gap-1 relative mb-8'>
              <label
                htmlFor='confirmPassword'
                className='text-black text-base font-bold'
              >
                Confirmar contraseña
              </label>
              <div className='relative'>
                <input
                  id='confirmPassword'
                  placeholder='************'
                  {...formik.getFieldProps('confirmPassword')}
                  value={formik.values.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.handleChange(e)
                  }}
                  type={viewConfirmPassword ? 'text' : 'password'}
                  className='w-full border solid border-sky-gray-40 py-3 px-6 rounded-full outline-none text-base placeholder:text-sky-gray-30'
                />
                <span
                  className={`material-icons text-sky-gray-50 text-[25px] cursor-pointer absolute top right-5 transform translate-y-[50%]`}
                  onClick={() => {
                    setViewConfirmPassword(!viewConfirmPassword)
                  }}
                >
                  {viewConfirmPassword ? 'visibility_off' : 'visibility'}
                </span>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <span className='text-sm text-sky-red-90 px-2'>
                      {formik.errors?.confirmPassword}
                    </span>
                  )}
              </div>
            </div>
            <button
              type='submit'
              disabled={isValid || !formik.isValid}
              className={`w-full bg-[#2196F3] hover:bg-[#317cba] flex justify-center items-center text-white text-base py-[12px] px-12 gap-4 rounded-full shadow-sky-buttons font-semibold disabled:opacity-80 ${
                isValid && 'cursor-not-allowed'
              }`}
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
      <div className='linear-gradient-sign w-2/4 h-full min-h-screen hidden xl:block' />
    </Fragment>
  )
}

export default SignUp
