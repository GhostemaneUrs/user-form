import { createContext, useState } from 'react'

interface StepsContextType {
  steps: number
  description: string
  setSteps: React.Dispatch<React.SetStateAction<number>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
}

interface StepsProviderType {
  children: React.ReactNode
}

export const StepsContext = createContext<StepsContextType>({
  steps: 0,
  description: '',
  setSteps: () => {},
  setDescription: () => {}
})

export const StepsProvider = ({ children }: StepsProviderType) => {
  const [steps, setSteps] = useState<number>(0)
  const [description, setDescription] = useState<string>('')

  return (
    <StepsContext.Provider
      value={{
        steps,
        setSteps,
        description,
        setDescription
      }}
    >
      {children}
    </StepsContext.Provider>
  )
}
