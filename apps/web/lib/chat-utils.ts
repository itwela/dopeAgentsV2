// Tool display names mapping for cleaner user interface
export const TOOL_DISPLAY_NAMES: Record<string, string> = {
  // Email & Proposal Tools
  'list_templates': '📧 Templates',
  'list_how_to_generate_a_proposal': '📋 Proposal Guide',

  // Agent Tools
  'business_data_extraction': '🔍 Extract Data',
  'zip_code_analysis': '📊 Market Analysis',
  'email_creation': '📧 Create Emails',

  // Leadership & Team Tools
  'facilitate_standup': '👥 Standup',

  // Pinecone Database Tools
  'pinecone_list_indexes': '🗂️ List Indexes',
  'pinecone_create_index': '➕ Create Index',
  'pinecone_add_to_index': '📝 Add Data',
  'pinecone_add_employee_data_to_index': '👤 Add Employee',
  'pinecone_semantic_search': '🔎 Search',

  // Specialized Pinecone Searches
  'pinecone_company_knowledge_semantic_search': '🏢 Company Knowledge',
  'pinecone_employee_data_semantic_search': '👥 Employee Profiles',
  'pinecone_transcript_data_semantic_search': '📝 Transcript Search',
  'pinecone_email_templates_semantic_search': '📧 Email Templates',
  'pinecone_faq_data_semantic_search': '❓ FAQ Search',

  // Account Management
  'dope_active_account_lookup': '📊 Account Lookup',
  'dope_active_account_upsert': '➕ Add Account',

  // Workflow Tools
  'get_workflow_context': '🔄 Get Workflow Context',

  // Web Tools
  'web_search': '🌐 Web Search',
  
  // MongoDB MCP Tools
  'mongodb_list_collections': '🗄️ List Collections',
  'mongodb_find': '🔍 Find Documents',
  'mongodb_aggregate': '📊 Aggregate Data',
  'mongodb_collection_schema': '📋 Collection Schema',
  'mongodb_insert': '➕ Insert Document',
  'mongodb_update': '✏️ Update Document',
  'mongodb_delete': '🗑️ Delete Document',
  'mongodb_count': '🔢 Count Documents',
};

// Function to get display name for a tool
export function getToolDisplayName(toolName: string): string {
  return TOOL_DISPLAY_NAMES[toolName] || toolName;
}

// Helper function to extract content from messages
export function extractContent(content: any): string {
  if (typeof content === 'string') {
    return content;
  } else if (content && typeof content === 'object') {
    if (content.text) return content.text;
    if (content.content) return content.content;
    if (Array.isArray(content)) {
      return content.map(c =>
        typeof c === 'string' ? c : (c.text || c.content || JSON.stringify(c))
      ).join(' ');
    }
    return JSON.stringify(content);
  }
  return String(content || '');
}

// Style guide used for post-processing of AI responses
export const STYLE_GUIDE_PROMPT = `Always format your output for clarity, readability, and visual impact, using Markdown. Adopt a structured, actionable layout with distinct sections, bolding, emojis, bullet points, and tables as demonstrated.

Main Section Headers: Use a relevant emoji followed by a bolded title (e.g., ✅ **Account Snapshot: [Company Name]** or 🎯 **Campaign Strategy Plan**).
Sub-Headers: Use a relevant emoji followed by a bolded title (e.g., 🔥 **Primary Campaign Theme:**, 🧠 **Dope ID Strategy:**).
Bullet Points & Nested Lists: Use - for bullets; indent sub-points by two spaces with -.
Statuses: Use ✅ (done/confirmed), 🔄 (in progress/required), 🔲 (to do/select).
Tables: When presenting structured data, use Markdown tables with headers (Field | Value) and --- separators.
Emojis: Use relevant emojis to enhance visual segmentation; keep tasteful and purposeful.
CTAs: End sections with clear bolded CTAs.
Tone: Maintain a confident, helpful, professional tone.

Critical rule: Do NOT alter the underlying facts or meaning. Only improve formatting and organization.`;

