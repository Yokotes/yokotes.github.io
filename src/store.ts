import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import * as reducers from './reducers'
import * as epics from './epics'

const rootReducer = combineReducers(reducers)
const epicMiddleware = createEpicMiddleware()
const rootEpic = combineEpics(
  ...Object.keys(epics).map((item) => (epics as Record<string, any>)[item])
)

export const store = configureStore({
  reducer: rootReducer,
  devTools: false,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      epicMiddleware
    )
  },
})

epicMiddleware.run(rootEpic)
