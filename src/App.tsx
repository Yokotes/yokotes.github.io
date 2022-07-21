import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { projectStarDataAddItemAction } from './actions'
import { Galaxy } from './components'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(projectStarDataAddItemAction({}))
    dispatch(projectStarDataAddItemAction({}))
    dispatch(projectStarDataAddItemAction({}))
  }, [dispatch])

  return (
    <div className="App">
      <Galaxy count={70000} />
    </div>
  )
}

export default App
