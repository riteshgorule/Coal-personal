import { useEmissions } from '../EmissionsContext.jsx';
import NeutralizationChart from '../components/NeutralizationChart';
import { useState, useMemo } from 'react';

export default function Neutralisation() {
  const { emissionRecords } = useEmissions();
  // Neutralisation controls state
  const [evConversionPercentage, setEvConversionPercentage] = useState(10);
  const [neutralizePercentage, setNeutralizePercentage] = useState(50);
  const [greenFuelPercentage, setGreenFuelPercentage] = useState(10);

  const neutralisationResults = useMemo(() => {
    // aggregate totals from emissionRecords
    const emissionFactors = { coal: 2.42, oil: 3.17, naturalGas: 2.75, biomass: 0 };

    const totals = emissionRecords.reduce((acc, r) => {
      const calc = r.calculations || {};
      acc.excavation += Number(calc.excavationEmissions || 0);
      acc.transportation += Number(calc.transportationEmissions || 0);
      acc.equipment += Number(calc.equipmentEmissions || 0);

      // fuel emissions: prefer calculated value, otherwise compute from stored fuel and fuelType
      const fuelFromCalc = Number(calc.fuelEmissions || 0);
      const fuelInput = Number(r.fuel || 0);
      const fuelType = r.fuelType || 'coal';
      const factor = emissionFactors[fuelType] ?? 2.2;
      const fuelFromInput = fuelInput * factor;
      acc.fuel += fuelFromCalc > 0 ? fuelFromCalc : fuelFromInput;

      acc.baseline += Number(calc.baseline || 0);
      return acc;
    }, { excavation: 0, transportation: 0, equipment: 0, fuel: 0, baseline: 0 });

    const emissions = totals.baseline;
    const emissions_to_be_neutralised = emissions * (neutralizePercentage / 100);

    // transportation reduction via EV conversion
    const transportation_footprint_reduction = totals.transportation * (evConversionPercentage / 100);

    // Use the actual aggregated fuel emissions (from calculations) for fuel reduction
    const fuel_component = totals.fuel || 0;
    const fuel_footprint_reduction = fuel_component * (greenFuelPercentage / 100);

    const total_reduction = transportation_footprint_reduction + fuel_footprint_reduction;

    const remaining_footprint_after_reduction = Math.max(0, emissions_to_be_neutralised - total_reduction);

    // assume sequestration 7 tCO2 per hectare per year; convert kg to tonnes if needed
    // We'll assume emissions are in kg; convert to tonnes
    const sequestration_t_per_hectare = 7;
    const land_required_for_afforestation_hectares = (remaining_footprint_after_reduction / 1000) / sequestration_t_per_hectare;

    // estimate electricity savings: assume 0.5 kg CO2 per kWh
    const estimated_electricity_savings_mwh = total_reduction / 500; // (kg)/(kg per MWh)

    const overall_remaining_footprint = Math.max(0, emissions - total_reduction);

    return {
      emissions,
      emissions_to_be_neutralised,
      transportation_footprint_reduction,
      fuel_footprint_reduction,
      total_reduction,
      remaining_footprint_after_reduction,
      land_required_for_afforestation_hectares,
      estimated_electricity_savings_mwh,
      overall_remaining_footprint
    };

  }, [emissionRecords, evConversionPercentage, neutralizePercentage, greenFuelPercentage]);

  // Debug: log aggregated totals to help diagnose chart rendering
  console.debug('Neutralisation totals:', {
    records: emissionRecords.length,
    evConversionPercentage,
    neutralizePercentage,
    greenFuelPercentage,
    neutralisationResults
  });

  // neutralisationResults is recalculated via useMemo when inputs change

  return (
    <div className="min-h-screen pt-24 bg-gray-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Carbon Neutralisation</h1>
          <p className="text-gray-400">Explore pathways to neutralise your emissions</p>
        </div>

        <div className="mt-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">Explore Neutralisation Pathways</h3>

            <label className="block text-sm font-medium text-gray-200 mt-2">Electric Vehicle Conversion:</label>
            <input
              type="range"
              value={evConversionPercentage}
              onChange={(e) => setEvConversionPercentage(Number(e.target.value))}
              min="0"
              max="100"
              className="mt-1 w-full"
            />
            <p className="text-sm text-gray-400">{evConversionPercentage}%</p>

            <label className="block text-sm font-medium text-gray-200 mt-2">Neutralize Footprint:</label>
            <input
              type="range"
              value={neutralizePercentage}
              onChange={(e) => setNeutralizePercentage(Number(e.target.value))}
              min="10"
              max="100"
              className="mt-1 w-full"
            />
            <p className="text-sm text-gray-400">{neutralizePercentage}%</p>

            <label className="block text-sm font-medium text-gray-200 mt-2">Shift to Green Fuel:</label>
            <input
              type="range"
              value={greenFuelPercentage}
              onChange={(e) => setGreenFuelPercentage(Number(e.target.value))}
              min="0"
              max="100"
              className="mt-1 w-full"
            />
            <p className="text-sm text-gray-400">{greenFuelPercentage}%</p>

            {neutralisationResults && (
              <div className="mt-8 text-gray-200">
                <h3 className="text-xl font-semibold mb-4">Neutralisation Pathways To Achieve {neutralizePercentage}% Of The Carbon Footprint</h3>
                <p >Total Carbon Footprint: <span className="font-bold">{(neutralisationResults.emissions ?? 0).toFixed(2)} kg CO2</span></p>
                <p className='py-2'>Target Carbon Footprint To Be Neutralised: <span className="font-bold">{(neutralisationResults.emissions_to_be_neutralised ?? 0).toFixed(2)} kg CO2</span></p>

                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <h4 className="text-lg font-semibold text-white">EV Transportation</h4>
                  <p>CO2 Reduction Obtained By Converting {evConversionPercentage}% Of Transportation To EV: <span className="font-bold">{(neutralisationResults.transportation_footprint_reduction ?? 0).toFixed(2)} kg CO2</span></p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <h4 className="text-lg font-semibold text-white">Green Fuel</h4>
                  <p>CO2 Reduction Obtained By Replacing {greenFuelPercentage}% Fuel With Green Fuel: <span className="font-bold">{(neutralisationResults.fuel_footprint_reduction ?? 0).toFixed(2)} kg CO2</span></p>
                </div>

                <p className='py-2'>Remaining Emissions To Be Reduced After Following Above Steps: <span className="font-bold">{(neutralisationResults.remaining_footprint_after_reduction ?? 0).toFixed(2)} kg CO2</span></p>

                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <h4 className="text-lg font-semibold text-white">Afforestation</h4>
                  <p>Land Required For Afforestation To Neutralise The Remaining Emissions: <span className="font-bold">{(neutralisationResults.land_required_for_afforestation_hectares ?? 0).toFixed(2)} hectares</span></p>
                </div>

                <p className='py-2'>Estimated Electricity Savings: <span className="font-bold">{(neutralisationResults.estimated_electricity_savings_mwh ?? 0).toFixed(2)} MWh</span></p>

                <p>Remaining Emissions After Following Complete Steps: <span className="font-bold">{(neutralisationResults.overall_remaining_footprint ?? 0).toFixed(2)} kg CO2</span> </p>
                <div className='mt-8'>
                  <h3 className='text-lg font-semibold text-center'>Neutralisation Pathway Chart</h3>
                  {neutralisationResults && <NeutralizationChart data={neutralisationResults} />}
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}