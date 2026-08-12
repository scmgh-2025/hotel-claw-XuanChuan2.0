import React, { useState, useEffect } from 'react';
import { PAIN_POINTS } from '../data';
import { RoleType } from '../types';
import { AlertCircle, CheckCircle, ShieldAlert, BadgeInfo, Quote } from 'lucide-react';

interface Props {
  allowedRoles?: RoleType[];
  hideTitle?: boolean;
}

export default function RolePainPoints({ allowedRoles, hideTitle }: Props) {
  const rolesToRender = allowedRoles ? PAIN_POINTS.filter(p => allowedRoles.includes(p.role as RoleType)) : PAIN_POINTS;
  const [activeRole, setActiveRole] = useState<RoleType>(rolesToRender[0]?.role as RoleType || 'guest');

  useEffect(() => {
    if (rolesToRender.length > 0) {
      setActiveRole(rolesToRender[0].role as RoleType);
    }
  }, [allowedRoles]);

  const selectedPoint = PAIN_POINTS.find(item => item.role === activeRole) || PAIN_POINTS[0];

  const roleImages: Record<string, string> = {
    guest: './images/住客图片.png',
    front_desk: './images/前台.png',
    housekeeping: './images/客房阿姨.png',
    marketing: './images/市场营销.png',
    manager: './images/店长.png',
    owner: './images/集团老板.png',
  };

  return (
    <div id="role-pain-points" className={hideTitle ? "" : "bg-white rounded-3xl p-6 shadow-xl border border-brand-100"}>
      {!hideTitle && (
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-950">
            客户与酒店核心角色·体验深度变革
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            真正鸿沟不在于有没有智能设备，而在于经营流程有没有被智能引擎贯穿。
          </p>
        </div>
      )}

      {/* Role Tabs Picker - 只有当存在多个可用角色时，才显示 Tab 切换栏 */}
      {rolesToRender.length > 1 && (
        <div className="flex overflow-x-auto gap-2 pb-3 mb-6 scrollbar-none justify-start md:justify-center">
          {rolesToRender.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveRole(item.role)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-semibold transition shrink-0 ${
                activeRole === item.role
                  ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/25 scale-102'
                  : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 hover:border-slate-200'
              }`}
            >
              <span className="text-lg">{item.avatar}</span>
              <div className="text-left">
                <div className="leading-tight font-bold">{item.roleName}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detailed Content Panel */}
      <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200 pb-4 mb-6">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-100 px-2.5 py-1 rounded-full">
              服务场景
            </span>
            <h3 className="text-lg font-bold text-slate-800 mt-2 flex items-center gap-2">
              <span>{selectedPoint.avatar}</span>
              {selectedPoint.roleName}
              <span className="text-slate-300 font-light mx-1">|</span>
              <span className="text-slate-600">{selectedPoint.title}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">{selectedPoint.roleDesc}</p>
          </div>
        </div>

        {/* Before vs After Grid — 角色配图 + BEFORE + AFTER */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
          {/* Column 1: Role Image - PC only */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 max-h-64 flex items-center">
              <img
                src={roleImages[activeRole] || './images/住客图片.png'}
                alt={selectedPoint.roleName}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center center' }}
              />
            </div>
          </div>

          {/* Column 2: BEFORE: Orange Alert */}
          <div className="lg:col-span-4 bg-orange-50/50 rounded-xl p-4 border border-orange-100/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-orange-600 font-bold text-base mb-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                没有智能体时
              </div>
              <div className="space-y-2">
                {selectedPoint.problems.map((prob, i) => (
                  <div key={i} className="bg-white/80 rounded-lg p-2.5 border border-orange-100/40 flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">{prob.scenarios}</h4>
                      <p className="text-xs text-orange-500 font-medium mt-0.5">{prob.consequences}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-orange-200/40 text-xs text-orange-600/80 font-medium flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 shrink-0" />
              传统 PMS 只做记录，不能做判断
            </div>
          </div>

          {/* Column 3: AFTER: Blue AI Empowerment */}
          <div className="lg:col-span-4 bg-brand-50/50 rounded-xl p-4 border border-brand-100/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-brand-600 font-bold text-base mb-3">
                <CheckCircle className="w-4 h-4 shrink-0" />
                HotelClaw 赋能
              </div>
              <div className="space-y-3">
                {selectedPoint.afterAI.map((aiItem, i) => (
                  <div key={i} className="bg-white/80 rounded-lg p-2.5 border border-brand-100/40 flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">{aiItem.scenarios}</h4>
                      {aiItem.metrics && (
                        <p className="text-xs text-brand-600 font-medium mt-0.5">核心指标：{aiItem.metrics}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-brand-200/40 text-xs text-brand-600/80 font-medium flex items-center gap-1">
              <BadgeInfo className="w-3 h-3 shrink-0" />
              自动派单、任务跟踪，越用越聪明
            </div>
          </div>
        </div>

        {/* Case Study Quote */}
        <div className="mt-6 bg-indigo-50/30 rounded-xl p-4 border border-brand-100/40 relative">
          <Quote className="absolute right-4 bottom-2 w-16 h-16 text-brand-900/5 rotate-180 -z-0" />
          <div className="relative z-10 flex gap-3">
            <span className="text-xl">💡</span>
            <div>
              <h4 className="text-xs font-bold text-brand-900">标杆场景实测案例：</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5 font-medium italic">
                "{selectedPoint.caseStudy}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}