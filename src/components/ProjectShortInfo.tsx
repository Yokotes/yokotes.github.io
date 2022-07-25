import { makeStyles, Theme } from '@material-ui/core'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { projectStarDataCurrentItemSelector } from '../selectors'

const useStyles = makeStyles<Theme, { selected: boolean }>((theme) => ({
  shortInfo: {
    color: 'white',
    position: 'absolute',
    padding: theme.spacing(2, 4),
    opacity: ({ selected }) => (selected ? 1 : 0),
    transition: 'transform 0.75s, opacity 0.75s',
    transform: ({ selected }) =>
      selected ? 'translateY(0)' : 'translateY(-20px)',
    backgroundColor: 'rgba(120, 120, 120, 0.85)',
    width: 300,
  },
}))

export const ProjectShortInfo = () => {
  const {
    object,
    position: { x, y },
  } = useSelector(projectStarDataCurrentItemSelector)
  const classes = useStyles({ selected: !!object })
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={classes.shortInfo}
      ref={ref}
      style={{
        left: x - 150,
        top: y - 50 - (ref.current?.clientHeight || 0),
      }}
    >
      <div>Name: {object?.name}</div>
      <div>Topics: {object?.topics?.join(', ')}</div>
    </div>
  )
}
