const {Schema, model } = require('mongoose');

const gradientSchema = new Schema(
    {
       gradientName: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 30,
       },
       color: {
            type: String,
            required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: function (timestamp) {
            return timestamp.toISOString();
        },
      },   
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
          },
          id: false,  
    }
    
);

const Gradients = model('gradients', gradientSchema);
module.exports = gradientSchema;