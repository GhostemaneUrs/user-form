import * as Yup from 'yup'
import moment from 'moment'
import Select from 'react-select'
import { useFormik } from 'formik'
import { User } from '../../types/user'
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { storage } from '../../services/firebase'
import { useStep } from '../../hooks/useStep'
import { ref, uploadBytes } from 'firebase/storage'
import { FileUploader } from 'react-drag-drop-files'
import { customSelect } from '../../utils/reactSelect'
import { documentType, genders } from '../../constants/selects'
import { getUser, updateUser } from '../../utils/firebaseFunctions'

export const Personal = () => {
  const { nextStep } = useStep()
  const { user, setUser } = useAuth()
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [countries, setCountries] = useState<Record<string, string>[]>([])

  const [values, setValues] = useState<User>({
    uid: '',
    name: '',
    gender: '',
    country: '',
    lastName: '',
    birthDate: '',
    documentType: '',
    documentNumber: '',
    urlPhotoBack: '',
    namePhotoBack: '',
    namePhotoFront: '',
    urlPhotoFront: ''
  })

  const validateSchema = Yup.object({
    name: Yup.string()
      .required('El nombre es requerido')
      .max(30, 'Solo se permiten 30 caracteres'),
    gender: Yup.string().required('El genero es requerido'),
    lastName: Yup.string()
      .required('El apellido requerido')
      .max(30, 'Solo se permiten 30 caracteres'),
    country: Yup.string().required('El país es obligatorio'),
    documentType: Yup.string().required('El tipo de documento es obligatorio'),
    documentNumber: Yup.string()
      .required('El numero de documento es requerido')
      .min(5, 'Debe tener al menos 5 caracteres')
      .max(20, 'Solo se permiten 20 caracteres'),
    birthDate: Yup.string()
      .required('La fecha de nacimiento es requerida')
      .test(
        'birthDate',
        'Solo se permiten mayores de 18 años',
        (value, error) => {
          const validate = moment().diff(moment(value), 'years') >= 18
          return !validate ? error.createError() : validate
        }
      )
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
        ...values,
        step: 1
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
      uid: String(user?.uid) || '',
      name: user?.name ? String(user?.name) : '',
      gender: user?.gender ? String(user?.gender) : '',
      country: user?.country ? String(user?.country) : '',
      lastName: user?.lastName ? String(user?.lastName) : '',
      birthDate: user?.birthDate ? String(user?.birthDate) : '',
      documentType: user?.documentType ? String(user?.documentType) : '',
      namePhotoBack: user?.namePhotoBack ? String(user?.namePhotoBack) : '',
      namePhotoFront: user?.namePhotoFront ? String(user?.namePhotoFront) : '',
      documentNumber: user?.documentNumber ? String(user?.documentNumber) : ''
    })
    validateValues(values)
  }, [user, isLoaded])

  useEffect(() => {
    setIsLoaded(true)
    setTimeout(() => {
      setIsLoaded(false)
    }, 2000)
  }, [])

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all', {
      method: 'GET'
    }).then(response => {
      response.json().then(data => {
        const countries = data.map((item: any, index: number) => {
          return {
            id: index + 1,
            flag: item?.flag,
            name: item?.translations?.spa?.common
          }
        })
        setCountries(countries)
      })
    })
  }, [])

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      className='flex w-full flex-col h-full'
    >
      <div className='mb-4 w-full border-b solid pb-2'>
        <span className='text-lg font-bold'>Información Personal</span>
      </div>
      <div className='flex flex-col lg:flex-row lg:gap-10'>
        {/* First Form */}
        <div className='w-full xl:min-w-[320px]'>
          <div
            className={`${
              formik.errors?.name && formik?.touched?.name ? 'mb-2' : 'mb-4'
            } relative`}
          >
            <span className='font-bold text-[15px]'>Nombres</span>
            <input
              type='text'
              {...formik.getFieldProps('name')}
              name='name'
              value={formik.values?.name}
              className={`${
                formik?.errors?.name &&
                formik?.touched?.name &&
                'border-sky-red-90'
              } w-full border border-solid bg-white p-[17px] rounded-2xl h-[32px] outline-none`}
              onChange={e => {
                const res = /^[A-Za-z0-9? ,_-]+$/
                const numberCharacters = e.target.value.length
                if (e.target.value === '' || res.test(e.target.value)) {
                  if (numberCharacters <= 31) {
                    setValues({
                      ...values,
                      name: e.target.value
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
              {formik.errors?.name && formik.touched?.name && 'error'}
            </span>
            {formik.errors?.name && formik.touched?.name && (
              <span
                className={`${
                  formik.errors?.name && 'text-sky-red-90'
                } text-sm`}
              >
                {formik.errors?.name}
              </span>
            )}
          </div>
          <div
            className={`${
              formik.errors?.lastName && formik?.touched?.lastName
                ? 'mb-2'
                : 'mb-4'
            } relative`}
          >
            <span className='font-bold text-[15px]'>Apellidos</span>
            <input
              type='text'
              {...formik.getFieldProps('lastName')}
              name='lastName'
              value={formik?.values?.lastName}
              className={`${
                formik?.errors?.lastName &&
                formik?.touched?.lastName &&
                'border-sky-red-90'
              } w-full border border-solid bg-white p-[17px] rounded-2xl h-[32px] outline-none`}
              onChange={e => {
                const res = /^[A-Za-z0-9? ,_-]+$/
                const numberCharacters = e.target.value.length
                if (e.target.value === '' || res.test(e.target.value)) {
                  if (numberCharacters <= 31) {
                    setValues({
                      ...values,
                      lastName: e.target.value
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
              {formik.errors?.lastName && formik.touched?.lastName && 'error'}
            </span>
            {formik.errors?.lastName && formik.touched?.lastName && (
              <span
                className={`${
                  formik.errors?.lastName && 'text-sky-red-90'
                } text-sm`}
              >
                {formik.errors?.lastName}
              </span>
            )}
          </div>
          <div
            className={`${
              formik.errors?.gender && formik.touched?.gender ? 'mb-2' : 'mb-4'
            } relative`}
          >
            <span className='font-bold text-base'>Género</span>
            <Select
              {...formik.getFieldProps('gender')}
              name='gender'
              placeholder=''
              isSearchable={true}
              maxMenuHeight={210}
              className={`${
                formik.errors?.gender && formik.touched.gender
                  ? 'error-select'
                  : 'success-select'
              }`}
              styles={customSelect}
              value={genders
                ?.filter(x => x.id === Number(formik?.values?.gender))
                .map(x => ({
                  value: x?.id,
                  label: x?.name
                }))}
              options={genders?.map(x => ({
                value: x?.id,
                label: x?.name
              }))}
              onBlur={() => formik.setFieldTouched('gender', true, true)}
              onFocus={() => formik.setFieldTouched('gender', false, false)}
              onChange={(e: any) => {
                setValues({
                  ...values,
                  gender: e.value
                })
                formik.setFieldValue('gender', e.value)
              }}
            />
            <span
              className={`material-icons text-sky-red-90 text-[20px] absolute top right-7 top-[33px]`}
            >
              {formik.errors?.gender && formik.touched?.gender && 'error'}
            </span>
            {formik.errors?.gender && formik.touched.gender && (
              <span
                className={`${
                  formik.errors?.gender && 'text-sky-red-90'
                } text-sm`}
              >
                {formik.errors?.gender}
              </span>
            )}
          </div>
          <div
            className={`${
              formik.errors?.country && formik.touched?.country
                ? 'mb-2'
                : 'mb-4'
            } relative`}
          >
            <span className='font-bold text-base'>País</span>
            <Select
              {...formik.getFieldProps('country')}
              name='country'
              placeholder=''
              isSearchable={true}
              maxMenuHeight={130}
              className={`${
                formik.errors?.country && formik.touched.country
                  ? 'error-select'
                  : 'success-select'
              }`}
              styles={customSelect}
              value={countries
                ?.filter(x => Number(x?.id) === Number(values?.country))
                .map(x => ({
                  value: x?.id,
                  label: `${x?.name} ${x?.flag} `
                }))}
              options={countries?.map(x => ({
                value: x?.id,
                label: ` ${x?.name} ${x?.flag} `
              }))}
              onBlur={() => formik.setFieldTouched('country', true, true)}
              onFocus={() => formik.setFieldTouched('country', false, false)}
              onChange={(e: any) => {
                setValues({
                  ...values,
                  country: e.value
                })
                formik.setFieldValue('country', e.value)
              }}
            />
            <span
              className={`material-icons text-sky-red-90 text-[20px] absolute top right-7 top-[33px]`}
            >
              {formik.errors?.country && formik.touched?.country && 'error'}
            </span>
            {formik.errors?.country && formik.touched.country && (
              <span
                className={`${
                  formik.errors?.country && 'text-sky-red-90'
                } text-sm`}
              >
                {formik.errors?.country}
              </span>
            )}
          </div>
          <div
            className={`${
              formik.errors?.birthDate && formik.touched?.birthDate
                ? 'mb-2'
                : 'mb-4'
            } relative`}
          >
            <span className='font-bold text-base'>Fecha de nacimiento</span>
            <input
              type='date'
              {...formik.getFieldProps('birthDate')}
              name='birthDate'
              value={formik?.values?.birthDate}
              onChange={e => {
                setValues({
                  ...values,
                  birthDate: e.target.value
                })
                formik.handleChange(e)
              }}
              className={`${
                formik?.errors?.birthDate &&
                formik?.touched?.birthDate &&
                'border-sky-red-90'
              } w-full border border-solid bg-white p-[17px] rounded-2xl h-[32px] outline-none`}
            />
            <span
              className={`material-icons text-sky-red-90 text-[20px] absolute top right-10 transform translate-y-[40%]`}
            >
              {formik.errors?.birthDate && formik.touched?.birthDate && 'error'}
            </span>
            {formik.errors?.birthDate && formik.touched.birthDate && (
              <span
                className={`${
                  formik.errors?.birthDate && 'text-sky-red-90'
                } text-sm`}
              >
                {formik.errors?.birthDate}
              </span>
            )}
          </div>
        </div>
        {/* Second Form */}
        <div className='w-full xl:min-w-[320px]'>
          <div
            className={`${
              formik.errors?.documentType && formik.touched?.documentType
                ? 'mb-2'
                : 'mb-[15px]'
            } relative`}
          >
            <span className='font-bold text-base'>Tipo de documento</span>
            <Select
              {...formik.getFieldProps('documentType')}
              name='documentType'
              placeholder=''
              isSearchable={true}
              maxMenuHeight={210}
              className={`${
                formik.errors?.documentType && formik.touched.documentType
                  ? 'error-select'
                  : 'success-select'
              }`}
              styles={customSelect}
              value={documentType
                ?.filter(x => x.id === Number(formik?.values?.documentType))
                .map(x => ({
                  value: x?.id,
                  label: x?.name
                }))}
              options={documentType?.map(x => ({
                value: x?.id,
                label: x?.name
              }))}
              onBlur={() => formik.setFieldTouched('documentType', true, true)}
              onFocus={() =>
                formik.setFieldTouched('documentType', false, false)
              }
              onChange={(e: any) => {
                setValues({
                  ...values,
                  documentType: e.value
                })
                formik.setFieldValue('documentType', e.value)
              }}
            />
            <span
              className={`material-icons text-sky-red-90 text-[20px] absolute top right-7 top-[33px]`}
            >
              {formik.errors?.documentType &&
                formik.touched?.documentType &&
                'error'}
            </span>
            {formik.errors?.documentType && formik.touched.documentType && (
              <span
                className={`${
                  formik.errors?.documentType && 'text-sky-red-90'
                } text-sm`}
              >
                {formik.errors?.documentType}
              </span>
            )}
          </div>
          <div
            className={`${
              formik.errors?.documentNumber && formik.touched?.documentNumber
                ? 'mb-2'
                : 'mb-4'
            } relative`}
          >
            <span className='font-bold text-base'>Numero de documento</span>
            <input
              type='text'
              {...formik.getFieldProps('custom:document_number')}
              name='documentNumber'
              value={formik.values?.documentNumber}
              onChange={e => {
                const res = /^[0-9]+$/
                const numberCharacters = e.target.value.length
                if (e.target.value === '' || res.test(e.target.value)) {
                  if (numberCharacters <= 21) {
                    formik.handleChange(e)
                    setValues({
                      ...values,
                      documentNumber: e.target.value
                    })
                    return
                  }
                }
              }}
              className={`${
                formik?.errors?.documentNumber &&
                formik?.touched?.documentNumber &&
                'border-sky-red-90'
              } w-full border border-solid bg-white p-[17px] rounded-2xl h-[32px] outline-none`}
            />
            <span
              className={`material-icons text-sky-red-90 text-[20px] absolute top right-3 transform translate-y-[40%]`}
            >
              {formik.errors?.documentNumber &&
                formik.touched?.documentNumber &&
                'error'}
            </span>
            {formik.errors?.documentNumber &&
              formik.touched?.documentNumber && (
                <span
                  className={`${
                    formik.errors?.documentNumber && 'text-sky-red-90'
                  } text-sm`}
                >
                  {formik.errors?.documentNumber}
                </span>
              )}
          </div>
          <div className='border-b solid mb-4' />
          <div className='mb-2'>
            <span className='font-bold text-base'>Foto documento (frente)</span>
            <div className='flex w-full items-center focus-visible:outline-none outline-none'>
              <FileUploader
                maxSize={25}
                handleChange={(e: File) => {
                  const storageRef = ref(storage, `documents/front/${user.uid}`)
                  uploadBytes(storageRef, e).then(snapshot => {
                    if (snapshot) {
                      updateUser({
                        ...values,
                        namePhotoFront: e.name
                      }).then(() => {
                        getUser(String(user.uid)).then(data => {
                          if (data) {
                            setUser(data)
                            setIsLoaded(true)
                          }
                        })
                      })
                    }
                  })
                }}
                types={['PDF', 'JPEG', 'JPG', 'PNG']}
                classes='w-full h-full focus-visible:outline-none outline-none'
              >
                <div className='flex items-center cursor-pointer focus-visible:outline-none outline-non e'>
                  <span className='text-black text-base h-full'>
                    {values?.namePhotoFront
                      ? values?.namePhotoFront
                      : 'Search file from computer'}
                  </span>
                  <div className='w-full max-w-[106px] ml-auto mt-auto'>
                    <button
                      type='button'
                      className={`bg-[#2196F3] hover:bg-[#317cba] text-white text-base font-medium w-full rounded-[20px] h-[32px] disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Subir
                    </button>
                  </div>
                </div>
              </FileUploader>
            </div>
          </div>
          <div className='border-b solid mb-4' />
          <div className='mb-5'>
            <span className='font-bold text-base'>Foto documento (atrás)</span>
            <div className='flex w-full items-center focus-visible:outline-none outline-none'>
              <FileUploader
                maxSize={25}
                handleChange={(e: File) => {
                  const storageRef = ref(storage, `documents/back/${user.uid}`)
                  uploadBytes(storageRef, e).then(snapshot => {
                    if (snapshot) {
                      updateUser({
                        ...values,
                        namePhotoBack: e.name
                      }).then(() => {
                        getUser(String(user.uid)).then(data => {
                          if (data) {
                            setUser(data)
                            setIsLoaded(true)
                          }
                        })
                      })
                    }
                  })
                }}
                types={['PDF', 'JPEG', 'JPG', 'PNG']}
                classes='w-full h-full focus-visible:outline-none outline-none'
              >
                <div className='flex items-center cursor-pointer focus-visible:outline-none outline-none'>
                  <span className='text-black text-base h-full'>
                    {values?.namePhotoBack
                      ? values?.namePhotoBack
                      : 'Search file from computer'}
                  </span>
                  <div className='w-full max-w-[106px] ml-auto mt-auto'>
                    <button
                      type='button'
                      className={`bg-[#2196F3] hover:bg-[#317cba] text-white text-base font-medium w-full rounded-[20px] h-[32px] disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Subir
                    </button>
                  </div>
                </div>
              </FileUploader>
            </div>
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
