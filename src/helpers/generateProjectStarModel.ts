import { PARAMETERS } from '../constants'
import {
  Mesh,
  SphereBufferGeometry,
  TextureLoader,
  MeshLambertMaterial,
} from 'three'

const { COUNT } = PARAMETERS
const COLORS = ['#E65A40', '#F0DA43', '#4843F0']

export const generateProjectStarModel = () => {
  const bgGeometry = new SphereBufferGeometry(0.0001)
  const textureLoader = new TextureLoader()
  const starTexture = textureLoader.load('/images/graySun.jpg')
  const color = COLORS[Math.round(Math.random() * 2)]

  const bgMaterial = new MeshLambertMaterial({
    depthWrite: false,
    transparent: true,
    opacity: 1,
    map: starTexture,
    color,
  })

  // bgMaterial.color = new Color('blue')
  const projectStarModel = new Mesh(bgGeometry, bgMaterial)

  projectStarModel.renderOrder = COUNT + 1

  return projectStarModel
}
