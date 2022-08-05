export const getRandomAxis = (randomnessPower: number) =>
  Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

export const getRandomStartPosition = (randomnessPower: number) => ({
  x: getRandomAxis(randomnessPower),
  y: getRandomAxis(randomnessPower),
  z: getRandomAxis(randomnessPower),
})

export const getRandomProjectStarPosition = (radius: number) => {
  const r = radius * Math.sqrt(Math.random())
  const theta = Math.random() * 2 * Math.PI

  return {
    x: r * Math.cos(theta),
    y: 0,
    z: r * Math.sin(theta),
  }
}
