import { useEffect, useMemo } from 'react'
import {
  CircleBufferGeometry,
  Clock,
  Color,
  Mesh,
  MeshBasicMaterial,
  Points,
  RingBufferGeometry,
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
  const bgGeometry = useMemo(() => new CircleBufferGeometry(0.1, 32), [])
  const borderGeometry = useMemo(
    () => new RingBufferGeometry(0.1, 0.11, 32),
    []
  )
  const bgMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: new Color('black'),
      }),
    []
  )
  const borderMaterial = useMemo(() => {
    const material = bgMaterial.clone()
    material.color = new Color('#fff')

    return material
  }, [bgMaterial])
  const bgCircle = useMemo(
    () => new Mesh(bgGeometry, bgMaterial),
    [bgGeometry, bgMaterial]
  )
  const borderCircle = useMemo(
    () => new Mesh(borderGeometry, borderMaterial),
    [borderGeometry, borderMaterial]
  )

  useEffect(() => {
    galaxy.remove(bgCircle)
    galaxy.add(bgCircle)

    bgCircle.remove(borderCircle)
    bgCircle.add(borderCircle)

    const { x, y, z } = position
    bgCircle.position.set(x, y, z)
  }, [bgCircle, position, galaxy, borderCircle])

  useRenderLoop(
    () => {
      bgCircle.lookAt(camera.position)
    },
    `${bgCircle.id}_update`,
    [bgCircle, camera]
  )

  return null
}
