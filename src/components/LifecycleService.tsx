import React, { useState, useEffect, useRef } from 'react';
import { LIFECYCLE_STAGES, STAFF_DOMAINS, MANAGER_DOMAINS } from '../data';
import { Sparkles, CheckCircle2, Bot, Users, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

type ViewMode = 'lifecycle' | 'staff' | 'manager';

export default function LifecycleService({ forcedViewMode, hideTitle }: { forcedViewMode?: ViewMode, hideTitle?: boolean }) {
  const [viewMode, setViewMode] = useState<ViewMode>(forcedViewMode || 'lifecycle');
  const [activeStage, setActiveStage] = useState(1);
  const [activeStaffDomain, setActiveStaffDomain] = useState(1);
  const [activeManagerDomain, setActiveManagerDomain] = useState(1);

  useEffect(() => {
    if (forcedViewMode) setViewMode(forcedViewMode);
  }, [forcedViewMode]);

  const stage = LIFECYCLE_STAGES.find(s => s.id === activeStage) || LIFECYCLE_STAGES[0];
  const staffDomain = STAFF_DOMAINS.find(d => d.id === activeStaffDomain) || STAFF_DOMAINS[0];
  const managerDomain = MANAGER_DOMAINS.find(d => d.id === activeManagerDomain) || MANAGER_DOMAINS[0];

  // Carousel state: staff index & manager index, reset when domain changes
  const [staffImgIdx, setStaffImgIdx] = useState(0);
  const [managerImgIdx, setManagerImgIdx] = useState(0);
  const staffTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const managerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset carousel index when domain changes
  useEffect(() => { setStaffImgIdx(0); }, [activeStaffDomain]);
  useEffect(() => { setManagerImgIdx(0); }, [activeManagerDomain]);

  // Auto-advance staff carousel every 5s
  useEffect(() => {
    if (staffDomain.images && staffDomain.images.length > 1) {
      staffTimerRef.current = setInterval(() => {
        setStaffImgIdx(prev => (prev + 1) % staffDomain.images!.length);
      }, 5000);
    }
    return () => { if (staffTimerRef.current) clearInterval(staffTimerRef.current); };
  }, [activeStaffDomain, staffDomain.images?.length]);

  // Auto-advance manager carousel every 5s
  useEffect(() => {
    if (managerDomain.images && managerDomain.images.length > 1) {
      managerTimerRef.current = setInterval(() => {
        setManagerImgIdx(prev => (prev + 1) % managerDomain.images!.length);
      }, 5000);
    }
    return () => { if (managerTimerRef.current) clearInterval(managerTimerRef.current); };
  }, [activeManagerDomain, managerDomain.images?.length]);

  return (
    <div id="lifecycle-section" className={hideTitle ? "" : "bg-white rounded-3xl p-6 shadow-xl border border-brand-100"}>
      {!hideTitle && (
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-950">
            酒店经营管理全流程服务
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            全周期覆盖、全角色适配、全系统打通的一站式酒店智能工作台，3 分钟注册即用，轻成本快速落地
          </p>
        </div>
      )}

      {/* Top-level Role Tabs */}
      {!hideTitle && (
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setViewMode('lifecycle')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
            viewMode === 'lifecycle'
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
              : 'bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100'
          }`}
        >
          🚶 住客服务周期
        </button>
        <button
          onClick={() => setViewMode('staff')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
            viewMode === 'staff'
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
              : 'bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100'
          }`}
        >
          🧹 员工履约执行
        </button>
        <button
          onClick={() => setViewMode('manager')}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
            viewMode === 'manager'
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
              : 'bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100'
          }`}
        >
          🧑‍💼 管理经营决策
        </button>
      </div>
      )}

      {/* ──── Lifecycle View ──── */}
      {viewMode === 'lifecycle' && (
        <>
          <div className="relative mb-8 pt-4">
            <div className="hidden md:block absolute top-1/2 left-[50px] right-[50px] h-1 -translate-y-1/2 overflow-hidden">
              <div className="absolute inset-x-0 h-full bg-slate-100"></div>
              <div
                className="absolute left-0 h-full bg-brand-500 transition-all duration-300"
                style={{ width: `${((activeStage - 1) / 5) * 100}%` }}></div>
            </div>
            <div className="flex justify-between items-center overflow-x-auto pt-2 pb-4 gap-2 scrollbar-none px-0 md:px-[30px]">
              {LIFECYCLE_STAGES.map((s) => {
                const isActive = s.id === activeStage;
                const isCompleted = s.id < activeStage;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStage(s.id)}
                    className="flex flex-col items-center shrink-0 min-w-[70px] md:min-w-0"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 relative ${
                        isActive
                          ? 'bg-brand-500 border-brand-500 text-white ring-4 ring-brand-100 scale-110 shadow-md'
                          : isCompleted
                          ? 'bg-brand-50 border-brand-300 text-brand-600'
                          : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {s.id}
                      {isActive && (
                        <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 rounded-full w-4 h-4 flex items-center justify-center border border-white">
                          <Sparkles className="w-2.5 h-2.5 text-white fill-white animate-spin" />
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[11px] md:text-xs font-semibold mt-2 text-center transition-colors max-w-[90px] md:max-w-[120px] line-clamp-1 ${
                        isActive ? 'text-brand-600 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {s.phase.replace('阶段 ', '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100">
            <div className="mb-4">
              <span className="text-[11px] font-bold text-brand-600 tracking-widest uppercase bg-brand-100 px-2 py-0.5 rounded-full">
                {stage.phase}
              </span>
              <h3 className="font-display text-lg md:text-xl font-bold text-slate-900 mt-2 flex items-center gap-1.5">
                {stage.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-slate-700 pb-2 border-b border-slate-100">
                    <span className="text-base">🧔</span> 住客端现状
                  </div>
                  <p className="text-sm text-slate-500 mt-3 leading-relaxed">{stage.guestAction}</p>
                </div>
                <div className="text-xs text-indigo-900 bg-brand-50 px-2.5 py-1 rounded-lg mt-4 font-semibold">⭐ 极致便捷：微信扫码直达</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-slate-700 pb-2 border-b border-slate-100">
                    <span className="text-base">👩‍💻</span> 员工端现状
                  </div>
                  <p className="text-sm text-slate-500 mt-3 leading-relaxed">{stage.staffAction}</p>
                </div>
                <div className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg mt-4 font-medium">⚙️ 连接现有 PMS / 移动工作台</div>
              </div>
              <div className="bg-gradient-to-br from-brand-50 to-indigo-50 text-slate-800 rounded-xl p-4 border border-brand-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-brand-700 pb-2 border-b border-brand-100">
                    <span className="text-base">🤖</span> 智能体做了什么？
                  </div>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed font-medium">{stage.aiAction}</p>
                </div>
                <div className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg mt-4 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />自动处理 · 全流程闭痕留痕
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-200">
              <div className="flex gap-2.5 items-start bg-indigo-50/40 p-3.5 rounded-xl border border-brand-100/30">
                <span className="text-xl">💝</span>
                <div>
                  <h4 className="text-sm font-bold text-brand-900">住客获得价值</h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed font-medium">{stage.valueGuest}</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100/30">
                <span className="text-xl">💰</span>
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">酒店获得价值</h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed font-medium">{stage.valueHotel}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ──── Staff View ──── */}
      {viewMode === 'staff' && (
        <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100">
          {/* Domain sub-navigation */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 mb-5">
            {STAFF_DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveStaffDomain(d.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition w-full text-center ${
                  activeStaffDomain === d.id
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{d.name}</span>
              </button>
            ))}
          </div>

          {/* Domain detail */}
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              {staffDomain.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{staffDomain.desc}</p>

            {/* Two-column layout: 日常做法 vs AI接管 (+ 场景配图) */}
            <div className={`grid grid-cols-1 gap-4 mt-5 ${staffDomain.images && staffDomain.images.length > 0 ? 'md:grid-cols-[1fr_1fr_0.7fr]' : 'md:grid-cols-2'}`}>
              {/* Left: 日常做法 */}
              <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100/80">
                <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-3">
                  <Users className="w-4 h-4" />
                  一线员工日常
                </div>
                <ul className="space-y-2">
                  {staffDomain.currentSituation.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                      <span className="text-orange-400 font-bold shrink-0 mt-0.5">•</span>
                      <span dangerouslySetInnerHTML={{ __html: item }}></span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Middle: AI接管 */}
              <div className="bg-brand-50/50 rounded-xl p-4 border border-brand-100/80">
                <div className="flex items-center gap-2 text-brand-600 font-bold text-sm mb-3">
                  <Bot className="w-4 h-4" />
                  AI 智能体接管后
                </div>
                <ul className="space-y-2">
                  {staffDomain.aiValue.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                      <span className="text-brand-500 font-bold shrink-0 mt-0.5">✓</span>
                      <span dangerouslySetInnerHTML={{ __html: item }}></span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: 场景配图 (if any) */}
              {staffDomain.images && staffDomain.images.length > 0 && (
                <div className="bg-slate-100/60 rounded-xl p-2 border border-slate-200 flex flex-col items-center justify-start relative">
                  {/* Image display area */}
                  <div className="w-full relative overflow-hidden rounded-xl">
                    {staffDomain.images.map((img, i) => (
                      <img
                        key={i}
                        src={`./images/ceo-cards/${img}`}
                        alt={`场景配图 ${i + 1}`}
                        className={`w-full rounded-xl border border-slate-300 shadow-sm transition-opacity duration-500 ${i === staffImgIdx ? 'block' : 'hidden'}`}
                      />
                    ))}
                  </div>
                  {/* Navigation: dots + arrows when multi */}
                  {staffDomain.images.length > 1 && (
                    <>
                      <div className="flex items-center justify-center gap-1.5 mt-2">
                        <button
                          onClick={() => { setStaffImgIdx(prev => (prev - 1 + staffDomain.images!.length) % staffDomain.images!.length); }}
                          className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition shrink-0"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-1">
                          {staffDomain.images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setStaffImgIdx(i)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                i === staffImgIdx ? 'bg-brand-500 w-3' : 'bg-slate-300 hover:bg-slate-400'
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => { setStaffImgIdx(prev => (prev + 1) % staffDomain.images!.length); }}
                          className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition shrink-0"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Role value section */}
            <div className="mt-4 bg-gradient-to-r from-brand-50/60 to-emerald-50/40 rounded-xl p-4 border border-brand-100/40 flex items-start gap-3">
              <span className="text-xl shrink-0">💝</span>
              <div>
                <h4 className="text-xs font-bold text-brand-900">员工使用智能体后的获得</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                  {staffDomain.roleValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──── Manager View ──── */}
      {viewMode === 'manager' && (
        <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100">
          {/* Domain sub-navigation */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 mb-5">
            {MANAGER_DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveManagerDomain(d.id)}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition w-full text-center ${
                  activeManagerDomain === d.id
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{d.name}</span>
              </button>
            ))}
          </div>

          {/* Images left + Domain detail right */}
          <div className="mt-5 lg:grid lg:grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr] gap-4 items-start">
            {/* Left: 场景配图 (hidden on mobile, fixed column in grid on desktop) */}
            {managerDomain.images && managerDomain.images.length > 0 && (
              <div className="flex bg-slate-100/60 rounded-xl p-2 border border-slate-200 flex-col items-center justify-start relative">
                <div className="w-full relative overflow-hidden rounded-xl">
                  {managerDomain.images.map((img, i) => (
                    <img
                      key={i}
                      src={`./images/ceo-cards/${img}`}
                      alt={`场景配图 ${i + 1}`}
                      className={`w-full rounded-xl border border-slate-300 shadow-sm transition-opacity duration-500 ${i === managerImgIdx ? 'block' : 'hidden'}`}
                    />
                  ))}
                </div>
                {managerDomain.images.length > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <button
                      onClick={() => { setManagerImgIdx(prev => (prev - 1 + managerDomain.images!.length) % managerDomain.images!.length); }}
                      className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition shrink-0"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1">
                      {managerDomain.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setManagerImgIdx(i)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i === managerImgIdx ? 'bg-brand-500 w-3' : 'bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => { setManagerImgIdx(prev => (prev + 1) % managerDomain.images!.length); }}
                      className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition shrink-0"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Right: domain detail */}
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                {managerDomain.name}
              </h3>
              <p className="text-sm text-slate-500 mt-1">{managerDomain.desc}</p>

              {/* Two-column content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                {/* 日常做法 */}
                <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-100/80">
                  <div className="flex items-center gap-2 text-purple-600 font-bold text-base mb-3">
                    <TrendingUp className="w-4 h-4" />
                    经营决策者日常怎么管
                  </div>
                  <ul className="space-y-2">
                    {managerDomain.currentSituation.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                        <span className="text-purple-400 font-bold shrink-0 mt-0.5">•</span>
                        <span dangerouslySetInnerHTML={{ __html: item }}></span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI接管 */}
                <div className="bg-brand-50/50 rounded-xl p-4 border border-brand-100/80">
                  <div className="flex items-center gap-2 text-brand-600 font-bold text-base mb-3">
                    <Bot className="w-4 h-4" />
                    AI 智能体接管后
                  </div>
                  <ul className="space-y-2">
                    {managerDomain.aiValue.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                        <span className="text-brand-500 font-bold shrink-0 mt-0.5">✓</span>
                        <span dangerouslySetInnerHTML={{ __html: item }}></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Role value section */}
              <div className="mt-4 bg-gradient-to-r from-brand-50/60 to-emerald-50/40 rounded-xl p-4 border border-brand-100/40 flex items-start gap-3">
                <span className="text-xl shrink-0">💝</span>
                <div>
                  <h4 className="text-sm font-bold text-brand-900">决策者使用智能体后的获得</h4>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                    {managerDomain.roleValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
