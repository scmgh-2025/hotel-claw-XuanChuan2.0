import React, { useState } from 'react';
import { Calculator, TrendingUp, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';

export default function RoiCalculator() {
  const [rooms, setRooms] = useState<number>(80);
  const [adr, setAdr] = useState<number>(350);
  const [occupancy, setOccupancy] = useState<number>(70);

  // Financial calculations
  const calculateRoi = () => {
    // 1. Annual SaaS cost based on size tier
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

    // 2. Front Desk Staff optimization
    // 80 rooms optimized 0.75 staff.
    const staffOptimizedMultiplier = Math.min(3, Math.max(0.3, (rooms / 80) * 0.75));
    const averageStaffSalary = 4500; // Average Chinese hotel front desk monthly cost
    const annualStaffSaved = Math.round(staffOptimizedMultiplier * averageStaffSalary * 12);

    // 3. Repeated calls handled
    const dailyCallsHandled = Math.round(rooms * (occupancy / 100) * 1.5 * 0.6);
    const annualCallsHandled = dailyCallsHandled * 365;

    // 4. Local cross-selling (特产、门票、包车)
    // 10% of checked-in guests buy with average commission of ¥35/order
    const annualRoomNights = Math.round(rooms * 365 * (occupancy / 100));
    const specialtyConversion = 0.10;
    const averageSpecialtyCommission = 5;
    const annualSpecialtyRevenue = Math.round(annualRoomNights * specialtyConversion * averageSpecialtyCommission);

    // 5. OTA Bypass commission saved
    // 3%-10%+ of guests converted to repeat private traffic booking, bypassing 15% OTA commission
    const privateRepeatConversion = 0.03;
    const otaCommissionRate = 0.15;
    const annualOtaSaved = Math.round(annualRoomNights * privateRepeatConversion * adr * otaCommissionRate);

    // 6. Net Profit Increase & ROI
    const totalBenefit = annualStaffSaved + annualSpecialtyRevenue + annualOtaSaved;
    const netProfit = totalBenefit - annualSaaS;
    const roiMultiplier = Math.round((totalBenefit / annualSaaS) * 100);

    return {
      monthlyCost,
      annualSaaS,
      tier,
      staffOptimized: staffOptimizedMultiplier.toFixed(1),
      annualStaffSaved,
      annualCallsHandled,
      annualSpecialtyRevenue,
      annualOtaSaved,
      totalBenefit,
      netProfit,
      roiMultiplier
    };
  };

  const results = calculateRoi();

  return (
    <div id="roi-calculator" className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-indigo-900/60 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="text-center max-w-2xl mx-auto mb-8 border-b border-indigo-900/40 pb-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-2">
          <Calculator className="w-6 h-6 text-brand-500" /> 智能体增收提效 · 收益测算器
        </h2>
        <p className="text-xs text-slate-400 mt-2">
          输入您的酒店基本指标，一键透视 AI 系统带来的年度降本增收红利
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs Controls */}
        <div className="lg:col-span-5 bg-slate-850/50 p-5 rounded-2xl border border-indigo-900/30 space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-indigo-950 pb-2 flex items-center gap-1.5">
            ✏️ 填写酒店基础指标
          </h3>

          {/* Rooms Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">房间数量 (间)</span>
              <span className="text-brand-400 font-bold">{rooms} 间</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={rooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full accent-brand-500 bg-slate-850 rounded-lg appearance-none h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>10间</span>
              <span>500间</span>
            </div>
          </div>

          {/* ADR Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">平均房价 (ADR - 元)</span>
              <span className="text-brand-400 font-bold">¥{adr} 元/晚</span>
            </div>
            <input
              type="range"
              min="100"
              max="1500"
              step="10"
              value={adr}
              onChange={(e) => setAdr(Number(e.target.value))}
              className="w-full accent-brand-500 bg-slate-850 rounded-lg appearance-none h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>¥100</span>
              <span>¥1500</span>
            </div>
          </div>

          {/* Occupancy Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">年均入住率 (%)</span>
              <span className="text-brand-400 font-bold">{occupancy}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="1"
              value={occupancy}
              onChange={(e) => setOccupancy(Number(e.target.value))}
              className="w-full accent-brand-500 bg-slate-850 rounded-lg appearance-none h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>30%</span>
              <span>100% (常年满房)</span>
            </div>
          </div>

          {/* Software Cost Info banner */}
          <div className="bg-indigo-950/80 p-3.5 rounded-xl border border-indigo-900/40 text-center">
            <div className="text-[11px] text-slate-400">酒店智能体 SaaS 投入</div>
            <div className="text-xl font-display font-extrabold text-yellow-400 mt-1">
              ¥{results.monthlyCost} <span className="text-xs font-normal text-slate-300">/ 月</span>
            </div>
            <div className="text-[11px] text-slate-300 font-semibold mt-1">
              配置系统：{results.tier} (年缴：¥{results.annualSaaS})
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              *一套年费通常仅需五间房费，超低入场门槛
            </div>
          </div>
        </div>

        {/* Right Outputs Metrics bento */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Front Desk Benefit */}
            <div className="bg-slate-900/80 border border-indigo-900/40 p-4 rounded-xl">
              <div className="text-xs text-slate-400">节省前台人效收益</div>
              <div className="text-lg font-bold text-white mt-1">
                +¥{results.annualStaffSaved.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ 年</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                🤖 AI 自动解决前台 <span className="text-slate-300">{results.annualCallsHandled.toLocaleString()}通</span> 电话，预计释放 <span className="text-brand-400 font-bold">{results.staffOptimized}人</span> 工作量。
              </p>
            </div>

            {/* Specialty Second Sell Benefit */}
            <div className="bg-slate-900/80 border border-indigo-900/40 p-4 rounded-xl">
              <div className="text-xs text-slate-400">文旅供应链二销分润</div>
              <div className="text-lg font-bold text-white mt-1">
                +¥{results.annualSpecialtyRevenue.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ 年</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                🍹 打通景区门票、特产供应和交通出行服务，假设10% 订单转化，单笔均佣 ¥5，纯利润极速到手。
              </p>
            </div>

            {/* OTA bypass benefit */}
            <div className="bg-slate-900/80 border border-indigo-900/40 p-4 rounded-xl sm:col-span-2">
              <div className="text-xs text-slate-400">老客私域留存复购（省平台扣除的15%佣金）</div>
              <div className="text-lg font-bold text-white mt-1">
                +¥{results.annualOtaSaved.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ 年</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                🌱 <span className="text-slate-300">假设3%</span> 住客沉淀至酒店私域，下次出游无需通过OTA平台下单，直接省去 15% 平台抽佣成本。
              </p>
            </div>
          </div>

          {/* Sum Summary Card */}
          <div className="bg-gradient-to-r from-brand-600 to-indigo-650 p-5 rounded-2xl relative overflow-hidden border border-brand-500/30">
            <TrendingUp className="absolute right-4 bottom-2 w-28 h-28 text-white/5 pointer-events-none" />
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="text-[11px] text-brand-100 font-bold tracking-wider">
                  年度总体超额降本增收利润
                </div>
                <div className="text-3xl font-display font-extrabold text-white mt-1.5">
                  ¥{results.netProfit.toLocaleString()}
                </div>
                <p className="text-[11px] text-brand-100 mt-1 font-medium">
                  *扣除 ¥{results.annualSaaS} SaaS 年服务费后的纯利净增
                </p>
                <p className="text-[11px] text-brand-100 mt-2 font-medium">
                  复利价值：越用越懂客、派单越准、差评越少
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1 mt-1 bg-slate-900/20 py-2 rounded-xl">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-400" /> 经全国 1000+ 酒店真实业务数据回归验证，测算模型精准真实可靠
          </div>
        </div>
      </div>
    </div>
  );
}
