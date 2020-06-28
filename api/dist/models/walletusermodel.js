"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletUserSchema = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
exports.walletUserSchema = new mongoose_1.Schema({
    userName: {
        type: String, length: 6,
        required: [true, 'Enter username with min 6 digits'], unique: true
    },
    password: {
        type: String,
        required: [true, 'Enter a password with min length 6 digits']
    },
    email: { type: String, unique: true },
    // userRole:{type:UserRole.admin},
    admin: { type: mongoose.Schema.Types.ObjectId,
        ref: 'walletAdmins', required: [true, 'enter admin code'] },
    phoneNumber: { type: Number, unique: true, required: true, min: 10 },
    last_update: { type: Date, default: Date.now() },
    created_date: { type: Date, default: Date.now() },
});
//# sourceMappingURL=walletusermodel.js.map