import { useState } from "react";
import { EmailOutreachFormValues } from "../interfaces/agentChatInterfaces";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { CustomerType } from "../interfaces/agentChatInterfaces";

export function EmailOutreachForm({ initial, onSubmit, onCancel, customerType }: {
    initial?: Partial<EmailOutreachFormValues>;
    onSubmit: (values: EmailOutreachFormValues) => void;
    onCancel?: () => void;
    customerType?: CustomerType;
  }) {
    const [form, setForm] = useState<EmailOutreachFormValues>({
      customerName: initial?.customerName || '',
      websiteUrl: initial?.websiteUrl || '',
      industry: initial?.industry || '',
      primaryLocation: initial?.primaryLocation || '',
      radius: initial?.radius || '5',
      desiredDocument: initial?.desiredDocument || 'ALL',
      lastOrderDate: initial?.lastOrderDate || '',
    });

    const [errors, setErrors] = useState<string[]>([]);
    const [showErrors, setShowErrors] = useState(false);
  
    const handleChange = (field: keyof EmailOutreachFormValues, value: string) => {
      setForm(prev => ({ ...prev, [field]: value }));
      // Clear errors when user starts typing
      if (showErrors) {
        setShowErrors(false);
        setErrors([]);
      }
    };
  
    const getCustomerTypeLabel = () => {
      switch (customerType) {
        case 'current-dope': return '🎯 Current DOPE Customer';
        case 'print-customer': return '🖨️ Print Customer';
        case 'new-prospect': return '✨ New Prospect';
        default: return '';
      }
    };
  
    // Determine which fields to show based on customer type
    const showPrimaryLocation = customerType === 'current-dope' || customerType === 'print-customer';
    const isPrimaryLocationRequired = customerType === 'current-dope';
    const showLastOrderDate = customerType === 'print-customer';

    const validateForm = (): boolean => {
      const newErrors: string[] = [];

      if (!form.industry.trim()) {
        newErrors.push('Industry is required');
      }

      if (isPrimaryLocationRequired && !form.primaryLocation.trim()) {
        newErrors.push('Primary Location is required for Current DOPE Customers');
      }

      setErrors(newErrors);
      setShowErrors(newErrors.length > 0);
      return newErrors.length === 0;
    };

    const handleSubmit = () => {
      if (validateForm()) {
        onSubmit(form);
      }
    };
  
    return (
      <motion.div 
        className="rounded-lg p-4 border border-border bg-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {customerType && (
          <div className="mb-4 pb-4 border-b">
            <div className="text-sm font-medium text-muted-foreground">Customer Type</div>
            <div className="text-base font-semibold mt-1">{getCustomerTypeLabel()}</div>
          </div>
        )}
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Name - Optional for all types */}
          <div>
            <Label htmlFor="customerName">Customer Name <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Input 
              id="customerName" 
              value={form.customerName} 
              onChange={(e) => handleChange('customerName', e.target.value)} 
              placeholder="Acme Co." 
            />
          </div>
  
          {/* Website URL - If known for all types */}
          <div>
            <Label htmlFor="websiteUrl">Website URL <span className="text-muted-foreground text-xs">(if known)</span></Label>
            <Input 
              id="websiteUrl" 
              value={form.websiteUrl} 
              onChange={(e) => handleChange('websiteUrl', e.target.value)} 
              placeholder="https://example.com" 
            />
          </div>
  
          {/* Industry - Required for all types */}
          <div>
            <Label htmlFor="industry">Industry <span className="text-red-500">*</span></Label>
            <Input 
              id="industry" 
              value={form.industry} 
              onChange={(e) => handleChange('industry', e.target.value)} 
              placeholder="e.g., Healthcare, Retail, etc." 
              required
            />
          </div>
  
          {/* Primary Location - Show for current-dope and print-customer */}
          {showPrimaryLocation && (
            <div>
              <Label htmlFor="primaryLocation">
                Primary Location {isPrimaryLocationRequired ? <span className="text-red-500">*</span> : <span className="text-muted-foreground text-xs">(optional)</span>}
              </Label>
              <Input 
                id="primaryLocation" 
                value={form.primaryLocation} 
                onChange={(e) => handleChange('primaryLocation', e.target.value)} 
                placeholder="ZIP code or full address" 
                required={isPrimaryLocationRequired}
              />
            </div>
          )}
  
          {/* Radius - All types */}
          <div>
            <Label htmlFor="radius">Radius (miles)</Label>
            <Input 
              id="radius" 
              type="number" 
              value={form.radius} 
              onChange={(e) => handleChange('radius', e.target.value)} 
              placeholder="5" 
              min="1"
            />
          </div>
  
          {/* Desired Document - All types */}
          <div>
            <Label htmlFor="desiredDocument">Desired Document</Label>
            <Input 
              id="desiredDocument" 
              value={form.desiredDocument} 
              onChange={(e) => handleChange('desiredDocument', e.target.value)} 
              placeholder="ALL" 
            />
          </div>
  
          {/* Last Order Date - Only for print-customer */}
          {showLastOrderDate && (
            <div>
              <Label htmlFor="lastOrderDate">Last Order Date <span className="text-muted-foreground text-xs">(if known)</span></Label>
              <Input 
                id="lastOrderDate" 
                type="date"
                value={form.lastOrderDate} 
                onChange={(e) => handleChange('lastOrderDate', e.target.value)} 
              />
            </div>
          )}
        </div>

        {/* Error Messages */}
        {showErrors && errors.length > 0 && (
          <motion.div 
            className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-2">
              <div className="text-red-600 dark:text-red-400 mt-0.5">⚠️</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                  Please complete the following required fields:
                </p>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="text-red-500">•</span>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="mt-4 flex gap-2 justify-end">
          {onCancel && (
            <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
          )}
          <Button 
            size="sm" 
            onClick={handleSubmit}
          >
            Use These Details
          </Button>
        </div>
      </motion.div>
    );
  }