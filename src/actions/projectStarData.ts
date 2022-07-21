import { ProjectStarParams } from './../records/ProjectStar'
import { createAction } from 'typesafe-actions'

export const projectStarDataFillItemsAction = createAction(
  'project_star_data_fill_items'.toUpperCase(),
  (payload: ProjectStarParams[]) => payload
)()

export const projectStarDataAddItemAction = createAction(
  'project_star_data_add_item'.toUpperCase(),
  (payload: ProjectStarParams) => payload
)()
