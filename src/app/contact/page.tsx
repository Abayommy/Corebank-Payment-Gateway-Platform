'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  inquiryType: string;
  subject: string;
  message: string;
  urgency: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    subject: '',
    message: '',
    urgency: 'normal'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const inquiryTypes = [
    { value: 'partnership', label: 'Business Partnership',  },
    { value: 'integration', label: 'API Integration',  },
    { value: 'consulting', label: 'Consulting Services',  },
    { value: 'demo', label: 'Product Demo',  },
    { value: 'support', label: 'Technical Support',  },
    { value: 'other', label: 'Other Inquiry',  }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', color: 'text-green-400' },
    { value: 'normal', label: 'Normal Priority', color: 'text-blue-400' },
    { value: 'high', label: 'High Priority', color: 'text-yellow-400' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-400' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    // Phone validation (optional but validate if provided)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    // Inquiry type validation
    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must not exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate occasional error for demo
      if (Math.random() < 0.1) {
        throw new Error('Network error - please try again');
      }

      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          inquiryType: '',
          subject: '',
          message: '',
          urgency: 'normal'
        });
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedInquiry = inquiryTypes.find(type => type.value === formData.inquiryType);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-slate-800/50 rounded-xl border border-green-500/30 p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              
            </div>
            <h2 className="text-2xl font-bold mb-4 text-green-400">Message Sent Successfully!</h2>
            <p className="text-slate-300 mb-6">
              Thank you for your inquiry. I'll get back to you within 24 hours.
            </p>
            <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-400 mb-2">Reference ID:</p>
              <p className="font-mono text-blue-400">
                CBK-{Date.now().toString().slice(-8)}
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              
              <span>Return to Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              
              <span>Back to Portfolio</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Professional Contact</span>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Let's Connect</h1>
          <p className="text-xl text-slate-300 mb-6">
            Ready to discuss your next banking technology project?
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              
              <span>Available for remote collaboration</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Open to new opportunities</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="text-slate-300">contact@yourportfolio.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-slate-400">Phone</p>
                    <p className="text-slate-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  
                  <div>
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="text-slate-300">Available Worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Types Preview */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold mb-4">Areas of Expertise</h3>
              <div className="space-y-3">
                {inquiryTypes.map((type) => {
                  return (
                    <div key={type.value} className="flex items-center space-x-3 text-sm">
                      <Icon className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">{type.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.name 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/50'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/50'
                      }`}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.company 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/50'
                      }`}
                      placeholder="Your Company Name"
                    />
                    {errors.company && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        
                        {errors.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.phone 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/50'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Inquiry Type *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {inquiryTypes.map((type) => {
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleInputChange('inquiryType', type.value)}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            formData.inquiryType === type.value
                              ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                              : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                          }`}
                        >
                          <Icon className="w-5 h-5 mb-2" />
                          <p className="text-sm font-medium">{type.label}</p>
                        </button>
                      );
                    })}
                  </div>
                  {errors.inquiryType && (
                    <p className="text-red-400 text-sm mt-2 flex items-center">
                      
                      {errors.inquiryType}
                    </p>
                  )}
                </div>

                {/* Subject and Urgency */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`w-full px-4 py-3 bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.subject 
                          ? 'border-red-500 focus:ring-red-500/50' 
                          : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/50'
                      }`}
                      placeholder="Brief description of your inquiry"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Priority Level
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                    >
                      {urgencyLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className={`w-full px-4 py-3 bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/50'
                    }`}
                    placeholder="Please provide details about your project, timeline, budget, and any specific requirements..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    {errors.message ? (
                      <p className="text-red-400 text-sm flex items-center">
                        
                        {errors.message}
                      </p>
                    ) : (
                      <p className="text-slate-400 text-sm">
                        {formData.message.length}/1000 characters
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  {submitError && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm flex items-center">
                        
                        {submitError}
                      </p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? 'bg-slate-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
