import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { projectStarDateIsLoadingSelector } from '../selectors'
import { BackToGalaxyButton } from './BackToGalaxyButton'
import { LabelsContainer } from './LabelsContainer'
import { LinksContainer } from './LinksContainer'
import { LoadingStub } from './LoadingStub'
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
  const isLoading = useSelector(projectStarDateIsLoadingSelector)
  const classes = useStyles()

  return (
    <Grid className={classes.container} id="overlay">
      <LabelsContainer />
      <ProjectInfoDrawer />
      <BackToGalaxyButton />
      <LinksContainer />
      <LoadingStub loading={isLoading} />
    </Grid>
  )
}
