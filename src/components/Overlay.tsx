import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { ProjectShortInfo } from './ProjectShortInfo'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: 0,
  },
}))

export const Overlay = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.container}>
      <ProjectShortInfo />
    </Grid>
  )
}
