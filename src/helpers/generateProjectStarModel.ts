import { PARAMETERS } from '../constants'
import {
  Mesh,
  SphereBufferGeometry,
  TextureLoader,
  MeshLambertMaterial,
  Color,
} from 'three'
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare'

const { COUNT } = PARAMETERS
const COLORS = ['#F0DA43', '#E65A40', '#4843F0']

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

  const projectStarModel = new Mesh(bgGeometry, bgMaterial)
  const lensFlare = new Lensflare()
  const hexangle = textureLoader.load('/images/hexangle.png')
  const lensflareTexture = textureLoader.load('/images/lensflare0.png')

  lensFlare.addElement(
    new LensflareElement(lensflareTexture, 1000, 0, new Color(color))
  )
  // lensFlare.addElement(new LensflareElement(hexangle, 100, 0.5))

  // projectStarModel.add(lensFlare)

  projectStarModel.renderOrder = COUNT + 1
  lensFlare.renderOrder = COUNT

  return projectStarModel
}
