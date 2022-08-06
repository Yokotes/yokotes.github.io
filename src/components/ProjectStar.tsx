import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Raycaster, Vector3 } from 'three'
import {
  projectStarDataSetCurrentItemAction,
  projectStarDataSetItemIsRendered,
} from '../actions'
import { PARAMETERS } from '../constants'
import { useCoreContext } from '../contexts'
import {
  getRandomProjectStarPosition,
  generatePointsCloud,
  zoomAt,
  generateProjectStarModel,
} from '../helpers'
import { ProjectStarRecord } from '../records'
import { StarLabel } from './StarLabel'

const { RADIUS } = PARAMETERS
interface Props {
  star: ProjectStarRecord
}

export const ProjectStar = ({ star }: Props) => {
  const { camera, scene, useRenderLoop, controls } = useCoreContext()
  const raycaster = useMemo(() => new Raycaster(), [])
  const [model, lensFlare] = useMemo(() => generateProjectStarModel(), [])
  const cloud = useMemo(() => generatePointsCloud(), [])

  const labelRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const handleLabelClick = useCallback(() => {
    dispatch(projectStarDataSetCurrentItemAction(star))
    zoomAt(model.position, camera, controls)
  }, [camera, controls, dispatch, model.position, star])

  // Render star in galaxy
  useEffect(() => {
    if (!star.isRendered) {
      model.name = `project_star_${star.id}`
      const { x, z } = getRandomProjectStarPosition(RADIUS)

      dispatch(
        projectStarDataSetItemIsRendered({ id: star.id, isRendered: true })
      )

      model.position.set(x, 0, z)
      cloud.position.set(x, 0, z)
      cloud.scale.set(0.05, 0.05, 0.05)

      scene.add(model)
      scene.add(cloud)
    }
  }, [
    camera,
    cloud,
    dispatch,
    lensFlare,
    model,
    scene,
    star.id,
    star.isProfile,
    star.isRendered,
  ])

  // Update label position
  useRenderLoop(
    () => {
      const distance = camera.position.distanceTo(model.position)

      if (distance > 0.0004 && model.children.includes(lensFlare)) {
        model.remove(lensFlare)
      } else if (distance <= 0.0004 && !model.children.includes(lensFlare)) {
        model.add(lensFlare)
      }

      // Move label
      if (!labelRef.current) return

      const temp = new Vector3()

      model.updateWorldMatrix(true, false)
      model.getWorldPosition(temp)

      temp.project(camera)

      const x = (temp.x * 0.5 + 0.5) * window.innerWidth
      const y = (temp.y * -0.5 + 0.5) * window.innerHeight

      labelRef.current.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`
    },
    `${model.name}_label_update`,
    [model, labelRef, raycaster, camera]
  )

  return (
    <>
      <StarLabel star={star} ref={labelRef} onClick={handleLabelClick} />
    </>
  )
}
