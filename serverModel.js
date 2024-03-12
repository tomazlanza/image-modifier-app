import sharp from "sharp"

async function imageFilter(image, rgbValues) {
  
  const receivedImage = image
  let filteredImage
  
  const filterRGBValues = {
    red: null,
    green: null,
    blue: null,
  }  
  
  const rgbMissing = Object.values(rgbValues).filter(value => (value != ''))
  
  if(
    (rgbMissing.length === 0)
    ) {
    filterRGBValues.red = (Math.random()*255)
    filterRGBValues.green = (Math.random()*255)
    filterRGBValues.blue = (Math.random()*255)
  } else {
    const inputRGBValues = rgbValues

    inputRGBValues.red === '' ? filterRGBValues.red = (Math.random()*255) : filterRGBValues.red = inputRGBValues.red
    inputRGBValues.green === '' ? filterRGBValues.green = (Math.random()*255) : filterRGBValues.green = inputRGBValues.green
    inputRGBValues.blue === '' ? filterRGBValues.blue = (Math.random()*255) : filterRGBValues.blue = inputRGBValues.blue
  } 
  
  // for(const key in filterRGBValues) {
  //   filterRGBValues[key] = toString(filterRGBValues[key])
  // }

  // console.log("this is filter after converting to string")
  // console.log(filterRGBValues)

  //greyscaling before tinting with the RGB
  await sharp(receivedImage)
    .normalise()
    .greyscale()
    .toBuffer()
    .then((image) => {
      filteredImage = image
    })
    .catch((err) => {
      console.log("OMG! The following error has happened:", err)
    })

    await sharp(filteredImage)
    .tint(
      { r: filterRGBValues.red, 
        g: filterRGBValues.green, 
        b: filterRGBValues.blue 
      }
    )
    .toBuffer()
    .then((image) => {
      filteredImage = image
    })
    .catch((err) => {
      console.log("OMG! The following error has happened:", err)
    })
  

  return filteredImage
}

////////////////////////////

function corsEnabler(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
}

export {imageFilter, corsEnabler, }