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
      const navHeight = 80;
      const elTop = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elTop - navHeight, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: '产品介绍', id: 'hero-section' },
    { name: '产品形态', id: 'product-showcase' },
    { name: '极速入驻', id: 'onboarding-flow' },
    { name: '收益测算', id: 'roi-calculator' },
    { name: '合作酒店', id: 'partner-hotels' },
    { name: '能力架构', id: 'capabilities-section' }
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
                <span className="font-display font-black text-slate-900 tracking-tight text-xl block">
                  华创云信 · 酒店智能体
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
          <div className="lg:hidden bg-white border-b border-slate-100 p-4 space-y-1.5 flex flex-col shadow-inner">
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
      <section id="hero-section" className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Hero Left: Headlines & Core Bento Cards */}
          <div className="lg:col-span-5 space-y-6 mt-8">
            
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                HotelClaw 酒店智能体
              </h1>
              <p className="font-display text-lg sm:text-xl font-bold text-brand-600">
                全生命周期数智化经营管理引擎
              </p>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                聚焦酒店宾客服务和深度经营增长，重构酒店全场景业务逻辑，为酒店打造具备自主研判、智能执行、全链路自动跟进能力的专属AI原生解决方案。
              </p>
            </div>

            {/* 4 Core Bento Grid selling highlights */}
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl">⚡</span>
                <h3 className="font-display text-lg font-black text-slate-800 mt-3">高效减负，释放人力</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl">⚙️</span>
                <h3 className="font-display text-lg font-black text-slate-800 mt-3">智能提效，轻松履职</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl">💝</span>
                <h3 className="font-display text-lg font-black text-slate-800 mt-3">全景可视，穿透管理</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl">💰</span>
                <h3 className="font-display text-lg font-black text-slate-800 mt-3">双线经营，多元创收</h3>
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
                <div className="absolute bottom-6 left-2 right-2 bg-white/95 backdrop-blur-md text-slate-800 rounded-2xl p-4 border border-blue-100 shadow-lg">
                  <p className="text-lg font-bold text-brand-600 text-center mb-1">"黄小西"酒店智能体</p>
                  <h4 className="text-base font-bold text-slate-800 whitespace-nowrap text-center">贵州文旅品牌IP"黄小西"与"HotelClaw 酒店智能体"联名合作</h4>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      </div>

      {/* Era Background: Pain Points & Highlights */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-brand-100/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-5">
            <h2 className="font-display text-2xl md:text-4xl font-black text-slate-950 tracking-tight">
              数智时代·酒店转型的痛点
            </h2>
          </div>

          {/* Pain Points Row - 清新浅色系 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            {/* Card 1: 人力成本高 */}
            <div className="group relative bg-gradient-to-br from-white to-rose-50/50 rounded-2xl p-4 border border-rose-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center shrink-0 text-2xl shadow-sm">
                    🤖
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white text-xs font-black shadow-md">
                    1
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="text-xl font-black text-slate-900 leading-tight">人力成本高</h4>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-2">
                <div className="bg-white/70 rounded-xl p-2.5 border border-rose-100/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1 h-4 rounded-full bg-gradient-to-b from-rose-400 to-rose-500"></div>
                    <div className="text-base font-extrabold text-rose-600 uppercase tracking-wider">痛点描述</div>
                  </div>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-rose-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>咨询转接、夜班值守等基础工作需投入较多人工资源</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-rose-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>人员流动性较高，对应产生持续的培训费用支出</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-rose-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>综合人力开支长期维持较高水平</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-2.5 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-base">💡</span>
                    <div className="text-base font-extrabold text-amber-700 uppercase tracking-wider">行业案例</div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    国内经济型酒店基层岗位年均流失率普遍 <span className="font-extrabold text-rose-600">35%</span> 左右，单店每年人员空档顶岗、新人培训额外支出 <span className="font-extrabold text-rose-600">2万-4万元</span>；近半数酒店人力成本占总运营费用比重突破 <span className="font-extrabold text-rose-600">40%</span>。
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: 服务不标准 */}
            <div className="group relative bg-gradient-to-br from-white to-sky-50/50 rounded-2xl p-4 border border-sky-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center shrink-0 text-2xl shadow-sm">
                    🔍
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white text-xs font-black shadow-md">
                    2
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="text-xl font-black text-slate-900 leading-tight">服务不标准</h4>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-2">
                <div className="bg-white/70 rounded-xl p-2.5 border border-sky-100/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1 h-4 rounded-full bg-gradient-to-b from-sky-400 to-sky-500"></div>
                    <div className="text-base font-extrabold text-sky-600 uppercase tracking-wider">痛点描述</div>
                  </div>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-sky-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>在岗员工服务能力存在个体差异</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-sky-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>服务执行流程、对外应答口径未实现统一规范</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-sky-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>客房需求、客诉处置易出现响应延时情况</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-sky-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>对住客体验及门店线上评分形成负面影响</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-2.5 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-base">💡</span>
                    <div className="text-base font-extrabold text-amber-700 uppercase tracking-wider">行业案例</div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    同城单体酒店实测，同类客房报修需求，员工处理时长差值 <span className="font-extrabold text-sky-600">5~20分钟</span>，服务口径混乱问题造成的负面评价，占到酒店总差评数量 <span className="font-extrabold text-sky-600">40%</span> 以上。
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: 酒店管理难 */}
            <div className="group relative bg-gradient-to-br from-white to-violet-50/50 rounded-2xl p-4 border border-violet-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center shrink-0 text-2xl shadow-sm">
                    📉
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-white text-xs font-black shadow-md">
                    3
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="text-xl font-black text-slate-900 leading-tight">酒店管理难</h4>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-2">
                <div className="bg-white/70 rounded-xl p-2.5 border border-violet-100/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1 h-4 rounded-full bg-gradient-to-b from-violet-400 to-violet-500"></div>
                    <div className="text-base font-extrabold text-violet-600 uppercase tracking-wider">痛点描述</div>
                  </div>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-violet-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>运营数据、人员信息等资料分散存储，数据互通性不足</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-violet-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>各部门之间协同办公效率偏低</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-violet-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>管理人员难以实时获取一线真实的运营运行数据</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-2.5 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-base">💡</span>
                    <div className="text-base font-extrabold text-amber-700 uppercase tracking-wider">行业案例</div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    多数中小酒店 PMS、保洁工单、财务台账彼此独立，店长日均花费 <span className="font-extrabold text-violet-600">1~2小时</span> 手工汇总多渠道报表，客房异常、人员在岗问题普遍存在半天以上管理滞后。
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: 增收缺渠道 */}
            <div className="group relative bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl p-4 border border-emerald-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="flex items-start gap-3 mb-4">
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center shrink-0 text-2xl shadow-sm">
                    🔄
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xs font-black shadow-md">
                    4
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="text-xl font-black text-slate-900 leading-tight">增收缺渠道</h4>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-2">
                <div className="bg-white/70 rounded-xl p-2.5 border border-emerald-100/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1 h-4 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-500"></div>
                    <div className="text-base font-extrabold text-emerald-600 uppercase tracking-wider">痛点描述</div>
                  </div>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-emerald-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>酒店营收来源集中于客房业务，收入结构较为单一</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-emerald-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>自营商品、本地文旅资源缺少店内合规的销售途径</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-emerald-400 mt-0.5 flex-shrink-0">◆</span>
                      <span>第三方平台存在一定比例抽成，带来酒店实际收益缩减</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-2.5 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-base">💡</span>
                    <div className="text-base font-extrabold text-amber-700 uppercase tracking-wider">行业案例</div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    国内单体酒店客房收入普遍占总营收 <span className="font-extrabold text-emerald-600">90%</span> 上下，OTA 对中小酒店综合抽成普遍 <span className="font-extrabold text-emerald-600">15%~22%</span>；酒店自营特产、景区票务等副业营收平均占比不足 <span className="font-extrabold text-emerald-600">5%</span>。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sequential Core Modules Bento layouts */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Unified Product UI simulator & Pain Points & Solutions */}
        <ProductShowcase />

        {/* 4 steps onboarding setup */}
        <OnboardingFlow />

        {/* Sliders ROI calculator */}
        <RoiCalculator />

        {/* 3. Partner Hotels - 环绕式布局 */}
        <section id="partner-hotels" className="bg-gradient-to-b from-slate-50 to-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 居中文字 */}
            <div className="text-center mb-8">
              <p className="font-display text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
                黄小西酒店智能体合作酒店
              </p>
              <h2 className="text-lg font-bold text-slate-600 mt-2 tracking-wide">
                HotelClaw 落地案例
              </h2>
            </div>

            {/* 环绕式卡片布局：中间文字，四周卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* 第1行：5张卡片 */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/贵州饭店.jpg" alt="贵州饭店·贵宾楼" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">贵州饭店·贵宾楼</h3>
                  <p className="text-sm text-slate-500 mt-0.5">高端商务型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/铜仁国宾馆.jpg" alt="铜仁国宾馆" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">铜仁国宾馆</h3>
                  <p className="text-sm text-slate-500 mt-0.5">高端商务型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/遵义贵州饭店.jpg" alt="遵义贵州饭店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">遵义贵州饭店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">高端商务型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/汉庭酒店.jpg" alt="汉庭酒店(安顺古城店)" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">汉庭酒店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">城市连锁型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/维也纳国际酒店.jpg" alt="维也纳国际(贵阳北站店)" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">维也纳国际</h3>
                  <p className="text-sm text-slate-500 mt-0.5">城市连锁型</p>
                </div>
              </div>

              {/* 第2行：2张卡片 + 中间文字 + 2张卡片 */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/匀东贵州饭店.jpg" alt="都匀匀东·贵州饭店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">都匀匀东·贵州饭店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">会议度假型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/阿西里西大酒店.jpg" alt="毕节阿西里西大酒店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">阿西里西大酒店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">度假文旅型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/希尔顿惠庭酒店.jpg" alt="贵阳观山湖希尔顿惠庭" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">希尔顿惠庭</h3>
                  <p className="text-sm text-slate-500 mt-0.5">高端商务型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/千山和悦酒店.jpg" alt="贵阳千山和悦酒店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">千山和悦酒店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">精品商务型</p>
                </div>
              </div>

              {/* 第3行：5张卡片 */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/贵阳天怡豪生大酒店.jpg" alt="贵阳天怡豪生大酒店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">天怡豪生大酒店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">高端商务型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/林城万宜酒店.jpg" alt="贵阳林城万宜酒店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">林城万宜酒店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">精品商务型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/村上见全景民宿.jpg" alt="西江千户苗寨村上见全景民宿" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">村上见全景民宿</h3>
                  <p className="text-sm text-slate-500 mt-0.5">精品民宿型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/安顺屯舍·文化酒店.jpg" alt="安顺屯舍·文化酒店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">屯舍·文化酒店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">精品文化型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/铜仁思南九天温泉酒店.jpg" alt="铜仁思南九天温泉酒店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">九天温泉酒店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">休闲度假型</p>
                </div>
              </div>

              {/* 第4行：2张卡片 */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/黔东南雷山大酒店.jpg" alt="黔东南雷山大酒店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">雷山大酒店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">休闲度假型</p>
                </div>
              </div>

              {/* 第5行：5张卡片 */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/遵投丽呈酒店.jpg" alt="遵投丽呈酒店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">遵投丽呈酒店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">高端商务型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/外滩一号酒店.jpg" alt="外滩一号酒店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">外滩一号酒店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">精品商务型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/南国旅社.jpg" alt="南国旅社" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">南国旅社</h3>
                  <p className="text-sm text-slate-500 mt-0.5">城市民宿</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/贵阳青岩智选假日酒店.jpg" alt="贵阳青岩智选假日酒店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">贵阳青岩智选假日酒店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">商务度假型</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <img src="./images/公羽家·设计师轻奢艺术酒店.jpg" alt="公羽家·设计师酒店" className="w-full h-24 object-cover" />
                <div className="p-1.5 text-center">
                  <h3 className="text-base font-bold text-slate-800 truncate">公羽家·设计师酒店</h3>
                  <p className="text-sm text-slate-500 mt-0.5">设计师酒店</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 109 models & 6 layers */}
        <CoreCapabilities />

        {/* Backing corporations */}
        <CompanyBackground />

      </main>

      {/* 5. Footer Information */}
      <footer className="bg-slate-950 text-white border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-900">
            
            {/* Column 1: Brand details */}
            <div className="space-y-3">
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
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-300">标杆合作项目：黄小西</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-5">
                联合贵州省委省政府、贵州旅游集团深度打造。一站融合黄果树瀑布、小七孔、西江千户苗寨等贵州全省景区资源及特产。已赋能上千家高端商务、度假文旅、精品民宿，带动非房收益成倍增长。
              </p>
            </div>

            {/* Column 3: Contacts */}
            <div className="space-y-1.5">
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
