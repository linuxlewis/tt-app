"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureApp = void 0;
const session = require("express-session");
const configureApp = (app) => {
    app.enableCors({ credentials: true, origin: "http://localhost:3000" });
    app.use(session({
        secret: "my-secret",
        resave: false,
        saveUninitialized: true,
    }));
};
exports.configureApp = configureApp;
//# sourceMappingURL=configure.js.map