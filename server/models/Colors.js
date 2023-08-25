const {Schema, model } = require('mongoose');

const colorSchema = new Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => {
                return timestamp.toISOString();
            },
        },
        hexCode: {
            type: String,
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
const Colors = model('colors', colorSchema);
module.exports = Colorss;