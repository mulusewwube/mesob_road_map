import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  TrendingUp,
  GitPullRequest,
  Users,
  Shield,
  Sun,
  Moon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, theme, toggleTheme, currency, setCurrency } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your work email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = login(email.trim(), password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid email or password. Please contact your system administrator.');
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[550px] h-[550px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-800/80 glass-panel relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-glow-brand font-black text-slate-950 text-lg">
            M
          </div>
          <div>
            <div className="text-sm font-bold font-display tracking-tight text-white flex items-center gap-1.5">
              MESOB <span className="text-emerald-400">ROADMAP</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
              Product & Revenue Management System
            </div>
          </div>
        </div>

        {/* Theme and Currency controls */}
        <div className="flex items-center gap-2.5">
          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setCurrency('ETB')}
              className={`px-2.5 py-1 font-semibold rounded-md transition-all ${
                currency === 'ETB'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Ethiopian Birr"
            >
              ETB
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 font-semibold rounded-md transition-all ${
                currency === 'USD'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="US Dollar"
            >
              USD ($)
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </header>

      {/* Main Auth Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 relative z-10 max-w-6xl mx-auto w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Enterprise Value Proposition & Highlights */}
          <div className="md:col-span-6 lg:col-span-7 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5">
                <ShieldCheck className="w-4 h-4" /> Enterprise Security & Governance
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
                Enterprise Product Management & Revenue Lifecycle
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
                Connect your organization's entire product journey in one centralized system: 
                <span className="text-slate-200 font-medium"> Strategy → Sprints → Marketing → Sales CRM → Revenue → Feedback</span>.
              </p>
            </div>

            {/* Enterprise Capabilities Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm space-y-1">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-bold text-white">Granular RBAC Security</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  Multi-tier action permissions (View, Create, Edit, Delete, Approve, Export) and record scopes (ALL, TEAM, OWN).
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm space-y-1">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 mb-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-bold text-white">Revenue Intelligence</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  Real-time ARR, MRR, customer acquisition cost, and direct feature monetization attribution.
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm space-y-1">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 mb-1.5">
                  <GitPullRequest className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-bold text-white">Integrated Sprints & Roadmaps</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  Coordinate strategic epics with engineering sprint tasks, QA readiness, and release schedules.
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm space-y-1">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 mb-1.5">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-bold text-white">Commercial Alignment</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  Seamlessly connect marketing campaigns, sales pipeline opportunities, and customer feedback.
                </div>
              </div>
            </div>

            {/* Compliance Guarantee */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-0.5">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Enterprise-grade Security
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Multi-Tenant Architecture
              </span>
            </div>
          </div>

          {/* Right Column: Secure Production Sign-In Form */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="mb-7">
                <h2 className="text-2xl font-bold text-white font-display tracking-tight">
                  Sign in to your account
                </h2>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Enter your corporate credentials to access your designated product management and revenue modules.
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Work Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase tracking-wider">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@company.com"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        setErrorMessage(null);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300 font-mono uppercase tracking-wider">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter account password"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                        setErrorMessage(null);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Session */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Remember this session</span>
                  </label>
                  <span className="text-[11px] text-slate-500 font-mono">256-bit SSL</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-glow-brand flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In to System</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>

              {/* Security Footnote */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-center gap-2 text-center">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>Protected by Enterprise RBAC Session Governance</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-800/60 text-center text-xs text-slate-500 relative z-10">
        Mesob Product Management & Product Revenue System • Enterprise Edition • Built for Ethiopian & East African Enterprises
      </footer>
    </div>
  );
};
