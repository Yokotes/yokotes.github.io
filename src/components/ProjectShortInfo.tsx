import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useRef } from 'react'
import { ProjectStarRecord } from '../records'

const useStyles = makeStyles((theme) => ({
  shortInfo: {
    color: 'white',
    position: 'absolute',
    padding: theme.spacing(1),
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    width: 300,
  },

  content: {
    fontSize: '0.95rem',
    color: 'rgb(240, 240, 240)',
  },

  title: {
    fontSize: '1.1rem',
    textDecoration: 'underline',
  },
}))

interface Props {
  star: ProjectStarRecord
  position?: { x: number; y: number }
}

export const ProjectShortInfo = ({ star, position }: Props) => {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      className={classes.shortInfo}
      ref={ref}
      style={{
        left: (position?.x || 0) - 150,
        top: (position?.y || 0) - 40 - (ref.current?.clientHeight || 0),
      }}
    >
      <Grid item>
        <Typography variant="body1" className={classes.title}>
          Name
        </Typography>
        <Typography variant="body2" className={classes.content}>
          {star.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" className={classes.title}>
          Topics
        </Typography>
        <Typography variant="body2" className={classes.content}>
          {star.topics?.join(', ')}
        </Typography>
      </Grid>
    </Grid>
  )
}
