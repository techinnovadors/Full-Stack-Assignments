const express = require('express');
const app = express();
const port = "8080";



//Route I have created
// app.get('/articles', (req, res) => {
//     res.send("On Articles Page!")
// });

app.get('/articles', (req, res) => {
    res.setHeader('content-type', 'text/html');

    res.send("<b>On Articles Page! POST METHOD</b>")
});

app.get('/articles/rest-api', (req, res) => {

    const responseObj = {
        data: 'Article Info',
        messsage: 'API Call Successful'
    };
    res.json(responseObj)
});



app.get('/getAvengers', (req, res) => {
    res.json([{
        name: "black-widow.jpg",
        alt: "The Black widow is my fav"
    }, {
        name: "iron-man.jpg",
        alt: "I am IRON MAN"
    }, {
        name: "captain-marvel.jpg",
        alt: "The Prettiest"
    }, {
        name: "dr-strange.jpg",
        alt: "It's precisely what's kept you from greatness"
    }, {
        name: "the-hulk.jpg",
        alt: "It's like I was MEANT FOR THIS"
    }, {
        name: "thor.jpg",
        alt: "Bring me THANOS!!!!"
    }, {
        name: "hawk-eye.jpg",
        alt: "The Black widow forever"
    }, {
        name: "spiderman.jpg",
        alt: "Big FAN Of CAP"
    }]);
})
app.get('/articles/:article_id', (req, res) => {

    var article_id = req.params.article_id;


    const Article = get_article_by_id(article_id);
    const responseObj = {
        data: {
            res: Article
        },
        messsage: 'API Call Successful'
    }

    res.json(responseObj)
});


app.get('/:city/:location', (req, res) => {

    var city = req.params.city;
    var location = req.params.location;
    res.send(`My URL has city as ${city} and location as ${location}`)

});


app.get('*', (req, res) => {

    res.send(`My Default URL`)

});





app.listen(port, () => {
    console.log(`Listening at http://localhost:${port} `)
})