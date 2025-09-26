module.exports = [
"[project]/apps/web/.next-internal/server/app/api/knowledgebase/list-indexes/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[project]/apps/web/src/services/pineconeService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addEmployeeDataToIndex",
    ()=>addEmployeeDataToIndex,
    "addToIndex",
    ()=>addToIndex,
    "addTranscriptDataToIndex",
    ()=>addTranscriptDataToIndex,
    "createIndex",
    ()=>createIndex,
    "getApiKey",
    ()=>getApiKey,
    "listIndexesFromPinecone",
    ()=>listIndexesFromPinecone,
    "pc",
    ()=>pc,
    "semanticSearch",
    ()=>semanticSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$pinecone$2d$database$2f$pinecone$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@pinecone-database/pinecone/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/lib/main.js [app-route] (ecmascript)");
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].config();
const getApiKey = ()=>{
    const apiKey = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ("TURBOPACK compile-time value", "pcsk_pVqpJ_S6WaMj68tcvSJ3QsQNmWV2AppcoNJjEPUguDDqHW6eiBs7WHp5XpbWEJANifrEd");
    return apiKey || '';
};
const pc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$pinecone$2d$database$2f$pinecone$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Pinecone"]({
    apiKey: getApiKey()
});
;
async function createIndex(indexName) {
    try {
        await pc.createIndexForModel({
            name: indexName,
            cloud: 'aws',
            region: 'us-east-1',
            embed: {
                model: 'llama-text-embed-v2',
                fieldMap: {
                    text: 'chunk_text'
                }
            },
            waitUntilReady: true
        });
        return {
            success: true
        };
    } catch (error) {
        console.error('Error creating index:', error);
        throw new Error(`Failed to create index: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
// Helper function to estimate metadata size in bytes
function estimateMetadataSize(metadata) {
    return JSON.stringify(metadata).length * 2; // Rough estimate (UTF-16)
}
// Helper function to split large metadata into smaller chunks
function splitMetadata(metadata, maxSizeBytes = 30000) {
    const metadataStr = JSON.stringify(metadata);
    const estimatedSize = metadataStr.length * 2;
    if (estimatedSize <= maxSizeBytes) {
        return [
            metadata
        ];
    }
    // Split large arrays and strings
    const chunks = [];
    const baseMetadata = {
        ...metadata
    };
    // Handle large array fields
    const arrayFields = [
        'participants',
        'action_items',
        'concepts_discussed',
        'key_topics'
    ];
    for (const field of arrayFields){
        if (Array.isArray(baseMetadata[field]) && baseMetadata[field].length > 10) {
            const items = baseMetadata[field];
            const chunkSize = Math.ceil(items.length / Math.ceil(estimatedSize / maxSizeBytes));
            for(let i = 0; i < items.length; i += chunkSize){
                const chunk = {
                    ...baseMetadata,
                    [field]: items.slice(i, i + chunkSize),
                    chunk_index: Math.floor(i / chunkSize),
                    total_chunks: Math.ceil(items.length / chunkSize)
                };
                chunks.push(chunk);
            }
            // Remove the original field from base metadata
            delete baseMetadata[field];
        }
    }
    // If no chunks were created, create one with reduced metadata
    if (chunks.length === 0) {
        const reducedMetadata = {
            ...baseMetadata
        };
        // Remove or truncate large string fields
        if (reducedMetadata.summary && reducedMetadata.summary.length > 1000) {
            reducedMetadata.summary = reducedMetadata.summary.substring(0, 1000) + '...';
        }
        chunks.push(reducedMetadata);
    }
    return chunks;
}
// Helper function to chunk large content
function chunkContent(content, maxChunkSize = 2000) {
    if (content.length <= maxChunkSize) {
        return [
            content
        ];
    }
    const chunks = [];
    const sentences = content.split(/[.!?]+/).filter((s)=>s.trim().length > 0);
    let currentChunk = '';
    for (const sentence of sentences){
        const trimmedSentence = sentence.trim();
        if (currentChunk.length + trimmedSentence.length + 1 <= maxChunkSize) {
            currentChunk += (currentChunk ? '. ' : '') + trimmedSentence;
        } else {
            if (currentChunk) {
                chunks.push(currentChunk + '.');
            }
            currentChunk = trimmedSentence;
        }
    }
    if (currentChunk) {
        chunks.push(currentChunk + '.');
    }
    return chunks;
}
async function addToIndex(indexName, data) {
    try {
        const index = pc.index(indexName);
        // Chunk the content if it's too large
        const contentChunks = chunkContent(data.content);
        // Split metadata if it's too large
        const metadataChunks = data.metadata ? splitMetadata(data.metadata) : [
            {}
        ];
        const records = [];
        // Create records for each combination of content and metadata chunks
        for(let i = 0; i < contentChunks.length; i++){
            for(let j = 0; j < metadataChunks.length; j++){
                const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${i}-${j}`;
                const record = {
                    _id: id,
                    chunk_text: contentChunks[i],
                    title: data.title,
                    content_chunk_index: i,
                    total_content_chunks: contentChunks.length,
                    ...metadataChunks[j],
                    created_at: new Date().toISOString()
                };
                // Check if this record would be too large
                const estimatedSize = estimateMetadataSize(record);
                if (estimatedSize > 35000) {
                    console.warn(`Record ${id} is still too large (${estimatedSize} bytes), further reducing...`);
                    // Further reduce the record
                    record.chunk_text = record.chunk_text.substring(0, 1000) + '...';
                    if (record.summary) {
                        record.summary = record.summary.substring(0, 500) + '...';
                    }
                }
                records.push(record);
            }
        }
        // Batch upsert records
        const batchSize = 100; // Pinecone batch limit
        for(let i = 0; i < records.length; i += batchSize){
            const batch = records.slice(i, i + batchSize);
            await index.upsertRecords(batch);
        }
        return {
            success: true,
            id: records[0]._id,
            totalChunks: records.length
        };
    } catch (error) {
        console.error('Error adding to index:', error);
        throw new Error(`Failed to add to index: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
async function addEmployeeDataToIndex(indexName, data) {
    try {
        const index = pc.index(indexName);
        const { employeeData, tags = [], source } = data;
        // Create searchable content from employee data
        const searchableContent = createEmployeeSearchableContent(employeeData);
        // Chunk the content if it's too large
        const contentChunks = chunkContent(searchableContent);
        const records = [];
        // Create records for each content chunk
        for(let i = 0; i < contentChunks.length; i++){
            const id = `${employeeData.employeeId}-${Date.now()}-${i}`;
            const record = {
                _id: id,
                chunk_text: contentChunks[i],
                title: `${employeeData.name} - ${employeeData.position}`,
                content_chunk_index: i,
                total_content_chunks: contentChunks.length,
                // Employee-specific metadata
                employeeId: employeeData.employeeId,
                name: employeeData.name,
                organization: employeeData.organization,
                position: employeeData.position,
                reportsTo: employeeData.reportsTo,
                gender: employeeData.gender,
                assessmentDate: employeeData.assessmentDate,
                leadDomain: employeeData.leadDomain,
                // Arrays as comma-separated strings for better searchability
                all34: Array.isArray(employeeData.all34) ? employeeData.all34.join(', ') : employeeData.all34,
                motivators: Array.isArray(employeeData.motivators) ? employeeData.motivators.join(', ') : employeeData.motivators,
                demotivators: Array.isArray(employeeData.demotivators) ? employeeData.demotivators.join(', ') : employeeData.demotivators,
                // Text fields
                bestCollabWith: employeeData.bestCollabWith,
                communicationTips: employeeData.communicationTips,
                howToCoach: employeeData.howToCoach,
                watchouts: employeeData.watchouts,
                // Theme domains as JSON strings
                themeDomains: JSON.stringify(employeeData.themeDomains),
                evidenceQuotes: JSON.stringify(employeeData.evidenceQuotes),
                // Source information
                sourceDocUrl: employeeData.sourceDocUrl,
                sourceProvenance: employeeData.sourceProvenance,
                // Additional metadata
                tags: Array.isArray(tags) ? tags.join(', ') : tags,
                source: source,
                created_at: new Date().toISOString(),
                data_type: 'employee_profile'
            };
            // Check if this record would be too large
            const estimatedSize = estimateMetadataSize(record);
            if (estimatedSize > 35000) {
                console.warn(`Record ${id} is still too large (${estimatedSize} bytes), further reducing...`);
                // Further reduce the record
                record.chunk_text = record.chunk_text.substring(0, 1000) + '...';
                if (record.bestCollabWith) {
                    record.bestCollabWith = record.bestCollabWith.substring(0, 500) + '...';
                }
            }
            records.push(record);
        }
        // Batch upsert records
        const batchSize = 100; // Pinecone batch limit
        for(let i = 0; i < records.length; i += batchSize){
            const batch = records.slice(i, i + batchSize);
            await index.upsertRecords(batch);
        }
        return {
            success: true,
            id: records[0]._id,
            totalChunks: records.length
        };
    } catch (error) {
        console.error('Error adding employee data to index:', error);
        throw new Error(`Failed to add employee data to index: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
async function addTranscriptDataToIndex(indexName, data) {
    try {
        const index = pc.index(indexName);
        const { transcriptData, tags = [], source } = data;
        const searchableContent = createTranscriptSearchableContent(transcriptData);
        const contentChunks = chunkContent(searchableContent);
        const records = [];
        for(let i = 0; i < contentChunks.length; i++){
            const id = `${transcriptData.date || 'unknown-date'}-${Date.now()}-${i}`;
            const record = {
                _id: id,
                chunk_text: contentChunks[i],
                title: `${transcriptData.title || 'Transcript'}${transcriptData.date ? ' - ' + transcriptData.date : ''}`,
                content_chunk_index: i,
                total_content_chunks: contentChunks.length,
                meetingType: transcriptData.meetingType,
                duration: transcriptData.duration,
                participants: Array.isArray(transcriptData.participants) ? transcriptData.participants.join(', ') : transcriptData.participants,
                location: transcriptData.location,
                department: transcriptData.department,
                confidentialityLevel: transcriptData.confidentialityLevel,
                action_items: Array.isArray(transcriptData.action_items) ? transcriptData.action_items.join(', ') : transcriptData.action_items,
                concepts_discussed: Array.isArray(transcriptData.concepts_discussed) ? transcriptData.concepts_discussed.join(', ') : transcriptData.concepts_discussed,
                date: transcriptData.date,
                key_topics: Array.isArray(transcriptData.key_topics) ? transcriptData.key_topics.join(', ') : transcriptData.key_topics,
                summary: transcriptData.summary,
                tags: Array.isArray(tags) ? tags.join(', ') : tags,
                source: source,
                created_at: new Date().toISOString(),
                data_type: 'transcript'
            };
            const estimatedSize = estimateMetadataSize(record);
            if (estimatedSize > 35000) {
                console.warn(`Transcript record ${id} is too large (${estimatedSize} bytes), reducing...`);
                record.chunk_text = record.chunk_text.substring(0, 1000) + '...';
                if (record.summary && typeof record.summary === 'string') {
                    record.summary = record.summary.substring(0, 500) + '...';
                }
            }
            records.push(record);
        }
        const batchSize = 100;
        for(let i = 0; i < records.length; i += batchSize){
            const batch = records.slice(i, i + batchSize);
            await index.upsertRecords(batch);
        }
        return {
            success: true,
            id: records[0]._id,
            totalChunks: records.length
        };
    } catch (error) {
        console.error('Error adding transcript data to index:', error);
        throw new Error(`Failed to add transcript data to index: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
// Helper function to create searchable content from employee data
function createEmployeeSearchableContent(employeeData) {
    const strengths = Array.isArray(employeeData.all34) ? employeeData.all34.join(', ') : employeeData.all34;
    const motivators = Array.isArray(employeeData.motivators) ? employeeData.motivators.join(', ') : employeeData.motivators;
    const demotivators = Array.isArray(employeeData.demotivators) ? employeeData.demotivators.join(', ') : employeeData.demotivators;
    return `Employee Profile: ${employeeData.name}
Position: ${employeeData.position}
Organization: ${employeeData.organization}
Reports To: ${employeeData.reportsTo}
Lead Domain: ${employeeData.leadDomain}
Assessment Date: ${employeeData.assessmentDate}

Strengths: ${strengths}

Best Collaboration: ${employeeData.bestCollabWith}

Communication Tips: ${employeeData.communicationTips}

How to Coach: ${employeeData.howToCoach}

Motivators: ${motivators}

Demotivators: ${demotivators}

Watchouts: ${employeeData.watchouts}

Theme Domains: ${JSON.stringify(employeeData.themeDomains)}

Evidence Quotes: ${JSON.stringify(employeeData.evidenceQuotes)}`;
}
function createTranscriptSearchableContent(transcriptData) {
    const participants = Array.isArray(transcriptData.participants) ? transcriptData.participants.join(', ') : transcriptData.participants;
    const actionItems = Array.isArray(transcriptData.action_items) ? transcriptData.action_items.join('; ') : transcriptData.action_items;
    const conceptsDiscussed = Array.isArray(transcriptData.concepts_discussed) ? transcriptData.concepts_discussed.join('; ') : transcriptData.concepts_discussed;
    const keyTopics = Array.isArray(transcriptData.key_topics) ? transcriptData.key_topics.join('; ') : transcriptData.key_topics;
    return `Transcript Summary
Meeting Type: ${transcriptData.meetingType || 'N/A'}
Date: ${transcriptData.date || 'N/A'}
Duration: ${typeof transcriptData.duration === 'number' ? `${transcriptData.duration} min` : 'N/A'}
Participants: ${participants || 'N/A'}
Location: ${transcriptData.location || 'N/A'}
Department: ${transcriptData.department || 'N/A'}
Confidentiality: ${transcriptData.confidentialityLevel || 'N/A'}

Key Topics: ${keyTopics || 'N/A'}
Concepts Discussed: ${conceptsDiscussed || 'N/A'}
Action Items: ${actionItems || 'N/A'}

Summary: ${transcriptData.summary || 'N/A'}`;
}
async function listIndexesFromPinecone() {
    try {
        const indexes = await pc.listIndexes();
        return indexes;
    } catch (error) {
        console.error('Error listing indexes:', error);
        throw new Error(`Failed to list indexes: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
async function semanticSearch(indexName, params) {
    try {
        const index = pc.index(indexName);
        const targetNamespace = params.namespace && params.namespace.length > 0 ? params.namespace : '__default__';
        const namespace = index.namespace(targetNamespace);
        const response = await namespace.searchRecords({
            query: {
                topK: params.topK ?? 5,
                inputs: {
                    text: params.query
                }
            },
            // If fields are not specified, Pinecone returns all fields
            fields: params.fields && params.fields.length > 0 ? params.fields : undefined
        });
        return response;
    } catch (error) {
        console.error('Error performing semantic search:', error);
        throw new Error(`Failed to perform semantic search: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
}),
"[project]/apps/web/src/app/api/knowledgebase/list-indexes/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$pinecone$2d$database$2f$pinecone$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@pinecone-database/pinecone/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$pineconeService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/services/pineconeService.ts [app-route] (ecmascript)");
;
;
;
// Create a new Pinecone instance
const pc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$pinecone$2d$database$2f$pinecone$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Pinecone"]({
    apiKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$services$2f$pineconeService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getApiKey"])()
});
async function GET() {
    try {
        // List existing indexes
        const indexes = await pc.listIndexes();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            indexes: indexes.indexes || []
        });
    } catch (error) {
        console.error('Error listing indexes:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Failed to list indexes'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__21459475._.js.map