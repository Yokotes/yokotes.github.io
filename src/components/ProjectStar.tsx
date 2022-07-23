import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Mesh } from 'three'
import {
  projectStarDataClearCurrentItemAction,
  projectStarDataSetCurrentItemAction,
  projectStarDataSetItemIsRendered,
} from '../actions'
import { PARAMETERS, PROJECT_STAR_MODEL } from '../constants'
import { useCoreContext } from '../contexts'
import { getPointerModelName, getRandomProjectStarPosition } from '../helpers'
import { ProjectStarRecord } from '../records'

const { SPIN, BRANCHES, RADIUS } = PARAMETERS

interface Props {
  star: ProjectStarRecord
  onRender: (model: Mesh) => void
}

export const ProjectStar = ({ onRender, star }: Props) => {
  const { camera, useRenderLoop } = useCoreContext()
  const model = useMemo(() => PROJECT_STAR_MODEL.clone(true), [])
  const [isHover, setIsHover] = useState(false)
  const dispatch = useDispatch()

  // Hover callback
  const handleHover = useCallback(
    (e: MouseEvent) => {
      const hover = !!getPointerModelName(
        e,
        [model, ...model.children.flat()],
        camera
      )

      if (isHover === hover) return

      setIsHover(hover)

      if (hover) {
        dispatch(projectStarDataSetCurrentItemAction(star.id))
        return
      }

      dispatch(projectStarDataClearCurrentItemAction())
    },
    [camera, dispatch, isHover, model, star.id]
  )

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
        RADIUS - 2.5
      )

      dispatch(
        projectStarDataSetItemIsRendered({ id: star.id, isRendered: true })
      )
      model.position.set(x, y, z)
    }
    onRender(model)
  }, [dispatch, model, onRender, star.id, star.isRendered])

  // Render loop
  useRenderLoop(
    () => {
      model.lookAt(camera.position)

      if (isHover && model.scale.x < 2) {
        model.scale.addScalar(0.1)
      }

      if (!isHover && model.scale.x > 1) {
        model.scale.addScalar(-0.1)
      }
    },
    `${model.name}_update`,
    [model, camera, isHover]
  )

  return null
}
