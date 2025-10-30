"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MagicCard } from "../src/components/ui/magic-card";
import { ShineBorder } from "../src/components/ui/shine-border";
import { ArrowRight, X } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { CustomerType } from "../interfaces/agentChatInterfaces";

interface WorkflowFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WorkflowFormData) => void;
  workflowTitle: string;
}

export interface WorkflowFormData {
  clientName: string;
  customerType: CustomerType;
  notes?: string;
  // Additional fields based on customer type
  websiteUrl?: string;
  industry?: string;
  primaryLocation?: string;
  radius?: string;
  lastOrderDate?: string;
}

export function WorkflowFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  workflowTitle 
}: WorkflowFormModalProps) {
  const [formData, setFormData] = useState<WorkflowFormData>({
    clientName: "",
    customerType: null,
    notes: "",
    websiteUrl: "",
    industry: "",
    primaryLocation: "",
    radius: "5",
    lastOrderDate: "",
  });

  const customerTypes = [
    {
      id: 'current-dope' as CustomerType,
      title: 'Current DOPE Customer',
      description: 'Existing client with active campaigns',
      icon: '🎯',
      gradient: { from: '#FFB3B3', to: '#FFD6D6' }
    },
    {
      id: 'print-customer' as CustomerType,
      title: 'Print Customer',
      description: 'Client with print-only services',
      icon: '🖨️',
      gradient: { from: '#FFB3B3', to: '#FFD6D6' }
    },
    {
      id: 'new-prospect' as CustomerType,
      title: 'New Prospect',
      description: 'Brand new potential client',
      icon: '✨',
      gradient: { from: '#FFB3B3', to: '#FFD6D6' }
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.clientName && formData.customerType) {
      onSubmit(formData);
      setFormData({
        clientName: "",
        customerType: null,
        notes: "",
        websiteUrl: "",
        industry: "",
        primaryLocation: "",
        radius: "5",
        lastOrderDate: "",
      });
    }
  };

  const handleCustomerTypeSelect = (type: CustomerType) => {
    setFormData(prev => ({ ...prev, customerType: type }));
  };

  // Determine which fields to show based on customer type
  const showPrimaryLocation = formData.customerType === 'current-dope';
  const isPrimaryLocationRequired = formData.customerType === 'current-dope';
  const showLastOrderDate = formData.customerType === 'print-customer';

  const handleChange = (field: keyof WorkflowFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-rose-50 to-rose-100 border border-white/60 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {workflowTitle}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          {/* Client Name */}
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name *</Label>
            <Input
              id="clientName"
              name="client-name"
              value={formData.clientName}
              onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
              placeholder="Enter client name"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              required
            />
          </div>

          {/* Customer Type Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Customer Type *</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {customerTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MagicCard
                    className={`cursor-pointer rounded-lg group h-full transition-all duration-200 ${
                      formData.customerType === type.id 
                        ? 'ring-2 ring-primary ring-offset-2' 
                        : 'hover:ring-2 hover:ring-primary/50'
                    }`}
                    gradientSize={200}
                    gradientColor="#fecaca"
                    gradientOpacity={0.1}
                    gradientFrom={type.gradient.from}
                    gradientTo={type.gradient.to}
                  >
                    <button
                      type="button"
                      onClick={() => handleCustomerTypeSelect(type.id)}
                      className="relative w-full min-h-[300px] h-full p-6 text-left transition-all duration-300"
                    >
                      <ShineBorder
                        borderWidth={2}
                        duration={8}
                        shineColor={[type.gradient.from, type.gradient.to]}
                        className="rounded-lg"
                      />
                      
                      <div className="relative z-10">
                        <div className="text-4xl mb-3">{type.icon}</div>
                        <h4 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                          {type.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                      
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                    </button>
                  </MagicCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Conditional Fields Based on Customer Type */}
          {formData.customerType && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
                
                {/* Website URL - All types */}
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL <span className="text-muted-foreground text-xs">(if known)</span></Label>
                  <Input 
                    id="websiteUrl" 
                    name="website-url"
                    value={formData.websiteUrl || ""} 
                    onChange={(e) => handleChange('websiteUrl', e.target.value)} 
                    placeholder="https://example.com" 
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                </div>

                {/* Industry - All types */}
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry <span className="text-red-500">*</span></Label>
                  <Input 
                    id="industry" 
                    name="industry"
                    value={formData.industry || ""} 
                    onChange={(e) => handleChange('industry', e.target.value)} 
                    placeholder="e.g., Healthcare, Retail, etc." 
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    required
                  />
                </div>

                {/* Primary Location - Only for current-dope */}
                {showPrimaryLocation && (
                  <div className="space-y-2">
                    <Label htmlFor="primaryLocation">
                      Primary Location <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="primaryLocation" 
                      name="primary-location"
                      value={formData.primaryLocation || ""} 
                      onChange={(e) => handleChange('primaryLocation', e.target.value)} 
                      placeholder="ZIP code or full address" 
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      required={isPrimaryLocationRequired}
                    />
                  </div>
                )}

                {/* Radius - All types */}
                <div className="space-y-2">
                  <Label htmlFor="radius">Radius for area analysis (miles)</Label>
                  <Input 
                    id="radius" 
                    type="number" 
                    name="radius-miles"
                    value={formData.radius || "5"} 
                    onChange={(e) => handleChange('radius', e.target.value)} 
                    placeholder="5" 
                    min="1"
                    autoComplete="off"
                  />
                </div>

                {/* Last Order Date - Only for print-customer */}
                {showLastOrderDate && (
                  <div className="space-y-2">
                    <Label htmlFor="lastOrderDate">Last Order Date <span className="text-muted-foreground text-xs">(if known)</span></Label>
                    <Input 
                      id="lastOrderDate" 
                      type="date"
                      name="last-order-date"
                      value={formData.lastOrderDate || ""} 
                      onChange={(e) => handleChange('lastOrderDate', e.target.value)} 
                      autoComplete="off"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}


          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any additional notes or context..."
              rows={3}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.clientName || !formData.customerType}
              className="bg-primary hover:bg-primary/90"
            >
              Start Workflow
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
