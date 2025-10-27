import { MCPServerStdio } from "@openai/agents";


// Attom MCP Server initialization
const createAttomMCPServer = async (): Promise<MCPServerStdio | null> => {
    const connectionString = process.env.NODE_ENV === 'production'
        ? process.env.ATTOM_MCP_CONNECTION_STRING
        : process.env.NEXT_PUBLIC_ATTOM_MCP_CONNECTION_STRING;

    if (!connectionString) {
        console.warn('[Attom MCP] Connection string not found, Attom tools will not be available');
        return null;
    }

    try {
        const mcpServer = new MCPServerStdio({
            name: 'Attom MCP Server',
            fullCommand: 'npx -y mongodb-mcp-server@latest --readOnly',
            env: {
                MDB_MCP_CONNECTION_STRING: connectionString,
            },
        });

        await mcpServer.connect();
        console.log('[Attom MCP] Successfully connected to Attom MCP server');
        return mcpServer;
    } catch (error) {
        console.error('[Attom MCP] Failed to connect:', error);
        return null;
    }
};

// CRM MCP Server initialization
const createCRMMCPServer = async (): Promise<MCPServerStdio | null> => {
    const connectionString = process.env.NODE_ENV === 'production'
        ? process.env.CRM_MCP_CONNECTION_STRING
        : process.env.NEXT_PUBLIC_CRM_MCP_CONNECTION_STRING;

    if (!connectionString) {
        console.warn('[CRM MCP] Connection string not found, CRM tools will not be available');
        return null;
    }

    try {
        const mcpServer = new MCPServerStdio({
            name: 'CRM MCP Server',
            fullCommand: 'npx -y mongodb-mcp-server@latest --readOnly',
            env: {
                MDB_MCP_CONNECTION_STRING: connectionString,
            },
        });

        await mcpServer.connect();
        console.log('[CRM MCP] Successfully connected to CRM MCP server');
        return mcpServer;
    } catch (error) {
        console.error('[CRM MCP] Failed to connect:', error);
        return null;
    }
};

// Dope Core PostgreSQL MCP Server initialization
const createDopeCoreMCPServer = async (): Promise<MCPServerStdio | null> => {
    const pgHost = process.env.NODE_ENV === 'production'
        ? process.env.DOPE_CORE_PG_HOST
        : process.env.NEXT_PUBLIC_DOPE_CORE_PG_HOST;
    const pgPort = process.env.NODE_ENV === 'production'
        ? process.env.DOPE_CORE_PG_PORT
        : process.env.NEXT_PUBLIC_DOPE_CORE_PG_PORT;
    const pgUser = process.env.NODE_ENV === 'production'
        ? process.env.DOPE_CORE_PG_USER
        : process.env.NEXT_PUBLIC_DOPE_CORE_PG_USER;
    const pgPassword = process.env.NODE_ENV === 'production'
        ? process.env.DOPE_CORE_PG_PASSWORD
        : process.env.NEXT_PUBLIC_DOPE_CORE_PG_PASSWORD;
    const pgDatabase = process.env.NODE_ENV === 'production'
        ? process.env.DOPE_CORE_PG_DATABASE
        : process.env.NEXT_PUBLIC_DOPE_CORE_PG_DATABASE;

    if (!pgHost || !pgPort || !pgUser || !pgPassword || !pgDatabase) {
        console.warn('[Dope Core MCP] Database credentials not found, Dope Core tools will not be available');
        return null;
    }

    try {
        const mcpServer = new MCPServerStdio({
            name: 'Dope Core MCP Server',
            fullCommand: 'npx -y mcp-postgres-server',
            env: {
                PG_HOST: pgHost,
                PG_PORT: pgPort,
                PG_USER: pgUser,
                PG_PASSWORD: pgPassword,
                PG_DATABASE: pgDatabase,
            },

        });

        await mcpServer.connect();
        console.log('[Dope Core MCP] Successfully connected to Dope Core MCP server');
        return mcpServer;
    } catch (error) {
        console.error('[Dope Core MCP] Failed to connect:', error);
        return null;
    }
};

export { createAttomMCPServer, createCRMMCPServer, createDopeCoreMCPServer };