import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { User } from '../../types/user'
import { useAuth } from '../../hooks/useAuth'
import { useStep } from '../../hooks/useStep'
import { getUser, updateUser } from '../../utils/firebaseFunctions'
import Swal from 'sweetalert2'

export const Location = () => {
  const { user, setUser } = useAuth()
  const { prevStep, nextStep } = useStep()
  const [values, setValues] = useState<User>({
    zipCode: '',
    address: ''
  })
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const validateSchema = Yup.object({
    address: Yup.string()
      .required('La dirección es requerida')
      .max(200, 'Solo se permiten 245 caracteres'),
    zipCode: Yup.string()
      .required('El código postal es requerido')
      .max(10, 'Solo se permiten 10 caracteres')
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
            console.log('🚀 ~ file: index.tsx:82 ~ data user send', data)
            Swal.fire({
              icon: 'success',
              title: '¡Genial!',
              text: 'Se ha guardado tu información',
              showConfirmButton: false,
              timer: 1500
            })
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
      zipCode: user.zipCode ? String(user.zipCode) : '',
      address: user.address ? String(user.address) : ''
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
      onSubmit={formik.handleSubmit}
      className='flex w-full flex-col'
    >
      <div className='mb-4 w-full border-b solid pb-2'>
        <span className='text-base font-bold'>Localización</span>
      </div>
      <div className='flex flex-col lg:flex-row lg:gap-10'>
        {/* First Form */}
        <div className='w-full xl:min-w-[320px]'>
          <div
            className={`${
              formik.errors?.address && formik.touched?.address
                ? 'mb-2'
                : 'mb-4'
            } relative`}
          >
            <span className='font-bold text-base'>Dirección</span>
            <textarea
              rows={4}
              {...formik.getFieldProps('address')}
              name='address'
              value={formik.values.address}
              onChange={e => {
                const res = /^[a-zA-Z0-9\s\-\\#\\.]+$/
                const numberCharacter = e.target.value.length
                if (e.target.value === '' || res.test(e.target.value)) {
                  if (numberCharacter <= 200) {
                    setValues({
                      ...values,
                      address: e.target.value
                    })
                    formik.handleChange(e)
                  }
                }
              }}
              className={`${
                formik.errors?.address &&
                formik.touched?.address &&
                'border-sky-red-90'
              } w-full border border-solid bg-white p-[17px] rounded-md max-h-[112px] outline-none `}
            />
            <span
              className={`material-icons text-sky-red-90 text-[20px] absolute top right-3 transform translate-y-[40%]`}
            >
              {formik.errors?.address && formik.touched?.address && 'error'}
            </span>
            {formik.errors?.address && formik.touched?.address && (
              <span
                className={`${
                  formik.errors?.address && 'text-sky-red-90'
                } text-sm`}
              >
                {formik.errors?.address}
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
            <span className='font-bold text-[15px]'>Zip Code</span>
            <input
              type='text'
              {...formik.getFieldProps('zipCode')}
              name='zipCode'
              value={formik.values?.zipCode}
              className={`${
                formik?.errors?.zipCode &&
                formik?.touched?.zipCode &&
                'border-sky-red-90'
              } w-full border border-solid bg-white p-[17px] rounded-2xl h-[32px] outline-none`}
              onChange={e => {
                const res = /^[0-9]+$/
                const numberCharacters = e.target.value.length
                if (e.target.value === '' || res.test(e.target.value)) {
                  if (numberCharacters <= 16) {
                    setValues({
                      ...values,
                      zipCode: e.target.value
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
              {formik.errors?.zipCode && formik.touched?.zipCode && 'error'}
            </span>
            {formik.errors?.zipCode && formik.touched?.zipCode && (
              <span
                className={`${
                  formik.errors?.zipCode && 'text-sky-red-90'
                } text-sm`}
              >
                {formik.errors?.zipCode}
              </span>
            )}
          </div>
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
            Guardar
          </button>
        </div>
      </div>
    </form>
  )
}
