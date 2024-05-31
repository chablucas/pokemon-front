import {useState, useEffect} from "react"

function ColorPicker(){
  const [textColor, setTextColor] = useState("000000")
  const colors = [
    "001f3f",
    "0074D9",
    "7FDBFF",
    "39CCCC",
    "3D9970",
    "2ECC40",
    "01FF70",
    "FFDC00",
    "FF851B",
    "FF4136",
    "85144B",
    "F012BE",
    "B10DC9",
    "111111",
    "AAAAAA",
    "DDDDDD",
    "FFFFFF"
  ];

  console.log({colors});

  const colorButtons = colors.map(color => <button style={{'background-color': "#" + color}} onClick={() => {setTextColor(color)}}>{color}</button> )

  console.log({colorButtons});

  return (
    <>
      <h2>My Color Picker App</h2>

      {colorButtons}

      <div style={{'color': "#"+textColor}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure tempora error odit necessitatibus adipisci eius voluptas reiciendis eligendi aspernatur natus, at dignissimos accusamus optio alias autem! Dolorum beatae dolores ex.
      </div>
    </>
  )

}

export default ColorPicker;