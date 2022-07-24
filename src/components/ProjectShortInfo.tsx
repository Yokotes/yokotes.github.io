import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { projectStarDataCurrentItemSelector } from '../selectors'

const useStyles = makeStyles((theme) => ({
  shortInfo: {
    color: 'white',
    position: 'absolute',
    top: 10,
    right: 10,
    padding: theme.spacing(2, 4),
    border: '1px solid white',
  },
}))

export const ProjectShortInfo = () => {
  const currentStar = useSelector(projectStarDataCurrentItemSelector)

  const classes = useStyles()
  return (
    <div className={classes.shortInfo}>
      {currentStar ? (
        <>
          <div>Name: {currentStar.name}</div>
          <div>Topics: {currentStar.topics.join(', ')}</div>
          <div>
            <a href={currentStar.url}>Link</a>
          </div>
        </>
      ) : (
        'Move cursor to a star'
      )}
    </div>
  )
}
