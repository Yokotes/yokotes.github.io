import { CircleBufferGeometry, RingBufferGeometry, MeshBasicMaterial, Color, Mesh, TextureLoader } from "three"
import { v4 } from "uuid"

const bgGeometry = new CircleBufferGeometry(0.1, 32)
const borderGeometry = new RingBufferGeometry(0.1, 0.11, 32),

const bgMaterial = new MeshBasicMaterial({
      color: new Color('black'),
      depthWrite: false,
      transparent: true,
      opacity: 1,
    })
const borderMaterial = bgMaterial.clone()

const bgCircle = new Mesh(bgGeometry, bgMaterial)
const borderCircle = new Mesh(borderGeometry, borderMaterial)

const starTexture = new TextureLoader().load('/images/star.png')
const starMaterial = new MeshBasicMaterial({
      alphaMap: starTexture,
      depthWrite: false,
      transparent: true,
      opacity: 1,
    })
const starGeomentry = new CircleBufferGeometry(0.03)
const star = new Mesh(starGeomentry, starMaterial),

bgCircle.renderOrder = 70001
star.renderOrder = 70002

bgCircle.remove(borderCircle)
bgCircle.add(borderCircle)
bgCircle.remove(star)
bgCircle.add(star)

bgCircle.name = `project_star_${v4()}`