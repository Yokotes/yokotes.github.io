import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { projectStarDataFetchAction } from './actions'
import { Galaxy, Overlay } from './components'

function App() {
  const dispatch = useDispatch()
  console.log(process.env)

  useEffect(() => {
    dispatch(projectStarDataFetchAction.request())
  }, [dispatch])

  return (
    <div>
      <Galaxy />
      <Overlay />
    </div>
  )
}

export default App
