import React, { useState } from 'react';
import { Calculator, TrendingUp, Sparkles, HelpCircle, ShieldCheck, ChevronDown } from 'lucide-react';

export default function RoiCalculator() {
  const [rooms, setRooms] = useState<number>(80);
  const [adr, setAdr] = useState<number>(350);
  const [occupancy, setOccupancy] = useState<number>(70);
  const [expanded, setExpanded] = useState<{ staff: boolean; specialty: boolean; ota: boolean; total: boolean; saas: boolean }>({
    staff: false,
    specialty: false,
    ota: false,
    total: false,
    saas: false,
  });

  const staffOptimizedRaw = Math.min(3, Math.max(0.3, (rooms / 80) * 0.75));
  const staffOptimizedMultiplier = Math.round(staffOptimizedRaw * 10) / 10;
  const averageStaffSalary = 4500;
  const annualStaffSaved = Math.round(staffOptimizedMultiplier * averageStaffSalary * 12);
  const dailyCallsHandled = Math.round(rooms * (occupancy / 100) * 1.5 * 0.6);
  const annualCallsHandled = dailyCallsHandled * 365;
  const annualRoomNights = Math.round(rooms * 365 * (occupancy / 100));
  const specialtyConversion = 0.10;
  const averageSpecialtyCommission = 5;
  const annualSpecialtyRevenue = Math.round(annualRoomNights * specialtyConversion * averageSpecialtyCommission);
  const privateRepeatConversion = 0.03;
  const otaCommissionRate = 0.15;
  const annualOtaSaved = Math.round(annualRoomNights * privateRepeatConversion * adr * otaCommissionRate);

  let monthlyCost = 99;
  let tier = '专业版 (Pro)';
  if (rooms <= 50) {
    monthlyCost = 59;
    tier = '基础版';
  } else if (rooms > 150) {
    monthlyCost = 299;
    tier = '旗舰尊享版 (Pro+)';
  }
  const annualSaaS = monthlyCost * 12;

  const totalBenefit = annualStaffSaved + annualSpecialtyRevenue + annualOtaSaved;
  const netProfit = totalBenefit - annualSaaS;
  const staffOptimized = staffOptimizedMultiplier.toFixed(1);

  const toggleExpand = (key: 'staff' | 'specialty' | 'ota' | 'total' | 'saas') => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div id="roi-calculator" className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-slate-800 rounded-3xl p-6 shadow-lg border border-blue-100 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="text-center max-w-2xl mx-auto mb-8 border-b border-blue-100 pb-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <Calculator className="w-6 h-6 text-brand-500" /> 智能体增收提效 · 收益测算器
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          输入您的酒店基本指标，一键透视 AI 系统带来的年度降本增收红利
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs Controls */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-blue-100 shadow-sm space-y-5">
          <h3 className="text-base font-bold uppercase tracking-widest text-slate-500 border-b border-blue-50 pb-2 flex items-center gap-1.5">✏️ 填写酒店基础指标</h3>

          {/* Rooms Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-base font-semibold">
              <span className="text-slate-600">房间数量 (间)</span>
              <span className="text-brand-500 font-bold">{rooms} 间</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full accent-brand-500 bg-blue-100 rounded-lg appearance-none h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-sm text-slate-400">
              <span>10间</span>
              <span>500间</span>
            </div>
          </div>

          {/* ADR Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-base font-semibold">
              <span className="text-slate-600">平均房价 (ADR - 元)</span>
              <span className="text-brand-500 font-bold">¥{adr} 元/晚</span>
            </div>
            <input
              type="range"
              min="100"
              max="1500"
              step="10"
              value={adr}
              onChange={(e) => setAdr(Number(e.target.value))}
              className="w-full accent-brand-500 bg-blue-100 rounded-lg appearance-none h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-sm text-slate-400">
              <span>¥100</span>
              <span>¥1500</span>
            </div>
          </div>

          {/* Occupancy Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-base font-semibold">
              <span className="text-slate-600">年均入住率 (%)</span>
              <span className="text-brand-500 font-bold">{occupancy}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="1"
              value={occupancy}
              onChange={(e) => setOccupancy(Number(e.target.value))}
              className="w-full accent-brand-500 bg-blue-100 rounded-lg appearance-none h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-sm text-slate-400">
              <span>30%</span>
              <span>100% (常年满房)</span>
            </div>
          </div>

          {/* Software Cost Info banner */}
          <div
            onClick={() => toggleExpand('saas')}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3.5 rounded-xl border border-blue-100 text-center cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="text-sm text-slate-500">酒店智能体 SaaS 投入</div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expanded.saas ? 'rotate-180' : ''}`} />
            </div>
            <div className="text-3xl font-display font-extrabold text-brand-600 mt-1">
              ¥{monthlyCost} <span className="text-base font-normal text-slate-500">/ 月</span>
            </div>
            <div className="text-sm text-slate-600 font-semibold mt-1">
              配置系统：{tier} (年缴：¥{annualSaaS})
            </div>
            <div className="text-sm text-slate-400 mt-1">
              *一套年费通常仅需五间房费，超低入场门槛
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${expanded.saas ? 'max-h-[400px] mt-3' : 'max-h-0'}`}>
              <div className="pt-3 border-t border-blue-100 space-y-2 text-left">
                <div className="text-sm font-bold text-slate-600">📋 版本判定规则</div>
                <div className={`rounded-lg p-3 border ${rooms <= 50 ? 'bg-brand-50 border-brand-200' : 'bg-white border-blue-100'}`}>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-700">基础版</div>
                    <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${rooms <= 50 ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {rooms <= 50 ? '当前版本' : '≤ 50 间'}
                    </div>
                  </div>
                  <div className="text-brand-600 font-bold mt-1">¥59 / 月</div>
                  <div className="text-xs text-slate-500 mt-0.5">适合小型民宿、精品客栈</div>
                </div>
                <div className={`rounded-lg p-3 border ${rooms > 50 && rooms <= 150 ? 'bg-brand-50 border-brand-200' : 'bg-white border-blue-100'}`}>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-700">专业版 (Pro)</div>
                    <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${rooms > 50 && rooms <= 150 ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {rooms > 50 && rooms <= 150 ? '当前版本' : '51 ~ 150 间'}
                    </div>
                  </div>
                  <div className="text-brand-600 font-bold mt-1">¥99 / 月</div>
                  <div className="text-xs text-slate-500 mt-0.5">适合中大型酒店、连锁品牌</div>
                </div>
                <div className={`rounded-lg p-3 border ${rooms > 150 ? 'bg-brand-50 border-brand-200' : 'bg-white border-blue-100'}`}>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-700">旗舰尊享版 (Pro+)</div>
                    <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${rooms > 150 ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {rooms > 150 ? '当前版本' : '> 150 间'}
                    </div>
                  </div>
                  <div className="text-brand-600 font-bold mt-1">¥299 / 月</div>
                  <div className="text-xs text-slate-500 mt-0.5">适合酒店集团、大型度假村</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Outputs Metrics bento */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Front Desk Benefit */}
            <div
              onClick={() => toggleExpand('staff')}
              className="bg-white border border-blue-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="text-base text-slate-500">节省前台人效收益</div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expanded.staff ? 'rotate-180' : ''}`} />
              </div>
              <div className="text-2xl font-bold text-slate-800 mt-1">
                <span className="text-emerald-500">+</span>¥{annualStaffSaved.toLocaleString()} <span className="text-base font-normal text-slate-400">/ 年</span>
              </div>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                🤖 AI 自动解决前台 <span className="text-slate-600">{annualCallsHandled.toLocaleString()}通</span> 电话，预计释放 <span className="text-brand-500 font-bold">{staffOptimized}人</span> 工作量。
              </p>
              <div className={`overflow-hidden transition-all duration-300 ${expanded.staff ? 'max-h-[500px] mt-3' : 'max-h-0'}`}>
                <div className="pt-3 border-t border-blue-50 space-y-2">
                  <div className="text-sm font-bold text-slate-600">📐 计算公式</div>
                  <div className="bg-blue-50 rounded-lg p-3 text-sm space-y-1.5 font-mono">
                    <div className="text-slate-600">每日承接电话量</div>
                    <div className="text-slate-800 font-semibold">= {rooms}间 × {occupancy}%入住率 × 1.5次/间晚 × 60%AI承接率</div>
                    <div className="text-brand-600 font-bold">= {dailyCallsHandled} 通/天</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-sm space-y-1.5 font-mono">
                    <div className="text-slate-600">释放前台人力</div>
                    <div className="text-slate-800 font-semibold">= {rooms}间 ÷ 80间基准 × 0.75基准人力</div>
                    <div className="text-brand-600 font-bold">= {staffOptimized} 人</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-sm space-y-1.5 font-mono">
                    <div className="text-slate-600">年节省人工成本</div>
                    <div className="text-slate-800 font-semibold">= 释放{staffOptimized}人 × ¥{averageStaffSalary}/月 × 12月</div>
                    <div className="text-emerald-600 font-bold">= ¥{annualStaffSaved.toLocaleString()} / 年</div>
                  </div>
                  <div className="text-xs text-slate-400">* 按酒店前台平均月薪 ¥{averageStaffSalary} 估算</div>
                </div>
              </div>
            </div>

            {/* Specialty Second Sell Benefit */}
            <div
              onClick={() => toggleExpand('specialty')}
              className="bg-white border border-blue-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="text-base text-slate-500">文旅供应链二销分润</div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expanded.specialty ? 'rotate-180' : ''}`} />
              </div>
              <div className="text-2xl font-bold text-slate-800 mt-1">
                <span className="text-emerald-500">+</span>¥{annualSpecialtyRevenue.toLocaleString()} <span className="text-base font-normal text-slate-400">/ 年</span>
              </div>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                🍹 打通景区门票、特产供应和交通出行服务，假设10% 订单转化，单笔均佣 ¥5，纯利润极速到手。
              </p>
              <div className={`overflow-hidden transition-all duration-300 ${expanded.specialty ? 'max-h-96 mt-3' : 'max-h-0'}`}>
                <div className="pt-3 border-t border-blue-50 space-y-2">
                  <div className="text-sm font-bold text-slate-600">📐 计算公式</div>
                  <div className="bg-blue-50 rounded-lg p-3 text-sm space-y-1.5 font-mono">
                    <div className="text-slate-600">年入住间夜数</div>
                    <div className="text-slate-800 font-semibold">= {rooms}间 × 365天 × {occupancy}%入住率</div>
                    <div className="text-brand-600 font-bold">= {annualRoomNights.toLocaleString()} 间夜/年</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-sm space-y-1.5 font-mono">
                    <div className="text-slate-600">年二销分润收益</div>
                    <div className="text-slate-800 font-semibold">= {annualRoomNights.toLocaleString()}间夜 × {specialtyConversion * 100}%转化率 × ¥{averageSpecialtyCommission}/单</div>
                    <div className="text-emerald-600 font-bold">= ¥{annualSpecialtyRevenue.toLocaleString()} / 年</div>
                  </div>
                  <div className="text-xs text-slate-400">* 按10%转化、单笔均佣¥5保守估算</div>
                </div>
              </div>
            </div>

            {/* OTA bypass benefit */}
            <div
              onClick={() => toggleExpand('ota')}
              className="bg-white border border-blue-100 p-4 rounded-xl sm:col-span-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="text-base text-slate-500">老客私域留存复购（省平台扣除的15%佣金）</div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expanded.ota ? 'rotate-180' : ''}`} />
              </div>
              <div className="text-2xl font-bold text-slate-800 mt-1">
                <span className="text-emerald-500">+</span>¥{annualOtaSaved.toLocaleString()} <span className="text-base font-normal text-slate-400">/ 年</span>
              </div>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                🌱 <span className="text-slate-600">假设3%</span> 住客沉淀至酒店私域，下次出游无需通过OTA平台下单，直接省去 15% 平台抽佣成本。
              </p>
              <div className={`overflow-hidden transition-all duration-300 ${expanded.ota ? 'max-h-96 mt-3' : 'max-h-0'}`}>
                <div className="pt-3 border-t border-blue-50 space-y-2">
                  <div className="text-sm font-bold text-slate-600">📐 计算公式</div>
                  <div className="bg-blue-50 rounded-lg p-3 text-sm space-y-1.5 font-mono">
                    <div className="text-slate-600">年私域复购间夜数</div>
                    <div className="text-slate-800 font-semibold">= {annualRoomNights.toLocaleString()}间夜 × {privateRepeatConversion * 100}%私域转化率</div>
                    <div className="text-brand-600 font-bold">= {Math.round(annualRoomNights * privateRepeatConversion).toLocaleString()} 间夜/年</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-sm space-y-1.5 font-mono">
                    <div className="text-slate-600">年节省OTA佣金</div>
                    <div className="text-slate-800 font-semibold">= {Math.round(annualRoomNights * privateRepeatConversion).toLocaleString()}间夜 × ¥{adr}房价 × {otaCommissionRate * 100}%平台抽佣</div>
                    <div className="text-emerald-600 font-bold">= ¥{annualOtaSaved.toLocaleString()} / 年</div>
                  </div>
                  <div className="text-xs text-slate-400">* 按3%私域转化率、15% OTA平台佣金保守估算</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sum Summary Card */}
          <div
            onClick={() => toggleExpand('total')}
            className="bg-gradient-to-r from-brand-500 to-blue-500 p-5 rounded-2xl relative overflow-hidden shadow-lg cursor-pointer"
          >
            <TrendingUp className="absolute right-4 bottom-2 w-28 h-28 text-white/10 pointer-events-none" />
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/80 font-bold tracking-wider">
                    年度总体超额降本增收利润
                  </div>
                  <ChevronDown className={`w-5 h-5 text-white/70 transition-transform duration-300 ${expanded.total ? 'rotate-180' : ''}`} />
                </div>
                <div className="text-3xl font-display font-extrabold text-white mt-1.5">
                  ¥{netProfit.toLocaleString()}
                </div>
                <p className="text-sm text-white/80 mt-1 font-medium">
                  *扣除 ¥{annualSaaS} SaaS 年服务费后的纯利净增
                </p>
                <p className="text-sm text-white/80 mt-2 font-medium">
                  复利价值：越用越懂客、派单越准、差评越少
                </p>
              </div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${expanded.total ? 'max-h-[500px] mt-4' : 'max-h-0'}`}>
              <div className="pt-4 border-t border-white/20 space-y-3">
                <div className="text-sm font-bold text-white/90">📐 总收益计算公式</div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-sm space-y-3 font-mono">
                  <div className="flex items-center justify-between text-white/90">
                    <span>🤖 节省前台人效收益</span>
                    <span className="font-bold">+ ¥{annualStaffSaved.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/90">
                    <span>🍹 文旅供应链二销分润</span>
                    <span className="font-bold">+ ¥{annualSpecialtyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/90">
                    <span>🌱 老客私域复购省佣</span>
                    <span className="font-bold">+ ¥{annualOtaSaved.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 space-y-2">
                    <div className="flex items-center justify-between text-white/90">
                      <span>📊 年度总收益</span>
                      <span className="font-bold text-yellow-300">= ¥{totalBenefit.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-white/90">
                      <span>💳 扣除 SaaS 年服务费</span>
                      <span className="font-bold">- ¥{annualSaaS}</span>
                    </div>
                    <div className="flex items-center justify-between text-white pt-2 border-t border-white/20">
                      <span className="font-bold text-base">💰 年度纯利净增</span>
                      <span className="font-extrabold text-xl text-yellow-300">= ¥{netProfit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
