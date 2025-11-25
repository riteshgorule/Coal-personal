import Emission from '../model/emissionModel.js';

// Roboflow API configuration - fallback to hardcoded values if env vars not loaded
const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY || '2tYUrKSaL3jcLF2ff2Jq';
const ROBOFLOW_API_URL = process.env.ROBOFLOW_API_URL || 'https://serverless.roboflow.com/coal-mine/1';

// Emission factors (kg CO2 per detection)
const EMISSION_FACTORS = {
  'coal-gangue': 15,
  'push-top': 25,
  'push-panel': 20,
  'scraper': 10,
};

// @desc    Analyze image for coal mine detection
// @route   POST /api/emissions/analyze
// @access  Private
const analyzeImage = async (req, res) => {
  try {
    const { image, imageName, location, notes } = req.body;

    if (!image) {
      res.status(400);
      throw new Error('Image data is required');
    }

    // Call Roboflow API using native fetch
    const response = await fetch(`${ROBOFLOW_API_URL}?api_key=${ROBOFLOW_API_KEY}`, {
      method: 'POST',
      body: image,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const detectionResults = await response.json();

    // Calculate emission metrics
    const metrics = calculateEmissionMetrics(detectionResults.predictions || []);

    // Save to database
    const emission = await Emission.create({
      user: req.user._id,
      imageName: imageName || 'Untitled',
      detectionResults: {
        predictions: detectionResults.predictions || [],
        image: detectionResults.image || {},
      },
      emissionMetrics: metrics,
      location,
      notes,
    });

    res.status(201).json({
      success: true,
      data: emission,
    });
  } catch (error) {
    console.error('Error analyzing image:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze image',
    });
  }
};

// @desc    Analyze image from URL
// @route   POST /api/emissions/analyze-url
// @access  Private
const analyzeImageUrl = async (req, res) => {
  try {
    const { imageUrl, imageName, location, notes } = req.body;

    if (!imageUrl) {
      res.status(400);
      throw new Error('Image URL is required');
    }

    // Call Roboflow API with URL using native fetch
    const response = await fetch(`${ROBOFLOW_API_URL}?api_key=${ROBOFLOW_API_KEY}&image=${encodeURIComponent(imageUrl)}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const detectionResults = await response.json();

    // Calculate emission metrics
    const metrics = calculateEmissionMetrics(detectionResults.predictions || []);

    // Save to database
    const emission = await Emission.create({
      user: req.user._id,
      imageName: imageName || 'Untitled',
      imageUrl,
      detectionResults: {
        predictions: detectionResults.predictions || [],
        image: detectionResults.image || {},
      },
      emissionMetrics: metrics,
      location,
      notes,
    });

    res.status(201).json({
      success: true,
      data: emission,
    });
  } catch (error) {
    console.error('Error analyzing image URL:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze image',
    });
  }
};

// @desc    Get all emissions for user
// @route   GET /api/emissions
// @access  Private
const getEmissions = async (req, res) => {
  try {
    const emissions = await Emission.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: emissions.length,
      data: emissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single emission by ID
// @route   GET /api/emissions/:id
// @access  Private
const getEmissionById = async (req, res) => {
  try {
    const emission = await Emission.findById(req.params.id);

    if (!emission) {
      res.status(404);
      throw new Error('Emission record not found');
    }

    // Check if user owns this emission
    if (emission.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to access this emission');
    }

    res.json({
      success: true,
      data: emission,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete emission
// @route   DELETE /api/emissions/:id
// @access  Private
const deleteEmission = async (req, res) => {
  try {
    const emission = await Emission.findById(req.params.id);

    if (!emission) {
      res.status(404);
      throw new Error('Emission record not found');
    }

    // Check if user owns this emission
    if (emission.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this emission');
    }

    await emission.deleteOne();

    res.json({
      success: true,
      message: 'Emission record deleted',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get emission trends and predictions
// @route   GET /api/emissions/trends
// @access  Private
const getEmissionTrends = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = { user: req.user._id };
    
    if (startDate || endDate) {
      query.analysisDate = {};
      if (startDate) query.analysisDate.$gte = new Date(startDate);
      if (endDate) query.analysisDate.$lte = new Date(endDate);
    }

    const emissions = await Emission.find(query).sort({ analysisDate: 1 });

    // Calculate trends
    const trends = calculateTrends(emissions);

    res.json({
      success: true,
      data: trends,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Helper function to calculate emission metrics
function calculateEmissionMetrics(predictions) {
  const counts = {
    coalGangueCount: 0,
    pushTopCount: 0,
    pushPanelCount: 0,
    scraperCount: 0,
  };

  let totalEmission = 0;

  predictions.forEach((pred) => {
    const className = pred.class.toLowerCase();
    
    if (className.includes('coal') || className.includes('gangue')) {
      counts.coalGangueCount++;
      totalEmission += EMISSION_FACTORS['coal-gangue'];
    } else if (className.includes('push-top')) {
      counts.pushTopCount++;
      totalEmission += EMISSION_FACTORS['push-top'];
    } else if (className.includes('push-panel') || className.includes('panel')) {
      counts.pushPanelCount++;
      totalEmission += EMISSION_FACTORS['push-panel'];
    } else if (className.includes('scraper')) {
      counts.scraperCount++;
      totalEmission += EMISSION_FACTORS['scraper'];
    }
  });

  // Determine mining intensity
  const totalDetections = Object.values(counts).reduce((a, b) => a + b, 0);
  let miningIntensity = 'low';
  if (totalDetections > 10) miningIntensity = 'high';
  else if (totalDetections > 5) miningIntensity = 'medium';

  return {
    ...counts,
    estimatedEmission: totalEmission,
    miningIntensity,
  };
}

// Helper function to calculate trends
function calculateTrends(emissions) {
  if (emissions.length === 0) {
    return {
      totalEmissions: 0,
      averageEmission: 0,
      trend: 'stable',
      prediction: null,
      timeSeries: [],
    };
  }

  const timeSeries = emissions.map((e) => ({
    date: e.analysisDate,
    emission: e.emissionMetrics.estimatedEmission,
    intensity: e.emissionMetrics.miningIntensity,
  }));

  const totalEmissions = emissions.reduce(
    (sum, e) => sum + e.emissionMetrics.estimatedEmission,
    0
  );
  const averageEmission = totalEmissions / emissions.length;

  // Simple trend calculation (comparing first half vs second half)
  const midPoint = Math.floor(emissions.length / 2);
  const firstHalfAvg =
    emissions
      .slice(0, midPoint)
      .reduce((sum, e) => sum + e.emissionMetrics.estimatedEmission, 0) / midPoint || 0;
  const secondHalfAvg =
    emissions
      .slice(midPoint)
      .reduce((sum, e) => sum + e.emissionMetrics.estimatedEmission, 0) /
      (emissions.length - midPoint) || 0;

  let trend = 'stable';
  if (secondHalfAvg > firstHalfAvg * 1.1) trend = 'increasing';
  else if (secondHalfAvg < firstHalfAvg * 0.9) trend = 'decreasing';

  // Simple linear prediction for next period
  const prediction = emissions.length >= 2 ? secondHalfAvg * 1.05 : averageEmission;

  return {
    totalEmissions,
    averageEmission,
    trend,
    prediction,
    timeSeries,
    totalAnalyses: emissions.length,
  };
}

export {
  analyzeImage,
  analyzeImageUrl,
  getEmissions,
  getEmissionById,
  deleteEmission,
  getEmissionTrends,
};
