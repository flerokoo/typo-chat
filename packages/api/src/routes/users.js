const joi = require("joi");

module.exports = function({router, app, db}) {

    const authScheme = joi.object().keys({
        username: joi.string().min(3),
        password: joi.string().min(3)
    });

    router.post("/auth", async (req, res) => {
        

        let { error, value : validatedBody } = authScheme.validate(req.body);
        
        if (error) {
            return res.json({ error })
        }

        const { username, password } = validatedBody;

        let result = await db.jwtAuthenticate(username, password);

        if (result.error) {
            return res.json({error: result.error});
        }

        res.cookie("Authorization", result.token,   
            {httpOnly: true, maxAge: 1000 * 60 * 60});

        res.json(result);
    });

    const postUserScheme = joi.object().keys({
        username: joi.string().min(3),
        password: joi.string().min(3)
    })

    router.post("/", async (req, res) => {
        let { error, value : validatedBody } = postUserScheme.validate(req.body);

        if (error) {
            return res.json({ error });
        }

        const { username, password } = validatedBody;

        await db.registerUser(username, password)
        
        let result = await db.jwtAuthenticate(username, password);
        if (result.error) {
            return res.json({error: result.error});
        }

        res.cookie("Authorization", result.token,   
            {httpOnly: true, maxAge: 1000 * 60 * 60});

        res.json(result);
    });

    router.get("/logout", async (req, res) => {
        res.clearCookie("Authorization");
        res.redirect("/")
    })

    // router.get("/", async (req, res) => {
    //     if (!req.body.username) {
    //         return res.status(404).end();
    //     }
    //     let user = await db.getUserByName(req.body.username);
    //     res.json(user);
    // });

    app.use("/users", router);
}