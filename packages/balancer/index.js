const http = require('http'),
    httpProxy = require('http-proxy'),
    consul = require("consul")({
        host: "consul",
        promisify: true
    });

const proxy = httpProxy.createProxyServer({});

const TAG = process.env.TAG || "api";

const server = http.createServer(async (req, res) => {
    let services = await consul.agent.services();
    let targetServicesKeys = Object.keys(services).filter(key => services[key].Tags.indexOf(TAG) > -1);
    let targetServices = targetServicesKeys.map(key => services[key]);

    let tryNext = () => {

        if (targetServicesKeys.length === 0) {
            res.statusCode = 503;
            res.end();
            proxy.off(tryNext);
            return; 
        }

        let index = Math.floor(Math.random() * targetServices.length);
        let serviceInfo = targetServices.splice(index, 1)[0];
        console.log(serviceInfo)
        proxy.web(req, res, { target: `http://${serviceInfo.Address}:${serviceInfo.Port}` });
    }

    proxy.on("error", tryNext);

    res.on("finish", () => {
        proxy.off(tryNext);
    });

    tryNext();
    
});

console.log("listening on port 5050")
server.listen(5050);