const express = require("express");
const consul = require("consul")({
    host: "consul",
    promisify: true
});


const PORT = parseInt(process.env.PORT) || 3000;
const HOST = require("os").hostname();
const NAME = `web-app-${HOST}-${PORT}`;

consul.agent.service.register({
    name: NAME,
    address: HOST,
    port: PORT,
    tags: ["web-app"]
});


const app = express()

app.get("/", (req, res) => {
    res.write("WEBAPP");
    res.end();
})

app.listen(PORT)