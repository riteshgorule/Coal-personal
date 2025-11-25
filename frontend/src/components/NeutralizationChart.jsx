import React from 'react';

// Simple horizontal stacked bar visualization using divs
export default function NeutralizationChart({ data = {} }) {
  // Use absolute values: transport reduction, fuel reduction, and overall remaining emissions
  const transport = Number(data.transportation_footprint_reduction ?? 0);
  const fuel = Number(data.fuel_footprint_reduction ?? 0);
  // prefer overall_remaining_footprint (remaining after all reductions) for visibility
  const remaining = Number(data.overall_remaining_footprint ?? data.remaining_footprint_after_reduction ?? 0);
  const emissionsTotal = Number(data.emissions ?? 0) || 1;

  // scale bars against the total emissions (so bars represent absolute kg CO2 amounts)
  const total = Math.max(emissionsTotal, transport, fuel, remaining, 1);

  const tPct = (transport / total) * 100;
  const fPct = (fuel / total) * 100;
  const rPct = (remaining / total) * 100;

  // Choose colors similar to screenshot (pink, teal, muted)
  const cTransport = '#f472b6'; // pink
  const cFuel = '#3dd0bf'; // teal-ish
  const cRemaining = '#64748b'; // slate muted

  // max value for scale (round up to a clean grid)
  const rawMax = Math.max(total, 1);
  const tickCount = 4;
  const tickStep = Math.ceil(rawMax / tickCount) || 1;
  const maxScale = tickStep * tickCount;
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => i * tickStep).reverse();

  const isDataEmpty = transport <= 0 && fuel <= 0 && remaining <= 0;

  return (
    <div className="w-full">
      <div className="w-full h-72 bg-transparent flex items-end">
        {/* Y axis ticks */}
        <div className="w-12 pr-3 flex flex-col justify-between h-full text-xs text-gray-400">
          {ticks.map((t, i) => (
            <div key={i} className="text-right">{t}</div>
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 h-full relative">
          {/* horizontal grid lines */}
          <div className="absolute inset-0">
            {ticks.map((_, i) => (
              // draw grid lines at proportional positions; ticks.length-1 == tickCount
              <div key={i} className="absolute left-0 right-0" style={{ top: `${(i / (ticks.length - 1)) * 100}%`, height: 1, background: 'rgba(255,255,255,0.03)' }} />
            ))}
          </div>

          {isDataEmpty ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p>No neutralization data to display.</p>
                <p className="text-xs">Enter some emissions and neutralization strategies to see the chart.</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-end justify-around px-6">
              {/* Transport bar */}
              <div className="flex flex-col items-center w-1/4">
                <div className="w-full flex items-end justify-center">
                  <div className="relative w-2/3 rounded-t-lg" style={{ height: `${Math.max((transport / maxScale) * 100, 6)}%`, background: cTransport, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs text-white font-semibold bg-black/30 px-1 rounded">{transport.toFixed(2)} kg CO2</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-300">EV Reduction</div>
              </div>

              {/* Fuel bar */}
              <div className="flex flex-col items-center w-1/4">
                <div className="w-full flex items-end justify-center">
                  <div className="relative w-2/3 rounded-t-lg" style={{ height: `${Math.max((fuel / maxScale) * 100, 6)}%`, background: cFuel, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs text-white font-semibold bg-black/30 px-1 rounded">{fuel.toFixed(2)} kg CO2</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-300">Green Fuel</div>
              </div>

              {/* Remaining bar */}
              <div className="flex flex-col items-center w-1/4">
                <div className="w-full flex items-end justify-center">
                  <div className="relative w-2/3 rounded-t-lg" style={{ height: `${Math.max((remaining / maxScale) * 100, 6)}%`, background: cRemaining, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs text-white font-semibold bg-black/30 px-1 rounded">{remaining.toFixed(2)} kg CO2</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-300">Remaining</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
