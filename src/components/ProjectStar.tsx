import { useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Mesh, Vector3 } from 'three'
import {
  projectStarDataSetCurrentItemAction,
  projectStarDataSetItemIsRendered,
} from '../actions'
import { PARAMETERS, PROJECT_STAR_MODEL } from '../constants'
import { useCoreContext } from '../contexts'
import {
  getRandomProjectStarPosition,
  generatePointsCloud,
  zoomAt,
} from '../helpers'
import { ProjectStarRecord } from '../records'
import { StarLabel } from './StarLabel'

const { SPIN, BRANCHES, RADIUS } = PARAMETERS

interface Props {
  star: ProjectStarRecord
  onRender: (model: Mesh) => void
}

export const ProjectStar = ({ onRender, star }: Props) => {
  const { camera, scene, useRenderLoop, controls } = useCoreContext()
  const model = useMemo(() => PROJECT_STAR_MODEL.clone(true), [])
  const labelRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const handleLabelClick = () => {
    // TODO: Pass whole record
    dispatch(projectStarDataSetCurrentItemAction(star.id))
    zoomAt(model.position, camera, controls)
  }

  // Render star in galaxy
  useEffect(() => {
    if (!star.isRendered) {
      model.name = `project_star_${star.id}`
      const { x, z } = getRandomProjectStarPosition(2, SPIN, BRANCHES, RADIUS)

      dispatch(
        projectStarDataSetItemIsRendered({ id: star.id, isRendered: true })
      )

      if (star.isProfile) model.position.set(0, 0, 0)
      else model.position.set(x, 0, z)
    }
    const cloud = generatePointsCloud()
    cloud.scale.set(0.05, 0.05, 0.05)

    model.add(cloud)
    scene.add(model)
  }, [
    camera,
    dispatch,
    model,
    onRender,
    scene,
    star.id,
    star.isProfile,
    star.isRendered,
  ])

  // Update label position
  useRenderLoop(
    () => {
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
    [model, labelRef]
  )

  return (
    <>
      <StarLabel star={star} ref={labelRef} onClick={handleLabelClick} />
    </>
  )
}
