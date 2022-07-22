import {
  CircleBufferGeometry,
  RingBufferGeometry,
  MeshBasicMaterial,
  Color,
  Mesh,
  TextureLoader,
} from 'three'
import { v4 } from 'uuid'

const bgGeometry = new CircleBufferGeometry(0.1, 32)
const borderGeometry = new RingBufferGeometry(0.1, 0.11, 32)

const bgMaterial = new MeshBasicMaterial({
  color: new Color('black'),
  depthWrite: false,
  transparent: true,
  opacity: 1,
})
const borderMaterial = bgMaterial.clone()

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

PROJECT_STAR_MODEL.renderOrder = 70001
borderCircle.renderOrder = 70002
star.renderOrder = 70002

PROJECT_STAR_MODEL.remove(borderCircle)
PROJECT_STAR_MODEL.add(borderCircle)
PROJECT_STAR_MODEL.remove(star)
PROJECT_STAR_MODEL.add(star)

PROJECT_STAR_MODEL.name = `project_star_${v4()}`

export { PROJECT_STAR_MODEL }
