import { StylesConfig } from 'react-select'

export const customSelect: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    fontSize: 16,
    height: '100%',
    padding: '5px 10px',
    color: '#110826',
    minHeight: '32px',
    cursor: 'pointer',
    backgroundColor: state.isDisabled
      ? '#FFFFFF'
      : state.isSelected
      ? '#F2F4F7'
      : state.isFocused
      ? '#F2F4F7'
      : '#FFFFFF',
    borderBottom: '1px solid #E4E9F0',
    ':hover': { backgroundColor: '#F2F4F7' }
  }),

  control: provided => ({
    ...provided,
    fontSize: 13,
    height: '36px',
    border: 'none',
    color: '#110826',
    display: 'flex',
    borderRadius: 30,
    boxShadow: 'none',
    minHeight: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  }),

  singleValue: provided => ({
    ...provided,
    fontSize: 16,
    fontWeight: 400,
    color: '#110826'
  }),

  container: provided => ({
    ...provided,
    ':hover': {
      borderColor: '#B0BEC5'
    },
    ':focus': {
      borderColor: ' #B0BEC5'
    },
    ':active': { borderColor: ' #B0BEC5' }
  }),

  menu: provided => ({
    ...provided,
    borderRadius: '10px',
    margin: '5px 0px 0px 0px'
  }),

  menuList: provided => ({
    ...provided,
    padding: 0,
    borderRadius: '10px',
    '::-webkit-scrollbar': {
      width: '4px'
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: '50px',
      backgroundColor: '#2196F3'
    },
    '::-webkit-scrollbar-track': {
      background: '#DFDFDF'
    },
    '::-webkit-scrollbar-track:hover': {
      background: '#2196F3'
    },
    '::-webkit-scrollbar-track:active': {
      background: '#2196F3'
    }
  }),

  dropdownIndicator: provided => ({
    ...provided,
    height: '100%',
    color: '#2196F3',
    minHeight: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      color: '#2196F3'
    }
  }),

  valueContainer: provided => ({
    ...provided,
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingLeft: '15px'
  }),

  placeholder: provided => ({
    ...provided,
    color: '#84808E',
    fontSize: '16px'
  }),

  input: provided => ({
    ...provided,
    margin: '0px',
    color: '#110826',
    fontSize: '16px'
  }),

  indicatorSeparator: () => ({
    display: 'none'
  }),

  indicatorsContainer: provided => ({
    ...provided,
    height: '100%',
    minHeight: '30px'
  })
}
