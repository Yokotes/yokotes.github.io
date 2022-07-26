import { ProjectStarParams } from './../records/ProjectStar'
import { createAction, createAsyncAction } from 'typesafe-actions'

export const projectStarDataFillItemsAction = createAction(
  'project_star_data_fill_items'.toUpperCase(),
  (payload: ProjectStarParams[]) => payload
)()

export const projectStarDataAddItemAction = createAction(
  'project_star_data_add_item'.toUpperCase(),
  (payload: ProjectStarParams) => payload
)()

export const projectStarDataFetchAction = createAsyncAction(
  'PROJECT_STAR_DATA_FETCH_REQUEST',
  'PROJECT_STAR_DATA_FETCH_SUCCESS',
  'PROJECT_STAR_DATA_FETCH_FAILURE'
)<undefined, [Record<string, any>[], undefined]>()

export const projectStarDataSetItemIsRendered = createAction(
  'project_star_data_set_item_is_rendered'.toUpperCase(),
  (payload: { id: string; isRendered: boolean }) => payload
)()

export const projectStarDataSetCurrentItemAction = createAction(
  'project_star_data_set_current_item'.toUpperCase(),
  (payload: string) => payload
)()

export const projectStarDataClearCurrentItemAction = createAction(
  'project_star_data_clear_current_item'.toUpperCase()
)()
