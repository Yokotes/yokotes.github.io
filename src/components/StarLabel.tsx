import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { RefObject } from 'react'
import ReactDOM from 'react-dom'
import { ProjectStarRecord } from '../records'

const useStyles = makeStyles({
  shortInfo: {
    position: 'absolute',
    top: 0,
    left: 0,
    color: 'white',
    // zIndex: 0,

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

    '&:hover': {
      opacity: '1 !important',
    },
  },

  content: {
    fontSize: '1.5rem',
    transition: 'transform 0.5s',

    '&:hover': {
      transform: 'scale(1.5)',
    },
  },

  title: {
    fontSize: '1.1rem',
    textDecoration: 'underline',
  },
})

interface Props {
  star: ProjectStarRecord
  onClick: () => void
}

export const StarLabel = React.forwardRef(({ star, onClick }: Props, ref) => {
  const classes = useStyles()

  return ReactDOM.createPortal(
    <Grid
      container
      direction="column"
      spacing={2}
      className={classes.shortInfo}
      ref={ref as RefObject<HTMLDivElement>}
      onClick={onClick}
    >
      <Grid item>
        <Typography variant="body1" className={classes.content}>
          {star.name}
        </Typography>
      </Grid>
    </Grid>,
    document.querySelector('#star-labels-container') as Element
  )
})
