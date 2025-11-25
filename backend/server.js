import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';


const port = process.env.PORT || 5000;
const app = express();

// First connect DB once, not on every request
await connectDB();

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/users', userRoutes);

// const EXCAVATION_FACTOR = 94.6;  // kg CO2 per ton of coal mined
// const TRANSPORTATION_FACTOR = 74.1;  // kg CO2 per ton per km (for diesel-powered transportation)
// const EQUIPMENT_FACTOR = 73.3;  // kg CO2 per hour of equipment operation

// const GWP_METHANE = 25;  // Global Warming Potential for Methane
// const COAL_CO2_EMISSION_FACTOR = 2.2;  // Example value, tons CO2 per ton of coal
// const cost_per_cc = 42;  // average cost per carbon credit is 42$ it may vary according to various conditions

// const emissionFactors = {
//   'coal': 2.42,        // kg CO2 per kg of coal
//   'oil': 3.17,         // kg CO2 per liter of oil
//   'naturalGas': 2.75,  // kg CO2 per cubic meter of natural gas
//   'biomass': 0         // kg CO2 per kg of biomass
// };

// app.post('/calculate', (req, res) => {
//     const data = req.body;
    
//     // Inputs
//     const excavation = parseFloat(data.excavation);
//     const transportation = parseFloat(data.transportation);
//     const fuel = parseFloat(data.fuel);
//     const equipment = parseFloat(data.equipment);
//     const workers = parseInt(data.workers);
//     const output = parseFloat(data.output);
//     const fueltype = data.fuelType || 'coal';
//     const reduced = parseFloat(data.reduction);

//     // Emission calculations
//     const excavation_emissions = excavation * EXCAVATION_FACTOR;
//     const transportation_emissions = transportation * TRANSPORTATION_FACTOR * 0.5;
//     const equipment_emissions = equipment * EQUIPMENT_FACTOR;

//     const total_emissions = excavation_emissions + transportation_emissions + equipment_emissions;
    
//     // Individual per capita emissions
//     const excavation_per_capita = excavation_emissions / workers;
//     const transportation_per_capita = transportation_emissions / workers;
//     const equipment_per_capita = equipment_emissions / workers;

//     // Individual per output emissions
//     const excavation_per_output = excavation_emissions / output;
//     const transportation_per_output = transportation_emissions / output;
//     const equipment_per_output = equipment_emissions / output;

//     // calculated carbon credits
//     const annualcoal = output;
//     const fuel_emission_factor = emissionFactors[fueltype] || COAL_CO2_EMISSION_FACTOR;
//     const fuel_emissions = fuel * fuel_emission_factor;
//     const total = annualcoal * COAL_CO2_EMISSION_FACTOR + fuel_emissions;
//     const baselineemissions = total;
//     const carboncredits = baselineemissions - reduced;
//     const worth = carboncredits * cost_per_cc;
    
//     res.json({
//         totalEmissions: total_emissions,
//         excavationEmissions: excavation_emissions,
//         transportationEmissions: transportation_emissions,
//         equipmentEmissions: equipment_emissions,
//         excavationPerCapita: excavation_per_capita,
//         transportationPerCapita: transportation_per_capita,
//         equipmentPerCapita: equipment_per_capita,
//         excavationPerOutput: excavation_per_output,
//         transportationPerOutput: transportation_per_output,
//         equipmentPerOutput: equipment_per_output,
//         perCapitaEmissions: total_emissions / workers,
//         perOutputEmissions: total_emissions / output,
//         baseline: baselineemissions,
//         carboncredits: carboncredits,
//         reduced: reduced,
//         worth: worth,
//         total: total
//     });
// });

// // Defining standard constants for exploring Carbon Footprint Neutralization Pathways
// // Reference:
// /*-----Carbon Footprint Reduction from EVs: EVs typically reduce carbon emissions by 20%-30% compared to conventional vehicles (IEA, "Global EV Outlook," 2023).
// Link: https://www.iea.org/reports/global-ev-outlook-2023-----*/
// /*-----Carbon Footprint Reduction from Cleaner Fuels: Switching from coal to natural gas can reduce carbon emissions by about 50% (EPA, "Greenhouse Gas Emissions from a Typical Passenger Vehicle," 2023).
// Link: https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle-----*/
// /*-----Afforestation Sequestration Rate: Afforestation sequesters approximately 2.2 tons of carbon per hectare per year (IPCC, "Special Report on Climate Change and Land," 2019).
// Link: https://www.ipcc.ch/srccl/-----*/
// /*-----Renewable Energy Reduction: Renewable energy can reduce electricity consumption and carbon emissions by up to 30% (IRENA, "Renewable Energy and Jobs – Annual Review," 2022).
// Link: https://www.irena.org/publications/2022/Dec/Renewable-Energy-and-Jobs-Annual-Review-2022-----*/

// const EV_CONSTANT = 0.20;
// const GREEN_FUEL_CONSTANT = 0.50;
// const SEQUESTRATION_RATE = 2.2;
// const ELECTRICITY_REDUCTION_RATE = 0.3;

// app.post('/neutralise', (req, res) => {
//     const data = req.body;
//     const emissions = parseFloat(data.emissions);
//     const transportation = parseFloat(data.transportation);
//     const fuel = parseFloat(data.fuel);
    
//     // Get the user-specified percentages
//     const green_fuel_percentage = parseFloat(data.green_fuel_percentage) / 100;
//     const neutralise_percentage = parseFloat(data.neutralise_percentage) / 100;
//     const ev_transportation_percentage = parseFloat(data.ev_transportation_percentage) / 100;

//     // Calculate Emissions to be neutralised
//     const emissions_to_be_neutralised = emissions * neutralise_percentage;

//     // Calculate reductions based on the user input percentages
//     const transportation_reduction = transportation * EV_CONSTANT * ev_transportation_percentage;
//     const fuel_reduction = fuel * GREEN_FUEL_CONSTANT * green_fuel_percentage;
    
//     // Calculate the remaining emissions after applying reductions
//     const remaining_emissions = emissions_to_be_neutralised - (transportation_reduction + fuel_reduction);
    
//     // Calculate the required land for afforestation and electricity savings
//     const land_required = remaining_emissions / SEQUESTRATION_RATE;
//     const electricity_consumption = emissions_to_be_neutralised * ELECTRICITY_REDUCTION_RATE;
    
//     const overall_remaining_emissions = emissions - emissions_to_be_neutralised;
 
//     const result = {
//         emissions: emissions,
//         emissions_to_be_neutralised: emissions_to_be_neutralised,
//         transportation_footprint_reduction: transportation_reduction,
//         fuel_footprint_reduction: fuel_reduction,
//         remaining_footprint_after_reduction: remaining_emissions,
//         land_required_for_afforestation_hectares: land_required,
//         estimated_electricity_savings_mwh: electricity_consumption,
//         overall_remaining_footprint: overall_remaining_emissions,
//         message: 'Carbon footprint neutralization pathways calculated successfully.'
//     };
//      console.log("📤 Calculated Results:", result);
//     res.json(result);
// });

// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

