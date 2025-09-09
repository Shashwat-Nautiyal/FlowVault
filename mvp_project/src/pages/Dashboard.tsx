import { Link } from 'react-router-dom';
import { Building2, TrendingUp, Shield, DollarSign } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to FlowVault
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Unlock your cash flow, vault your future. Connect businesses with investors 
          through secure invoice factoring on Arbitrum.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link
            to="/business"
            className="btn-primary flex items-center space-x-2"
          >
            <Building2 className="h-5 w-5" />
            <span>For Businesses</span>
          </Link>
          <Link
            to="/investor"
            className="btn-secondary flex items-center space-x-2"
          >
            <TrendingUp className="h-5 w-5" />
            <span>For Investors</span>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Instant Cash Flow</h3>
          <p className="text-gray-600 text-sm">
            Get 95% of your invoice value immediately instead of waiting 30-90 days
          </p>
        </div>

        <div className="card text-center">
          <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Earn While You Wait</h3>
          <p className="text-gray-600 text-sm">
            Your collateral earns yield through DeFi protocols while securing the investment
          </p>
        </div>

        <div className="card text-center">
          <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Shield className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Triple Protection</h3>
          <p className="text-gray-600 text-sm">
            Insurance pool, collateral requirements, and smart contracts protect all parties
          </p>
        </div>

        <div className="card text-center">
          <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Building2 className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">3.7% Returns</h3>
          <p className="text-gray-600 text-sm">
            Investors earn attractive returns in 30-90 days with minimal risk
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How FlowVault Works</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
              1
            </div>
            <h3 className="font-semibold mb-2">Business Uploads Invoice</h3>
            <p className="text-gray-600 text-sm">
              Submit your invoice details and lock 40% as collateral that earns yield
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
              2
            </div>
            <h3 className="font-semibold mb-2">Investor Funds Invoice</h3>
            <p className="text-gray-600 text-sm">
              Investor pays 95% of invoice value plus 0.5% insurance fee
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
              3
            </div>
            <h3 className="font-semibold mb-2">Everyone Gets Paid</h3>
            <p className="text-gray-600 text-sm">
              When customer pays, investor gets return, business gets collateral + yield
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">$0</div>
            <div className="text-primary-100">Total Volume</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">0</div>
            <div className="text-primary-100">Active Invoices</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">$0</div>
            <div className="text-primary-100">Insurance Pool</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">0</div>
            <div className="text-primary-100">Successful Investments</div>
          </div>
        </div>
      </div>
    </div>
  );
}
