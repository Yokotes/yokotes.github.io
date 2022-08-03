import { makeStyles } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { PointsMaterial, Points, Clock, Mesh } from 'three'

import { useCoreContext } from '../contexts'
import { generateGalaxy } from '../helpers'
import { projectStarDataItemsSelector } from '../selectors'
import { ProjectStar } from './ProjectStar'

const MIN_ZOOM = 0.25
const MAX_ZOOM = 7

const useStyles = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
  },
})

export const Galaxy = () => {
  const classes = useStyles()
  const { scene, useRenderLoop, controls } = useCoreContext()
  const [points, setPoints] = useState<Points>(new Points())
  const clock = useMemo(() => new Clock(), [])
  const projectStars = useSelector(projectStarDataItemsSelector)

  const handleProjectStarRender = useCallback(
    (model: Mesh) => {
      points.remove(model)
      points.add(model)
    },
    [points]
  )

  useEffect(() => {
    setPoints(generateGalaxy())
  }, [])

  useEffect(() => {
    scene.add(points)
    // points.layers.enable(1)
    points.layers.enable(1)
    return () => {
      scene.remove(points)
    }
  }, [points, scene])

  useRenderLoop(
    () => {
      const value = controls.target.distanceTo(controls.object.position)
      const normalizedValue = (value - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)
      ;(points.material as PointsMaterial).opacity = normalizedValue
    },
    'galaxy',
    [points, clock]
  )

  return (
    <>
      <div id="scene-container" className={classes.container}></div>
      {projectStars
        .toList()
        .toArray()
        .map((star) => (
          <ProjectStar
            key={star.id}
            onRender={handleProjectStarRender}
            star={star}
          />
        ))}
    </>
  )
}
