
module.exports = function({router, app, db}) {
    router.post("/auth", async (req, res) => {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.json({ error: "Not enough data"})
        }

        let result = await db.jwtAuthenticate(username, password);

        if (result.error) {
            return res.json({error: result.error});
        }

        res.json(result);
    });

    router.post("/", async (req, res) => {
        await db.registerUser(req.body.username, req.body.password)
        res.status(200).end();
    });

    router.get("/", async (req, res) => {
        if (!req.body.username) {
            return res.status(404).end();
        }
        let user = await db.getUserByName(req.body.username);
        res.json(user);
    });

    app.use("/users", router);
}