import sharp from "sharp"

// import 'lru-cache' // check how to use this
// ejs.cache = LRU(100) // LRU cache with 100-item limit

async function imageModifier(image) {
  const receivedImage = image

  let modifiedImage = null
  
  await sharp(receivedImage)
    .normalise()
    .tint({ r: 255, g: 240, b: 16 })
    .toBuffer()
    .then((image) => {
      modifiedImage = image
    })
    .catch((err) => {
      console.log("OMG! The following error has happened:", err)
    })

  return modifiedImage
}

////////////////////////////

function corsEnabler(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
}

export {imageModifier, corsEnabler, }
