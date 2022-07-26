import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: 0,
    pointerEvents: 'none',
  },
}))

export const Overlay = () => {
  const classes = useStyles()
  return <Grid className={classes.container}>{/* <ProjectShortInfo /> */}</Grid>
}
