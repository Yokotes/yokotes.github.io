import { useEffect, useMemo } from 'react'
import {
  CircleBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  Points,
  RingBufferGeometry,
  TextureLoader,
} from 'three'
import { v4 } from 'uuid'
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

  useEffect(() => {
    galaxy.remove(bgCircle)
    galaxy.add(bgCircle)

    const { x, y, z } = position
    bgCircle.position.set(x, y, z)
  }, [bgCircle, position, galaxy, borderCircle, star])

  useRenderLoop(
    () => {
      bgCircle.lookAt(camera.position)
    },
    `${bgCircle.id}_update`,
    [bgCircle, camera]
  )

  return null
}
