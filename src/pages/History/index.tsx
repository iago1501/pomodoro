import { ReactNode } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useCycles } from '../../contexts/CyclesContext'

import { HistoryContainer, HistoryList, Status } from './styles'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function History() {
  const { cycles } = useCycles()

  function taskProgress(cycle: Cycle): ReactNode {
    if (cycle.finishedDate) {
      return <Status statusColor="green">Concluído</Status>
    }

    if (cycle.interruptedDate) {
      return <Status statusColor="red">Interrompido</Status>
    }

    return <Status statusColor="yellow">Em andamento</Status>
  }

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td> {taskProgress(cycle)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
