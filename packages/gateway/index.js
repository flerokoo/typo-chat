const http = require('http'),
    httpProxy = require('http-proxy'),
    consul = require("consul")({
        host: "consul",
        promisify: true
    });

const proxy = httpProxy.createProxyServer({});
const TAG = process.env.PROXY_TARGET_TAG || "api";
const PORT = parseInt(process.env.PORT) || 3000;
const OVERRIDE_TARGET_PORT = parseInt(process.env.OVERRIDE_TARGET_PORT) || undefined;

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

        let index = Math.floor(Math.random() * targetServicesKeys.length);
        let serviceInfo = targetServices[index];
        targetServicesKeys.splice(index, 1);
        proxy.web(req, res, { target: `http://${serviceInfo.Address}:${OVERRIDE_TARGET_PORT || serviceInfo.Port}` });
    }

    proxy.on("error", tryNext);

    res.on("finish", () => {
        proxy.off(tryNext);
    });

    tryNext();
    
});

console.log(`Gateway is up on port ${PORT} proxying services with tag ${TAG}`)
server.listen(PORT);