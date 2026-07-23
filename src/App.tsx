import React, { useState } from 'react';
import { 
  Sparkles, Bot, Layers, Cpu, TrendingUp, Coins, 
  MapPin, ShieldCheck, Smartphone, Calculator, 
  MessageSquare, UserCheck, Star, ArrowRight, Menu, X, Landmark, ChevronRight
} from 'lucide-react';

// Modular Components
import ProductShowcase from './components/ProductShowcase';
import CoreCapabilities from './components/CoreCapabilities';
import RoiCalculator from './components/RoiCalculator';
import OnboardingFlow from './components/OnboardingFlow';
import CompanyBackground from './components/CompanyBackground';
import HotelCarousel from './components/HotelCarousel';

// Data
import { PARTNER_HOTELS, IMAGE_PATHS } from './data';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick navigation scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: '产品形态', id: 'product-showcase' },
    { name: '六层架构', id: 'capabilities-section' },
    { name: '收益测算', id: 'roi-calculator' },
    { name: '合作酒店', id: 'partner-hotels' },
    { name: '极速入驻', id: 'onboarding-flow' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eff3fa] via-[#f5f8ff] to-[#e4ebf7] text-slate-800 selection:bg-brand-200">
      
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Brand */}
            <div className="flex items-center gap-2">
              <img src="./images/logo.png" alt="HotelClaw" className="w-9 h-9" />
              <div>
                <span className="font-display font-black text-slate-900 tracking-tight text-lg block">
                  华创云信 · 酒店智能体
                </span>
                <span className="text-xs font-bold text-indigo-900 uppercase tracking-widest block -mt-1">
                  产品服务宣传册
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-3 py-1.5 rounded-lg text-sm font-bold text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* CTA action button - desktop */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => scrollToSection('onboarding-flow')}
                className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition duration-300 shadow-lg shadow-brand-500/20 flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-white" /> 免费试用
              </button>
            </div>

            {/* Mobile: hamburger + CTA button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <button
                onClick={() => scrollToSection('onboarding-flow')}
                className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition duration-300 shadow-lg shadow-brand-500/20 flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 fill-white" /> 免费试用
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-100 p-4 space-y-2 flex flex-col shadow-inner">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-brand-600 hover:bg-slate-50"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 2. Main Hero Banner Section — Light Fresh */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Hero Left: Headlines & Core Bento Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-100 text-brand-600 text-xs px-3 py-1 rounded-full font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping"></span>
              贵州文旅厅认证 · 华创云信联合打造
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                HotelClaw 酒店智能体
              </h1>
              <p className="font-display text-lg sm:text-xl font-bold text-brand-600">
                全生命周期数智化经营管理引擎
              </p>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
                聚焦酒店宾客服务和深度经营增长，重构酒店全场景业务逻辑，为酒店打造具备自主研判、智能执行、全链路自动跟进能力的专属AI原生解决方案。依托轻量化落地模式，助力大、中、小型酒店一站式完成智能化升级。
              </p>
            </div>

            {/* 4 Core Bento Grid selling highlights */}
            <div className="grid grid-cols-2 gap-3 max-w-lg">
              <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">⚡</span>
                <h3 className="font-display text-base font-black text-slate-800 mt-2">高效减负，释放人力</h3>
                <p className="text-sm text-slate-500 mt-1 font-semibold">AI全天候承接宾客高频咨询，解放前台接待压力。</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">⚙️</span>
                <h3 className="font-display text-base font-black text-slate-800 mt-2">智能提效，轻松履职</h3>
                <p className="text-sm text-slate-500 mt-1 font-semibold">配备员工专属数字分身，自动派单代办琐事，减少跨部门重复沟通，降低工作压力</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">💝</span>
                <h3 className="font-display text-base font-black text-slate-800 mt-2">全景可视，穿透管理</h3>
                <p className="text-sm text-slate-500 mt-1 font-semibold">集中汇总客需、工单、人效、营收全维度数据，门店运营一目了然；管理者全局把控，店长实时调度，实现穿透式精细管控</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">💰</span>
                <h3 className="font-display text-base font-black text-slate-800 mt-2">双线经营，多元创收</h3>
                <p className="text-sm text-slate-500 mt-1 font-semibold">联动店内服务与本地文旅资源，帮助酒店更好地经营自己，经营周边，持续拓宽多元营收</p>
              </div>
            </div>

            {/* Quick Action Trigger Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection('roi-calculator')}
                className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-6 rounded-2xl text-xs transition duration-300 shadow-lg shadow-brand-500/20 cursor-pointer"
              >
                📈 一键测算我的酒店收益
              </button>
            </div>

          </div>

          {/* Hero Right: Image card */}
          <div className="lg:col-span-7 flex justify-center lg:pl-[20%]">
              <div className="relative max-w-lg w-full h-full">
              
              <div className="relative rounded-3xl overflow-hidden h-full">
                <img
                  src={IMAGE_PATHS.huangxiaoxi}
                  alt="黄小西IP"
                  className="w-full h-full object-cover object-top scale-110 -translate-y-4"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md text-slate-800 rounded-2xl p-4 border border-blue-100 shadow-lg">
                  <h4 className="text-base font-bold text-slate-800">黄小西 IP 酒店智能体</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mt-1">
                    已服务全国 <span className="text-brand-500 font-bold">1000+</span> 酒店。微信扫码，客房呼叫直派工单，打通门票特产，当天上线，立提非房营收！
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      </div>

      {/* Era Background: Pain Points & Highlights */}
      <section className="bg-white border-b border-brand-100/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-5">
            <h2 className="font-display text-2xl md:text-4xl font-black text-slate-950 tracking-tight">
              数智时代·酒店转型的痛点
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-3 font-medium">
              各行业被AI冲击的当下，酒店急需进行数智化转型
            </p>
          </div>

          {/* Pain Points Row - 品牌强调色填充 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
            <div className="bg-brand-500 text-white rounded-xl p-3.5 flex items-start gap-3 shadow-lg shadow-brand-500/20">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 text-xl">🤖</div>
              <div>
                <h4 className="text-base font-bold text-white">人力成本高</h4>
                <p className="text-sm text-white/70 mt-0.5 leading-relaxed">酒店咨询转接、夜班值守等人工工作繁重，员工流动大、培训成本高，人力成本居高不下。</p>
              </div>
            </div>
            <div className="bg-brand-500 text-white rounded-xl p-3.5 flex items-start gap-3 shadow-lg shadow-brand-500/20">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 text-xl">🔍</div>
              <div>
                <h4 className="text-base font-bold text-white">服务不标准</h4>
                <p className="text-sm text-white/70 mt-0.5 leading-relaxed">员工服务能力参差不齐，服务流程、应答口径不统一，易出现服务滞后问题，影响住客体验与门店评分。</p>
              </div>
            </div>
            <div className="bg-brand-500 text-white rounded-xl p-3.5 flex items-start gap-3 shadow-lg shadow-brand-500/20">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 text-xl">📉</div>
              <div>
                <h4 className="text-base font-bold text-white">酒店管理难</h4>
                <p className="text-sm text-white/70 mt-0.5 leading-relaxed">酒店各类运营、数据、人员信息分散，跨部门协同低效，管理层无法实时把控一线运营情况。</p>
              </div>
            </div>
            <div className="bg-brand-500 text-white rounded-xl p-3.5 flex items-start gap-3 shadow-lg shadow-brand-500/20">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 text-xl">🔄</div>
              <div>
                <h4 className="text-base font-bold text-white">增收缺渠道</h4>
                <p className="text-sm text-white/70 mt-0.5 leading-relaxed">酒店营收仅依赖客房，自营产品与本地文旅资源无合规售卖渠道，第三方平台抽成导致收益流失。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sequential Core Modules Bento layouts */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Unified Product UI simulator & Pain Points & Solutions */}
        <ProductShowcase />

        {/* 109 models & 6 layers */}
        <CoreCapabilities />

        {/* Sliders ROI calculator */}
        <RoiCalculator />

        {/* 3. Partner scrolling marquee banner */}
        <section id="partner-hotels" className="bg-white border-y border-brand-100/60 py-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
                <span className="font-display text-2xl md:text-3xl font-bold text-slate-950 uppercase tracking-widest block">
                  合作酒店
                </span>
                <span className="text-lg font-bold text-slate-700 block mt-1">
                  1000+ 标杆酒店深度入驻 · 高效稳定运作中
              </span>
            </div>

            {/* Hotel Carousel */}
            <HotelCarousel hotels={PARTNER_HOTELS} />
          </div>
        </section>

        {/* 4 steps onboarding setup */}
        <OnboardingFlow />

        {/* Backing corporations */}
        <CompanyBackground />

      </main>

      {/* 5. Footer Information */}
      <footer className="bg-slate-950 text-white border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-900">
            
            {/* Column 1: Brand details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src="./images/logo.png" alt="HotelClaw" className="w-9 h-9" />
                <div>
                  <span className="font-display font-black text-slate-100 tracking-tight text-base block">
                    HotelClaw
                  </span>
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest block -mt-1">
                    酒店智能体
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                华创云信联合融汇金信打造，深耕文旅供应链与大模型语义本体底座，打通PMS、OMS、自营商城、OTA与客户CRM，为单体酒店及民宿提供越用越值钱的企业数智地盘。
              </p>
            </div>

            {/* Column 2: Guizhou specialty mention */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300">标杆合作项目：黄小西</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-5">
                联合贵州省委省政府、贵州旅游集团深度打造。一站融合黄果树瀑布、小七孔、西江千户苗寨等贵州全省景区资源及特产。已赋能上千家高端商务、度假文旅、精品民宿，带动非房收益成倍增长。
              </p>
            </div>

            {/* Column 3: Contacts */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300">联系我们</h4>
              <div className="text-xs text-slate-500 space-y-1.5 leading-relaxed mt-5">
                <p>企业名称：华创云信数字技术股份有限公司</p>
                <p>地址：贵州省贵阳市观山湖区联合广场</p>
                <p>电话：0851-86671808</p>
                <p>邮箱：postmaster@aihuangxiaoxi.com</p>
                <a href="https://www.htlclaw.com/" target="_blank" rel="noopener noreferrer" className="text-brand-400 font-bold text-xs hover:text-brand-300 transition">🌐 www.htlclaw.com</a>
              </div>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}
