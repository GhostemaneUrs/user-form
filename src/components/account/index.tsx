import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { User } from '../../types/user'
import { useAuth } from '../../hooks/useAuth'
import { useStep } from '../../hooks/useStep'
import { useFormik } from 'formik'
import { getUser, updateUser } from '../../utils/firebaseFunctions'

export const Account = () => {
  const { user, setUser } = useAuth()
  const { prevStep, nextStep } = useStep()
  const [values, setValues] = useState<User>({
    email: '',
    phone: '',
    password: '',
    cellphone: '',
    confirmPassword: ''
  })
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const validateSchema = Yup.object({
    phone: Yup.string()
      .required('El teléfono es requerido')
      .max(15, 'Solo se permiten 15 caracteres'),
    cellphone: Yup.string()
      .required('El celular es requerido')
      .max(15, 'Solo se permiten 15 caracteres'),
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
    enableReinitialize: isLoaded,
    initialValues: values,
    validate: values => {
      validateValues(values)
    },
    validationSchema: validateSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateUser({
        ...user,
        ...values,
        step: 2
      }).then(() => {
        getUser(String(user.uid)).then(data => {
          if (data) {
            setUser(data)
            setIsLoaded(true)
            resetForm()
            nextStep()
          }
        })
      })
    }
  })

  const validateValues = (values: User, exception?: string) => {
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
    setValues({
      email: user.email ? String(user.email) : '',
      phone: user?.phone ? String(user.phone) : '',
      password: user?.password ? String(user.password) : '',
      cellphone: user?.cellphone ? String(user.cellphone) : '',
      confirmPassword: user?.confirmPassword ? String(user.confirmPassword) : ''
    })
    validateValues(values)
  }, [user, isLoaded])

  useEffect(() => {
    setIsLoaded(true)
    setTimeout(() => {
      setIsLoaded(false)
    }, 2000)
  }, [])

  return (
    <form
      noValidate
      autoComplete='off'
      className='flex w-full flex-col'
      onSubmit={formik.handleSubmit}
    >
      <div className='mb-4 w-full border-b solid pb-2'>
        <span className='text-base font-bold'>Cuenta</span>
      </div>
      <div className='flex flex-col lg:flex-row lg:gap-10'>
        {/* First Form */}
        <div className='w-full xl:min-w-[320px]'>
          <div
            className={`${
              formik.errors?.email && formik?.touched?.email ? 'mb-2' : 'mb-4'
            } relative`}
          >
            <span className='font-bold text-[15px]'>Correo electrónico</span>
            <input
              type='text'
              {...formik.getFieldProps('email')}
              name='email'
              value={formik.values?.email}
              className={`${
                formik?.errors?.email &&
                formik?.touched?.email &&
                'border-sky-red-90'
              } w-full border border-solid bg-white p-[17px] rounded-2xl h-[32px] outline-none`}
              onChange={e => {
                setValues({
                  ...values,
                  email: e.target.value
                })
                formik.handleChange(e)
              }}
            />
            <span
              className={`material-icons text-sky-red-90 text-[20px] absolute top right-3 transform translate-y-[40%]`}
            >
              {formik.errors?.email && formik.touched?.email && 'error'}
            </span>
            {formik.errors?.email && formik.touched?.email && (
              <span
                className={`${
                  formik.errors?.email && 'text-sky-red-90'
                } text-sm`}
              >
                {formik.errors?.email}
              </span>
            )}
          </div>
          <div
            className={`${
              formik.errors?.email && formik?.touched?.email ? 'mb-2' : 'mb-4'
            } relative`}
          >
            <span className='font-bold text-[15px]'>Contraseña</span>
            <input
              type='password'
              {...formik.getFieldProps('password')}
              name='password'
              value={formik.values?.password}
              className={`${
                formik?.errors?.password &&
                formik?.touched?.password &&
                'border-sky-red-90'
              } w-full border border-solid bg-white p-[17px] rounded-2xl h-[32px] outline-none`}
              onChange={e => {
                setValues({
                  ...values,
                  password: e.target.value
                })
                formik.handleChange(e)
              }}
            />
            <span
              className={`material-icons text-sky-red-90 text-[20px] absolute top right-3 transform translate-y-[40%]`}
            >
              {formik.errors?.password && formik.touched?.password && 'error'}
            </span>
            {formik.errors?.password && formik.touched?.password && (
              <span
                className={`${
                  formik.errors?.password && 'text-sky-red-90'
                } text-sm`}
              >
                {formik.errors?.password}
              </span>
            )}
          </div>
          <div
            className={`${
              formik.errors?.confirmPassword && formik?.touched?.confirmPassword
                ? 'mb-2'
                : 'mb-4'
            } relative`}
          >
            <span className='font-bold text-[15px]'>Confirmar contraseña</span>
            <input
              type='password'
              {...formik.getFieldProps('confirmPassword')}
              name='confirmPassword'
              value={formik.values?.confirmPassword}
              className={`${
                formik?.errors?.confirmPassword &&
                formik?.touched?.confirmPassword &&
                'border-sky-red-90'
              } w-full border border-solid bg-white p-[17px] rounded-2xl h-[32px] outline-none`}
              onChange={e => {
                setValues({
                  ...values,
                  confirmPassword: e.target.value
                })
                formik.handleChange(e)
              }}
            />
            <span
              className={`material-icons text-sky-red-90 text-[20px] absolute top right-3 transform translate-y-[40%]`}
            >
              {formik.errors?.confirmPassword &&
                formik.touched?.confirmPassword &&
                'error'}
            </span>
            {formik.errors?.confirmPassword &&
              formik.touched?.confirmPassword && (
                <span
                  className={`${
                    formik.errors?.confirmPassword && 'text-sky-red-90'
                  } text-sm`}
                >
                  {formik.errors?.confirmPassword}
                </span>
              )}
          </div>
        </div>
        {/* Second Form */}
        <div className='w-full xl:min-w-[320px]'>
          <div
            className={`${
              formik.errors?.phone && formik?.touched?.phone ? 'mb-2' : 'mb-4'
            } relative`}
          >
            <span className='font-bold text-[15px]'>Numero de teléfono</span>
            <input
              type='text'
              {...formik.getFieldProps('phone')}
              name='phone'
              value={formik.values?.phone}
              className={`${
                formik?.errors?.phone &&
                formik?.touched?.phone &&
                'border-sky-red-90'
              } w-full border border-solid bg-white p-[17px] rounded-2xl h-[32px] outline-none`}
              onChange={e => {
                const res = /^[0-9]+$/
                const numberCharacters = e.target.value.length
                if (e.target.value === '' || res.test(e.target.value)) {
                  if (numberCharacters <= 16) {
                    setValues({
                      ...values,
                      phone: e.target.value
                    })
                    formik.handleChange(e)
                    return
                  }
                }
              }}
            />
            <span
              className={`material-icons text-sky-red-90 text-[20px] absolute top right-3 transform translate-y-[40%]`}
            >
              {formik.errors?.phone && formik.touched?.phone && 'error'}
            </span>
            {formik.errors?.phone && formik.touched?.phone && (
              <span
                className={`${
                  formik.errors?.phone && 'text-sky-red-90'
                } text-sm`}
              >
                {formik.errors?.phone}
              </span>
            )}
          </div>
          <div
            className={`${
              formik.errors?.phone && formik?.touched?.phone ? 'mb-2' : 'mb-4'
            } relative`}
          >
            <span className='font-bold text-[15px]'>Celular</span>
            <input
              type='text'
              {...formik.getFieldProps('cellphone')}
              name='cellphone'
              value={formik.values?.cellphone}
              className={`${
                formik?.errors?.cellphone &&
                formik?.touched?.cellphone &&
                'border-sky-red-90'
              } w-full border border-solid bg-white p-[17px] rounded-2xl h-[32px] outline-none`}
              onChange={e => {
                const res = /^[0-9]+$/
                const numberCharacters = e.target.value.length
                if (e.target.value === '' || res.test(e.target.value)) {
                  if (numberCharacters <= 16) {
                    setValues({
                      ...values,
                      cellphone: e.target.value
                    })
                    formik.handleChange(e)
                    return
                  }
                }
              }}
            />
            <span
              className={`material-icons text-sky-red-90 text-[20px] absolute top right-3 transform translate-y-[40%]`}
            >
              {formik.errors?.cellphone && formik.touched?.cellphone && 'error'}
            </span>
            {formik.errors?.cellphone && formik.touched?.cellphone && (
              <span
                className={`${
                  formik.errors?.cellphone && 'text-sky-red-90'
                } text-sm`}
              >
                {formik.errors?.cellphone}
              </span>
            )}
          </div>
          {isValid && (
            <div className='mb-5'>
              <span className='font-bold text-base'>
                Todos los campos son obligatorios
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Buttons */}
      <div className='flex flex-col lg:flex-row gap-4 mt-auto justify-end w-full'>
        <div className='w-full lg:max-w-[185px]'>
          <button
            onClick={() => {
              prevStep()
            }}
            className={`bg-[#4083b9] hover:bg-[#317cba] text-white text-xl font-medium w-full rounded-[30px] h-[42px] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Atrás
          </button>
        </div>
        <div className='w-full lg:max-w-[185px]'>
          <button
            type='submit'
            disabled={isValid || !formik.isValid}
            className={`bg-[#2196F3] hover:bg-[#317cba] text-white text-xl font-medium w-full rounded-[30px] h-[42px] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </form>
  )
}
