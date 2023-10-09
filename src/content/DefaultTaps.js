import { tapColors } from "../styles/styles"

const yellow = tapColors.yellow;
const red = tapColors.red;
const blue = tapColors.blue;
const green = tapColors.green;


export const defaultTaps = { 
  "data": [
    {
      "key": 0,
      "text": "Quiniela",
      "options": [
        {
          "text": "1",
          "color": blue,
        },
        {
          "text": "X",
          "color": yellow,
        },
        {
          "text": "2",
          "color": red,
        },
      ]
    },
    {
      "key": 0,
      "text": "SÍ · NO",
      "options": [
        {
          "text": "Sí",
          "color": green
        },
        {
          "text": "No",
          "color": red
        }
      ]
    },
    {
      "key": 0,
      "text": "¡Ayuda!",
      "options": [
        {
          "text": "¡Ayuda!",
          "color": red
        },
      ]
    },
  ]
}