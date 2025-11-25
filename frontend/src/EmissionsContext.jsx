// EmissionsContext.jsx
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

// Constants
const EXCAVATION_FACTOR = 94.6;
const TRANSPORTATION_FACTOR = 74.1;
const EQUIPMENT_FACTOR = 73.3;
const GWP_METHANE = 25;
const COAL_CO2_EMISSION_FACTOR = 2.2;
const COST_PER_CC = 42;

const emissionFactors = {
  'coal': 2.42,
  'oil': 3.17,
  'naturalGas': 2.75,
  'biomass': 0
};

const EmissionsContext = createContext();

export const useEmissions = () => {
  const context = useContext(EmissionsContext);
  if (!context) {
    throw new Error('useEmissions must be used within EmissionsProvider');
  }
  return context;
};

export const EmissionsProvider = ({ children }) => {
  // Load from localStorage on mount
  const [emissionRecords, setEmissionRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('emissionRecords');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading emission records from localStorage:', error);
      return [];
    }
  });

  // Save to localStorage whenever records change
  useEffect(() => {
    try {
      localStorage.setItem('emissionRecords', JSON.stringify(emissionRecords));
    } catch (error) {
      console.error('Error saving emission records to localStorage:', error);
    }
  }, [emissionRecords]);

  const [currentFormData, setCurrentFormData] = useState({
    site: '',
    location: '',
    excavation: '',
    transportation: '',
    fuel: '',
    equipment: '',
    workers: '',
    output: '',
    fuelType: '',
    reduction: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Calculate emissions from current form data
  const calculateEmissions = (formData) => {
    const excavation = parseFloat(formData.excavation) || 0;
    const transportation = parseFloat(formData.transportation) || 0;
    const fuel = parseFloat(formData.fuel) || 0;
    const equipment = parseFloat(formData.equipment) || 0;
    const workers = parseInt(formData.workers) || 1;
    const output = parseFloat(formData.output) || 1;
    const fueltype = formData.fuelType || 'coal';
    const reduced = parseFloat(formData.reduction) || 0;

    // Emission calculations
    const excavation_emissions = excavation * EXCAVATION_FACTOR;
    const transportation_emissions = transportation * TRANSPORTATION_FACTOR * 0.5;
    const equipment_emissions = equipment * EQUIPMENT_FACTOR;

    const total_emissions = excavation_emissions + transportation_emissions + equipment_emissions;
    
    // Individual per capita emissions
    const excavation_per_capita = excavation_emissions / workers;
    const transportation_per_capita = transportation_emissions / workers;
    const equipment_per_capita = equipment_emissions / workers;

    // Individual per output emissions
    const excavation_per_output = excavation_emissions / output;
    const transportation_per_output = transportation_emissions / output;
    const equipment_per_output = equipment_emissions / output;

    // Carbon credits calculation
    const annualcoal = output;
    const fuel_emission_factor = emissionFactors[fueltype] || COAL_CO2_EMISSION_FACTOR;
    const fuel_emissions = fuel * fuel_emission_factor;
    const total = annualcoal * COAL_CO2_EMISSION_FACTOR + fuel_emissions;
    const baselineemissions = total;
    const carboncredits = baselineemissions - reduced;
    const worth = carboncredits * COST_PER_CC;
    
    return {
      totalEmissions: total_emissions,
      excavationEmissions: excavation_emissions,
      transportationEmissions: transportation_emissions,
      equipmentEmissions: equipment_emissions,
      fuelEmissions: fuel_emissions,
      excavationPerCapita: excavation_per_capita,
      transportationPerCapita: transportation_per_capita,
      equipmentPerCapita: equipment_per_capita,
      excavationPerOutput: excavation_per_output,
      transportationPerOutput: transportation_per_output,
      equipmentPerOutput: equipment_per_output,
      perCapitaEmissions: total_emissions / workers,
      perOutputEmissions: total_emissions / output,
      baseline: baselineemissions,
      carboncredits: carboncredits,
      reduced: reduced,
      worth: worth,
      total: total
    };
  };

  // Current calculations based on form data
  const currentCalculations = useMemo(() => {
    return calculateEmissions(currentFormData);
  }, [currentFormData]);

  // Summary statistics
  const emissionsSummary = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const todayEmissions = emissionRecords
      .filter(r => r.date === today)
      .reduce((sum, r) => sum + (r.calculations?.totalEmissions || 0), 0);
    
    const weekEmissions = emissionRecords
      .filter(r => r.date >= lastWeek)
      .reduce((sum, r) => sum + (r.calculations?.totalEmissions || 0), 0);
    
    const monthEmissions = emissionRecords
      .filter(r => r.date >= lastMonth)
      .reduce((sum, r) => sum + (r.calculations?.totalEmissions || 0), 0);
    
    return {
      today: todayEmissions,
      week: weekEmissions,
      month: monthEmissions,
      totalRecords: emissionRecords.length
    };
  }, [emissionRecords]);

  // Add a new emission record
  const addEmissionRecord = (formData) => {
    const calculations = calculateEmissions(formData);
    const newRecord = {
      id: Date.now(),
      ...formData,
      calculations,
      timestamp: new Date().toISOString()
    };
    setEmissionRecords(prev => [...prev, newRecord]);
    return newRecord;
  };

  // Update form data
  const updateFormData = (data) => {
    setCurrentFormData(prev => ({ ...prev, ...data }));
  };

  // Reset form data
  const resetFormData = () => {
    setCurrentFormData({
      site: '',
      location: '',
      excavation: '',
      transportation: '',
      fuel: '',
      equipment: '',
      workers: '',
      output: '',
      fuelType: '',
      reduction: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  // Clear all records (optional utility function)
  const clearAllRecords = () => {
    setEmissionRecords([]);
    localStorage.removeItem('emissionRecords');
  };

  const value = {
    emissionRecords,
    currentFormData,
    currentCalculations,
    emissionsSummary,
    addEmissionRecord,
    updateFormData,
    resetFormData,
    setEmissionRecords,
    clearAllRecords,
    setCurrentFormData  
  };

  return (
    <EmissionsContext.Provider value={value}>
      {children}
    </EmissionsContext.Provider>
  );
};