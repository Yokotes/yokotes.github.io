import { Camera, Vector3 } from 'three'

export const convertPositionToScreen = (vector: Vector3, camera: Camera) => {
  const newVector = vector.clone()
  newVector.project(camera)

  newVector.x = ((newVector.x + 1) * window.innerWidth) / 2
  newVector.y = (-(newVector.y - 1) * window.innerHeight) / 2
  newVector.z = 0

  return newVector
}
