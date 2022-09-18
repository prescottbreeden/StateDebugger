import React from 'react'
import { StateDebugger } from '../components/StateDebugger.component'
import {Query} from '../service'

export const Ex3: React.FC = () => {
  const [results, setResults] = React.useState({})
  React.useEffect(() => {
    Query({})
      .then((res: any) => setResults(res))
      .catch(() => console.log('ruh roh'))
  }, [])
  return (
    <>
      <h1>What's going on with my API Data?</h1>
      <StateDebugger state={results} />
    </>
  )
}
