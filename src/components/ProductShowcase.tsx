import React, { useState } from 'react';
import { Smartphone, Laptop, Sparkles, MessageSquare, ListTodo, LayoutDashboard, Send, BadgeCheck, CheckCircle2, ShieldAlert, Wifi, BellRing, ChevronRight, ShoppingBag, ChevronLeft } from 'lucide-react';
import RolePainPoints from './RolePainPoints';
import LifecycleService from './LifecycleService';
import SopSimulator from './SopSimulator';

type ModeType = 'guest' | 'staff' | 'admin';
type SectionType = 'overview' | 'painpoints' | 'solution' | 'sop';

export default function ProductShowcase() {
  const [activeMode, setActiveMode] = useState<ModeType>('guest');
  const [activeSection, setActiveSection] = useState<SectionType>('overview');

  // Staff Tasks state
  const [tasks, setTasks] = useState([
    { id: 1, room: '302', type: '送物', item: '加送两瓶水、一双棉拖鞋', sender: '住客扫码', status: 'pending', time: '10:55', pic: false },
    { id: 2, room: '105', type: '工程报修', item: '空调不制冷/有杂音', sender: '前台派发', status: 'active', time: '10:48', pic: false },
    { id: 3, room: '408', type: '客房清洁', item: '住客预约 12:00 清洁客房', sender: '预订预约', status: 'completed', time: '09:30', pic: true }
  ]);

  const handleCompleteTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'completed' } : t));
  };

  // Get available sections based on mode
  const getAvailableSections = () => {
    const sections: { id: SectionType; label: string }[] = [
      { id: 'overview', label: '核心产品形态' },
    ];
    
    if (activeMode === 'staff') {
      sections.push({ id: 'painpoints', label: '全岗位提效方案' });
    }
    
    if (activeMode !== 'staff') {
      const solutionLabel = activeMode === 'admin' ? '全维度辅助经营方案' : '全流程解决方案';
      sections.push({ id: 'solution', label: solutionLabel });
    }
    
    if (activeMode === 'staff' || activeMode === 'admin') {
      sections.push({ id: 'sop', label: 'SOP 智能运行案例' });
    }
    
    return sections;
  };

  const availableSections = getAvailableSections();

  // Helper for pagination (Flip-book style)
  const currentIndex = availableSections.findIndex(s => s.id === activeSection);
  const prevSection = currentIndex > 0 ? availableSections[currentIndex - 1] : null;
  const nextSection = currentIndex < availableSections.length - 1 ? availableSections[currentIndex + 1] : null;

  // Auto reset section if current mode doesn't support it (e.g. guest mode doesn't have SOP)
  React.useEffect(() => {
    if (activeSection === 'sop' && activeMode === 'guest') {
      setActiveSection('solution');
    }
  }, [activeMode]);

  return (
    <div id="product-showcase" className="bg-slate-50/50 rounded-3xl pt-8 pb-12 shadow-sm border border-brand-100">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-display text-2xl md:text-4xl font-black text-slate-950 tracking-tight">
          轻量全套智能产品形态
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-3 font-medium whitespace-nowrap">
          全周期覆盖、全角色适配、全系统打通的一站式酒店智能工作台，3 分钟注册即用，轻成本快速落地
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Level 1: Role Switcher */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-1.5 rounded-[1.25rem] flex flex-wrap justify-center gap-1.5 border border-slate-200/60 shadow-sm">
            <button
              onClick={() => { setActiveMode('guest'); setActiveSection('overview'); }}
              className={`py-2.5 px-6 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-300 ${
                activeMode === 'guest'
                  ? 'bg-brand-50 text-brand-600 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              住客端 (微信小程序)
            </button>
            <button
              onClick={() => { setActiveMode('staff'); setActiveSection('overview'); }}
              className={`py-2.5 px-6 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-300 ${
                activeMode === 'staff'
                  ? 'bg-brand-50 text-brand-600 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <ListTodo className="w-4 h-4" />
              员工端 (手机 App)
            </button>
            <button
              onClick={() => { setActiveMode('admin'); setActiveSection('overview'); }}
              className={`py-2.5 px-6 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-300 ${
                activeMode === 'admin'
                  ? 'bg-brand-50 text-brand-600 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              管理者端 (APP/PC)
            </button>
          </div>
        </div>

        {/* Level 2: Section Switcher (Sub-tabs for current role) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 border-b-2 border-slate-200 px-4">
            {availableSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-3 px-4 text-sm font-bold transition-all relative -mb-[2px] ${
                  activeSection === section.id
                    ? 'text-brand-600 border-b-2 border-brand-500'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area (Card Container) */}
        <div className="bg-white border border-slate-200/80 rounded-[2.5rem] shadow-xl shadow-slate-200/40 overflow-hidden relative min-h-[600px] flex flex-col">
          
          <div className="flex-1 p-6 md:p-10 lg:p-12">
            {/* Section 1: Overview */}
            {activeSection === 'overview' && (
              <div className="flex flex-col xl:flex-row gap-12 h-full items-center">
                <div className="xl:w-5/12 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                  {activeMode === 'guest' && (
                    <div className="space-y-6">
                      <span className="text-xs font-bold text-brand-600 tracking-wider bg-brand-50 px-4 py-2 rounded-full border border-brand-100">
                        住客端 · 极简扫码入口
                      </span>
                      <h3 className="font-display text-4xl font-black text-slate-950 leading-tight">
                        住客端：极致轻量，无需下载
                      </h3>
                      <p className="text-base text-slate-500 leading-relaxed font-medium">
                        住客微信扫一扫客房专属二维码或呼叫小度音箱。自然语言交互，集咨询、叫物、退房、特产购买于一体，提供极速响应的专属温度。
                      </p>
                      <ul className="space-y-4 text-sm text-slate-600 font-bold pt-4">
                        <li className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-brand-500" />
                          7×24 小时 AI 秒回复早餐、WiFi 高频问询
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-brand-500" />
                          自助客房叫水、报修，1 秒生成直派工单
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-brand-500" />
                          本地特产、周边景区门票，一站式底价下单
                        </li>
                      </ul>

                      <div className="pt-6">
                        <div className="text-xs font-bold text-slate-500 mb-3">AI 智能体技能矩阵</div>
                        <div className="flex flex-wrap gap-2">
                          {[
                            '智能问答', '客房服务', '吐槽评价', '周边推荐', '订房购物',
                            '天气助手', '酒店管家', '黄小西行程伴侣', '本地推荐官',
                            '健康小妙招', '睡眠助眠眠', '亲子陪伴', '邀约小管家',
                            '会议邀请助手'
                          ].map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 text-xs font-bold text-indigo-600 rounded-full bg-indigo-50 border border-indigo-100 whitespace-nowrap"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMode === 'staff' && (
                    <div className="space-y-6">
                      <span className="text-xs font-bold text-brand-600 tracking-wider bg-brand-50 px-4 py-2 rounded-full border border-brand-100">
                        员工端 · 极简工作台
                      </span>
                      <h3 className="font-display text-4xl font-black text-slate-950 leading-tight">
                        员工端：语音接单，智能派单
                      </h3>
                      <p className="text-base text-slate-500 leading-relaxed font-medium">
                        无需繁琐打字，阿姨/维修工语音说话即接单、反馈。AI 根据实时位置和人员排班，自动规划最优动线，实现跨部门 0 沟通成本协同。
                      </p>
                      <ul className="space-y-4 text-sm text-slate-600 font-bold pt-4">
                        <li className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-brand-500" />
                          客房送水、保洁等工单自动流转
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-brand-500" />
                          工单超时自动升级，预警给店长
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-brand-500" />
                          业绩数据实时可见，激发员工动力
                        </li>
                      </ul>

                      <div className="pt-6">
                        <div className="text-xs font-bold text-slate-500 mb-3">AI 员工技能矩阵</div>
                        <div className="flex flex-wrap gap-2">
                          {[
                            '客房工单处理', '住客吐槽管理', '行李寄存管理',
                            '订单管理与交易管理', '前台记事交班助手', 'AI营销'
                          ].map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 text-xs font-bold text-indigo-600 rounded-full bg-indigo-50 border border-indigo-100 whitespace-nowrap"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeMode === 'admin' && (
                    <div className="space-y-6">
                      <span className="text-xs font-bold text-brand-600 tracking-wider bg-brand-50 px-4 py-2 rounded-full border border-brand-100">
                        管理者 · 全局仪表盘
                      </span>
                      <h3 className="font-display text-4xl font-black text-slate-950 leading-tight">
                        管理者端：数据穿透，风险熔断
                      </h3>
                      <p className="text-base text-slate-500 leading-relaxed font-medium">
                        酒店经营数据一盘棋。客诉预警、能耗异常、收益趋势实时监控，让店长和老板能够随时随地进行精细化管理与决策。
                      </p>
                      <ul className="space-y-4 text-sm text-slate-600 font-bold pt-4">
                        <li className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-brand-500" />
                          差评倾向自动抓取，客中实时干预
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-brand-500" />
                          非房收益多维报表，直观呈现利润增长
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-brand-500" />
                          员工效能、响应时长等履约数据排行
                        </li>
                      </ul>

                      <div className="pt-6">
                        <div className="text-xs font-bold text-slate-500 mb-3">AI 管理技能矩阵</div>
                        <div className="flex flex-wrap gap-2">
                          {[
                            '运营数据统计', '客户数据统计', '收入数据统计',
                            '房价竞价', '热点活动', '自营商城',
                            '平台商城', '融资匹配', '组织架构管理'
                          ].map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 text-xs font-bold text-indigo-600 rounded-full bg-indigo-50 border border-indigo-100 whitespace-nowrap"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="xl:w-7/12 flex justify-center items-center gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="hidden lg:block w-[180px] h-[380px] rounded-3xl border-4 border-slate-900 shadow-2xl overflow-hidden bg-slate-100 shrink-0">
                     <img src={activeMode === 'guest' ? './images/景区门票.jpg' : activeMode === 'staff' ? './images/员工端.jpg' : './images/老板看板.png'} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Central Interactive Phone */}
                  <div className="w-[280px] h-[580px] bg-slate-950 rounded-[2rem] border-[6px] border-slate-900 shadow-2xl relative overflow-hidden shrink-0 z-10 scale-105">
                    
                    {activeMode === 'guest' && (
                      <div className="w-full h-full">
                        <img 
                          src="./images/住客端3.jpg" 
                          alt="住客端" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}

                    {activeMode === 'staff' && (
                      <div className="w-full h-full">
                        <img 
                          src="./images/员工端3.jpg" 
                          alt="员工端" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}

                      {activeMode === 'admin' && (
                        <div className="w-full h-full">
                          <img 
                            src="./images/老板看板3.jpg" 
                            alt="管理者端" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}

                  </div>

                  <div className="hidden lg:block w-[180px] h-[380px] rounded-3xl border-4 border-slate-900 shadow-2xl overflow-hidden bg-slate-100 shrink-0">
                     <img src={activeMode === 'guest' ? './images/住客端2.jpg' : activeMode === 'staff' ? './images/酒店-员工端.png' : './images/店长工作台.png'} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            )}

            {/* Section 2: Pain Points */}
            {activeSection === 'painpoints' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                <RolePainPoints 
                  allowedRoles={
                    activeMode === 'guest' ? ['guest'] :
                    activeMode === 'staff' ? ['front_desk', 'housekeeping', 'marketing', 'manager'] :
                    ['owner']
                  }
                  hideTitle={true}
                />
              </div>
            )}

            {/* Section 3: Solution */}
            {activeSection === 'solution' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                {activeMode === 'guest' && <LifecycleService forcedViewMode="lifecycle" hideTitle={true} />}
                {activeMode === 'staff' && <LifecycleService forcedViewMode="staff" hideTitle={true} />}
                {activeMode === 'admin' && <LifecycleService forcedViewMode="manager" hideTitle={true} />}
              </div>
            )}

            {/* Section 4: SOP (Staff & Admin only) */}
            {activeSection === 'sop' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                 {activeMode === 'staff' && <SopSimulator allowedScenarios={['absence', 'extra_bed']} hideTitle={true} />}
                 {activeMode === 'admin' && <SopSimulator allowedScenarios={['bad_review']} hideTitle={true} />}
              </div>
            )}
          </div>

          {/* Bottom Flip Navigation Bar */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-between items-center">
            {prevSection ? (
              <button 
                onClick={() => setActiveSection(prevSection.id)}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-600 transition"
              >
                <ChevronLeft className="w-5 h-5" />
                上一页：{prevSection.label}
              </button>
            ) : <div />}
            
            <div className="text-xs font-bold text-slate-400">
              {currentIndex + 1} / {availableSections.length}
            </div>

            {nextSection ? (
              <button 
                onClick={() => setActiveSection(nextSection.id)}
                className="flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition"
              >
                下一页：{nextSection.label}
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : <div />}
          </div>

        </div>
      </div>
    </div>
  );
}
