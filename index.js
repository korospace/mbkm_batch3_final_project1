const express = require("express");
const routes = require('./routes')
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
    console.log('app started at http://localhost:'+PORT);
})
