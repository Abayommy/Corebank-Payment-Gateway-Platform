# Demo Assets & Integration Examples

## 🎯 Quick Start Guide

This folder contains practical examples and testing tools for the CoreBank Payment Gateway Platform API.

### **Postman Collection**
- **File**: `sample-integrations/postman-collection.json`
- **Purpose**: Ready-to-use API requests for testing and integration
- **Features**: Authentication, wire transfers, payment status, account information

### **Getting Started (5 minutes)**

1. **Import Collection**:
   - Open Postman
   - Import `postman-collection.json`
   - Collection includes environment variables

2. **Set Environment Variables**:
   ```
   API_BASE_URL: https://api-sandbox.corebank.com/v2
   ACCESS_TOKEN: (will be set automatically)
   ```

3. **Run Authentication**:
   - Execute "Get OAuth Token" request
   - Token automatically saved to environment

4. **Test Wire Transfer**:
   - Run "Initiate Wire Transfer - Atlantic Financial"
   - Payment ID automatically captured
   - Check status using "Get Payment Status"

## 📋 Available Examples

### **Wire Transfer Scenarios**
- **Standard Corporate Transfer**: $250K business payment
- **High-Value Transfer**: $1.5M requiring FedWire routing
- **Multiple Client Examples**: Atlantic Financial, Continental Banking

### **Payment Tracking**
- **Real-time Status**: Complete payment lifecycle visibility
- **Status History**: Audit trail with timestamps
- **Network Metrics**: FedWire and CHIPS processing details

### **Account Services**
- **Balance Statements**: End-of-day reporting (ISO 20022 Camt.053)
- **Intraday Liquidity**: Real-time cash position monitoring

## 🔧 Sample Request Examples

### **Wire Transfer Request**
```json
{
  "transactionId": "WIRE-20250719-AFG-001",
  "amount": {"value": "250000.00", "currency": "USD"},
  "instructingAgent": "AFGUUS33XXX",
  "instructedAgent": "CBCUUS33XXX",
  "purposeCode": "SUPP"
}
```

### **Expected Response**
```json
{
  "paymentId": "CPGP-WIRE-20250719-001847",
  "status": "INITIATED",
  "estimatedSettlement": "2025-07-19T15:15:00Z",
  "fees": {"totalFees": "43.50"}
}
```

## 📊 Test Data

### **Fictional Bank Codes**
- **Atlantic Financial Group**: `AFGUUS33XXX`
- **Continental Banking Corporation**: `CBCUUS33XXX`  
- **National Commerce Bank**: `NCBUUS33XXX`
- **Meridian Investment Bank**: `MIBUUS33XXX`

### **Sample Account Numbers**
- **Debit Account**: `4401234567890123`
- **Credit Account**: `5512345678901234`

## 🛠️ Integration Support

### **Developer Resources**
- **API Documentation**: [View OpenAPI Spec](../03-api-architecture/api-specifications/)
- **Technical Implementation**: [Architecture Guide](../04-technical-implementation/)
- **Business Use Cases**: [Client Success Stories](../05-business-impact/)

### **Support Contacts**
- **Technical Support**: api-support@corebank.com
- **Integration Help**: developers@corebank.com
- **Business Inquiries**: partnerships@corebank.com

---

*These demo assets provide hands-on examples for evaluating and integrating with the CoreBank Payment Gateway Platform. All examples use fictional data for demonstration purposes.*
