import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { TrendingUp, DollarSign, Shield, Clock, CheckCircle } from 'lucide-react';

export function InvestorDashboard() {
  const { isConnected } = useAccount();
  const [availableInvoices] = useState([
    {
      id: 1,
      business: '0x742d35Cc6634C0532925a3b8D847C3d2DE31C3c4',
      amount: 1000,
      fundingAmount: 950,
      expectedReturn: 985,
      dueDate: '2025-10-06',
      duration: '30 days',
      yieldRate: '3.7%',
      collateralRatio: '40%',
    },
    {
      id: 3,
      business: '0x8ba1f109551bD432803012645Hac136c776c2a0af9',
      amount: 5000,
      fundingAmount: 4750,
      expectedReturn: 4925,
      dueDate: '2025-12-06',
      duration: '60 days',
      yieldRate: '3.7%',
      collateralRatio: '40%',
    },
  ]);

  const [myInvestments] = useState([
    {
      id: 2,
      business: '0x8ba1f109551bD432803012645Hac136c776c2a0af9',
      amount: 2500,
      invested: 2375,
      expectedReturn: 2460,
      dueDate: '2025-11-15',
      status: 'Active',
    },
  ]);

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600">Please connect your wallet to access the investor dashboard.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
        <p className="text-gray-600 mt-2">Discover investment opportunities with attractive returns</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${myInvestments.reduce((sum, inv) => sum + inv.invested, 0)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Investments</p>
              <p className="text-2xl font-bold text-gray-900">{myInvestments.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expected Returns</p>
              <p className="text-2xl font-bold text-gray-900">
                ${myInvestments.reduce((sum, inv) => sum + inv.expectedReturn, 0)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Return Rate</p>
              <p className="text-2xl font-bold text-gray-900">3.7%</p>
            </div>
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Available Investments */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Available Investment Opportunities</h2>
          <span className="text-sm text-gray-600">{availableInvoices.length} opportunities</span>
        </div>

        {availableInvoices.length === 0 ? (
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No investments available</h3>
            <p className="text-gray-600">Check back later for new investment opportunities</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {availableInvoices.map((invoice) => (
              <div key={invoice.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Invoice #{invoice.id}</h3>
                    <p className="text-sm text-gray-600 font-mono">
                      Business: {invoice.business.slice(0, 6)}...{invoice.business.slice(-4)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">{invoice.yieldRate}</p>
                    <p className="text-sm text-gray-600">Expected Return</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Invoice Amount</p>
                    <p className="text-lg font-semibold">${invoice.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Investment Required</p>
                    <p className="text-lg font-semibold text-primary-600">${invoice.fundingAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Return</p>
                    <p className="text-lg font-semibold text-green-600">${invoice.expectedReturn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-lg font-semibold">{invoice.duration}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Shield className="h-4 w-4" />
                      <span>{invoice.collateralRatio} Collateral</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Due {invoice.dueDate}</span>
                    </span>
                  </div>
                  <Link
                    to={`/invoice/${invoice.id}`}
                    className="btn-primary"
                  >
                    Invest Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Investments */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">My Investments</h2>
        </div>

        {myInvestments.length === 0 ? (
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No investments yet</h3>
            <p className="text-gray-600 mb-4">Start investing in invoices to earn attractive returns</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Business</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount Invested</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Expected Return</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myInvestments.map((investment) => (
                  <tr key={investment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">#{investment.id}</td>
                    <td className="py-3 px-4 text-sm font-mono">
                      {investment.business.slice(0, 6)}...{investment.business.slice(-4)}
                    </td>
                    <td className="py-3 px-4 font-semibold">${investment.invested}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">${investment.expectedReturn}</td>
                    <td className="py-3 px-4">{investment.dueDate}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <CheckCircle className="h-3 w-3" />
                        <span>{investment.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/invoice/${investment.id}`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Investment Tips */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Tips</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• All investments are secured by 40% collateral from businesses</p>
          <p>• Insurance pool provides additional protection against defaults</p>
          <p>• Collateral earns yield while securing your investment</p>
          <p>• Average return is 3.7% over 30-90 day periods</p>
          <p>• Smart contracts automatically handle payments and distributions</p>
        </div>
      </div>
    </div>
  );
}
