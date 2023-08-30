const { Schema, model } = require('mongoose');

const gradientSchema = new Schema(
  {
    gradientName: {
      type: String,
      required: true,
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
    id: false,
  }

);

const Gradients = model('gradients', gradientSchema);
module.exports = Gradients;