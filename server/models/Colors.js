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

colorSchema.statics.countReferences = async function(hexCode) {
    try {
        const palettesCount = await this.model('Palettes').countDocuments({ hexCode });
        const gradientsCount = await this.model('Gradients').countDocuments({ hexCode });
        
        const totalCount = palettesCount + gradientsCount;
        
        return `This color appears in ${totalCount} of your designs`;
    } catch (error) {
        throw error;
    }
};


const Colors = model('colors', colorSchema);
module.exports = Colors;