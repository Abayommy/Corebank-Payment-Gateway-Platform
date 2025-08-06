'use client';

  Eye,
  EyeOff

interface PaymentStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'current';
  ;
  duration: string;
  details?: string[];
}

interface PaymentData {
  amount: string;
  currency: string;
  senderAccount: string;
  receiverAccount: string;
  receiverName: string;
  receiverBank: string;
  purpose: string;
  priority: string;
}

export default function PaymentFlowDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionId] = useState(`TXN-${Date.now()}`);
  const [showAccountNumbers, setShowAccountNumbers] = useState(false);
  
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: '250000.00',
    currency: 'USD',
    senderAccount: '****7892',
    receiverAccount: '****3456',
    receiverName: 'Goldman Sachs International',
    receiverBank: 'JPMorgan Chase Bank',
    purpose: 'Trade Settlement - Bond Purchase',
    priority: 'High Priority'
  });

  const paymentSteps: PaymentStep[] = [
    {
      id: 1,
      title: 'Payment Initiation',
      description: 'Validating payment request and account details',
      status: 'pending',
      ,
      duration: '~2 seconds',
      details: [
        'Account validation completed',
        'Compliance checks passed',
        'Fraud detection: Clean',
        'Available balance confirmed'
      ]
    },
    {
      id: 2,
      title: 'Security Verification',
      description: 'Multi-layer security and compliance screening',
      status: 'pending',
      ,
      duration: '~5 seconds',
      details: [
        'AML screening in progress',
        'Sanctions list verification',
        'KYC validation complete',
        'Risk assessment: Low'
      ]
    },
    {
      id: 3,
      title: 'Network Routing',
      description: 'Optimal routing through banking networks',
      status: 'pending',
      ,
      duration: '~3 seconds',
      details: [
        'SWIFT network selected',
        'Routing path optimized',
        'Correspondent banks identified',
        'Settlement timeline calculated'
      ]
    },
    {
      id: 4,
      title: 'Processing & Settlement',
      description: 'Real-time processing and settlement execution',
      status: 'pending',
      ,
      duration: '~8 seconds',
      details: [
        'Payment instruction sent',
        'Confirmation received',
        'Settlement in progress',
        'Final confirmation pending'
      ]
    },
    {
      id: 5,
      title: 'Completion',
      description: 'Transaction completed successfully',
      status: 'pending',
      ,
      duration: 'Instant',
      details: [
        'Payment settled successfully',
        'Confirmation notifications sent',
        'Transaction recorded',
        'Audit trail completed'
      ]
    }
  ];

  const [steps, setSteps] = useState(paymentSteps);

  const processPayment = async () => {
    setIsProcessing(true);
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      
      // Update current step status
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index < i ? 'completed' : index === i ? 'processing' : 'pending'
      })));

      // Simulate processing time
      const processingTime = i === 0 ? 2000 : i === 1 ? 5000 : i === 2 ? 3000 : i === 3 ? 8000 : 1000;
      await new Promise(resolve => setTimeout(resolve, processingTime));
      
      // Mark as completed
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index <= i ? 'completed' : 'pending'
      })));
    }
    
    setIsProcessing(false);
    setShowSuccessModal(true);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsProcessing(false);
    setShowSuccessModal(false);
    setSteps(paymentSteps);
  };

  const copyTransactionId = () => {
    navigator.clipboard.writeText(transactionId);
  };

  const formatCurrency = (amount: string, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(parseFloat(amount));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Interactive Payment Flow Demo
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Experience how CoreBank CPGP processes enterprise transactions in real-time
          </p>
          
          {/* Demo Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={processPayment}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isProcessing ? (
                <>
                  
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Zap size={20} />
                  <span>Process Payment</span>
                </>
              )}
            </button>
            
            <button
              onClick={resetDemo}
              className="border-2 border-gray-600 hover:border-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-400/10"
            >
              Reset Demo
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Details Panel */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                
                Payment Details
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Amount</span>
                    <span className="text-green-400 font-bold text-xl">
                      {formatCurrency(paymentData.amount, paymentData.currency)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <div className="mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">From Account</span>
                      <button
                        onClick={() => setShowAccountNumbers(!showAccountNumbers)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {showAccountNumbers ?  : <Eye size={16} />}
                      </button>
                    </div>
                    <span className="text-white">
                      {showAccountNumbers ? '1234567890127892' : paymentData.senderAccount}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">To Account</span>
                    <span className="text-white">
                      {showAccountNumbers ? '9876543210123456' : paymentData.receiverAccount}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <div className="mb-2">
                    <span className="text-gray-400 text-sm block">Beneficiary</span>
                    <span className="text-white font-medium">{paymentData.receiverName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">Bank</span>
                    <span className="text-white">{paymentData.receiverBank}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <div className="mb-2">
                    <span className="text-gray-400 text-sm block">Purpose</span>
                    <span className="text-white">{paymentData.purpose}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">Priority</span>
                    <span className="text-orange-400 font-medium">{paymentData.priority}</span>
                  </div>
                </div>

                {(isProcessing || showSuccessModal) && (
                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Transaction ID</span>
                      <button
                        onClick={copyTransactionId}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    <span className="text-blue-400 font-mono text-sm">{transactionId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Processing Steps */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Processing Pipeline</h3>
              
              <div className="space-y-6">
                {steps.map((step, index) => {
                  const isActive = isProcessing && currentStep === index;
                  const isCompleted = step.status === 'completed';
                  const isPending = step.status === 'pending';
                  
                  return (
                    <div
                      key={step.id}
                      className={`relative flex items-start space-x-4 p-6 rounded-xl border transition-all duration-500 ${
                        isActive
                          ? 'bg-blue-900/30 border-blue-500 shadow-lg shadow-blue-500/20'
                          : isCompleted
                          ? 'bg-green-900/20 border-green-500/50'
                          : 'bg-slate-700/30 border-slate-600'
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? 'bg-blue-600 animate-pulse'
                            : isCompleted
                            ? 'bg-green-600'
                            : 'bg-slate-600'
                        }`}
                      >
                        {isActive ? (
                          
                        ) : (
                          
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                          <div className="flex items-center space-x-2">
                            {isActive && (
                              <div className="flex items-center space-x-2 text-blue-400">
                                <Clock size={16} />
                                <span className="text-sm">{step.duration}</span>
                              </div>
                            )}
                            {isCompleted && (
                              
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-4">{step.description}</p>
                        
                        {/* Step Details */}
                        {(isActive || isCompleted) && step.details && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {step.details.map((detail, detailIndex) => (
                              <div
                                key={detailIndex}
                                className={`flex items-center space-x-2 text-sm transition-all duration-300 ${
                                  isCompleted ? 'text-green-400' : 'text-blue-400'
                                }`}
                                style={{ 
                                  animationDelay: `${detailIndex * 200}ms`,
                                  animation: isActive ? 'fadeInUp 0.5s ease-out forwards' : 'none'
                                }}
                              >
                                
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Connection Line */}
                      {index < steps.length - 1 && (
                        <div
                          className={`absolute left-6 top-20 w-0.5 h-8 transition-all duration-500 ${
                            isCompleted ? 'bg-green-500' : 'bg-slate-600'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-md w-full text-center animate-pulse">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Payment Successful!</h3>
              <p className="text-gray-300 mb-6">
                Your transaction has been processed successfully and settled in real-time.
              </p>
              
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Transaction ID:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400 font-mono text-sm">{transactionId}</span>
                    <button onClick={copyTransactionId} className="text-blue-400 hover:text-blue-300">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
