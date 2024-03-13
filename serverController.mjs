import { 
  imageFilter, 
  corsEnabler, 
} from "./serverModel.js"
import express from "express"
import bodyParser from "body-parser"
import ejs from 'ejs'

const app = express()
const port = 8080

let base64InputImage

let inputIndicator = false

// server config methods

app.engine(".html", ejs.__express)
app.use(express.static('public'))
app.use(express.json({ limit: '20mb' }))
app.use(corsEnabler)
app.set("views", "./views")
// setting routes
app.get("/", (req, res) => { 
  inputIndicator = false
  res.render("main.html", {
    inputIndicator: inputIndicator,
  })
})

// app.post("/image", async (req, res) => {
// app.post("/image", (req, res) => {

//   // if(req.body) {
//   //   //do a validation
//   // }
//   originalImage = req.body
//   res.end("Image has been succesfully received!")
// })

// app.post("/rgb-values-input", (req, res) => {
app.post("/image", (req, res) => {

  // if(req.body){
  //   do a validation 
  // }

  const requestBody = req.body
  
  const rgbvalues = requestBody.rgbValues
  base64InputImage = requestBody.imageUpload

  let mediaType = base64InputImage.split(',')[0].split(';')[0].split(':')[1]
  console.log(mediaType)
  const base64ImageString = base64InputImage.split(',')[1] 
  
  const binaryImageData = atob(base64ImageString)

  const byteArray = new Uint8Array(binaryImageData.length)

  for (let i = 0; i < binaryImageData.length; i++) {
    byteArray[i] = binaryImageData.charCodeAt(i)
  }

  // Create a Blob from the binary data
  const blob = new Blob([byteArray], { type: mediaType }) // Adjust the MIME type as needed

  // Create a File object from the Blob
  const buffer = Buffer.from(binaryImageData, 'binary');


  async function sendingResultToClient() {
    try {
      const filteredImage = await imageFilter(buffer, rgbvalues)
    
      // const originalImageBase64 = originalImage.toString('base64')
      const filteredImageBase64 = filteredImage.toString('base64')
      
      inputIndicator = true
      
      res.render("main.html", {
        inputIndicator: inputIndicator,
        originalImage: base64ImageString,
        filteredImage: filteredImageBase64,
      })
    } catch (error) {
      console.error("Error processing image:", error)
      res.status(500).send(`Error processing image: ${error}. Please, try again.`)
    }
  }

  sendingResultToClient()

})

//
// starting request listening

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})