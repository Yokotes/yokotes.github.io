import { Epic } from 'redux-observable'
import { AppActions } from './AppActions'
import { AppState } from './AppState'

export type AppEpic = Epic<AppActions, AppActions, AppState>
