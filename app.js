// import del modulo path
const path = require("path");

// Setup server with express
const express = require("express");
const app = express();
const port = 3000;

// import dei router
const blogRouter = require("./routers/blogRouter.js");
const docsRouter = require("./routers/docs.js");

// Import dei middlewares:
const routersLogger = require("./middlewares/routersLogger.js")
const routeNotFound = require("./middlewares/routeNotFound.js")
const errorDetector = require("./middlewares/errorsDetector.js");

//aggiungo il middleware che si occupa della cartella public
app.use(express.static('./public'));

// questo comando permette di ricevere chiamate in post/put e di leggerne il body
//? controlla se il content-type della request è application/json
//? in tal caso fà si che il body della request venga codificato correttamente
app.use(express.json());

// Middleware per parsare application/x-www-form-urlencoded
// il pacchetto utilizza la funzionalità urlencoded (con pacchetto avanzato per la lettura della query)
//? per controllare se il content-type della request è urlencoded, in tal caso fà si che il 
//? body della request venga creato e letto dall'app
app.use(express.urlencoded({ extended: true }));

// console log delle rotte prese
app.use(routersLogger);

//! ROUTES: lista delle rotte
// Imposto la rotta Home e restituisco una vista standard
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, './index.html');
    res.sendFile(filePath);
})

app.use('/posts', blogRouter);
app.use('/docs', docsRouter);

//? SE la rotta richiesta non è settata restituisco un errore 
app.use(routeNotFound);

// lancio gli errori se presenti
app.use(errorDetector);

app.listen(port, () => {
    console.log(`Server avviato alla porta http://localhost:${port}.`);
})