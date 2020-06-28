"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletAdminSchema = void 0;
const mongoose_1 = require("mongoose");
exports.WalletAdminSchema = new mongoose_1.Schema({
    userName: {
        type: String, length: 6,
        required: [true, 'Enter username with min 6 digits'], unique: true
    },
    password: {
        type: String,
        required: [true, 'Enter a password with min length 6 digits']
    },
    email: { type: String, unique: true },
    adminCode: { type: String, unique: true, required: [true, 'enter admin code'] },
    // userRole:{type:UserRole.admin},
    phoneNumber: { type: Number, unique: true, required: true, min: 10 },
    last_update: { type: Date, default: Date.now() },
    created_date: { type: Date, default: Date.now() },
});
//# sourceMappingURL=walletadminmodel.js.map