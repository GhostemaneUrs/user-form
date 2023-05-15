import { useContext, useEffect } from 'react'
import { StepsContext } from '../context/steps'

export const useStep = () => {
  const { steps, description, setSteps, setDescription } =
    useContext(StepsContext)

  const step = (step: number) => {
    setSteps(step)
  }

  const nextStep = () => setSteps(steps + 1)

  const prevStep = () => setSteps(steps - 1)

  const generateDescription = () => {
    switch (steps) {
      case 0:
        setDescription(
          'En este paso se recopilara toda su información personal, tenga presente que la recopilación de los mismos deben ser verificados con anticipación por usted.'
        )
        break
      case 1:
        setDescription(
          'En este paso se recopilara toda su información para la recuperación de su cuenta, tenga presente que la recopilación de los mismos deben ser verificados con anticipación por usted.'
        )
        break
      case 2:
        setDescription(
          'En este paso se recopilara toda la información de su ubicación, tenga presente que la recopilación de los mismos deben ser verificados con anticipación por usted.'
        )
        break
      default:
        setDescription('')
        break
    }
  }

  useEffect(() => {
    generateDescription()
  }, [steps])

  return {
    step,
    steps,
    nextStep,
    prevStep,
    description,
    setDescription
  }
}
