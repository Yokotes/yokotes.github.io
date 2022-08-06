import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles<Theme, { hidden?: boolean }>((theme) => ({
  starName: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    cursor: 'pointer',
    pointerEvents: 'auto',
    transition: 'opacity 0.5s',
    opacity: ({ hidden }) => (hidden ? 0 : 1),
    zIndex: theme.zIndex.drawer,
    fontSize: '2.5rem',
    borderBottom: '2px solid white',
    paddingBottom: theme.spacing(1),
    textShadow: ` -1px -1px 0 #000,
    0   -1px 0 #000,
    1px -1px 0 #000,
    1px  0   0 #000,
    1px  1px 0 #000,
    0    1px 0 #000,
   -1px  1px 0 #000,
   -1px  0   0 #000`,
  },
}))

interface Props {
  name?: string
  hidden?: boolean
  onClick: () => void
}

export const ProjectStarName = ({ name, onClick, hidden }: Props) => {
  const classes = useStyles({ hidden })

  return (
    <Typography variant="h1" onClick={onClick} className={classes.starName}>
      {name}
    </Typography>
  )
}
