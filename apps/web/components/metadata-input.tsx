"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Plus, X } from "lucide-react";
import { CustomMetadataField, getMetadataFieldsForIndex, INDEX_TYPES } from "../types/metadata";

interface MetadataInputProps {
  indexName: string;
  metadata: Record<string, any>;
  onChange: (metadata: Record<string, any>) => void;
}

export function MetadataInput({ indexName, metadata, onChange }: MetadataInputProps) {
  const [customFields, setCustomFields] = useState<CustomMetadataField[]>([]);

  const predefinedFields = getMetadataFieldsForIndex(indexName);
  const isKnownIndex = Object.keys(INDEX_TYPES).includes(indexName);

  // Set default values for dope-company-knowledge
  useEffect(() => {
    if (indexName === 'dope-company-knowledge') {
      const defaults = {
        expirationDate: "2099-12-31",
        approver: "Itwela Ibomu"
      };
      
      // Only set defaults if they don't already exist
      const newMetadata = { ...metadata };
      let hasChanges = false;
      
      Object.entries(defaults).forEach(([key, value]) => {
        if (!newMetadata[key]) {
          newMetadata[key] = value;
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        onChange(newMetadata);
      }
    }
  }, [indexName, metadata, onChange]);

  const updateMetadata = (key: string, value: any) => {
    const newMetadata = { ...metadata, [key]: value };
    if (value === "" || value === undefined || value === null) {
      delete newMetadata[key];
    }
    onChange(newMetadata);
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { key: "", value: "", type: "text" }]);
  };

  const updateCustomField = (index: number, field: Partial<CustomMetadataField>) => {
    const newFields = [...customFields];
    newFields[index] = { ...newFields[index], ...field };
    setCustomFields(newFields);

    // Update metadata if key and value are provided
    if (newFields[index].key && newFields[index].value) {
      updateMetadata(newFields[index].key, newFields[index].value);
    }
  };

  const removeCustomField = (index: number) => {
    const fieldToRemove = customFields[index];
    if (fieldToRemove.key) {
      const newMetadata = { ...metadata };
      delete newMetadata[fieldToRemove.key];
      onChange(newMetadata);
    }
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const renderFieldInput = (fieldName: string) => {
    const value = metadata[fieldName] || "";

    switch (fieldName) {
      case 'category':
        if (indexName === 'dope-email-templates') {
          return (
            <Select value={value} onValueChange={(val) => updateMetadata(fieldName, val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">Welcome</SelectItem>
                <SelectItem value="notification">Notification</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="transactional">Transactional</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          );
        } else if (indexName === 'dope-faq-data') {
          return (
            <Select value={value} onValueChange={(val) => updateMetadata(fieldName, val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          );
        }
        break;

      case 'priority':
        return (
          <Select value={value} onValueChange={(val) => updateMetadata(fieldName, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'meetingType':
        return (
          <Select value={value} onValueChange={(val) => updateMetadata(fieldName, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select meeting type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="call">Call</SelectItem>
              <SelectItem value="meeting">Meeting</SelectItem>
              <SelectItem value="presentation">Presentation</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'department':
        return (
          <Select value={value} onValueChange={(val) => updateMetadata(fieldName, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'employmentType':
        return (
          <Select value={value} onValueChange={(val) => updateMetadata(fieldName, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contractor">Contractor</SelectItem>
              <SelectItem value="intern">Intern</SelectItem>
              <SelectItem value="consultant">Consultant</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'performanceRating':
        return (
          <Select value={value} onValueChange={(val) => updateMetadata(fieldName, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select performance rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="satisfactory">Satisfactory</SelectItem>
              <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'documentType':
        return (
          <Select value={value} onValueChange={(val) => updateMetadata(fieldName, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="policy">Policy</SelectItem>
              <SelectItem value="procedure">Procedure</SelectItem>
              <SelectItem value="guideline">Guideline</SelectItem>
              <SelectItem value="training">Training</SelectItem>
              <SelectItem value="reference">Reference</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'accessLevel':
      case 'confidentialityLevel':
        // Different access levels for employee data vs other types
        const isEmployeeData = indexName === 'dope-employee-data';
        return (
          <Select value={value} onValueChange={(val) => updateMetadata(fieldName, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select access level" />
            </SelectTrigger>
            <SelectContent>
              {isEmployeeData ? (
                <>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="hr-only">HR Only</SelectItem>
                  <SelectItem value="manager-only">Manager Only</SelectItem>
                  <SelectItem value="confidential">Confidential</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="confidential">Confidential</SelectItem>
                  <SelectItem value="restricted">Restricted</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        );

      case 'difficulty':
        return (
          <Select value={value} onValueChange={(val) => updateMetadata(fieldName, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        );

      case 'duration':
      case 'popularity':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => updateMetadata(fieldName, e.target.value ? Number(e.target.value) : "")}
            placeholder={fieldName === 'duration' ? "Duration in minutes" : "Popularity score"}
          />
        );

      case 'participants':
      case 'relatedProducts':
      case 'keywords':
      case 'tags':
      case 'skills':
      case 'certifications':
        return (
          <Input
            value={Array.isArray(value) ? value.join(", ") : value}
            onChange={(e) => updateMetadata(fieldName, e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
            placeholder="Enter comma-separated values"
          />
        );

      case 'lastReviewed':
      case 'expirationDate':
      case 'createdAt':
      case 'updatedAt':
      case 'startDate':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => updateMetadata(fieldName, e.target.value)}
          />
        );

      default:
        return (
          <Input
            value={value}
            onChange={(e) => updateMetadata(fieldName, e.target.value)}
            placeholder={`Enter ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
          />
        );
    }
  };

  const formatFieldLabel = (fieldName: string) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  if (!isKnownIndex) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Custom Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customFields.map((field, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label>Field Name</Label>
                  <Input
                    value={field.key}
                    onChange={(e) => updateCustomField(index, { key: e.target.value })}
                    placeholder="field_name"
                  />
                </div>
                <div className="flex-1">
                  <Label>Value</Label>
                  <Input
                    value={field.value}
                    onChange={(e) => updateCustomField(index, { value: e.target.value })}
                    placeholder="Enter value"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeCustomField(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addCustomField} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Custom Field
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {INDEX_TYPES[indexName as keyof typeof INDEX_TYPES]} Metadata
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {predefinedFields.map((fieldName) => (
            <div key={fieldName} className="space-y-2">
              <Label htmlFor={fieldName}>
                {formatFieldLabel(fieldName)}
                {(fieldName === 'templateName' || fieldName === 'category' || fieldName === 'department' || fieldName === 'fullName') ? ' *' : ''}
              </Label>
              {renderFieldInput(fieldName)}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Custom Fields Section */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Custom Fields</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {customFields.map((field, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Field Name</Label>
                <Input
                  value={field.key}
                  onChange={(e) => updateCustomField(index, { key: e.target.value })}
                  placeholder="custom_field_name"
                />
              </div>
              <div className="flex-1">
                <Label>Value</Label>
                <Input
                  value={field.value}
                  onChange={(e) => updateCustomField(index, { value: e.target.value })}
                  placeholder="Enter value"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeCustomField(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addCustomField} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Custom Field
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
