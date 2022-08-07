import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { ClockLoader } from 'react-spinners'

const useStyles = makeStyles<Theme, { loading?: boolean }>((theme) => ({
  stub: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black',
    color: 'white',
    transition: 'opacity 0.5s',
    opacity: ({ loading }) => (loading ? 1 : 0),
    pointerEvents: ({ loading }) => (loading ? 'auto' : 'none'),

    // To fix star labels overlow
    transform: 'translate(0px)',
  },

  text: {
    fontSize: '1.5rem',
  },
}))

interface Props {
  loading?: boolean
}

export const LoadingStub = ({ loading }: Props) => {
  const classes = useStyles({ loading })

  return (
    <Grid
      container
      className={classes.stub}
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={2}
    >
      <Grid item>
        <ClockLoader color="white" />
      </Grid>
      <Grid item>
        <Typography className={classes.text} variant="body1">
          Loading projects...
        </Typography>
      </Grid>
    </Grid>
  )
}
