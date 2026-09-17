import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { SearchPalette } from './components/common/SearchPalette';
import { FeatureDetailDrawer } from './components/common/FeatureDetailDrawer';

// Views
import { DashboardView } from './views/DashboardView';
import { StrategyView } from './views/StrategyView';
import { MarketView } from './views/MarketView';
import { ProductsView } from './views/ProductsView';
import { RoadmapView } from './views/RoadmapView';
import { DevelopmentView } from './views/DevelopmentView';
import { ReleasesView } from './views/ReleasesView';
import { MarketingView } from './views/MarketingView';
import { SalesView } from './views/SalesView';
import { RevenueView } from './views/RevenueView';
import { FeatureRevenueView } from './views/FeatureRevenueView';
import { FeedbackView } from './views/FeedbackView';
import { AnalyticsView } from './views/AnalyticsView';
import { CrossLinkView } from './views/CrossLinkView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import { AccessControlView } from './views/AccessControlView';
import { UnauthorizedState } from './components/common/PermissionGate';

const MainContent: React.FC = () => {
  const { activeView, hasPermission } = useApp();

  const renderView = () => {
    // Top-level RBAC Route Guard: If role cannot view this module, render Unauthorized state
    if (!hasPermission(activeView, 'view')) {
      return <UnauthorizedState module={activeView} />;
    }

    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'strategy':
        return <StrategyView />;
      case 'market':
        return <MarketView />;
      case 'products':
      case 'product-360':
        return <ProductsView />;
      case 'roadmap':
        return <RoadmapView />;
      case 'development':
        return <DevelopmentView />;
      case 'releases':
        return <ReleasesView />;
      case 'marketing':
        return <MarketingView />;
      case 'sales':
        return <SalesView />;
      case 'revenue':
        return <RevenueView />;
      case 'feature-revenue':
        return <FeatureRevenueView />;
      case 'feedback':
        return <FeedbackView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'crosslink':
        return <CrossLinkView />;
      case 'reports':
        return <ReportsView />;
      case 'access-control':
        return <AccessControlView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950">
          {renderView()}
        </main>
      </div>

      {/* Global Overlays */}
      <SearchPalette />
      <FeatureDetailDrawer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
