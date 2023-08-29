const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const projectSchema = new Schema({
    
    userName: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,  
    },
    projectName: {
        type: String,
        required: true,
        trime: true,
    },
    palettes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'palettes',
        },
    ],

    gradients: [
        {
            type: Schema.Types.ObjectId,
            ref: 'gradients',
        },
    ],
    colors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'colors',
        }
    ],
    fonts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'colors', 
        }
    ],
});

const Projects = model('projects', projectSchema);
  
module.exports = Projects;