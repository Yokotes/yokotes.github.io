import { Link, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  link: {
    pointerEvents: 'all',
    color: 'lightgray',
    opacity: 0.5,
    transition: 'opacity 0.5s',

    '&:hover': {
      opacity: 1,
    },
  },
})

interface Props {
  icon: JSX.Element
  url: string
}

export const IconLink = ({ icon, url }: Props) => {
  const classes = useStyles()

  return (
    <Link target="_blank" href={url} className={classes.link}>
      {icon}
    </Link>
  )
}
