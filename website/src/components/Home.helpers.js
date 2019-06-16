import React from "react"
import { ImageLoader } from "./Home.parts"
export const nameParser = _name => {
  /*returns :: "denny      portillo  " => Denny Portillo*/
  const arr = _name.split(new RegExp(/ +/)).map(part => {
    const trimmed = part.trim()
    return trimmed[0].toUpperCase() + trimmed.substr(1)
  })
  return `${arr[0]} ${arr[2] || arr[1] || ""}`
}

export function stargazersMapper(stargazers) {
  const elementsCount = stargazers.length
  const _stargazers = { ...stargazers }
  let domArr = []
  const grid = this.grid || false
  if (grid && elementsCount > 0) {
    grid.clientWidth < 120
      ? grid.classList.add("to-low")
      : grid.classList.remove("to-low")
    let i = 0
    let itemsPerRow =
      grid.clientWidth >= 120 ? Math.floor(grid.clientWidth / 58) : 1

    let switcher = 1
    while (i < elementsCount) {
      let len = elementsCount
      if (elementsCount > itemsPerRow) {
        len = switcher > 0 ? itemsPerRow : itemsPerRow - 1
        switcher *= -1
      }
      domArr.push(Object.assign([], _stargazers).splice(i, len))
      i += len
    }
    let firstRemainder =
      domArr.length > 1 ? domArr[domArr.length - 2].length % 2 : null
    let lastRemainder = domArr[domArr.length - 1].length % 2

    let lastTwoAreEven = firstRemainder === lastRemainder

    let lastTwoAreOdd =
      firstRemainder !== 0 && lastRemainder !== 0 && firstRemainder !== null

    let lastOnesSize1 =
      firstRemainder !== 0 &&
      domArr[domArr.length - 1].length === 1 &&
      firstRemainder != null

    domArr[domArr.length - 1][0].custom =
      lastTwoAreEven || lastTwoAreOdd || lastOnesSize1

    this.setState({
      stargazersRows: domArr.map((row, rowIndex) => {
        const hasCustomChild = domArr[rowIndex][0].custom || false
        const tempStyle = {
          [`padding${["Right", "Left"][Math.round(Math.random() * 1)]}`]: "58px"
        }
        return (
          <div
            className="row"
            key={rowIndex}
            style={hasCustomChild ? tempStyle : null}>
            {row.map(e => (
              <ImageLoader e={e} key={`Stargazer-${e.url}`} />
            ))}
          </div>
        )
      })
    })
  }
}
