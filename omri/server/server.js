const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 8081;

const sql = require("mssql/msnodesqlv8");
const config = {
    server: "JESUS\\SQLEXPRESS",
    database: "Gestion_Tesis",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
};

sql.connect(config, function(error) {
    if (error) {
        console.log("Error connecting to the database:", error);
    } else {
        console.log('DB connected');
    }
});

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log("Server started on port", port);
});