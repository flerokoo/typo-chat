
module.exports = function({router, app, db}) {

    router.post("/", async (req, res) => {

        let roomId = null;

        if (req.body.roomId) {
            const existing = await db.getRoom(req.body.roomId);            
            roomId = existing ? existing._id : null;
        } 
        
        if (!roomId) {
            roomId = await db.createRoom();
        }
        
        res.json({roomId});
    });



    app.use("/rooms", router);
}