const x = require('express')
const y = require('mongodb')
const c = require('cors')
const b = require('body-parser')
const a = x()
const MongoClient = y.MongoClient
const mongourl = 'mongodb://localhost:27017'
let db;
const p = 8900

a.use(c())
a.use(b.urlencoded({ extended: true }))
a.use(b.json())

a.get('/', (req, res) =>
{
    db.collection('medi').find().toArray((err, result) =>
    {
        if (err) throw err
        res.send(result)
    })
})

a.post('/addmedical', (req, res) =>
{
    console.log(req.body);
    db.collection('medi').insert(req.body, (err, result) =>
    {
        if (err) throw err
        res.send('Data Added')
    })
})


a.delete('/deletemedical/:id', (req, res) =>
{
    var q={_id:parseInt(req.params.id)}
    db.collection('medi').remove((q), (err, result) =>
    {
        if (err) throw err
        res.send('Data Deleted')
    })
})



a.get('/transport', (req, res) =>
{
    db.collection('transport').find().toArray((err, result) =>
    {
        if (err) throw err
        res.send(result)
    })
})


a.post('/addtransport', (req, res) =>
{
    db.collection('transport').insert(req.body, (err, result) => {
        if (err) throw err
        res.send('Data Added')
    })
})

a.delete('/deletetransport/:id', (req, res) => {
    var q = { _id: parseInt(req.params.id) }
    db.collection('transport').remove((q), (err,result) => {
        if (err) throw err
        res.send('Data Deleted')
    })
})

MongoClient.connect(mongourl, (err, client) =>
{
    if (err) throw err
    db = client.db('fleetlabsinternship')
    a.listen(p, (err) =>
    {
        if (err) throw err
        console.log(`Server Running on port no ${p}`)
    })
})