import { createSelector } from 'reselect'
import { AppState } from '../types'

export const projectStarDataItemsSelector = createSelector(
  (state: AppState) => state.projectStarData,
  (projectStarData) => projectStarData.items
)
