import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useMemo, useRef } from 'react'
import { Vector3 } from 'three'
import { useCoreContext } from '../contexts'
import { convertPositionToScreen } from '../helpers'
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
  position?: Vector3
}

export const ProjectShortInfo = ({ star, position }: Props) => {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)
  const { camera } = useCoreContext()
  const pos = useMemo(
    () => position && convertPositionToScreen(position, camera),
    [camera, position]
  )

  const handleClick = () => {
    position && camera.lookAt(position)
  }

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      className={classes.shortInfo}
      ref={ref}
      style={{
        left: (pos?.x || 0) - 150,
        top: (pos?.y || 0) - 40 - (ref.current?.clientHeight || 0),
      }}
      onClick={handleClick}
    >
      <Grid item>
        {/* <Typography variant="body1" className={classes.title}>
          Name
        </Typography> */}
        <Typography variant="body2" className={classes.content}>
          {star.name}
        </Typography>
      </Grid>
      {/* <Grid item>
        <Typography variant="body1" className={classes.title}>
          Topics
        </Typography>
        <Typography variant="body2" className={classes.content}>
          {star.topics?.join(', ')}
        </Typography>
      </Grid> */}
    </Grid>
  )
}
