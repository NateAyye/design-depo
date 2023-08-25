const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const paletteSchema = new Schema(
    {
        paletteName: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 60,
        },
            createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => {
                return timestamp.toISOString();
            },
        },
        color1: {
            type: String,
            required: true,
            match: /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
        },
        color2: {
            type: String,
            required: true,
            match: /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
        },
        color3: {
            type: String,
            required: true,
            match: /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
        },
        color4: {
            type: String,
            required: true,
            match: /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
        },
        color5: {
            type: String,
            required: true,
            match: /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
          },
          id: true,  
    }
);
paletteSchema.virtual('colors').get(function() {
    return [this.color1, this.color2, this.color3, this.color4, this.color5];
});


const Palettes = model('palettes', paletteSchema);
module.exports = Palettes;