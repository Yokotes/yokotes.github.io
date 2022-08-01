import { Drawer, Grid, Link, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { projectStarDataCurrentItemSelector } from '../selectors'

const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor: 'rgba(30, 30, 30, 0.75)',
    color: 'white',
    padding: theme.spacing(4, 4, 2),
    pointerEvents: 'all',
    width: 500,
  },
  backdrop: {
    pointerEvents: 'none',
  },
  title: {
    fontSize: '2rem',
    marginBottom: theme.spacing(8),
  },
  subtitle: {
    fontSize: '1.4rem',
    textDecoration: 'underline',
    marginBottom: theme.spacing(2),
  },
  text: {
    fontSize: '1.1rem',
    marginBottom: theme.spacing(5),
  },
  link: {
    border: '2px solid #fff',
    display: 'inline-block',
    color: '#fff',
    fontSize: '1.2rem',
    padding: theme.spacing(2, 4),

    '&:hover': {
      textDecoration: 'none',
    },
  },
}))

export const ProjectInfoDrawer = () => {
  const currentStar = useSelector(projectStarDataCurrentItemSelector)
  const classes = useStyles()

  return (
    <Drawer
      anchor="left"
      open={!!currentStar}
      classes={{ paper: classes.drawer, modal: classes.backdrop }}
      hideBackdrop
    >
      <Typography variant="h1" className={classes.title}>
        {currentStar?.name}
      </Typography>
      <Typography variant="h2" className={classes.subtitle}>
        Description
      </Typography>
      <Typography variant="body2" className={classes.text}>
        {currentStar?.description}
      </Typography>
      <Typography variant="h2" className={classes.subtitle}>
        Topics
      </Typography>
      <Typography variant="body2" className={classes.text}>
        {currentStar?.topics.join(', ')}
      </Typography>

      <Grid container>
        <Grid item>
          <Link
            href={currentStar?.url}
            target="_blank"
            variant="body1"
            className={classes.link}
          >
            Open project
          </Link>
        </Grid>
      </Grid>
    </Drawer>
  )
}
