import React from 'react';
import { COMPANY_BACKS } from '../data';
import { ShieldCheck, Landmark, Award, BadgeAlert, KeyRound } from 'lucide-react';

export default function CompanyBackground() {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Landmark className="w-5 h-5 text-indigo-600" />;
      case 1: return <Award className="w-5 h-5 text-indigo-600" />;
      case 2: return <KeyRound className="w-5 h-5 text-indigo-600" />;
      default: return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div id="company-background" className="bg-white rounded-3xl p-6 shadow-xl border border-brand-100">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-950">
          国企资本 · 专精特新 · 央行牌照
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          三重巨头实力联合打造，确保技术最靠谱、资金最安全、数据最合规
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {COMPANY_BACKS.map((co, idx) => {
          return (
            <div
              key={co.name}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded-xl p-2.5 shadow-sm border border-slate-100">
                    {getIcon(idx)}
                  </div>
                  <span className="text-lg font-black text-brand-700 bg-brand-50 border border-brand-100 px-3.5 py-2 rounded-lg">
                    {co.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-base font-black text-slate-800 leading-tight">
                    {co.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mt-2 font-medium">
                    {co.desc.map((seg: { text: string; bold: boolean }, i: number) =>
                      seg.bold
                        ? <span key={i} className="text-slate-700">{seg.text}</span>
                        : <span key={i}>{seg.text}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Triple Security Guarantee Bar */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center gap-3 border border-slate-800">
          <span className="text-2xl">🔒</span>
          <div className="text-left">
            <h4 className="text-base font-bold text-slate-200">上市公司级安全</h4>
            <p className="text-sm text-slate-500">双重沙箱隔离 · 绝对保护住客隐私</p>
          </div>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center gap-3 border border-slate-800">
          <span className="text-2xl">💳</span>
          <div className="text-left">
            <h4 className="text-base font-bold text-slate-200">央行支付合规</h4>
            <p className="text-sm text-slate-500">佣金提成秒清算 · 交易流水无缝入账</p>
          </div>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center gap-3 border border-slate-800">
          <span className="text-2xl">🛰️</span>
          <div className="text-left">
            <h4 className="text-base font-bold text-slate-200">行业顶尖底盘</h4>
            <p className="text-sm text-slate-500">百度/阿里/微软顶尖专家大模型算法</p>
          </div>
        </div>
      </div>
    </div>
  );
}
