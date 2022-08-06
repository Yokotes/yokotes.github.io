import { Drawer, Grid, Link, makeStyles, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { projectStarDataCurrentItemSelector } from '../selectors'
import { ProjectStarName } from './ProjectStarName'

const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor: 'rgba(30, 30, 30, 0.75)',
    color: 'white',
    padding: theme.spacing(4, 4, 2),
    pointerEvents: 'auto',
    maxWidth: 500,
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
  const [isOpen, setIsOpen] = useState(true)
  const classes = useStyles()

  const toggleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    setIsOpen(true)
  }, [currentStar])

  return (
    <>
      <Drawer
        anchor="left"
        open={!!currentStar && isOpen}
        classes={{ paper: classes.drawer }}
        onClose={toggleDrawer}
        BackdropProps={{
          style: { opacity: 0 },
        }}
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
      <ProjectStarName
        name={currentStar?.name}
        hidden={isOpen}
        onClick={toggleDrawer}
      />
    </>
  )
}
