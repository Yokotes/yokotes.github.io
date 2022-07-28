import { PARAMETERS } from './parameters'
import {
  Color,
  Mesh,
  SphereBufferGeometry,
  TextureLoader,
  MeshLambertMaterial,
} from 'three'

const { COUNT } = PARAMETERS

const bgGeometry = new SphereBufferGeometry(0.0001)
const textureLoader = new TextureLoader()
const starTexture = textureLoader.load('/images/sun.png')

const bgMaterial = new MeshLambertMaterial({
  depthWrite: false,
  transparent: true,
  opacity: 1,
  map: starTexture,
})

// bgMaterial.color = new Color('blue')
const PROJECT_STAR_MODEL = new Mesh(bgGeometry, bgMaterial)

PROJECT_STAR_MODEL.renderOrder = COUNT + 1

export { PROJECT_STAR_MODEL }
