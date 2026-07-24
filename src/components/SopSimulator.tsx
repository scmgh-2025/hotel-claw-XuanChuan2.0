import { useState, useEffect } from 'react';

interface Step {
  time: string;
  desc: string;
  type: 'alert' | 'ai' | 'action' | 'done' | 'info';
  badge?: string;
}

interface Scenario {
  id: string;
  title: string;
  icon: string;
  trigger: string;
  steps: Step[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'absence',
    title: '突发缺勤 · 自动补位 · 排班自主跟进',
    icon: '🏃',
    trigger: '明早满房，早班前台小王 7:30 缺勤失联',
    steps: [
      { time: '07:30:00', desc: '监控到小王未正常打卡，系统自动标记为【异常缺勤】并通知店长', type: 'alert' },
      { time: '07:30:15', desc: 'AI 引擎分析：今日入住率 90%（满房），早间属退房高峰期，前台为关键瓶颈岗位需立刻补位', type: 'ai', badge: '引擎决策' },
      { time: '07:30:20', desc: 'AI 智能匹配算法启动：从【协作备班池】筛选候选人，按技能匹配度×工时余额×通勤距离排序', type: 'info' },
      { time: '07:30:30', desc: 'AI 触发一键自动改派：向第一备班候选人小李（距离 2.5km）推送【应急补位邀请】', type: 'action', badge: '一键派单' },
      { time: '07:31:15', desc: '小李手机收到紧急震动播报，确认接单并点击"立刻赶往酒店"', type: 'action' },
      { time: '07:31:20', desc: '系统后台自动更新排班表，AI 通知店长："小王缺勤已由小李自动补位，排班表自主跟进完成"', type: 'done', badge: '排班自主跟进' },
      { time: '07:35:00', desc: '数据沉淀：系统将小王标记为"出勤风险+1"，下次排班自动避开早班关键岗', type: 'done' }
    ]
  },
  {
    id: 'bad_review',
    title: '差评预警 · 根因归因 · 整改工单',
    icon: '📝',
    trigger: 'OTA 平台突然收到 302 房间一条 1 星差评："房间有一股难闻异味！"',
    steps: [
      { time: '14:02:00', desc: 'OTA舆情监控模块自动捕获 1 星差评，解析情感负面关键词为【卫生/异味】', type: 'alert' },
      { time: '14:02:10', desc: 'AI 数据穿透：查询 302 房历史，追溯到保洁员张姐清洁时长仅 12 分钟（标准 20 分钟）', type: 'ai', badge: '精准归因' },
      { time: '14:02:20', desc: 'AI 自动归类差评，生成【客房除味整改工单】，派发给值班主管和保洁班长', type: 'action', badge: '智能工单' },
      { time: '14:02:30', desc: 'AI 同时生成安抚客服回复文案给前台，供住客沟通使用', type: 'info' },
      { time: '14:15:00', desc: '保洁主管携除味仪完成整改，拍照上传前后对比图至员工端', type: 'action' },
      { time: '14:15:30', desc: '系统监测数据回流，AI 标记异味隐患消除，保洁张姐绩效卡标记【标准时长不足警告】', type: 'done', badge: '闭环监督' }
    ]
  },
  {
    id: 'extra_bed',
    title: '客人呼叫 · 动线匹配 · 智能升级',
    icon: '🛏️',
    trigger: '308 房间住客通过扫码/客房音箱发出指令："帮我加床被子，另外送两瓶矿泉水"',
    steps: [
      { time: '21:00:00', desc: '住客语音指令被捕获，语音大模型识别：加被子×1（免费）、矿泉水×2（收费/额度内）', type: 'alert' },
      { time: '21:00:08', desc: 'AI 解析属于【房间到店服务-房内用品增补】，自动调取物资配额规则：加被子计费 50 元/晚', type: 'ai', badge: 'SOP模型' },
      { time: '21:00:15', desc: 'AI 动线最优派单：检索当前在班 3 楼保洁员，发现王姐刚打扫完 305 动线最近', type: 'info' },
      { time: '21:00:25', desc: '阿姨王姐手机收到语音强提醒，接收工单，系统展示配货指示：加被子1、加水2', type: 'action' },
      { time: '21:07:00', desc: '工单倒计时机制：8 分钟未送达自动改派，15 分钟未完成升级值班经理催办', type: 'info' },
      { time: '21:05:30', desc: '王姐送达并微笑交付，手机端标记"已完成"，住客收到通知给出 5 星好评', type: 'done', badge: '全案完成' }
    ]
  }
];

export default function SopSimulator({ allowedScenarios, hideTitle }: { allowedScenarios?: string[], hideTitle?: boolean }) {
  const scenariosToRender = allowedScenarios ? SCENARIOS.filter(s => allowedScenarios.includes(s.id)) : SCENARIOS;
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenariosToRender[0]?.id || 'absence');
  const [currentStepIdx, setCurrentStepIdx] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  const scenario = SCENARIOS.find(s => s.id === selectedScenarioId) || SCENARIOS[0];

  useEffect(() => {
    if (scenariosToRender.length > 0) {
      setSelectedScenarioId(scenariosToRender[0].id);
    }
  }, [allowedScenarios]);

  useEffect(() => {
    setCurrentStepIdx(-1);
    setIsRunning(false);
  }, [selectedScenarioId]);

  const startSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStepIdx(0);
  };

  useEffect(() => {
    if (!isRunning) return;
    if (currentStepIdx < scenario.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1200); // 1.2s per step for clean scrolling effect
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [isRunning, currentStepIdx]);

  const resetSimulation = () => {
    setCurrentStepIdx(-1);
    setIsRunning(false);
  };

  return (
    <div id="sop-simulator" className={hideTitle ? "" : "bg-white rounded-3xl p-6 shadow-xl border border-brand-100"}>
      {!hideTitle && (
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-950">
            业务数据闭环 · AI SOP 智能运行
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            不仅仅是"智能分析出表"，更是自动派单、自主跟进、监督并持续进化的执行引擎
          </p>
        </div>
      )}

      {/* Grid of Scenarios Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {scenariosToRender.map((sc) => {
          const isActive = sc.id === selectedScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedScenarioId(sc.id)}
              className={`p-4 rounded-2xl border text-left transition duration-300 relative ${
                isActive
                  ? 'bg-brand-50 border-brand-300 shadow-md ring-2 ring-brand-100'
                  : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{sc.icon}</span>
                <span className={`text-sm font-bold ${isActive ? 'text-brand-900' : 'text-slate-700'}`}>
                  {sc.title}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">{sc.trigger}</p>
            </button>
          );
        })}
      </div>

      {/* Simulator Sandbox */}
      <div className="bg-gradient-to-br from-slate-50 to-brand-50/30 rounded-2xl border border-slate-200 p-6 overflow-hidden shadow-sm">

        <div className="mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-start gap-2">
            <span className="text-red-500 text-xl shrink-0 mt-0.5">⚠️</span>
            <h4 className="text-base font-bold text-slate-700 leading-relaxed">
              {scenario.trigger}
            </h4>
          </div>
        </div>

        {/* Stepper Content - 纵向时间线 */}
        <div className="space-y-3">
          {scenario.steps.map((st, idx) => {
            let icon = '⚫';
            let borderColor = 'border-slate-300';
            let cardBg = 'bg-white';
            let iconBg = 'bg-slate-100';
            if (st.type === 'alert') { icon = '🚨'; borderColor = 'border-red-400'; cardBg = 'bg-red-50/40'; iconBg = 'bg-red-100'; }
            else if (st.type === 'ai') { icon = '🧠'; borderColor = 'border-indigo-400'; cardBg = 'bg-indigo-50/40'; iconBg = 'bg-indigo-100'; }
            else if (st.type === 'action') { icon = '📱'; borderColor = 'border-blue-400'; cardBg = 'bg-blue-50/40'; iconBg = 'bg-blue-100'; }
            else if (st.type === 'done') { icon = '✓'; borderColor = 'border-green-400'; cardBg = 'bg-green-50/40'; iconBg = 'bg-green-100'; }

            return (
              <div key={idx} className="relative flex gap-3">
                {/* 时间线连接线 */}
                {idx < scenario.steps.length - 1 && (
                  <div className="absolute left-[22px] top-12 bottom-[-16px] w-0.5 bg-slate-200" />
                )}

                {/* 图标节点 */}
                <div className={`shrink-0 w-11 h-11 rounded-full ${iconBg} flex items-center justify-center text-lg z-10 ring-2 ring-white`}>
                  {icon}
                </div>

                {/* 内容卡片 */}
                <div className={`flex-1 ${cardBg} border-l-4 ${borderColor} rounded-r-lg p-4 transition-all hover:shadow-sm`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm bg-slate-800 text-white px-2.5 py-0.5 rounded font-bold font-mono">
                      {st.time}
                    </span>
                    {st.badge && (
                      <span className="text-xs bg-brand-100 text-brand-700 px-2.5 py-0.5 rounded-full font-bold">
                        {st.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
