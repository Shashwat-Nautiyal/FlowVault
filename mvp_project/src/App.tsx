import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './config/wagmi';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { BusinessDashboard } from './pages/BusinessDashboard';
import { InvestorDashboard } from './pages/InvestorDashboard';
import { CreateInvoice } from './pages/CreateInvoice';
import { InvoiceDetails } from './pages/InvoiceDetails';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/business" element={<BusinessDashboard />} />
                  <Route path="/investor" element={<InvestorDashboard />} />
                  <Route path="/create-invoice" element={<CreateInvoice />} />
                  <Route path="/invoice/:id" element={<InvoiceDetails />} />
                </Routes>
              </main>
            </div>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
