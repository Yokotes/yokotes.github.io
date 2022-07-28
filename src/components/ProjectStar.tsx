import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Mesh, Vector3 } from 'three'
import { projectStarDataSetItemIsRendered } from '../actions'
import { PARAMETERS, PROJECT_STAR_MODEL } from '../constants'
import { useCoreContext } from '../contexts'
import {
  convertPositionToScreen,
  getPointerModelName,
  getRandomProjectStarPosition,
  generatePointsCloud,
} from '../helpers'
import { ProjectStarRecord } from '../records'
import { ProjectShortInfo } from './ProjectShortInfo'

const { SPIN, BRANCHES, RADIUS } = PARAMETERS

interface Props {
  star: ProjectStarRecord
  onRender: (model: Mesh) => void
}

export const ProjectStar = ({ onRender, star }: Props) => {
  const { camera, scene } = useCoreContext()
  const model = useMemo(() => PROJECT_STAR_MODEL.clone(true), [])
  const [isHover, setIsHover] = useState(false)
  const [position, setPosition] = useState<Vector3>()
  const dispatch = useDispatch()

  // Hover callback
  const handleHover = useCallback(
    (e: MouseEvent) => {
      const object = getPointerModelName(
        e,
        [model, ...model.children.flat()],
        camera
      )

      if (isHover === !!object) return
      setIsHover(!!object)

      if (object) {
        return
      }
    },
    [camera, isHover, model]
  )

  useEffect(() => {
    // model.add(POINTS_CLOUD.clone())
  }, [model])

  // Change cursor when isHover === `true`
  useEffect(() => {
    if (isHover) {
      document.body.style.cursor = 'pointer'
      return
    }

    document.body.style.cursor = 'unset'
  }, [isHover])

  // Adding listener on hover
  useEffect(() => {
    window.addEventListener('mousemove', handleHover)

    return () => {
      window.removeEventListener('mousemove', handleHover)
    }
  }, [handleHover])

  // Render star in galaxy
  useEffect(() => {
    if (!star.isRendered) {
      model.name = `project_star_${star.id}`
      const { x, y, z } = getRandomProjectStarPosition(
        2,
        SPIN,
        BRANCHES,
        RADIUS
      )

      dispatch(
        projectStarDataSetItemIsRendered({ id: star.id, isRendered: true })
      )
      model.position.set(0, 0, 0)

      setPosition(model.position)
    }
    const cloud = generatePointsCloud()
    cloud.scale.set(0.05, 0.05, 0.05)
    scene.add(cloud)
    scene.add(model)
  }, [camera, dispatch, model, onRender, scene, star.id, star.isRendered])

  return <>{/* <ProjectShortInfo star={star} position={position} /> */}</>
}
