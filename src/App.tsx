import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { projectStarDataAddItemAction } from './actions'
import { Galaxy, Overlay } from './components'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(projectStarDataAddItemAction({ name: 'First' }))
    dispatch(projectStarDataAddItemAction({ name: 'Second' }))
    dispatch(projectStarDataAddItemAction({ name: 'Third' }))
  }, [dispatch])

  return (
    <div className="App">
      <Galaxy />
      <Overlay />
    </div>
  )
}

export default App
