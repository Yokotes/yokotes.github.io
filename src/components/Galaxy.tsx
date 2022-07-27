import { makeStyles } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  BufferGeometry,
  Color,
  BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  Points,
  TextureLoader,
  Clock,
  Mesh,
} from 'three'
import { PARAMETERS } from '../constants'

import { useCoreContext } from '../contexts'
import { getRandomStartPosition } from '../helpers'
import { projectStarDataItemsSelector } from '../selectors'
import { ProjectStar } from './ProjectStar'

const {
  BRANCHES,
  COUNT,
  INSIDE_COLOR,
  OUTSIDE_COLOR,
  RADIUS,
  RANDOMNESS_POWER,
  SIZE,
  SPIN,
} = PARAMETERS

const useStyles = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
  },
})

function generateGalaxy() {
  const geometry = new BufferGeometry()
  const textureLoader = new TextureLoader()
  const shape = textureLoader.load('/images/shape.png')

  const positions = new Float32Array(COUNT * 3)
  const colors = new Float32Array(COUNT * 3)

  const colorInside = new Color(INSIDE_COLOR)
  const colorOutside = new Color(OUTSIDE_COLOR)

  for (let i = 0; i < COUNT; i++) {
    //Position
    const x = Math.random() * RADIUS
    const branchAngle = ((i % BRANCHES) / BRANCHES) * 2 * Math.PI
    const spinAngle = x * SPIN

    const {
      x: randomX,
      y: randomY,
      z: randomZ,
    } = getRandomStartPosition(RANDOMNESS_POWER)

    positions[i * 3] = Math.sin(branchAngle + spinAngle) * x + randomX
    positions[i * 3 + 1] = randomY
    positions[i * 3 + 2] = Math.cos(branchAngle + spinAngle) * x + randomZ

    //Color

    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, x / RADIUS)

    colors[i * 3 + 0] = mixedColor.r
    colors[i * 3 + 1] = mixedColor.g
    colors[i * 3 + 2] = mixedColor.b
  }

  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('color', new BufferAttribute(colors, 3))

  const material = new PointsMaterial({
    color: 'white',
    size: SIZE,
    depthWrite: false,
    sizeAttenuation: true,
    blending: AdditiveBlending,
    vertexColors: true,
    // transparent: true,
    map: shape,
  })

  const points = new Points(geometry, material)

  return points
}

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
    // scene.add(points)

    return () => {
      scene.remove(points)
    }
  }, [points, scene])

  useRenderLoop(
    () => {
      // points.rotation.y = clock.getElapsedTime() * 0.01
      if (controls.target.distanceTo(controls.object.position) <= 1) {
        ;(points.material as PointsMaterial).opacity =
          controls.target.distanceTo(controls.object.position)
      }
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
