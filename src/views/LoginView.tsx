import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  Users,
  Coins
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { users, roles, login, theme, toggleTheme, currency, setCurrency } = useApp();

  const [email, setEmail] = useState('dawit.haile@mesob.et');
  const [password, setPassword] = useState('mesob123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || 'Authentication failed. Please check your credentials.');
      }
    }, 200);
  };

  const handleSelectPersona = (userEmail: string, userPass?: string) => {
    setEmail(userEmail);
    setPassword(userPass || 'mesob123');
    setErrorMessage(null);

    // Instant sign in on click
    setIsLoading(true);
    setTimeout(() => {
      login(userEmail, userPass || 'mesob123');
      setIsLoading(false);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-800/60 glass-panel relative z-10">
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
        <div className="flex items-center gap-2">
          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setCurrency('ETB')}
              className={`px-2.5 py-1 font-semibold rounded-md transition-all ${
                currency === 'ETB'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
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
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 max-w-6xl mx-auto w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Top: Brand Intro & 1-Click Persona Login */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4" /> Role-Based Access Control (RBAC)
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
                Enterprise Product Management & Revenue Lifecycle
              </h1>
              <p className="text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
                Connect your complete organizational workflow: <span className="text-slate-200">Strategy → Development → Marketing → Sales CRM → Revenue → Feedback</span> with granular role permissions and multi-tier record scopes.
              </p>
            </div>

            {/* Quick Demo Persona Sign-In Card Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 1-Click Demo Persona Sign-In:
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Password: <code className="text-emerald-400">mesob123</code></span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {users.slice(0, 6).map(u => {
                  const role = roles.find(r => r.id === u.roleId);
                  const isSelected = email.toLowerCase() === u.email.toLowerCase();

                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleSelectPersona(u.email, u.password)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-500/40 shadow-glow-brand ring-1 ring-emerald-500/30'
                          : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {u.avatarUrl ? (
                          <img
                            src={u.avatarUrl}
                            alt={u.name}
                            className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700 shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                            {u.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                            {u.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {role?.name || u.title}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ml-2 ${
                          role?.code === 'SUPER_ADMIN'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : role?.code === 'SALES_REP'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : role?.code === 'ENG_LEAD'
                            ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {role?.code || 'ROLE'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Login Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800/90 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="mb-6">
                <h2 className="text-xl font-bold text-white font-display">Sign in to your account</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your corporate credentials to access your designated product lifecycle modules.
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono uppercase">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. dawit.haile@mesob.et"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Password input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300 font-mono uppercase">
                      Password
                    </label>
                    <span className="text-[11px] text-slate-500 font-mono">Default: <code className="text-emerald-400">mesob123</code></span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter account password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
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

                {/* Remember & Help */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Remember this session</span>
                  </label>
                  <span className="text-[11px] text-emerald-400 font-mono">RBAC Enabled</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-glow-brand flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In to Mesob System</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>

              {/* Security Footnote */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-center gap-2 text-center">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>End-to-end RBAC authentication & data scope protection</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-800/60 text-center text-xs text-slate-500 relative z-10">
        Mesob Product Management & Product Revenue System • v2.5 Enterprise Edition • Built for Ethiopian & East African Enterprises
      </footer>
    </div>
  );
};
