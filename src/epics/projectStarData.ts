import { projectStarDataFetchAction } from './../actions'
import { isActionOf } from 'typesafe-actions'
import { filter, from, mergeMap, of } from 'rxjs'
import { AppEpic } from '../types'

console.log(process.env.REACT_APP_GITHUB_TOKEN)

export const projectStarDataFetchEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(projectStarDataFetchAction.request)),
    mergeMap(() =>
      from(
        fetch(process.env.REACT_APP_REPOS_URL as string, {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN || ''}`,
          },
        })
      ).pipe(
        mergeMap((res) =>
          from(res.json()).pipe(
            mergeMap((data) => of(projectStarDataFetchAction.success(data)))
          )
        )
      )
    )
  )
