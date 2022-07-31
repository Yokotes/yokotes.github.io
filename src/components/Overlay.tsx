import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { BackToGalaxyButton } from './BackToGalaxyButton'
import { LabelsContainer } from './LabelsContainer'
import { ProjectInfoDrawer } from './ProjectInfoDrawer'

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
  return (
    <Grid className={classes.container}>
      <LabelsContainer />
      <ProjectInfoDrawer />
      <BackToGalaxyButton />
    </Grid>
  )
}
