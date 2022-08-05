import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  projectStarDataAddItemAction,
  projectStarDataFetchAction,
} from './actions'
import { Galaxy, Overlay } from './components'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(projectStarDataFetchAction.request())
    // dispatch(projectStarDataAddItemAction({ name: 'One', isPortfolio: true }))
    // dispatch(projectStarDataAddItemAction({ name: 'Two', isPortfolio: true }))

    // dispatch(
    //   projectStarDataAddItemAction({
    //     name: 'My Profile',
    //     isPortfolio: true,
    //     isProfile: true,
    //   })
    // )
  }, [dispatch])

  return (
    <div>
      <Galaxy />
      <Overlay />
    </div>
  )
}

export default App
