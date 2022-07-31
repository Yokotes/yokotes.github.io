import { Camera, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'

export const zoomAt = (
  coords: Vector3,
  camera: Camera,
  orbitControls: OrbitControls
) => {
  //now use gsap and not tweenjs.. never use tweenjs again. never.

  gsap.to(orbitControls.target, {
    duration: 0.5,

    x: coords.x,
    y: coords.y, //set the center of the controler to the zoomed object
    z: coords.z, // no distance needed
    onComplete: () => {
      orbitControls.enabled = true // activate the controler again after animation

      gsap.to(camera.position, {
        duration: 3,
        x: coords.x,
        y: coords.y, // place camera a bit higher than the object
        z: coords.z + 0.0005, // maybe adding even more offset depending on your model
        onUpdate: function () {
          camera.lookAt(coords) //important
          // orbitControls.target = target.position
        },
      })
    },
  })
}

export const backToGalaxy = (camera: Camera, orbitControls: OrbitControls) => {
  gsap.to(camera.position, {
    duration: 3,
    x: 4,
    y: 4, // place camera a bit higher than the object
    z: 4, // maybe adding even more offset depending on your model
    onComplete: function () {
      // orbitControls.target = target.position
      gsap.to(orbitControls.target, {
        duration: 0.5,

        x: 0,
        y: 0, //set the center of the controler to the zoomed object
        z: 0, // no distance needed
        onComplete: () => {
          camera.lookAt(new Vector3(0, 0, 0)) //important
          orbitControls.enabled = true // activate the controler again after animation
        },
      })
    },
  })
}
