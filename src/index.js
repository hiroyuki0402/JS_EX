const express = require('express');
const fs = require('fs');

require('./db/mogoose')


const Note = require('./models/note')


const app = express();

app.use(express.json())

// app.get('/notes', (req, res) => {
//     fs.readFile(__dirname + "/notes.json", "utf-8", (error, data) => {
//         if (error) {
//             return console.log("Error:" + data);
//         }

//         res.status(200).send(data)
//     })
// })

app.get('/notes', async (req, res) => {

    try {
        const note = await Note.find({})

        res.send(note)
    } catch (error) {
        res.status(400).send(error)
    }

});

app.post('/notes', async (req, res) => {
    const note = new Note(req.body);

    try {
        note.save()
        res.status(200).send(note);
        
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(3000, () => {
    console.log("Server is on port 3000");
});