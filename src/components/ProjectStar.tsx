import { useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  Mesh,
  Raycaster,
  Vector3,
  BoxBufferGeometry,
  Box3,
  MeshBasicMaterial,
} from 'three'
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

interface Props {
  star: ProjectStarRecord
  onRender: (model: Mesh) => void
}

export const ProjectStar = ({ onRender, star }: Props) => {
  const { camera, scene, useRenderLoop, controls, pointClouds } =
    useCoreContext()
  const raycaster = useMemo(() => new Raycaster(), [])
  const model = useMemo(() => generateProjectStarModel(), [])
  const cloud = useMemo(() => generatePointsCloud(), [])
  cloud.scale.set(0.05, 0.05, 0.05)

  const box = useMemo(() => new Box3().setFromObject(cloud), [cloud])
  const bodySize = useMemo(() => new Vector3(), [])
  box.getSize(bodySize)
  const bodyGeometry = useMemo(
    () => new BoxBufferGeometry(bodySize.x * 3, bodySize.y, bodySize.z),
    [bodySize]
  )
  const bodyMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        // color: 'red',
      }),
    []
  )
  const body = useMemo(
    () => new Mesh(bodyGeometry, bodyMaterial),
    [bodyGeometry, bodyMaterial]
  )
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

      model.position.set(x, 0, z)
      body.position.set(x, 0, z)

      pointClouds.add(body)
      model.add(cloud)
    }

    scene.add(model)
  }, [
    body,
    camera,
    cloud,
    dispatch,
    model,
    onRender,
    pointClouds,
    scene,
    star.id,
    star.isProfile,
    star.isRendered,
  ])

  // Update label position
  useRenderLoop(
    () => {
      body.lookAt(camera.position)

      // Check intersection & Move labels
      if (!labelRef.current) return

      const temp = new Vector3()

      model.updateWorldMatrix(true, false)
      model.getWorldPosition(temp)

      temp.project(camera)

      raycaster.setFromCamera(temp, camera)
      const intersections = raycaster.intersectObjects(pointClouds.children)

      intersections[0]?.object.getWorldPosition(temp)
      temp.project(camera)

      let intersOffsetY = 0

      if (intersections[0] && intersections[0].object.id !== body.id) {
        const modelInters = intersections.find(
          (inters) => inters.object.id === body.id
        )

        if (modelInters) {
          intersOffsetY = intersections.indexOf(modelInters)
        }
      }

      const x = (temp.x * 0.5 + 0.5) * window.innerWidth
      const y = (temp.y * -0.5 + 0.5) * window.innerHeight

      labelRef.current.style.transform = `translate(-50%, -50%) translate(${x}px,${
        y - 30 * (intersOffsetY >= 0 ? intersOffsetY : 0)
      }px)`
    },
    `${model.name}_label_update`,
    [model, labelRef, raycaster, body, camera]
  )

  return (
    <>
      <StarLabel star={star} ref={labelRef} onClick={handleLabelClick} />
    </>
  )
}
