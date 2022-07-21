import { isActionOf } from 'typesafe-actions'
import { projectStarDataAddItemAction } from '../actions'
import { ProjectStarDataRecord } from '../records'

const initialState = new ProjectStarDataRecord()

export const projectStarData = (state = initialState, actions: any) => {
  if (isActionOf(projectStarDataAddItemAction, actions)) {
    return state.addItem(actions.payload)
  }

  return state
}
