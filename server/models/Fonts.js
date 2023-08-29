const {Schema, model } = require('mongoose');

const fontSchema = new Schema(
    {
       activeFontFamily: {
        type: String,
        required: true,
        trim: true,
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

const Fonts = model('fonts', fontSchema);
module.exports = Fonts;