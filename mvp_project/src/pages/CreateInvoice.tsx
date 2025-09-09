import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, isAddress } from 'viem';
import { Calendar, DollarSign, User, FileText, ArrowLeft } from 'lucide-react';
import { FLOWVAULT_ABI, FLOWVAULT_CONTRACT_ADDRESS } from '../config/contract';

export function CreateInvoice() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  
  const [formData, setFormData] = useState({
    customerAddress: '',
    amount: '',
    dueDate: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customerAddress) {
      newErrors.customerAddress = 'Customer address is required';
    } else if (!isAddress(formData.customerAddress)) {
      newErrors.customerAddress = 'Invalid Ethereum address';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else if (new Date(formData.dueDate) <= new Date()) {
      newErrors.dueDate = 'Due date must be in the future';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !validateForm()) return;

    try {
      const dueTimestamp = Math.floor(new Date(formData.dueDate).getTime() / 1000);
      const amountWei = parseEther(formData.amount);

      writeContract({
        address: FLOWVAULT_CONTRACT_ADDRESS,
        abi: FLOWVAULT_ABI,
        functionName: 'create_invoice',
        args: [formData.customerAddress as `0x${string}`, amountWei, BigInt(dueTimestamp)],
      });
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  // Redirect on success
  if (isSuccess) {
    setTimeout(() => navigate('/business'), 2000);
  }

  const collateralAmount = formData.amount ? (parseFloat(formData.amount) * 0.4).toFixed(2) : '0';
  const fundingAmount = formData.amount ? (parseFloat(formData.amount) * 0.95).toFixed(2) : '0';

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600">Please connect your wallet to create an invoice.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/business')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Create New Invoice</h1>
        <p className="text-gray-600 mt-2">Set up your invoice for factoring and get immediate cash flow</p>
      </div>

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Address */}
          <div>
            <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Customer Wallet Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="customerAddress"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                  errors.customerAddress ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0x742d35Cc6634C0532925a3b8D847C3d2DE31C3c4"
                required
              />
            </div>
            {errors.customerAddress && (
              <p className="text-sm text-red-600 mt-1">{errors.customerAddress}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              The wallet address of your customer who will pay this invoice
            </p>
          </div>

          {/* Invoice Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Invoice Amount (USD)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="1000"
                min="100"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Brief description of goods/services provided..."
              />
            </div>
          </div>

          {/* Summary Card */}
          {formData.amount && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Invoice Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Invoice Amount</p>
                  <p className="font-semibold">${formData.amount}</p>
                </div>
                <div>
                  <p className="text-gray-600">You'll Receive (95%)</p>
                  <p className="font-semibold text-green-600">${fundingAmount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Required Collateral (40%)</p>
                  <p className="font-semibold text-orange-600">${collateralAmount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Platform Fee (1%)</p>
                  <p className="font-semibold">${formData.amount ? (parseFloat(formData.amount) * 0.01).toFixed(2) : '0'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Terms Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Important Notes:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• You must deposit 40% of the invoice amount as collateral</li>
              <li>• Your collateral will earn yield while securing the investment</li>
              <li>• You'll receive 95% of the invoice value when an investor funds it</li>
              <li>• When the customer pays, you get your collateral back plus any earned yield</li>
            </ul>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">✅ Invoice created successfully!</p>
              <p className="text-green-600 text-sm">Redirecting to dashboard...</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/business')}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || isConfirming}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Creating Invoice...' : isConfirming ? 'Confirming...' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
