import mongoose from 'mongoose';

const emissionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    imageName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    detectionResults: {
      predictions: [{
        class: String,
        confidence: Number,
        x: Number,
        y: Number,
        width: Number,
        height: Number,
      }],
      image: {
        width: Number,
        height: Number,
      },
    },
    emissionMetrics: {
      coalGangueCount: { type: Number, default: 0 },
      pushTopCount: { type: Number, default: 0 },
      pushPanelCount: { type: Number, default: 0 },
      scraperCount: { type: Number, default: 0 },
      estimatedEmission: { type: Number, default: 0 }, // in kg CO2
      miningIntensity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    },
    notes: {
      type: String,
    },
    location: {
      type: String,
    },
    analysisDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Emission = mongoose.model('Emission', emissionSchema);

export default Emission;
