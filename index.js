const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('simple node server is running')
})

const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'Sabnoor', email: 'sabnoor@gmail.com' },
    { id: 3, name: 'Sabila', email: 'sabila@gmail.com' },
];

// user: DbUser1
// password: WJMysXXzBuJAPGkF



const uri = "mongodb+srv://DbUser1:WJMysXXzBuJAPGkF@cluster0.ex1o8oo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users')
        // const user = { name: 'sharmin', email: 'shar@gmail.com' }


         app.get( '/users', async (req, res) =>{
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user)
            user._id = result.insertedId
            res.send(user);
        })
    }
    finally {

    }
}
run().catch(error => console.log(error))


// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
//         res.send(filtered);
//     }
//     else {
//         res.send(users);
//     }

// });

// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user)
//     res.send(user);
// })

app.listen(port, () => {
    console.log(`simple server is running on port: ${port}`)
})