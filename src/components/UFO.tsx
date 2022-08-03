import { useEffect, useMemo } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useCoreContext } from '../contexts'
import { generatePointsCloud } from '../helpers'

export const UFO = () => {
  const loader = useMemo(() => new GLTFLoader(), [])
  const cloud = useMemo(() => generatePointsCloud(), [])
  const { scene, camera } = useCoreContext()

  useEffect(() => {
    loader.load('/models/UFO_Empty.glb', (gltf) => {
      const object = gltf.scene
      // object.layers.enable(1)
      // object.traverse((obj) => {
      //   obj.frustumCulled = false
      //   obj.layers.enable(1)
      // })
      // object.layers.set(1)
      // object.rotation.x = -1.6
      object.scale.multiplyScalar(0.001)
      object.frustumCulled = false
      object.traverse((obj) => {
        obj.frustumCulled = false
      })

      cloud.scale.set(0.05, 0.05, 0.05)

      scene.add(object)
      scene.add(cloud)
    })
  }, [camera, cloud, loader, scene])
  return null
}
