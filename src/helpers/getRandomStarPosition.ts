export const getRandomAxis = (randomnessPower: number) =>
  Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

export const getRandomStartPosition = (randomnessPower: number) => ({
  x: getRandomAxis(randomnessPower),
  y: getRandomAxis(randomnessPower),
  z: getRandomAxis(randomnessPower),
})

export const getRandomProjectStarPosition = (
  randomnessPower: number,
  spin: number,
  branches: number,
  radius: number
) => {
  const x = Math.random() * radius
  const branchAngle =
    ((Math.round(Math.random() * 70000) % branches) / branches) * 2 * Math.PI
  const spinAngle = x * spin

  const {
    x: randomX,
    y: randomY,
    z: randomZ,
  } = getRandomStartPosition(randomnessPower)

  return {
    x: Math.sin(branchAngle + spinAngle) * x + randomX,
    y: randomY,
    z: Math.cos(branchAngle + spinAngle) * x + randomZ,
  }
}
