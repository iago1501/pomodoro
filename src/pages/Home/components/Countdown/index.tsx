import { useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'

import { useCycles } from '../../../../contexts/CyclesContext'

import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  } = useCycles()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    if (!activeCycle) {
      return
    }

    const interval = setInterval(() => {
      const secondsDifference = differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      )

      if (secondsDifference < totalSeconds) {
        return setSecondsPassed(secondsDifference)
      }

      markCurrentCycleAsFinished()
      setSecondsPassed(secondsDifference)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (!activeCycle) {
      document.title = `Pomodoro App`
      return
    }

    document.title = `${minutes} : ${seconds}`
  }, [activeCycle, minutes, seconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
