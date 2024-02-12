import { 
  imageModifier, 
  corsEnabler, 
} from "./serverModel.js"
import cors from 'cors'
import express from "express"
import bodyParser from "body-parser"
import ejs from 'ejs'

const app = express()
const port = 8080

let inputIndicator = false

// server config methods

app.engine(".html", ejs.__express)
app.use(express.static('public'))
app.use(bodyParser.raw({
  type: 'image/png',
  limit: '10mb'
}))
app.use(bodyParser.raw({
  type: 'image/jpeg',
  limit: '10mb'
}))
app.use(corsEnabler)
app.set("views", "./views")
// setting routes
app.get("/", (req, res) => { 
  inputIndicator = false
  res.render("main.html", {
    inputIndicator: inputIndicator,
  })
})

app.post("/image", async (req, res) => {
  
  if(req.body.type == ('image/png' || 'image/jpeg')){
    console.log('AAAAAAAAHHHHHHHHHH')
  }

  const originalImage = req.body;

  try {
    const modifiedImage = await imageModifier(originalImage);
  
    const originalImageBase64 = originalImage.toString('base64');
    const modifiedImageBase64 = modifiedImage.toString('base64');
    
    inputIndicator = true;
    
    res.render("main.html", {
      inputIndicator: inputIndicator,
      originalImage: originalImageBase64,
      modifiedImage: modifiedImageBase64,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Error processing image");
  }
});


//
// starting request listening

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})



