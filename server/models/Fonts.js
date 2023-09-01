const { Schema, model } = require('mongoose');

const fontSchema = new Schema(
    {
        activeFontFamily: {
            type: String,
            required: true,
            trim: true,
        },
        fontName: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        } 
        
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: true,
    }
);

const Fonts = model('fonts', fontSchema);
module.exports = Fonts;