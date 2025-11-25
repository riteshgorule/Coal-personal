import asyncHandler from 'express-async-handler';
import XLSX from 'xlsx';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

// @desc    Get mine data from Excel file
// @route   GET /api/data/mines
// @access  Public
const getMineData = asyncHandler(async (req, res) => {
  console.log('getMineData called');
  try {
    // Path to the JSON file
    const jsonFilePath = path.join(process.cwd(), '..', 'data', 'Global-Coal-Mine-Tracker-May-2025-V2.json');
    console.log('Looking for file at:', jsonFilePath);
    
    // Check if file exists
    if (!fs.existsSync(jsonFilePath)) {
      console.log('File not found!');
      res.status(404);
      throw new Error('Mine data file not found');
    }

    // Read the JSON file
    const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    
    // Extract mine data from the JSON structure
    let mineData = [];
    if (data['GCMT Non-closed Mines']) {
      mineData = data['GCMT Non-closed Mines'];
    }
    
    // Filter for Indian mines and extract required fields
    const mines = mineData
      .filter(mine => mine && mine['Country / Area'] === 'India' && mine['Mine Name'] && mine.Latitude && mine.Longitude)
      .slice(0, 100) // Limit to first 100 mines for performance
      .map(mine => ({
        'Mine Name': mine['Mine Name'],
        Latitude: parseFloat(mine.Latitude),
        Longitude: parseFloat(mine.Longitude),
        Capacity: mine['Capacity (Mtpa)'] || 'N/A',
        Production: mine['Production (Mtpa)'] || 'N/A',
        'CO2 Emissions': mine['GEM Coal Mine Methane Emissions Estimate (M tonnes/yr)'] || 'N/A',
        Country: mine['Country / Area'],
        State: mine['State, Province'],
        Status: mine.Status,
        Type: mine['Mine Type'],
        'Coal Type': mine['Coal Type'],
        'Coal Grade': mine['Coal Grade'],
        'Mine Size': mine['Mine Size (Km2)'] || 'N/A',
        'Workforce Size': mine['Workforce Size'] || 'N/A',
        'Opening Year': mine['Opening Year'] || 'N/A',
        Location: mine.Location,
        District: mine['Prefecture, District']
      }));

    res.json(mines);
  } catch (error) {
    console.error('Error reading mine data:', error);
    res.status(500);
    throw new Error('Failed to read mine data: ' + error.message);
  }
});

// @desc    Get coal mine statistics for dashboard
// @route   GET /api/data/statistics
// @access  Public
const getMineStatistics = asyncHandler(async (req, res) => {
  console.log('getMineStatistics called');
  try {
    // Path to the JSON file
    const jsonFilePath = path.join(process.cwd(), '..', 'data', 'Global-Coal-Mine-Tracker-May-2025-V2.json');
    console.log('Looking for file at:', jsonFilePath);
    
    // Check if file exists
    if (!fs.existsSync(jsonFilePath)) {
      console.log('File not found!');
      res.status(404);
      throw new Error('Mine data file not found');
    }

    // Read the JSON file
    const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    
    // Extract mine data from the JSON structure
    let mineData = [];
    if (data['GCMT Non-closed Mines']) {
      mineData = data['GCMT Non-closed Mines'];
    }
    
    // Filter for Indian mines
    const indianMines = mineData.filter(mine => mine && mine['Country / Area'] === 'India');
    
    // Calculate statistics
    const totalMines = indianMines.length;
    const operatingMines = indianMines.filter(mine => mine.Status === 'Operating').length;
    const proposedMines = indianMines.filter(mine => mine.Status === 'Proposed').length;
    const underConstructionMines = indianMines.filter(mine => mine.Status === 'Under construction').length;
    
    // Calculate total capacity and production
    let totalCapacity = 0;
    let totalProduction = 0;
    let totalEmissions = 0;
    let totalWorkforce = 0;
    
    const stateDistribution = {};
    const coalTypeDistribution = {};
    
    indianMines.forEach(mine => {
      // Capacity
      if (mine['Capacity (Mtpa)'] && mine['Capacity (Mtpa)'] !== '*' && !isNaN(parseFloat(mine['Capacity (Mtpa)']))) {
        totalCapacity += parseFloat(mine['Capacity (Mtpa)']);
      }
      
      // Production
      if (mine['Production (Mtpa)'] && !isNaN(parseFloat(mine['Production (Mtpa)']))) {
        totalProduction += parseFloat(mine['Production (Mtpa)']);
      }
      
      // Emissions
      if (mine['GEM Coal Mine Methane Emissions Estimate (M tonnes/yr)'] && !isNaN(parseFloat(mine['GEM Coal Mine Methane Emissions Estimate (M tonnes/yr)']))) {
        totalEmissions += parseFloat(mine['GEM Coal Mine Methane Emissions Estimate (M tonnes/yr)']);
      }
      
      // Workforce
      if (mine['Workforce Size'] && !isNaN(parseFloat(mine['Workforce Size']))) {
        totalWorkforce += parseFloat(mine['Workforce Size']);
      }
      
      // State distribution
      const state = mine['State, Province'];
      if (state) {
        stateDistribution[state] = (stateDistribution[state] || 0) + 1;
      }
      
      // Coal type distribution
      const coalType = mine['Coal Type'];
      if (coalType) {
        coalTypeDistribution[coalType] = (coalTypeDistribution[coalType] || 0) + 1;
      }
    });
    
    const statistics = {
      totalMines,
      operatingMines,
      proposedMines,
      underConstructionMines,
      totalCapacity: Math.round(totalCapacity * 100) / 100,
      totalProduction: Math.round(totalProduction * 100) / 100,
      totalEmissions: Math.round(totalEmissions * 100) / 100,
      totalWorkforce,
      stateDistribution: Object.entries(stateDistribution)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {}),
      coalTypeDistribution
    };

    res.json(statistics);
  } catch (error) {
    console.error('Error reading mine statistics:', error);
    res.status(500);
    throw new Error('Failed to read mine statistics: ' + error.message);
  }
});

// @desc    Proxy request to Ambee API (Rate limit: 100 calls per day)
// @route   GET /api/data/ambee/latest
// @access  Public
const proxyAmbeeRequest = asyncHandler(async (req, res) => {
  try {
    // Check if API key is configured
    if (!process.env.AMBEE_API_KEY) {
      res.status(500);
      throw new Error('Ambee API key not configured');
    }

    const { lat, lng } = req.query;
    
    if (!lat || !lng) {
      res.status(400);
      throw new Error('Latitude and longitude are required');
    }

    // Make request to Ambee API
    const response = await axios.get(
      'https://api.ambeedata.com/latest/by-lat-lng',
      {
        params: {
          lat,
          lng
        },
        headers: {
          'x-api-key': process.env.AMBEE_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Ambee API error:', error.response?.data || error.message);
    
    if (error.response) {
      res.status(error.response.status);
      res.json(error.response.data);
    } else {
      res.status(500);
      throw new Error('Failed to connect to Ambee API: ' + error.message);
    }
  }
});

export { getMineData, getMineStatistics, proxyAmbeeRequest };