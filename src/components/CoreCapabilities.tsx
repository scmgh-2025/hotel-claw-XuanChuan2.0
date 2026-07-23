import React, { useState } from 'react';
import { ARCH_LAYERS } from '../data';
import { Layers } from 'lucide-react';

export default function CoreCapabilities() {
  const [activeLayer, setActiveLayer] = useState<string>('L1');

  const selectedLayer = ARCH_LAYERS.find(l => l.level === activeLayer) || ARCH_LAYERS[0];

  return (
    <div id="capabilities-section" className="bg-white rounded-3xl p-6 shadow-xl border border-brand-100">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-950">
          深厚能力储备 · 六层企业架构
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          不仅仅是一个"AI对话窗口"，我们构建了全套复杂的、符合酒店运行逻辑的底层业务本体
        </p>
      </div>

      {/* 6-Layer Architecture section */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 pb-2">
          <Layers className="w-5 h-5 text-brand-500" />
          <h3 className="font-display text-xl font-bold text-slate-900">
            六层技术架构 · 保驾护航
          </h3>
          <span className="bg-indigo-50 text-brand-900 text-sm px-2.5 py-0.5 rounded-full font-bold border border-brand-200">
            金融级云原生
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* L1 to L6 Selector Buttons */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2">
            {ARCH_LAYERS.map((layer) => {
              const isActive = activeLayer === layer.level;
              return (
                <button
                  key={layer.level}
                  onClick={() => setActiveLayer(layer.level)}
                  className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                    isActive
                      ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                      : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-sm font-black ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {layer.level}
                    </span>
                    <span className="text-sm font-bold font-display">{layer.name}</span>
                  </div>
                  <span className={`text-xs uppercase tracking-widest ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                    Active
                  </span>
                </button>
              );
            })}
          </div>

          {/* Expanded layer description card */}
          <div className="lg:col-span-8 bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <span className="font-mono text-sm font-extrabold text-brand-600 tracking-widest bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full inline-block">
              {selectedLayer.level} - {selectedLayer.name}
            </span>
            
            <div className="mt-4">
              <p className="text-sm text-brand-900 font-bold leading-relaxed mt-1 bg-brand-50 p-3 rounded-xl border border-brand-100/60">
                "{selectedLayer.translation}"
              </p>
            </div>

            <div className="mt-5">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                核心集成组件包括：
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedLayer.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100 rounded-xl p-2.5 text-sm text-slate-700 flex items-center gap-1.5 shadow-sm font-semibold"
                  >
                    <span className="text-brand-500 font-bold">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
