import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { projectStarDataCurrentItemSelector } from '../selectors'

const useStyles = makeStyles<Theme, { hide: boolean }>({
  container: {
    transition: 'opacity 0.5s 1s',
    pointerEvents: ({ hide }) => (hide ? 'none' : 'auto'),
    opacity: ({ hide }) => (hide ? 0 : 1),
  },
})

export const LabelsContainer = () => {
  const currentStar = useSelector(projectStarDataCurrentItemSelector)
  const classes = useStyles({ hide: !!currentStar })

  return <div id="star-labels-container" className={classes.container}></div>
}
