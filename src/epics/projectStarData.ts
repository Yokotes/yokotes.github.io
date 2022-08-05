import { projectStarDataFetchAction } from './../actions'
import { isActionOf } from 'typesafe-actions'
import { filter, from, mergeMap, of } from 'rxjs'
import { AppEpic } from '../types'

export const projectStarDataFetchEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(projectStarDataFetchAction.request)),
    mergeMap(() =>
      from(
        fetch('https://api.github.com/users/yokotes/repos', {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
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
