const passport = require("passport")
const joi = require("joi")

module.exports = function({router, app, db}) {

    const requireAuth = passport.authenticate("jwt", {session: false});

    const getMessagesScheme = joi.object().keys({
        roomId: joi.string().regex(/^[0-9a-fA-F]{24}$/)
    })
    
    router.get("/:roomId", async (req, res) => { 
        let { error, value : validatedParams } = getMessagesScheme.validate(req.params)

        if (error) {
            return res.json({ error: "Invalid room id"});
        }

        let messages = await db.getMessagesByRoomId(validatedParams.roomId);
        res.json(messages);
    });

    const postMessageScheme = joi.object().keys({
        roomId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
        userId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
        text: joi.string().min(1)
    });

    router.post("/", requireAuth, async (req, res) => {
        let { error, value : validatedBody } = postMessageScheme.validate(req.body);

        if (error) {
            return res.json({ error });
        }

        const { roomId, userId, text } = validatedBody;

        await db.postMessage(roomId, userId, text)
        res.status(200).end();
    });

    app.use("/messages", router);
}