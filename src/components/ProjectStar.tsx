import { useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Mesh, Raycaster, Vector3 } from 'three'
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

const { SPIN, BRANCHES, RADIUS } = PARAMETERS

const MIN_ZOOM = 0.25
const MAX_ZOOM = 7
interface Props {
  star: ProjectStarRecord
  onRender: (model: Mesh) => void
}

export const ProjectStar = ({ onRender, star }: Props) => {
  const { camera, scene, useRenderLoop, controls } = useCoreContext()
  const raycaster = useMemo(() => new Raycaster(), [])
  const model = useMemo(() => generateProjectStarModel(), [])
  const cloud = useMemo(() => generatePointsCloud(), [])

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
      const { x, z } = getRandomProjectStarPosition(0.5, SPIN, BRANCHES, RADIUS)

      dispatch(
        projectStarDataSetItemIsRendered({ id: star.id, isRendered: true })
      )

      model.position.set(x, 0, z)
      cloud.scale.set(0.05, 0.05, 0.05)

      // model.add(cloud)
      model.layers.enable(1)
      model.traverse((obj) => {
        obj.layers.enable(1)
      })
      scene.add(model)

      // console.log(model.layers.enableAll())

      // model.traverse((obj) => {
      // obj.layers.enable(1)
      // })
      // model.layers.set(1)
    }
  }, [
    camera,
    cloud,
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
      // Move label
      if (!labelRef.current) return

      const temp = new Vector3()

      model.updateWorldMatrix(true, false)
      model.getWorldPosition(temp)

      temp.project(camera)

      const x = (temp.x * 0.5 + 0.5) * window.innerWidth
      const y = (temp.y * -0.5 + 0.5) * window.innerHeight

      labelRef.current.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`

      // Change label opacity
      const value = controls.target.distanceTo(controls.object.position)
      const normalizedValue = (value - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)
      const distance = camera.position.distanceTo(model.position)
      const distanceOpacity = (distance - 13) / -8
      const opacity = normalizedValue > 0 ? distanceOpacity : normalizedValue

      labelRef.current.style.opacity = opacity.toString()
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
