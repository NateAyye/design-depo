const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
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
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'projects', 
        }
    ]

});

userSchema.virtual('paletteCount').get(function () {
    return this.palettes.length;
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  const User = model('User', userSchema);
  
  module.exports = User;
  