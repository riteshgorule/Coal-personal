import React from 'react';

// Lightweight doughnut chart using CSS conic-gradient (no external libs)
export default function DoughnutChart({ data = {} }) {
  const excavation = Number(data.excavation || 0);
  const transportation = Number(data.transportation || 0);
  const equipment = Number(data.equipment || 0);

  const total = excavation + transportation + equipment || 0;

  const ePct = total > 0 ? (excavation / total) * 100 : 0;
  const tPct = total > 0 ? (transportation / total) * 100 : 0;
  const qPct = total > 0 ? (equipment / total) * 100 : 0;

  const eEnd = ePct;
  const tEnd = ePct + tPct;

  const c1 = '#059669'; // emerald-600 (muted)
  const c2 = '#b45309'; // amber-700 (muted)
  const c3 = '#475569'; // slate-600 (muted)

  const gradient = `conic-gradient(${c1} 0% ${eEnd}%, ${c2} ${eEnd}% ${tEnd}%, ${c3} ${tEnd}% 100%)`;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative" style={{ width: 180, height: 180 }}>
        <div
          className="rounded-full"
          style={{
            width: '180px',
            height: '180px',
            background: gradient,
            borderRadius: '9999px',
            display: 'block'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-gray-900 flex items-center justify-center" style={{ width: 110, height: 110 }}>
            <div className="text-center">
              <div className="text-white font-semibold">{total.toFixed(0)}</div>
              <div className="text-xs text-gray-400">kg CO₂</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 w-full max-w-xs">
        <div className="flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full" style={{ background: c1 }} />
            <span>Excavation</span>
          </div>
          <div className="text-gray-400">{ePct.toFixed(0)}%</div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-300 mt-2">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full" style={{ background: c2 }} />
            <span>Transportation</span>
          </div>
          <div className="text-gray-400">{tPct.toFixed(0)}%</div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-300 mt-2">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full" style={{ background: c3 }} />
            <span>Equipment</span>
          </div>
          <div className="text-gray-400">{qPct.toFixed(0)}%</div>
        </div>
      </div>
    </div>
  );
}
