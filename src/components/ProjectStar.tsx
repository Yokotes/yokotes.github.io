import { useEffect, useMemo } from 'react'
import {
  CircleBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Points,
  RingBufferGeometry,
  TextureLoader,
} from 'three'
import { v4 } from 'uuid'
import { PROJECT_STAR_MODEL } from '../constants'
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
  const model = useMemo(() => PROJECT_STAR_MODEL.clone(true), [])

  useEffect(() => {
    galaxy.remove(model)
    galaxy.add(model)

    const { x, y, z } = position
    model.position.set(x, y, z)
  }, [model, position, galaxy])

  useRenderLoop(
    () => {
      model.lookAt(camera.position)
    },
    `${model.id}_update`,
    [model, camera]
  )

  return null
}
