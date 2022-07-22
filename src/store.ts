import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import * as reducers from './reducers'

const rootReducer = combineReducers(reducers)

export const store = configureStore({ reducer: rootReducer, devTools: true })
