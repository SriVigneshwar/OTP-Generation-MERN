import mongoose from "mongoose";
import {DB_URL} from './utils';

mongoose.connect(DB_URL);

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    phone:{
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    }
});


export const User = mongoose.model('User', userSchema);


