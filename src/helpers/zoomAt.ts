import { Camera, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'

export const zoomAt = (
  coords: Vector3,
  camera: Camera,
  orbitControls: OrbitControls
) => {
  orbitControls.enabled = false

  gsap.to(orbitControls.target, {
    duration: 0.5,
    x: coords.x,
    y: coords.y,
    z: coords.z,
    onComplete: () => {
      gsap.to(camera.position, {
        duration: 4,
        x: coords.x,
        y: coords.y,
        z: coords.z + 0.00035,
        onUpdate: function () {
          camera.lookAt(coords)
        },

        onComplete: () => {
          orbitControls.enabled = true
        },
      })
    },
  })
}

export const backToGalaxy = (
  camera: Camera,
  orbitControls: OrbitControls,
  callback?: () => void
) => {
  orbitControls.enabled = false

  gsap.to(camera.position, {
    duration: 4,
    x: 4,
    y: 4,
    z: 4,
    onComplete: function () {
      gsap.to(orbitControls.target, {
        duration: 0.5,
        x: 0,
        y: 0,
        z: 0,
        onComplete: () => {
          camera.lookAt(new Vector3(0, 0, 0))
          orbitControls.enabled = true
          callback?.()
        },
      })
    },
  })
}
