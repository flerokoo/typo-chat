module.exports = {
    "env": {
        "client": {
            // for browsers transform everything
            "presets": [
                ["@babel/preset-env", {
                    "corejs": "3",
                    "useBuiltIns": "usage",
                }],
                "@babel/preset-react"
            ]   
        },
        "server": {
            // only use presets for JSX, generators and es6 imports
            "presets": ["@babel/preset-react"],
            "plugins": [
                "@babel/plugin-transform-modules-commonjs"
            ]  
        }
    }     
}