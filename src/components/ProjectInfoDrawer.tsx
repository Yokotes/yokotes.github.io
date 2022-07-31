import { Drawer, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { projectStarDataCurrentItemSelector } from '../selectors'

const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor: 'rgba(30, 30, 30, 0.75)',
    color: 'white',
    padding: theme.spacing(2, 4),
  },
}))

export const ProjectInfoDrawer = () => {
  const currentStar = useSelector(projectStarDataCurrentItemSelector)
  const classes = useStyles()

  return (
    <Drawer
      anchor="left"
      open={!!currentStar}
      classes={{ paper: classes.drawer }}
      hideBackdrop
    >
      <Typography variant="body1">{currentStar?.name}</Typography>
    </Drawer>
  )
}
