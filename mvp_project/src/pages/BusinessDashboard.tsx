import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

export function BusinessDashboard() {
  const { isConnected } = useAccount();
  const [invoices] = useState([
    {
      id: 1,
      customer: '0x742d35Cc6634C0532925a3b8D847C3d2DE31C3c4',
      amount: 1000,
      status: 'Active',
      dueDate: '2025-10-06',
      collateralDeposited: false,
    },
    {
      id: 2,
      customer: '0x8ba1f109551bD432803012645Hac136c776c2a0af9',
      amount: 2500,
      status: 'Funded',
      dueDate: '2025-11-15',
      collateralDeposited: true,
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Funded':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'Paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Defaulted':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-yellow-100 text-yellow-800';
      case 'Funded':
        return 'bg-blue-100 text-blue-800';
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Defaulted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600">Please connect your wallet to access the business dashboard.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your invoices and cash flow</p>
        </div>
        <Link
          to="/create-invoice"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Invoice</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
            </div>
            <FileText className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${invoices.filter(i => i.status === 'Active').reduce((sum, i) => sum + i.amount, 0)}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Funded Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${invoices.filter(i => i.status === 'Funded').reduce((sum, i) => sum + i.amount, 0)}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold text-gray-900">$0</p>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <span className="text-green-600 font-semibold">ETH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Invoices</h2>
        </div>

        {invoices.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
            <p className="text-gray-600 mb-4">Create your first invoice to get started with FlowVault</p>
            <Link to="/create-invoice" className="btn-primary">
              Create Invoice
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Collateral</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">#{invoice.id}</td>
                    <td className="py-3 px-4 text-sm font-mono">
                      {invoice.customer.slice(0, 6)}...{invoice.customer.slice(-4)}
                    </td>
                    <td className="py-3 px-4 font-semibold">${invoice.amount}</td>
                    <td className="py-3 px-4">{invoice.dueDate}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        <span>{invoice.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {invoice.collateralDeposited ? (
                        <span className="text-green-600 text-sm">✓ Deposited</span>
                      ) : (
                        <span className="text-red-600 text-sm">✗ Required</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/invoice/${invoice.id}`}
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

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/create-invoice"
              className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Plus className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="font-medium text-gray-900">Create New Invoice</p>
                  <p className="text-sm text-gray-600">Start factoring a new invoice</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Create invoices to get immediate cash flow</p>
            <p>• Deposit 40% collateral to enable funding</p>
            <p>• Earn yield on your collateral while waiting</p>
            <p>• Get your collateral back when invoice is paid</p>
          </div>
        </div>
      </div>
    </div>
  );
}
