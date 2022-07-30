import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { RefObject } from 'react'
import { ProjectStarRecord } from '../records'

const useStyles = makeStyles((theme) => ({
  shortInfo: {
    position: 'absolute',
    top: 0,
    left: 0,
    color: 'white',
    cursor: 'pointer',
    width: 'fit-content',
    fontWeight: 'bold',
    textShadow: ` -1px -1px 0 #000,
     0   -1px 0 #000,
     1px -1px 0 #000,
     1px  0   0 #000,
     1px  1px 0 #000,
     0    1px 0 #000,
    -1px  1px 0 #000,
    -1px  0   0 #000`,
  },

  content: {
    fontSize: '1.5rem',
    // textDecoration: 'underline',

    // color: 'rgb(240, 240, 240)',
  },

  title: {
    fontSize: '1.1rem',
    textDecoration: 'underline',
  },
}))

interface Props {
  star: ProjectStarRecord
  onClick: () => void
}

export const ProjectShortInfo = React.forwardRef(
  ({ star, onClick }: Props, ref) => {
    const classes = useStyles()

    return (
      <Grid
        container
        direction="column"
        spacing={2}
        className={classes.shortInfo}
        ref={ref as RefObject<HTMLDivElement>}
        onClick={onClick}
      >
        <Grid item>
          {/* <Typography variant="body1" className={classes.title}>
          Name
        </Typography> */}
          <Typography variant="body1" className={classes.content}>
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
)
