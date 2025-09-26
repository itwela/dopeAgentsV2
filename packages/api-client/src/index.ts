import { z } from 'zod';

// API Response schemas
const ApiResponseSchema = z.object({
  status: z.string(),
  data: z.unknown().optional(),
  error: z.string().optional(),
});

const HealthResponseSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.string(),
});

export type ApiResponse<T = unknown> = {
  status: string;
  data?: T;
  error?: string;
};

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

// API Client class
export class ApiClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(config: { baseUrl: string; apiKey?: string }) {
    this.baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.apiKey = config.apiKey;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add existing headers from options
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, options.headers);
      }
    }

    if (this.apiKey) {
      headers.Authorization = `Bearer ${this.apiKey}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          status: 'error',
          error: data.error || `HTTP ${response.status}`,
        };
      }

      return {
        status: 'success',
        data,
      };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async health(): Promise<ApiResponse<HealthResponse>> {
    return this.request<HealthResponse>('/health');
  }

  async hello(): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>('/api/v1/hello');
  }
}

// Factory function
export function createApiClient(config: { baseUrl: string; apiKey?: string }): ApiClient {
  return new ApiClient(config);
}