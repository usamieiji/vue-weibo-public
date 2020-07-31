import {emotions} from "./src/common/const"

const newEmotions = {}
emotions.map(element => {
  newEmotions[element.phrase] = element
})
console.log(newEmotions)

