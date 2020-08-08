import express from 'express';

const fs = require('fs');

export default (app) => {
  app.use(express.json())
  
  app.get('/foo', (req, res) => {
    res.json({msg: 'foo'})
  })
  
  app.post('/bar', (req, res) => {
    res.json(req.body)
  })

  app.post('/new-folder', (req, res) => {
    try {
      let folderName = `srv/canvases/${req.body.folderName}`
      if(!(fs.existsSync(folderName))) {
        fs.mkdirSync(folderName)
        res.send('okay')
      }
      else {
        res.send('already exists')
      }
    } catch (error) {
      res.send('error')
      res.status(500)
      throw error
    }
  })

  app.get('/get-folders', (req, res) => {
    let folders = fs.readdirSync('./srv/canvases')
    res.send({
      folderNames: folders
    })
  })

  app.post('/files-from-folder', (req, res) => {
    let folderName = req.body.folderName
    let files = fs.readdirSync(`./srv/canvases/${folderName}`)
    res.send({
      fileNames: files
    })
  })

  app.post('/update-canvas-name', (req, res) => {
    let folderName = req.body.folderName
    let fileName = req.body.canvasName
    let oldFileName = req.body.oldCanvasName

    if(oldFileName === fileName) {
      res.send('no change')
    }
    else {
      console.log('here')
      let oldFileContents = fs.readFileSync(`./srv/canvases/${folderName}/${oldFileName}.json`)
      console.log(oldFileContents.toString())
      fs.writeFileSync(`./srv/canvases/${folderName}/${fileName}.json`, oldFileContents)
      fs.unlinkSync(`./srv/canvases/${folderName}/${oldFileName}.json`)
      res.send('name updated')
    }
  })

  app.post('/new-canvas', (req, res) => {
    let canvasName = req.body.canvasName
    let folder = req.body.folderName

    fs.writeFileSync(`./srv/canvases/${folder}/${canvasName}.json`, '{}')
    res.send('new canvas')
  })

  app.post('/save-canvas', (req, res) => {
    let canvasName = req.body.canvasName
    let folderName = req.body.folderName
    fs.writeFileSync(`./srv/canvases/${folderName}/${canvasName}.json`, JSON.stringify(req.body.canvasData))
    res.send('ok')
  })

  app.post('/get-canvas', (req, res) => {
    let canvasName = req.body.canvasName
    let folderName = req.body.folderName
    let canvasData = fs.readFileSync(`./srv/canvases/${folderName}/${canvasName}.json`)

    res.send(JSON.parse(canvasData))
  })
}
