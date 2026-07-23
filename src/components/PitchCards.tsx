import React, { useState } from 'react';
import { PITCH_CARDS } from '../data';
import { Quote, MessageCircleCode, UserCheck, ShieldAlert, BadgeInfo, Star } from 'lucide-react';

export default function PitchCards() {
  const [activeCard, setActiveCard] = useState<string>('owner');

  const selectedCard = PITCH_CARDS.find(c => c.id === activeCard) || PITCH_CARDS[0];

  return (
    <div id="pitch-cards" className="bg-white rounded-3xl p-6 shadow-xl border border-brand-100">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-950">
          营销沟通场景 · 专属说服话术
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          针对不同经营决策角色，选配最切中要害、最能直击心弦的高价值沟通策略
        </p>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-3 mb-6 justify-start md:justify-center scrollbar-none">
        {PITCH_CARDS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveCard(item.id)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition shrink-0 ${
              activeCard === item.id
                ? 'bg-indigo-900 border-indigo-900 text-white shadow-md'
                : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {item.id === 'owner' ? '👑 打动老板' : item.id === 'manager' ? '🧑‍💼 打动店长' : '🧹 打动员工'}
          </button>
        ))}
      </div>

      {/* Selected Pitch Card Content */}
      <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-slate-100 rounded-2xl p-6 relative overflow-hidden border border-slate-800">
        <Quote className="absolute right-4 top-4 w-32 h-32 text-white/5 pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {selectedCard.id === 'owner' ? '👑' : selectedCard.id === 'manager' ? '🧑‍💼' : '🧹'}
            </span>
            <div>
              <h3 className="font-display text-xs font-black text-yellow-400">
                {selectedCard.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{selectedCard.subtitle}</p>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 text-[11px] leading-relaxed text-slate-200 font-semibold italic">
            {selectedCard.content}
          </div>

          <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-3 flex items-center justify-between text-brand-400 text-[11px] font-bold">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-brand-400 text-brand-400 animate-spin" style={{ animationDuration: '4s' }} />
              核心说服优势：
            </div>
            <span>{selectedCard.highlight}</span>
          </div>
        </div>
      </div>

      {/* Quick Comparison Section */}
      <div className="mt-6 bg-slate-50 rounded-2xl p-4 border border-slate-100">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 border-b border-slate-200 pb-2 mb-3">
          <ShieldAlert className="w-4 h-4 text-brand-500" /> 销售场景避坑 · 常见疑虑与对比策略
        </h4>

        <div className="space-y-2 text-[11px]">
          <div className="bg-white rounded-xl p-3 border border-slate-100 flex gap-2">
            <span className="font-bold text-slate-400">问：</span>
            <div>
              <p className="font-bold text-slate-800">"连锁集团酒店有成套系统，我们单体酒店小比不了，买不起..."</p>
              <p className="text-brand-600 font-semibold mt-1">答：连锁确实好，但 HotelClaw 正是帮单体店无痛拥有同样的科学管理系统，年费不过一晚房费，免运维、3分钟配置！</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-slate-100 flex gap-2">
            <span className="font-bold text-slate-400">问：</span>
            <div>
              <p className="font-bold text-slate-800">"我以前用过智能客服，就是傻瓜关键词回复，住客嫌弱鸡没啥用..."</p>
              <p className="text-brand-600 font-semibold mt-1">答：关键词客服早已过时。我们拥有 109 套深度的行业业务本体模型卡片，懂得怎么派单、匹配阿姨、甚至突发请假自主跟进排班，不聊天，直接干活！</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
