import { useEffect, useMemo } from 'react'
import {
  CircleBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  Points,
} from 'three'
import { useCoreContext } from '../contexts'

interface Props {
  galaxy: Points
  position: {
    x: number
    y: number
    z: number
  }
}

export const ProjectStar = ({ position, galaxy }: Props) => {
  const { camera, useRenderLoop } = useCoreContext()
  const geometry = useMemo(() => new CircleBufferGeometry(0.1, 32), [])
  const material = useMemo(
    () => new MeshBasicMaterial({ color: new Color('#fff') }),
    []
  )
  const circle = useMemo(
    () => new Mesh(geometry, material),
    [geometry, material]
  )

  useEffect(() => {
    galaxy.remove(circle)
    galaxy.add(circle)

    const { x, y, z } = position
    circle.position.set(x, y, z)
  }, [circle, position, galaxy])

  useRenderLoop(
    () => {
      circle.lookAt(camera.position)
    },
    `${circle.id}_update`,
    [circle, camera]
  )

  return null
}
