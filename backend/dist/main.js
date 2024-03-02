"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const configure_1 = require("./configure");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, configure_1.configureApp)(app);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map