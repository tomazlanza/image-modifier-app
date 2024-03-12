import { 
  imageFilter, 
  corsEnabler, 
} from "./serverModel.js"
import express from "express"
import bodyParser from "body-parser"
import ejs from 'ejs'

const app = express()
const port = 8080

let originalImage

let inputIndicator = false

// server config methods

app.engine(".html", ejs.__express)
app.use(express.static('public'))
app.use(bodyParser.raw({
  type: 'image/gif',
  limit: '5mb'
}))
app.use(bodyParser.raw({
  type: 'image/png',
  limit: '5mb'
}))
app.use(bodyParser.raw({
  type: 'image/jpeg',
  limit: '5mb'
}))
app.use(express.json())
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
app.post("/image", (req, res) => {

  // if(req.body) {
  //   //do a validation
  // }
  originalImage = req.body
  res.end("Image has been succesfully received!")
})

app.post("/rgb-values-input", (req, res) => {

  // if(req.body){
  //   do a validation 
  // }

  const rgbvalues = req.body

  async function sendingResultToClient() {
    try {
      const filteredImage = await imageFilter(originalImage, rgbvalues)
    
      const originalImageBase64 = originalImage.toString('base64')
      const filteredImageBase64 = filteredImage.toString('base64')
      
      inputIndicator = true
      
      res.render("main.html", {
        inputIndicator: inputIndicator,
        originalImage: originalImageBase64,
        filteredImage: filteredImageBase64,
      })
    } catch (error) {
      console.error("Error processing image:", error)
      res.status(500).send("Error processing image. Please, try again.")
    }
  }

  sendingResultToClient()

})

//
// starting request listening

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})