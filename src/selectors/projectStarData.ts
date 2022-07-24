import { createSelector } from 'reselect'
import { AppState } from '../types'

export const projectStarDataItemsSelector = createSelector(
  (state: AppState) => state.projectStarData,
  (projectStarData) => {
    if (projectStarData.isAllDisplayed) return projectStarData.items
    return projectStarData.items.filter((item) => item.isPortfolio)
  }
)

export const projectStarDataCurrentItemSelector = createSelector(
  (state: AppState) => state.projectStarData,
  (projectStarData) => projectStarData.currentStar
)
