import { Camera, Raycaster, Scene, Vector2 } from 'three'

export const getPointerModelName = (
  e: MouseEvent,
  scene: Scene,
  camera: Camera,
  filterString?: string
) => {
  const { clientX, clientY } = e
  const vector = new Vector2(
    (clientX / window.innerWidth) * 2 - 1,
    -(clientY / window.innerHeight) * 2 + 1
  )

  const raycaster = new Raycaster()

  raycaster.setFromCamera(vector, camera)
  const intersect = raycaster
    .intersectObjects(scene.children)
    .filter((item) => !filterString || item.object.name.includes(filterString))
    .sort((objA, objB) => objA.distance - objB.distance)[0]

  return intersect && intersect.object
}
