"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = 3333;
app_1.default.listen(PORT, () => {
    console.log('SERVER started port ' + PORT);
});
//# sourceMappingURL=server.js.map