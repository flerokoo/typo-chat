
module.exports = function({router, app, db}) {

    router.post("/", async (req, res) => {
        let roomId = await db.createRoom()
        res.json({roomId});
    });



    app.use("/rooms", router);
}