import { isActionOf } from 'typesafe-actions'
import {
  projectStarDataAddItemAction,
  projectStarDataSetItemIsRendered,
  projectStarDataSetCurrentItemAction,
  projectStarDataClearCurrentItemAction,
  projectStarDataFetchAction,
} from '../actions'
import { ProjectStarDataRecord, ProjectStarParams } from '../records'
import { AppActions } from '../types'

const initialState = new ProjectStarDataRecord()

export const projectStarData = (state = initialState, actions: AppActions) => {
  if (isActionOf(projectStarDataFetchAction.success, actions)) {
    const starsData = actions.payload.map((rawData) => ({
      name: rawData.name,
      url: rawData.html_url,
      topics: rawData.topics,
      isPortfolio: rawData.topics.includes('portfolio'),
    })) as ProjectStarParams[]

    return state.fillItems(starsData)
  }

  if (isActionOf(projectStarDataAddItemAction, actions)) {
    return state.addItem(actions.payload)
  }

  if (isActionOf(projectStarDataSetItemIsRendered, actions)) {
    const { id, isRendered } = actions.payload

    return state.setItemIsRendered(id, isRendered)
  }

  if (isActionOf(projectStarDataSetCurrentItemAction, actions)) {
    const { id, position } = actions.payload
    return state.setCurrentStar(id, position)
  }

  if (isActionOf(projectStarDataClearCurrentItemAction, actions)) {
    return state.clearCurrentStar()
  }

  return state
}
