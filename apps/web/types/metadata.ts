export interface BaseMetadata {
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  source?: string;
}

export interface EmailTemplateMetadata extends BaseMetadata {
  templateName: string;
  category: 'welcome' | 'notification' | 'marketing' | 'transactional' | 'other';
  subject?: string;
  language?: string;
  targetAudience?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface TranscriptMetadata extends BaseMetadata {
  title?: string;
  meetingType?: 'interview' | 'call' | 'meeting' | 'presentation' | 'other';
  duration?: number; // in minutes
  participants?: string[];
  location?: string;
  department?: string;
  confidentialityLevel?: 'public' | 'internal' | 'confidential' | 'restricted';
  action_items?: string[];
  concepts_discussed?: string[];
  date?: string;
  key_topics?: string[];
  summary?: string;
}

export interface FaqMetadata extends BaseMetadata {
  category: 'product' | 'billing' | 'technical' | 'support' | 'general' | 'other';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  relatedProducts?: string[];
  lastReviewed?: string;
  popularity?: number; // view count or rating
  keywords?: string[];
}

export interface CompanyKnowledgeMetadata extends BaseMetadata {
  department: 'engineering' | 'sales' | 'marketing' | 'hr' | 'finance' | 'legal' | 'operations' | 'other';
  documentType?: 'policy' | 'procedure' | 'guideline' | 'training' | 'reference' | 'key-information' | 'other';
  accessLevel?: 'public' | 'internal' | 'restricted' | 'confidential';
  version?: string;
  approver?: string;
  expirationDate?: string;
}

export interface EmployeeDataMetadata {
  employeeId: string;
  name: string;
  organization: string;
  position: string;
  reportsTo: string;
  gender?: string | null;
  assessmentDate: string;
  all34: string[];
  leadDomain: 'Executing' | 'Influencing' | 'Relationship Building' | 'Strategic Thinking';
  themeDomains: {
    Executing: string[];
    Influencing: string[];
    RelationshipBuilding: string[];
    StrategyThinking: string[];
  };
  bestCollabWith: string;
  communicationTips: string;
  howToCoach: string;
  motivators: string[];
  demotivators: string[];
  watchouts: string;
  evidenceQuotes: Array<{
    quote: string;
    section: string;
  }>;
  sourceDocUrl?: string | null;
  sourceProvenance?: string | null;
}


export interface EmployeeDataInput {
  employeeData: EmployeeDataMetadata;
  tags?: string[] | null;
  source?: string | null;
}

export interface TranscriptDataInput {
  transcriptData: TranscriptMetadata;
  tags?: string[] | null;
  source?: string | null;
}


export type IndexMetadata = 
  | EmailTemplateMetadata 
  | TranscriptMetadata 
  | FaqMetadata 
  | CompanyKnowledgeMetadata
  | EmployeeDataMetadata;

export interface CustomMetadataField {
  key: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'date' | 'select';
  options?: string[]; // for select type
}

export const INDEX_TYPES = {
  'dope-email-templates': 'Email Templates',
  'dope-transcript-data': 'Transcript Data', 
  'dope-faq-data': 'FAQ Data',
  'dope-company-knowledge': 'Company Knowledge',
  'dope-employee-data': 'Employee Data'
} as const;

export type IndexType = keyof typeof INDEX_TYPES;

// REVIEW: This function is used to get the metadata fields for an index.
export function getMetadataFieldsForIndex(indexName: string): string[] {
  switch (indexName) {
    case 'dope-email-templates':
      return ['templateName', 'category', 'subject', 'language', 'targetAudience', 'priority'];
    case 'dope-transcript-data':
      return ['meetingType', 'duration', 'participants', 'location', 'department', 'confidentialityLevel', 'action_items', 'concepts_discussed', 'date', 'key_topics', 'summary'];
    case 'dope-faq-data':
      return ['category', 'difficulty', 'relatedProducts', 'lastReviewed', 'popularity', 'keywords'];
    case 'dope-company-knowledge':
      return ['department', 'documentType', 'accessLevel', 'version', 'approver', 'expirationDate'];
    case 'dope-employee-data':
      return ['tags'];
    default:
      return [];
  }
}
