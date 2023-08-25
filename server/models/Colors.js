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

colorSchema.statis.countReferences = async function(hexCode) {
    try {
        const count = await this.model('Palettes', 'Gradients').countDocuments({ hexCode});
        return `This color appears in ${count} of your designs`;
    } catch (error) {
        throw error;
    }
};

const Colors = model('colors', colorSchema);
module.exports = Colors;