
module.exports = function({router, app, db}) {
    
    router.get("/:roomId", async (req, res) => { 
        let messages = await db.getMessagesByRoomId(req.params.roomId);
        res.json(messages);
    });

    router.post("/", async (req, res) => {
        await db.postMessage(req.body.roomId, req.body.message)
        res.status(200).end();
    });

    app.use("/messages", router);
}