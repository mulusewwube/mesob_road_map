import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { MarketSegment, Competitor } from '../types';
import {
  Globe2,
  Users,
  ShieldAlert,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Check,
  X,
  Layers,
  ArrowRight,
  Plus,
  Edit2,
  Trash2
} from 'lucide-react';

export const MarketView: React.FC = () => {
  const {
    marketSegments,
    competitors,
    formatMoney,
    formatCompactMoney,
    addMarketSegment,
    updateMarketSegment,
    deleteMarketSegment,
    addCompetitor,
    updateCompetitor,
    deleteCompetitor
  } = useApp();

  const [activeTab, setActiveTab] = useState<'segments' | 'competitors'>('segments');

  // Modals
  const [isAddSegmentOpen, setIsAddSegmentOpen] = useState(false);
  const [editingSegment, setEditingSegment] = useState<MarketSegment | null>(null);

  const [isAddCompOpen, setIsAddCompOpen] = useState(false);
  const [editingComp, setEditingComp] = useState<Competitor | null>(null);

  // Segment form state
  const [segMarket, setSegMarket] = useState('Ethiopia Hospitality');
  const [segName, setSegName] = useState('');
  const [segType, setSegType] = useState('');
  const [segSize, setSegSize] = useState(150000000);
  const [segProblem, setSegProblem] = useState('');
  const [segOpp, setSegOpp] = useState('');
  const [segRisk, setSegRisk] = useState('');
  const [segTrend, setSegTrend] = useState('');

  // Competitor form state
  const [compName, setCompName] = useState('');
  const [compProd, setCompProd] = useState('');
  const [compPricingModel, setCompPricingModel] = useState('Monthly SaaS');
  const [compPricingETB, setCompPricingETB] = useState('10,000 ETB/mo');
  const [compStrengths, setCompStrengths] = useState('');
  const [compWeaknesses, setCompWeaknesses] = useState('');
  const [compPosition, setCompPosition] = useState<Competitor['marketPosition']>('Challenger');

  const openAddSegment = () => {
    setEditingSegment(null);
    setSegMarket('Ethiopia Hospitality');
    setSegName('');
    setSegType('');
    setSegSize(100000000);
    setSegProblem('');
    setSegOpp('');
    setSegRisk('');
    setSegTrend('Digitalization and mobile payments');
    setIsAddSegmentOpen(true);
  };

  const openEditSegment = (s: MarketSegment) => {
    setEditingSegment(s);
    setSegMarket(s.market);
    setSegName(s.segment);
    setSegType(s.customerType);
    setSegSize(s.marketSizeETB);
    setSegProblem(s.customerProblem);
    setSegOpp(s.opportunity);
    setSegRisk(s.risk);
    setSegTrend(s.marketTrend);
    setIsAddSegmentOpen(true);
  };

  const handleSaveSegment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!segName) return;

    if (editingSegment) {
      updateMarketSegment(editingSegment.id, {
        market: segMarket,
        segment: segName,
        customerType: segType,
        marketSizeETB: Number(segSize),
        customerProblem: segProblem,
        opportunity: segOpp,
        risk: segRisk,
        marketTrend: segTrend
      });
    } else {
      addMarketSegment({
        market: segMarket,
        segment: segName,
        customerType: segType || 'Commercial F&B merchants',
        marketSizeETB: Number(segSize) || 100000000,
        growthOpportunity: 'Rapid market modernization',
        customerProblem: segProblem || 'Manual operational bottlenecks',
        marketTrend: segTrend || 'Shift to mobile ordering',
        opportunity: segOpp || 'High willingness to subscribe',
        risk: segRisk || 'Uptime and hardware dependency',
        targetProductIds: []
      });
    }

    setIsAddSegmentOpen(false);
    setEditingSegment(null);
  };

  const openAddComp = () => {
    setEditingComp(null);
    setCompName('');
    setCompProd('');
    setCompPricingModel('Subscription');
    setCompPricingETB('15,000 ETB/mo');
    setCompStrengths('Brand recognition\nExisting client base');
    setCompWeaknesses('No local payment bridge\nClunky user interface');
    setCompPosition('Challenger');
    setIsAddCompOpen(true);
  };

  const openEditComp = (c: Competitor) => {
    setEditingComp(c);
    setCompName(c.name);
    setCompProd(c.product);
    setCompPricingModel(c.pricingModel);
    setCompPricingETB(c.pricingETB);
    setCompStrengths(c.strengths.join('\n'));
    setCompWeaknesses(c.weaknesses.join('\n'));
    setCompPosition(c.marketPosition);
    setIsAddCompOpen(true);
  };

  const handleSaveComp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compName) return;

    const strengthsArr = compStrengths.split('\n').filter(s => s.trim().length > 0);
    const weaknessesArr = compWeaknesses.split('\n').filter(w => w.trim().length > 0);

    if (editingComp) {
      updateCompetitor(editingComp.id, {
        name: compName,
        product: compProd,
        pricingModel: compPricingModel,
        pricingETB: compPricingETB,
        strengths: strengthsArr,
        weaknesses: weaknessesArr,
        marketPosition: compPosition
      });
    } else {
      addCompetitor({
        name: compName,
        product: compProd || 'POS & Ordering System',
        pricingModel: compPricingModel,
        pricingETB: compPricingETB,
        features: ['Ordering', 'Basic Reports'],
        targetCustomers: 'Commercial Restaurants',
        strengths: strengthsArr,
        weaknesses: weaknessesArr,
        marketPosition: compPosition,
        competingProductIds: []
      });
    }

    setIsAddCompOpen(false);
    setEditingComp(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Module 5 • Market & Competitors
            </span>
            <span className="text-xs text-slate-400 font-mono">100% Editable Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Market Opportunity & Competitor Intelligence</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Customer segments, addressable market sizes in Ethiopia, competitive moats, and feature matrix.
          </p>
        </div>

        {/* Tab & Action */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('segments')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'segments'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Customer Segments & TAM
            </button>
            <button
              onClick={() => setActiveTab('competitors')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'competitors'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Competitor Intelligence Grid
            </button>
          </div>

          {activeTab === 'segments' ? (
            <button
              onClick={openAddSegment}
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Add Segment
            </button>
          ) : (
            <button
              onClick={openAddComp}
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Add Competitor
            </button>
          )}
        </div>
      </div>

      {activeTab === 'segments' ? (
        /* Market Segments Tab */
        <div className="space-y-4">
          {marketSegments.length === 0 && (
            <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-slate-800 space-y-3">
              <Globe2 className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white font-display">No Market Segments Configured</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Define your target market customer segments, size of opportunity (TAM), and pain points.
              </p>
              <button
                onClick={openAddSegment}
                className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 stroke-[3]" /> Create Market Segment
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketSegments.map((seg, idx) => (
              <div
                key={seg.id}
                className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">SEGMENT 0{idx + 1}</span>
                    <div className="flex items-center gap-1.5">
                      <Badge variant="cyan">{seg.market}</Badge>
                      <button
                        onClick={() => openEditSegment(seg)}
                        className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        title="Edit Segment"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete segment: ${seg.segment}?`)) {
                            deleteMarketSegment(seg.id);
                          }
                        }}
                        className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                        title="Delete Segment"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white font-display">{seg.segment}</h3>
                  <p className="text-xs text-slate-300 mt-1">{seg.customerType}</p>

                  <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Total Addressable Market (TAM)</div>
                    <div className="text-xl font-extrabold text-emerald-400 font-display mt-0.5">
                      {formatMoney(seg.marketSizeETB)}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                      <div className="font-semibold text-rose-300 flex items-center gap-1.5 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Customer Pain Point
                      </div>
                      <div className="text-slate-300 text-[11px] leading-relaxed">{seg.customerProblem}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                      <div className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-emerald-400" /> Strategic Opportunity
                      </div>
                      <div className="text-slate-300 text-[11px] leading-relaxed">{seg.opportunity}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                      <div className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Operational Risk
                      </div>
                      <div className="text-slate-300 text-[11px] leading-relaxed">{seg.risk}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Trend: <strong className="text-slate-200">{seg.marketTrend}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Competitors Matrix Tab */
        <div className="space-y-4">
          {competitors.length === 0 && (
            <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-slate-800 space-y-3">
              <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white font-display">No Competitor Records Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Add competitor profiles, pricing structures, and evaluate your strategic market moats.
              </p>
              <button
                onClick={openAddComp}
                className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 stroke-[3]" /> Add Competitor Profile
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {competitors.map((comp) => (
              <div
                key={comp.id}
                className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={comp.marketPosition === 'Leader' ? 'amber' : comp.marketPosition === 'Niche' ? 'purple' : 'gray'}>
                      {comp.marketPosition}
                    </Badge>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditComp(comp)}
                        className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        title="Edit Competitor"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete competitor: ${comp.name}?`)) {
                            deleteCompetitor(comp.id);
                          }
                        }}
                        className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                        title="Delete Competitor"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white font-display">{comp.name}</h3>
                  <div className="text-xs text-slate-300 font-medium mt-0.5">{comp.product}</div>

                  <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <div className="text-[11px] text-slate-400">Pricing in Market</div>
                    <div className="font-bold text-white mt-0.5">{comp.pricingETB}</div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Strengths
                      </div>
                      <ul className="space-y-1 text-slate-300">
                        {comp.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px]">
                            <span className="text-emerald-400">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" /> Weaknesses (Your Advantage)
                      </div>
                      <ul className="space-y-1 text-slate-300">
                        {comp.weaknesses.map((w, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px]">
                            <span className="text-rose-400">•</span> {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Segment Modal */}
      <Modal
        isOpen={isAddSegmentOpen}
        onClose={() => {
          setIsAddSegmentOpen(false);
          setEditingSegment(null);
        }}
        title={editingSegment ? `Edit Segment: ${editingSegment.segment}` : 'Create Market Segment'}
        subtitle="Define customer persona, market sizing (TAM), pain points, and strategic opportunities"
      >
        <form onSubmit={handleSaveSegment} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Segment Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Fine Dining Restaurants"
                value={segName}
                onChange={e => setSegName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Geographic Market</label>
              <input
                type="text"
                value={segMarket}
                onChange={e => setSegMarket(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Customer Profile / Type</label>
              <input
                type="text"
                placeholder="e.g. Restaurants with >80 seats"
                value={segType}
                onChange={e => setSegType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Market Size TAM (ETB)</label>
              <input
                type="number"
                value={segSize}
                onChange={e => setSegSize(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Customer Pain Point / Problem</label>
            <textarea
              rows={2}
              placeholder="What core problem do these customers experience?"
              value={segProblem}
              onChange={e => setSegProblem(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Strategic Opportunity</label>
              <textarea
                rows={2}
                placeholder="How will your product capture value?"
                value={segOpp}
                onChange={e => setSegOpp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Operational Risk</label>
              <textarea
                rows={2}
                placeholder="What risks must be mitigated?"
                value={segRisk}
                onChange={e => setSegRisk(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsAddSegmentOpen(false);
                setEditingSegment(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              {editingSegment ? 'Save Changes' : 'Create Segment'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add / Edit Competitor Modal */}
      <Modal
        isOpen={isAddCompOpen}
        onClose={() => {
          setIsAddCompOpen(false);
          setEditingComp(null);
        }}
        title={editingComp ? `Edit Competitor: ${editingComp.name}` : 'Add Competitor Profile'}
        subtitle="Benchmark competitors, pricing models, strengths, and weaknesses"
      >
        <form onSubmit={handleSaveComp} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Competitor Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Legacy Micros Server"
                value={compName}
                onChange={e => setCompName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Their Product Offering</label>
              <input
                type="text"
                placeholder="e.g. On-Premise POS"
                value={compProd}
                onChange={e => setCompProd(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Their Pricing in Market</label>
              <input
                type="text"
                placeholder="e.g. 120,000 ETB upfront + maintenance"
                value={compPricingETB}
                onChange={e => setCompPricingETB(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Market Position</label>
              <select
                value={compPosition}
                onChange={e => setCompPosition(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Leader">Leader</option>
                <option value="Challenger">Challenger</option>
                <option value="Niche">Niche</option>
                <option value="Follower">Follower</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Strengths (1 per line)</label>
              <textarea
                rows={3}
                placeholder="Strong brand&#10;Works offline"
                value={compStrengths}
                onChange={e => setCompStrengths(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Weaknesses (1 per line)</label>
              <textarea
                rows={3}
                placeholder="No Telebirr bridge&#10;Expensive server required"
                value={compWeaknesses}
                onChange={e => setCompWeaknesses(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsAddCompOpen(false);
                setEditingComp(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              {editingComp ? 'Save Changes' : 'Save Competitor'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
