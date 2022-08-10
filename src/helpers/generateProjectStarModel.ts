import { PARAMETERS } from '../constants'
import {
  Mesh,
  SphereBufferGeometry,
  TextureLoader,
  MeshLambertMaterial,
} from 'three'

const { COUNT } = PARAMETERS
const COLORS = ['#F0DA43', '#E65A40', 'orange']

export const generateProjectStarModel = () => {
  const bgGeometry = new SphereBufferGeometry(0.0001)
  const textureLoader = new TextureLoader()
  const starTexture = textureLoader.load('/images/sunSurfaceMaterial.jpg')
  const color = COLORS[Math.round(Math.random() * 2)]

  const bgMaterial = new MeshLambertMaterial({
    depthWrite: false,
    transparent: true,
    opacity: 1,
    map: starTexture,
    color,
  })

  const projectStarModel = new Mesh(bgGeometry, bgMaterial)

  projectStarModel.frustumCulled = false
  projectStarModel.traverse((obj) => {
    obj.frustumCulled = false
  })

  projectStarModel.renderOrder = COUNT + 1

  return projectStarModel
}
