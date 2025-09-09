import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { 
  ArrowLeft, 
  Clock, 
  DollarSign, 
  Shield, 
  User, 
  Calendar,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export function InvoiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [isInvesting, setIsInvesting] = useState(false);
  const [isDepositingCollateral, setIsDepositingCollateral] = useState(false);

  // Mock data - in real app, this would come from blockchain
  const invoice = {
    id: parseInt(id || '1'),
    business: '0x742d35Cc6634C0532925a3b8D847C3d2DE31C3c4',
    customer: '0x8ba1f109551bD432803012645Hac136c776c2a0af9',
    amount: 1000,
    collateralAmount: 400,
    fundingAmount: 950,
    insuranceFee: 5,
    expectedReturn: 985,
    dueDate: '2025-10-06',
    status: 'Active', // Active, Funded, Paid, Defaulted
    collateralDeposited: id === '2',
    description: 'Web development services for Q3 project',
    createdAt: '2025-09-06',
    investor: id === '2' ? '0x1234567890123456789012345678901234567890' : null,
  };

  const isBusinessOwner = address?.toLowerCase() === invoice.business.toLowerCase();
  const canInvest = invoice.status === 'Active' && invoice.collateralDeposited && !isBusinessOwner;
  const needsCollateral = invoice.status === 'Active' && !invoice.collateralDeposited && isBusinessOwner;

  const handleInvest = async () => {
    if (!isConnected) return;
    
    setIsInvesting(true);
    try {
      // TODO: Implement actual contract interaction
      console.log('Investing in invoice:', invoice.id);
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Refresh data or navigate
    } catch (error) {
      console.error('Error investing:', error);
    } finally {
      setIsInvesting(false);
    }
  };

  const handleDepositCollateral = async () => {
    if (!isConnected) return;
    
    setIsDepositingCollateral(true);
    try {
      // TODO: Implement actual contract interaction
      console.log('Depositing collateral for invoice:', invoice.id);
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Refresh data
    } catch (error) {
      console.error('Error depositing collateral:', error);
    } finally {
      setIsDepositingCollateral(false);
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
        <p className="text-gray-600">Please connect your wallet to view invoice details.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoice #{invoice.id}</h1>
            <p className="text-gray-600">Created on {invoice.createdAt}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
          {invoice.status}
        </span>
      </div>

      {/* Alert for collateral requirement */}
      {needsCollateral && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <h3 className="font-medium text-orange-900">Collateral Required</h3>
          </div>
          <p className="text-orange-800 mt-2">
            You need to deposit ${invoice.collateralAmount} as collateral before investors can fund this invoice.
          </p>
          <button
            onClick={handleDepositCollateral}
            disabled={isDepositingCollateral}
            className="mt-3 btn-primary disabled:opacity-50"
          >
            {isDepositingCollateral ? 'Depositing...' : `Deposit $${invoice.collateralAmount} Collateral`}
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Invoice Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Business</p>
                    <p className="font-mono text-sm">{invoice.business}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-mono text-sm">{invoice.customer}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Due Date</p>
                    <p className="font-medium">{invoice.dueDate}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Invoice Amount</p>
                    <p className="text-2xl font-bold">${invoice.amount}</p>
                  </div>
                </div>

                {invoice.description && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Description</p>
                    <p className="text-gray-900">{invoice.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Breakdown</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Invoice Amount</span>
                  <span className="font-semibold">${invoice.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Funding Amount (95%)</span>
                  <span className="font-semibold text-green-600">${invoice.fundingAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee (1%)</span>
                  <span className="font-semibold">${invoice.amount * 0.01}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Insurance Fee (0.5%)</span>
                  <span className="font-semibold">${invoice.insuranceFee}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Required Collateral (40%)</span>
                  <span className="font-semibold text-orange-600">${invoice.collateralAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Collateral Status</span>
                  <span className={`font-semibold ${invoice.collateralDeposited ? 'text-green-600' : 'text-red-600'}`}>
                    {invoice.collateralDeposited ? '✓ Deposited' : '✗ Required'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Investor Return</span>
                  <span className="font-semibold text-blue-600">${invoice.expectedReturn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return Rate</span>
                  <span className="font-semibold text-blue-600">3.7%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Status */}
          {invoice.investor && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment Details</h2>
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Investor</p>
                  <p className="font-mono text-sm">{invoice.investor}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Investment Action */}
          {canInvest && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Opportunity</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment Required</span>
                  <span className="font-bold text-lg">${invoice.fundingAmount + invoice.insuranceFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Return</span>
                  <span className="font-bold text-green-600">${invoice.expectedReturn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return Rate</span>
                  <span className="font-bold text-blue-600">3.7%</span>
                </div>
              </div>

              <button
                onClick={handleInvest}
                disabled={isInvesting}
                className="w-full btn-primary disabled:opacity-50"
              >
                {isInvesting ? 'Processing Investment...' : 'Invest Now'}
              </button>
            </div>
          )}

          {/* Risk Assessment */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-700">40% Collateral Protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-700">Insurance Pool Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-700">Smart Contract Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-blue-700">
                  {Math.ceil((new Date(invoice.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days until due
                </span>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex space-x-2">
                <span className="bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                <span>Business deposits 40% collateral that earns yield</span>
              </div>
              <div className="flex space-x-2">
                <span className="bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                <span>Investor funds 95% + 0.5% insurance fee</span>
              </div>
              <div className="flex space-x-2">
                <span className="bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                <span>When customer pays, everyone gets their returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
