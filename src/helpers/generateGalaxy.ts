import {
  BufferGeometry,
  TextureLoader,
  Color,
  BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  Points,
} from 'three'
import { PARAMETERS } from '../constants'
import { getRandomStartPosition } from './getRandomStarPosition'

const {
  BRANCHES,
  COUNT,
  INSIDE_COLOR,
  OUTSIDE_COLOR,
  RADIUS,
  RANDOMNESS_POWER,
  SIZE,
  SPIN,
} = PARAMETERS

export const generateGalaxy = () => {
  const geometry = new BufferGeometry()
  const textureLoader = new TextureLoader()
  const shape = textureLoader.load('/images/shape.png')

  const positions = new Float32Array(COUNT * 3)
  const colors = new Float32Array(COUNT * 3)

  const colorInside = new Color(INSIDE_COLOR)
  const colorOutside = new Color(OUTSIDE_COLOR)

  for (let i = 0; i < COUNT; i++) {
    //Position
    const x = Math.random() * RADIUS
    const branchAngle = ((i % BRANCHES) / BRANCHES) * 2 * Math.PI
    const spinAngle = x * SPIN

    const {
      x: randomX,
      y: randomY,
      z: randomZ,
    } = getRandomStartPosition(RANDOMNESS_POWER)

    positions[i * 3] = Math.sin(branchAngle + spinAngle) * x + randomX
    positions[i * 3 + 1] = randomY
    positions[i * 3 + 2] = Math.cos(branchAngle + spinAngle) * x + randomZ

    //Color

    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, x / RADIUS)

    colors[i * 3 + 0] = mixedColor.r
    colors[i * 3 + 1] = mixedColor.g
    colors[i * 3 + 2] = mixedColor.b
  }

  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('color', new BufferAttribute(colors, 3))

  const material = new PointsMaterial({
    color: 'white',
    size: SIZE,
    depthWrite: false,
    sizeAttenuation: true,
    blending: AdditiveBlending,
    vertexColors: true,
    // transparent: true,
    map: shape,
  })

  const points = new Points(geometry, material)

  return points
}
