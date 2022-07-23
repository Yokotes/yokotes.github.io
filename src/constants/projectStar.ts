import { PARAMETERS } from './parameters'
import {
  CircleBufferGeometry,
  RingBufferGeometry,
  MeshBasicMaterial,
  Color,
  Mesh,
  TextureLoader,
} from 'three'

const { COUNT } = PARAMETERS

const bgGeometry = new CircleBufferGeometry(0.1, 32)
const borderGeometry = new RingBufferGeometry(0.1, 0.11, 32)

const bgMaterial = new MeshBasicMaterial({
  color: new Color('black'),
  depthWrite: false,
  transparent: true,
  opacity: 1,
})
const borderMaterial = bgMaterial.clone()
borderMaterial.color = new Color('#fff')

const PROJECT_STAR_MODEL = new Mesh(bgGeometry, bgMaterial)
const borderCircle = new Mesh(borderGeometry, borderMaterial)

const starTexture = new TextureLoader().load('/images/star.png')
const starMaterial = new MeshBasicMaterial({
  alphaMap: starTexture,
  depthWrite: false,
  transparent: true,
  opacity: 1,
})
const starGeomentry = new CircleBufferGeometry(0.03)
const star = new Mesh(starGeomentry, starMaterial)

PROJECT_STAR_MODEL.renderOrder = COUNT + 1
star.renderOrder = COUNT + 2
star.name = 'star'

PROJECT_STAR_MODEL.add(borderCircle)
PROJECT_STAR_MODEL.add(star)

export { PROJECT_STAR_MODEL }
