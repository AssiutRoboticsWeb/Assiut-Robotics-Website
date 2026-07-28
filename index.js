
const express = require('express');
const path = require("path")

const app = express();

app.use("/", express.static(__dirname + "/public"));

const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log("server is run and listen to port : ", `http://localhost:${server.address().port}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is in use, trying ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error(err);
        }
    });
};

startServer(process.env.PORT || 5000);