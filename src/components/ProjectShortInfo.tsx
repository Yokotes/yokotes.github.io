import { CircularProgress, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)
  const currentStar = useSelector(projectStarDataCurrentItemSelector)

  useEffect(() => {
    if (!currentStar) return

    setIsLoading(true)
    const timerId = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [currentStar])

  const classes = useStyles()
  return (
    <div className={classes.shortInfo}>
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <div>{currentStar ? currentStar.name : 'Move cursor to the star'} </div>
      )}
    </div>
  )
}
