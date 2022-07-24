import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { projectStarDataFetchAction } from './actions'
import { Galaxy, Overlay } from './components'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(projectStarDataFetchAction.request())
  }, [dispatch])

  return (
    <div className="App">
      <Galaxy />
      <Overlay />
    </div>
  )
}

export default App
