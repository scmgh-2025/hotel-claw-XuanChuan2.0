import React from 'react';
import { ONBOARDING_STEPS } from '../data';
import { HelpCircle, Clock, Sparkles, Smartphone, Printer, UploadCloud, BadgeCheck, Gift, Video, Headset } from 'lucide-react';

export default function OnboardingFlow() {
  const getIcon = (step: number) => {
    switch (step) {
      case 1: return <Smartphone className="w-5 h-5 text-brand-500" />;
      case 2: return <UploadCloud className="w-5 h-5 text-brand-500" />;
      case 3: return <HelpCircle className="w-5 h-5 text-brand-500" />;
      case 4: return <Printer className="w-5 h-5 text-brand-500" />;
      default: return <BadgeCheck className="w-5 h-5 text-brand-500" />;
    }
  };

  return (
    <div id="onboarding-flow" className="bg-white rounded-3xl p-6 shadow-xl border border-brand-100">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-950">
          四步极速上线 · 10分钟即刻启用
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          无硬件改装成本，不用数据迁移，当天配置，当天使用
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {ONBOARDING_STEPS.map((s, idx) => {
          return (
            <div
              key={s.step}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between relative hover:shadow-md transition duration-300"
            >
              {/* Stepper counter indicator */}
              <div className="absolute -top-3 -left-3 bg-brand-500 text-white font-extrabold w-9 h-9 rounded-full border-4 border-white flex items-center justify-center font-mono text-base shadow-md">
                0{s.step}
              </div>

              <div className="mt-2">
                <div className="bg-white rounded-xl p-2.5 w-10 h-10 flex items-center justify-center shadow-sm border border-slate-100">
                  {getIcon(s.step)}
                </div>
                <h3 className="font-display text-lg font-black text-slate-800 mt-3 flex items-center gap-1.5">
                  {s.title}
                </h3>
                <p className="text-base text-slate-500 mt-1.5 leading-relaxed font-semibold">
                  {s.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/50 flex justify-between items-center text-sm text-slate-400 font-bold uppercase">
                <span>估计耗时</span>
                <span className="text-brand-600 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-brand-500 animate-spin" /> {s.duration}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust guarantees bar */}
      <div className="mt-8 bg-brand-50 rounded-2xl p-4 border border-brand-100/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center items-center">
        <div className="flex flex-col items-center p-2">
          <Gift className="w-7 h-7 text-brand-500" />
          <h4 className="text-lg font-bold text-slate-800 mt-1">首次注册免费试用</h4>
          <p className="text-base text-slate-400 mt-0.5">无任何前置隐形收费</p>
        </div>
        <div className="flex flex-col items-center p-2">
          <Video className="w-7 h-7 text-brand-500" />
          <h4 className="text-lg font-bold text-slate-800 mt-1">视频教程 & 线上培训</h4>
          <p className="text-base text-slate-400 mt-0.5">运营经理一对一手把手教</p>
        </div>
        <div className="flex flex-col items-center p-2">
          <Headset className="w-7 h-7 text-brand-500" />
          <h4 className="text-lg font-bold text-slate-800 mt-1">专属 1对1 售后对接</h4>
          <p className="text-base text-slate-400 mt-0.5">工作日 4 小时内闪电响应</p>
        </div>
        <div className="flex flex-col items-center p-2">
          <img src="./images/qrcode.png" alt="快速入驻二维码" className="w-48 h-48 mb-2 rounded-xl border-4 border-[#07C160]" />
          <p className="text-sm text-slate-500 font-semibold">微信扫码快速入驻</p>
        </div>
      </div>
    </div>
  );
}
