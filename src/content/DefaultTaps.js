import { tapColors } from "../styles/styles"

const yellow = tapColors.yellow;
const red = tapColors.red;
const blue = tapColors.blue;
const green = tapColors.green;


export const defaultTaps = { 
  "data": [
    {
      "key": 0,
      "text": "¿Cómo estás?",
      "options": [
        {
          "text": "Feliz",
          "color": yellow
        },
        {
          "text": "Triste",
          "color": blue
        },
        {
          "text": "Enfadado",
          "color": red
        }
      ]
    },
    {
      "key": 0,
      "text": "Sí / No",
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
      "text": "Direcciones",
      "options": [
        {
          "text": "Arriba",
          "color": green
        },
        {
          "text": "Abajo",
          "color": yellow
        },
        {
          "text": "Derecha",
          "color": blue
        },
        {
          "text": "Izquierda",
          "color": red
        }
      ]
    }
  ]
}