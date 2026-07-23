import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, HelpCircle, Loader2, Bot, PhoneCall } from 'lucide-react';

export default function ContactForm() {
  const [hotelName, setHotelName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [rooms, setRooms] = useState<number>(80);
  const [adr, setAdr] = useState<number>(350);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [proposal, setProposal] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotelName || !contactName || !phone) {
      alert('请完整填写酒店名称、联系人及手机号！');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate AI computing custom proposal
    setTimeout(() => {
      const annualStaffSaved = Math.round(Math.min(3, Math.max(0.3, (rooms / 80) * 0.75)) * 4500 * 12);
      const annualOtaSaved = Math.round(rooms * 365 * 0.70 * 0.12 * adr * 0.15);
      const totalProfit = annualStaffSaved + annualOtaSaved + Math.round(rooms * 365 * 0.70 * 0.10 * 35);
      
      setProposal({
        hotelName,
        contactName,
        annualStaffSaved,
        annualOtaSaved,
        totalProfit,
        saasCost: rooms <= 50 ? 59 * 12 : rooms > 150 ? 299 * 12 : 99 * 12
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div id="contact-form" className="bg-white rounded-3xl p-6 shadow-xl border border-brand-100">
      <div className="text-center max-w-2xl mx-auto mb-8 border-b border-slate-100 pb-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-950 flex items-center justify-center gap-1.5">
          <PhoneCall className="w-6 h-6 text-brand-500 animate-bounce" /> 立即申请 1对1 免费内测体验
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          国企资本背书，在线免费建模，专属客服 4小时 闪电建档安排线上体验
        </p>
      </div>

      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">酒店名称 *</label>
              <input
                type="text"
                required
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                placeholder="例如：贵阳观山湖希尔顿惠庭"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-500 transition font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 block">联系人姓名 *</label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="例如：王经理 / 李店长"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-500 transition font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600 block">手机号码 (微信同号) *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入11位手机号，方便为您发内测账号"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-500 transition font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">客房数 (间)</label>
              <input
                type="number"
                value={rooms}
                onChange={(e) => setRooms(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-500 transition font-semibold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">均价 (ADR - 元)</label>
              <input
                type="number"
                value={adr}
                onChange={(e) => setAdr(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-500 transition font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-2xl text-xs transition duration-300 shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> 黄小西正在为您分析专属建模方案...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-white" /> 免费获取《{hotelName || '贵店'}专属AI数智化方案》
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 max-w-lg mx-auto relative overflow-hidden">
          {/* Success Decorative Glow */}
          <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-display text-xs font-black text-slate-100">
                申请提交成功 · 专属方案已建模！
              </h3>
              <p className="text-[11px] text-slate-400">系统已为联系人 {proposal.contactName} 匹配定制文档</p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-[11px] text-slate-300">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-1.5">
              <div className="text-[11px] text-slate-500">BUILD DATA ANALYSIS FOR:</div>
              <div className="text-brand-400 font-bold text-xs">{proposal.hotelName}</div>
              <ul className="space-y-1 text-slate-400 mt-2">
                <li>• 配置规格：{rooms}间 / ADR {adr}元</li>
                <li>• 预计释放前台人效收益：<span className="text-emerald-400 font-bold">+¥{proposal.annualStaffSaved.toLocaleString()}/年</span></li>
                <li>• 预计老客复购佣金节省：<span className="text-emerald-400 font-bold">+¥{proposal.annualOtaSaved.toLocaleString()}/年</span></li>
                <li>• 年度综合超额纯利收益：<span className="text-yellow-400 font-bold">+¥{proposal.totalProfit.toLocaleString()}/年</span></li>
                <li>• 年度 SaaS 工具年服务费：¥{proposal.saasCost}/年</li>
              </ul>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <Bot className="w-6 h-6 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-300 leading-relaxed font-semibold italic">
                  "您好！我是黄小西。我们已经收到您的免费内测申请。专属大区经理已为您登记好【建档信息】，会在 4 小时内通过您预留的手机号/微信与您取得联系，并发送专属测试二维码供您贴房实测。预祝贵店业绩长红、天天爆满！"
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsSuccess(false);
              setHotelName('');
            }}
            className="w-full bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold py-2.5 rounded-xl text-[11px] mt-5 transition"
          >
            返回重新测算建档
          </button>
        </div>
      )}

      {/* Official contact links / barcode cards block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100 text-center max-w-lg mx-auto">
        <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center">
          <img src="./images/qrcode.png" alt="二维码" className="w-20 h-20 mb-1" />
          <h4 className="text-xs font-bold text-slate-800">微信扫码 极速体验</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">填写基础信息，即可开始免费试用</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center">
          <a href="https://www.htlclaw.com/" target="_blank" rel="noopener noreferrer" className="text-brand-500 font-bold text-sm hover:text-brand-600 transition">🌐 www.htlclaw.com</a>
          <h4 className="text-xs font-bold text-slate-800 mt-2">官方咨询热线</h4>
          <a href="tel:085186670818" className="text-sm font-extrabold text-brand-600 mt-1 hover:text-brand-700 transition">0851-86671808</a>
          <p className="text-[11px] text-slate-400 mt-0.5">周一至周日 9:00 - 21:00</p>
        </div>
      </div>
    </div>
  );
}
