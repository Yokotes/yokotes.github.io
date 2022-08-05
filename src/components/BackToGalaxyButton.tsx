import { Button, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { projectStarDataSetCurrentItemAction } from '../actions'
import { useCoreContext } from '../contexts'
import { backToGalaxy } from '../helpers'
import { projectStarDataCurrentItemSelector } from '../selectors'

const useStyles = makeStyles<Theme, { show: boolean }>((theme) => ({
  button: {
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: '1.3rem',
    position: 'absolute',
    top: 0,
    right: 0,
    textShadow: ` -1px -1px 0 #000,
    0   -1px 0 #000,
    1px -1px 0 #000,
    1px  0   0 #000,
    1px  1px 0 #000,
    0    1px 0 #000,
   -1px  1px 0 #000,
   -1px  0   0 #000`,
    color: 'white',
    cursor: 'pointer',
    zIndex: theme.zIndex.tooltip,

    transition: 'opacity 0.75s 1s',
    pointerEvents: ({ show }) => (show ? 'all' : 'none'),
    opacity: ({ show }) => (show ? 1 : 0),
  },
}))

export const BackToGalaxyButton = () => {
  const { camera, controls } = useCoreContext()
  const currentStar = useSelector(projectStarDataCurrentItemSelector)
  const classes = useStyles({ show: !!currentStar })
  const dispatch = useDispatch()

  const handleClick = () => {
    backToGalaxy(camera, controls, () =>
      dispatch(projectStarDataSetCurrentItemAction(null))
    )
  }

  return (
    <Button variant="text" className={classes.button} onClick={handleClick}>
      Back to the Galaxy
    </Button>
  )
}
