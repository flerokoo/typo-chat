const passport = require("passport")


module.exports = function({router, app, db}) {

    const requireAuth = passport.authenticate("jwt", {session: false});
    
    router.get("/:roomId", async (req, res) => { 
        let messages = await db.getMessagesByRoomId(req.params.roomId);
        res.json(messages);
    });

    router.post("/", requireAuth, async (req, res) => {
        await db.postMessage(req.body.roomId, req.body.userId, req.body.message)
        res.status(200).end();
    });

    app.use("/messages", router);
}