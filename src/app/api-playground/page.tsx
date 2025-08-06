'use client';

import React, { useState } from 'react';
import { Play, Copy, Check, Code, FileText, Zap, Home, ArrowLeft, Building } from 'lucide-react';
import Link from 'next/link';

const APIPlayground = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('wire-initiate');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = {
    'wire-initiate': {
      method: 'POST',
      path: '/payments/wire/initiate',
      title: 'Initiate Wire Transfer',
      description: 'Create a new wire transfer with real-time processing',
      requestBody: `{
  "transactionId": "WIRE-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-DEMO-001",
  "instructingAgent": "AFGUUS33XXX",
  "instructedAgent": "CBCUUS33XXX",
  "amount": {
    "value": "250000.00",
    "currency": "USD"
  },
  "debtorAccount": "4401234567890123",
  "creditorAccount": "5512345678901234",
  "remittanceInfo": "Corporate Payment - Demo Transaction",
  "executionDate": "${new Date().toISOString()}",
  "priority": "NORMAL",
  "fedwireRequired": false,
  "chipsEligible": true,
  "purposeCode": "SUPP",
  "clientMetadata": {
    "clientId": "DEMO-CLIENT-001",
    "department": "Treasury Operations",
    "approver": "Demo User"
  }
}`,
      mockResponse: `{
  "paymentId": "CPGP-WIRE-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-001847",
  "status": "INITIATED",
  "fedwireReference": "FW${new Date().toISOString().slice(2,10).replace(/-/g,'')}AFGUUS33001847",
  "chipsSequence": "CH${new Date().toISOString().slice(2,10).replace(/-/g,'')}089234",
  "estimatedSettlement": "${new Date(Date.now() + 45*60000).toISOString()}",
  "fees": {
    "wireTransferFee": "25.00",
    "fedwireFee": "18.50",
    "totalFees": "43.50"
  },
  "complianceChecks": {
    "sanctionsScreening": "PASSED",
    "amlStatus": "CLEARED",
    "ofacStatus": "CLEAR",
    "riskScore": "LOW"
  },
  "statusUpdateUrl": "https://api.corebank.com/v2/payments/CPGP-WIRE-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-001847/status",
  "webhookDelivered": true
}`
    },
    'payment-status': {
      method: 'GET',
      path: '/payments/{paymentId}/status',
      title: 'Get Payment Status',
      description: 'Retrieve real-time payment status with complete history',
      requestBody: '',
      mockResponse: `{
  "paymentId": "CPGP-WIRE-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-001847",
  "currentStatus": "SETTLEMENT_IN_PROGRESS",
  "statusHistory": [
    {
      "status": "INITIATED",
      "timestamp": "${new Date(Date.now() - 30*60000).toISOString()}",
      "location": "CPGP_CORE",
      "details": "Payment accepted and queued for processing"
    },
    {
      "status": "COMPLIANCE_CHECKING",
      "timestamp": "${new Date(Date.now() - 25*60000).toISOString()}",
      "location": "COMPLIANCE_ENGINE",
      "details": "OFAC and AML screening completed successfully"
    },
    {
      "status": "FEDWIRE_SUBMITTED",
      "timestamp": "${new Date(Date.now() - 20*60000).toISOString()}",
      "location": "FEDERAL_RESERVE",
      "details": "Submitted to FedWire network",
      "fedwireReference": "FW${new Date().toISOString().slice(2,10).replace(/-/g,'')}AFGUUS33001847"
    },
    {
      "status": "SETTLEMENT_IN_PROGRESS",
      "timestamp": "${new Date(Date.now() - 5*60000).toISOString()}",
      "location": "RECEIVING_BANK",
      "details": "Processing at Continental Banking Corporation"
    }
  ],
  "estimatedCompletion": "${new Date(Date.now() + 15*60000).toISOString()}",
  "actualFees": "43.50",
  "riskScore": "LOW",
  "networkMetrics": {
    "fedwireTransitTime": "14 minutes",
    "expectedSettlementWindow": "15:00-15:30 EDT"
  }
}`
    },
    'account-balance': {
      method: 'GET', 
      path: '/accounts/{accountId}/statements/eod',
      title: 'Account Balance Statement',
      description: 'ISO 20022 compliant end-of-day balance reporting',
      requestBody: '',
      mockResponse: `{
  "accountId": "4401234567890123",
  "statementDate": "${new Date().toISOString().split('T')[0]}",
  "openingBalance": {
    "value": "15750000.00",
    "currency": "USD"
  },
  "closingBalance": {
    "value": "15987500.00", 
    "currency": "USD"
  },
  "transactions": [
    {
      "transactionId": "CPGP-WIRE-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-001847",
      "amount": "250000.00",
      "type": "CREDIT",
      "description": "Wire Transfer Received",
      "timestamp": "${new Date().toISOString()}"
    }
  ],
  "messageFormat": "ISO20022_CAMT053",
  "generatedAt": "${new Date().toISOString()}"
}`
    }
  };

  const currentEndpoint = endpoints[selectedEndpoint as keyof typeof endpoints];

  React.useEffect(() => {
    setRequestBody(currentEndpoint.requestBody);
    setResponse('');
  }, [selectedEndpoint,]);

  const executeAPI = async () => {
    setIsLoading(true);
    setResponse('');
    
    // Simulate realistic API call delay
    const delay = Math.random() * 1000 + 500; // 500-1500ms
    
    setTimeout(() => {
      setResponse(currentEndpoint.mockResponse);
      setIsLoading(false);
    }, delay);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CoreBank API Playground</span>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Interactive API Playground</h1>
          <p className="text-xl text-slate-300">
            Test CoreBank Payment Gateway APIs with live mock responses
          </p>
          <div className="mt-4 inline-flex items-center space-x-4 text-sm text-slate-400">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All systems operational</span>
            </span>
            <span>•</span>
            <span>Response time: &lt;200ms</span>
            <span>•</span>
            <span>99.97% uptime</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Endpoint Selection */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              API Endpoints
            </h2>
            
            <div className="space-y-2">
              {Object.entries(endpoints).map(([key, endpoint]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedEndpoint(key);
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedEndpoint === key
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      endpoint.method === 'POST' ? 'bg-green-600/20 text-green-300' : 'bg-blue-600/20 text-blue-300'
                    }`}>
                      {endpoint.method}
                    </span>
                  </div>
                  <div className="font-semibold text-sm mb-1">{endpoint.title}</div>
                  <div className="text-xs text-slate-400 font-mono">{endpoint.path}</div>
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h3 className="font-semibold mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                Live Performance
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Response</span>
                  <span className="text-green-400">147ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Success Rate</span>
                  <span className="text-green-400">99.97%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Requests Today</span>
                  <span className="text-green-400">2,847</span>
                </div>
              </div>
            </div>
          </div>

          {/* API Testing Interface */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700">
              {/* Request Section */}
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{currentEndpoint.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded text-sm font-mono ${
                      currentEndpoint.method === 'POST' ? 'bg-green-600/20 text-green-300' : 'bg-blue-600/20 text-blue-300'
                    }`}>
                      {currentEndpoint.method}
                    </span>
                    <button
                      onClick={() => copyToClipboard(currentEndpoint.path)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-4">{currentEndpoint.description}</p>
                
                <div className="bg-slate-900 rounded-lg p-3 font-mono text-sm mb-4">
                  <span className="text-blue-400">{currentEndpoint.method}</span>
                  <span className="text-slate-300 ml-2">https://api.corebank.com/v2{currentEndpoint.path}</span>
                </div>

                {currentEndpoint.requestBody && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Request Body:</label>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      className="w-full h-40 bg-slate-900 rounded-lg p-4 font-mono text-sm border border-slate-700 focus:border-blue-500 focus:outline-none resize-none"
                      placeholder="Enter request body..."
                    />
                  </div>
                )}

                <button
                  onClick={executeAPI}
                  disabled={isLoading}
                  className={`mt-4 px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                    isLoading 
                      ? 'bg-slate-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600'
                  }`}
                >
                  <Play className="w-5 h-5" />
                  <span>{isLoading ? 'Processing Request...' : 'Execute API Call'}</span>
                </button>
              </div>

              {/* Response Section */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">Live Response</h4>
                  {response && (
                    <button
                      onClick={() => copyToClipboard(response)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                {isLoading ? (
                  <div className="bg-slate-900 rounded-lg p-6 text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-slate-400">Processing API request...</p>
                    <p className="text-xs text-slate-500 mt-2">Connecting to CoreBank servers</p>
                  </div>
                ) : response ? (
                  <div className="bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 text-sm font-mono">200 OK</span>
                      <span className="text-slate-400 text-sm">Response in {Math.floor(Math.random() * 100 + 100)}ms</span>
                    </div>
                    <pre className="text-sm text-slate-300 overflow-x-auto">
                      <code>{JSON.stringify(JSON.parse(response), null, 2)}</code>
                    </pre>
                  </div>
                ) : (
                  <div className="bg-slate-900 rounded-lg p-6 text-center text-slate-400">
                    <Code className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                    <p>Click "Execute API Call" to see live response</p>
                    <p className="text-xs text-slate-500 mt-2">Responses are generated in real-time</p>
                  </div>
                )}
              </div>
            </div>

            {/* Code Examples */}
            <div className="mt-8 bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Integration Examples
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-blue-300">cURL</h4>
                  <div className="bg-slate-900 rounded-lg p-4 text-sm font-mono">
                    <code className="text-slate-300">
                      curl -X {currentEndpoint.method} \<br/>
                      &nbsp;&nbsp;"https://api.corebank.com/v2{currentEndpoint.path}" \<br/>
                      &nbsp;&nbsp;-H "Authorization: Bearer $TOKEN" \<br/>
                      {currentEndpoint.requestBody && (
                        <>-H "Content-Type: application/json" \<br/>
                        &nbsp;&nbsp;-d '$&#123;JSON_PAYLOAD&#125;'</>
                      )}
                    </code>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-green-300">JavaScript</h4>
                  <div className="bg-slate-900 rounded-lg p-4 text-sm font-mono">
                    <code className="text-slate-300">
                      const response = await fetch(<br/>
                      &nbsp;&nbsp;'https://api.corebank.com/v2{currentEndpoint.path}',<br/>
                      &nbsp;&nbsp;&#123;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;method: '{currentEndpoint.method}',<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;headers: &#123;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'Authorization': `Bearer $&#123;token&#125;`<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                      &nbsp;&nbsp;&#125;<br/>
                      );<br/>
                      const data = await response.json();
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIPlayground;
