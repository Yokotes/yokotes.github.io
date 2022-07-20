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
  const bgGeometry = useMemo(() => new CircleBufferGeometry(0.1, 32), [])
  const borderGeometry = useMemo(
    () => new RingBufferGeometry(0.1, 0.11, 32),
    []
  )
  const bgMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: new Color('black'),
        depthWrite: false,
        transparent: true,
        opacity: 1,
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

  const starTexture = useMemo(
    () => new TextureLoader().load('/images/star.png'),
    []
  )
  const starMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        alphaMap: starTexture,
        depthWrite: false,
        transparent: true,
        opacity: 1,
      }),
    [starTexture]
  )
  const starGeomentry = useMemo(() => new CircleBufferGeometry(0.03), [])
  const star = useMemo(
    () => new Mesh(starGeomentry, starMaterial),
    [starGeomentry, starMaterial]
  )

  useEffect(() => {
    galaxy.remove(bgCircle)
    galaxy.add(bgCircle)

    bgCircle.renderOrder = 70001
    star.renderOrder = 70002

    bgCircle.remove(borderCircle)
    bgCircle.add(borderCircle)
    bgCircle.remove(star)
    bgCircle.add(star)

    bgCircle.name = `project_star_${v4()}`

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
