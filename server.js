//Class 36 assignment on 5/24/2022:  MayanWolfe VOD on 5/31/2022
console.log('May Node be with you')
const express = require('express');
const bodyParser = require('body-parser');
const { restart } = require('nodemon');
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://msofi72:W2cgehrYO3JwK5lr@cluster0.yf2w0.mongodb.net/?retryWrites=true&w=majority'
const PORT = 3000



MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true}))
    app.use(express.static('public'))
    app.use(bodyParser.json())


    app.get('/', (req, res) => {
        quotesCollection.find().toArray()
            .then(results => {
                console.log(results)
                res.render('index.ejs', { quotes: results})
            })
            .catch(error => console.error(error))
      })
    app.post('/quotes', (req,res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
    app.put('/quotes', (req, res) => {
        console.log(res.body)
    })    
    app.listen(PORT, function() {
        console.log('listening on 3000')
    })
})
  .catch(error => console.error(error))
