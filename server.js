const express = require('express')
const sqlite = require('sqlite3').verbose()
const app = express()
app.use(express.json())
const port = 3000
const cors = require('cors')
app.use(cors())

const db = new sqlite.Database('data.db', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM games', [], (err, data) => {
        res.send(data)
    })
})

app.get('/basket', (req, res) => {
    db.all('SELECT * FROM basket', [], (err, data) => {
        res.send(data)
    })
})

app.get('/games/:id', (req, res) => {
    const id = req.params.id
    db.get('SELECT * FROM games WHERE id=?', [id], (err, data) => {
        res.send(data)
    })
})

app.post('/addgame', (req,res) => {
    
    const name = req.body.name;
    const img = req.body.img;
    const genre = req.body.genre;
    const price = req.body.price;

    db.run('INSERT INTO games (name, img, genre, price) values (?,?,?,?)', [name,img, genre, price],(err) => {
        res.send("Ok")
    })
})



app.delete('/delete/:id', (req,res) => {
    
    const id = req.params.id

    db.run('DELETE FROM games WHERE id=?;)', [id],(err) => {
        res.send("deleted")
    })
})

// app.delete('/delete/:name', (req,res) => {
    
//     const name = req.body.name

//     db.run('DELETE FROM games WHERE name=?;)', [name],(err) => {
//         res.send("deleted")
//     })
// })

// app.put("/update/:id", (req, res)=>{
//     const name = req.body.name;
//     const img = req.body.img;
//     const genre = req.body.genre;
//     const price = req.body.price;

//     const id = req.params.id;

//     db.run("UPDATE games SET name=?, img=?, genre=?, price=? WHERE id=?",
//            [name, img, genre, price, id],
//            (err,data)=>{
//               if (err) {
//                  console.error(err.message);
//                  res.status(500).send("Error updating game.");
//               } else {
//                  res.send("Game updated successfully.");
//               }
//            });
// });



app.put('/update/:id', (req,res) => {
    
    const name = req.body.name;
    const img = req.body.img;
    const genre = req.body.genre;
    const price = req.body.price;

    const id = req.params.id;

    db.run('UPDATE games SET  name=?, img=?, genre=?, price=? where id=?' , [name,img, genre, price,id],(err,data) => {
        res.send("UPDATED")
    })
})


//basket

app.post('/basket/addbasket', (req, res) => {
    
    const game_id = req.body.game_id;

    db.run('INSERT INTO basket (game_id) values(?)', [game_id] , (err) => {
        res.send('Ok')
    })
})

app.delete('/basket/delete/', (req,res) => {
    
    const id = req.body.id

    db.run('DELETE FROM basket WHERE game_id=?;)', [id],(err) => {
        res.send("deleted")
    })
})



app.listen(port)

// CREATE TABLE games(id INTEGER PRIMARY KEY, name TEXT, img TEXT, genre TEXT ,price TEXT);
// INSERT INTO games (name, genre,price, img ) VALUES ("Call of duty, "Action", "35$", "https://media-assets.wired.it/photos/6356a8d51d38110f65cfc614/2:3/w_600,h_900,c_limit/Call-of-duty-Modern-Warfare-2-cover.jpg");
// INSERT INTO games (name, img, genre,price) VALUES ("Need for speed", "https://upload.wikimedia.org/wikipedia/en/8/8e/Need_for_Speed_Most_Wanted_Box_Art.jpg?20200414185116", "https://upload.wikimedia.org/wikipedia/en/8/8e/Need_for_Speed_Most_Wanted_Box_Art.jpg?20200414185116" );

// INSERT INTO games (name, img, genre) VALUES ("Forza",  "https://s2.gaming-cdn.com/images/products/11293/orig/forza-motorsport-7-pc-xbox-one-xbox-series-x-s-xbox-one-pc-xbox-series-x-s-game-microsoft-store-united-states-cover.jpg?v=1653558083","Racing");


// INSERT INTO games (name, genre,price, img ) VALUES ("PUBG", "Battlegrounds","$ 30","https://upload.wikimedia.org/wikipedia/ru/c/c9/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%B8%D0%B3%D1%80%D1%8B_PlayerUnknown%27s_Battlegrounds.jpg");

// CREATE TABLE basket (id INTEGER PRIMARY KEY, game_id INTEGER);

//CREATE TABLE basket1 ( FOREIGN KEY (gamesId) REFERENCES games(gamesId));