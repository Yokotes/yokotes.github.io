import { makeStyles } from '@material-ui/core'
import React, { useEffect, useMemo, useState } from 'react'
import {
  BufferGeometry,
  Color,
  BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  Points,
  TextureLoader,
  Clock,
} from 'three'

import { useCoreContext } from '../contexts'

interface Props {
  count: number
}

const parameters = {
  size: 0.015,
  radius: 5,
  branches: 8,
  spin: 0.6,
  randomness: 0.3,
  randomnessPower: 3,
  insideColor: '#ff6030',
  outsideColor: '#1b3984',
}

const useStyles = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
  },
})

function generateGalaxy(count: number) {
  const geometry = new BufferGeometry()
  const textureLoader = new TextureLoader()
  const shape = textureLoader.load('/shape.png')

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  const colorInside = new Color(parameters.insideColor)
  const colorOutside = new Color(parameters.outsideColor)

  for (let i = 0; i < count; i++) {
    //Position
    const x = Math.random() * parameters.radius
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * 2 * Math.PI
    const spinAngle = x * parameters.spin

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1)
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1)
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1)

    positions[i * 3] = Math.sin(branchAngle + spinAngle) * x + randomX
    positions[i * 3 + 1] = randomY
    positions[i * 3 + 2] = Math.cos(branchAngle + spinAngle) * x + randomZ

    //Color

    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, x / parameters.radius)

    colors[i * 3 + 0] = mixedColor.r
    colors[i * 3 + 1] = mixedColor.g
    colors[i * 3 + 2] = mixedColor.b
  }

  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('color', new BufferAttribute(colors, 3))

  const material = new PointsMaterial({
    color: 'white',
    size: parameters.size,
    depthWrite: false,
    sizeAttenuation: true,
    blending: AdditiveBlending,
    vertexColors: true,
    transparent: true,
    alphaMap: shape,
  })

  const points = new Points(geometry, material)

  return points
}

export const Galaxy = ({ count }: Props) => {
  const classes = useStyles()
  const { scene, useRenderLoop } = useCoreContext()
  const [points, setPoints] = useState<Points>(new Points())
  const clock = useMemo(() => new Clock(), [])

  useEffect(() => {
    setPoints(generateGalaxy(count))
  }, [count])

  useEffect(() => {
    scene.add(points)

    return () => {
      scene.remove(points)
    }
  }, [points, scene])

  useRenderLoop(
    () => {
      points.rotation.y = clock.getElapsedTime() * 0.3
    },
    'galaxy',
    [points, clock]
  )

  return <div id="scene-container" className={classes.container}></div>
}
