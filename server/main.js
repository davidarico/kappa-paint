const express = require('express')

const app = express()
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

app.get('/test', (req, res) => {
    console.log('test endpoint')
    res.send('test endpoint reached')
})

app.post('/test', (req, res) => {
    console.log(`test post ${req.body}`)
    res.send(200)
})