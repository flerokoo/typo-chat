
module.exports = function({router, app, db}) {

    router.post("/", async (req, res) => {
        await db.registerUser(req.body.username, req.body.password)
        res.status(200).end();
    });

    app.use("/users", router);
}