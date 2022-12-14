import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { IconLink } from './IconLink'
import { GitHub, LinkedIn } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    zIndex: theme.zIndex.modal,
  },
}))

export const LinksContainer = () => {
  const classes = useStyles()

  return (
    <Grid className={classes.container}>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <IconLink
            icon={<LinkedIn fontSize="large" />}
            url="https://www.linkedin.com/in/yokotes/"
          />
        </Grid>
        <Grid item>
          <IconLink
            icon={<GitHub fontSize="large" />}
            url="https://github.com/Yokotes"
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
