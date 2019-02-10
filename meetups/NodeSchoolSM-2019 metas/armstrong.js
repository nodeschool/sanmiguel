const isArmstrong = num => {
  let numArray = (num + "").split("")
  const len = numArray.length
  let sum = 0
  numArray.forEach(n => (sum += Math.pow(n, len)))
  return sum == num
}

console.log(isArmstrong(1634))
