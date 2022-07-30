import { Camera, Object3D } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'

export const zoomAt = (
  target: Object3D,
  camera: Camera,
  orbitControls: OrbitControls
) => {
  //use this code for a object size agnostic solution; build a bounding box around your object you want to zoom and  get its size:
  const center = target.position

  //now use gsap and not tweenjs.. never use tweenjs again. never.

  gsap.to(orbitControls.target, {
    duration: 0.5,

    x: center.x,
    y: center.y, //set the center of the controler to the zoomed object
    z: center.z, // no distance needed
    onComplete: () => {
      orbitControls.enabled = true // activate the controler again after animation
      gsap.to(camera.position, {
        duration: 3,
        x: center.x,
        y: center.y, // place camera a bit higher than the object
        z: center.z + 0.0005, // maybe adding even more offset depending on your model
        onUpdate: function () {
          camera.lookAt(target.position) //important
          // orbitControls.target = target.position
        },
      })
    },
  })
}
