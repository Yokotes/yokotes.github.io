import { isActionOf } from 'typesafe-actions'
import {
  projectStarDataAddItemAction,
  projectStarDataSetItemIsRendered,
  projectStarDataSetCurrentItemAction,
  projectStarDataClearCurrentItemAction,
} from '../actions'
import { ProjectStarDataRecord } from '../records'

const initialState = new ProjectStarDataRecord()

export const projectStarData = (state = initialState, actions: any) => {
  if (isActionOf(projectStarDataAddItemAction, actions)) {
    return state.addItem(actions.payload)
  }

  if (isActionOf(projectStarDataSetItemIsRendered, actions)) {
    const { id, isRendered } = actions.payload

    return state.setItemIsRendered(id, isRendered)
  }

  if (isActionOf(projectStarDataSetCurrentItemAction, actions)) {
    return state.setCurrentStar(actions.payload)
  }

  if (isActionOf(projectStarDataClearCurrentItemAction, actions)) {
    return state.clearCurrentStar()
  }

  return state
}
