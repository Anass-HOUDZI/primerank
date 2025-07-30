import { useCallback, useEffect } from 'react';
import { SecurityLogger, securityMiddleware } from '@/lib/security-middleware';
import { SecureStorage } from '@/lib/secure-storage';

export interface SecurityHookOptions {
  enableRateLimit?: boolean;
  enableInputValidation?: boolean;
  enableSecureStorage?: boolean;
  rateLimitConfig?: {
    limit: number;
    windowMs: number;
  };
}

export const useSecurity = (toolId: string, options: SecurityHookOptions = {}) => {
  const {
    enableRateLimit = true,
    enableInputValidation = true,
    enableSecureStorage = true,
    rateLimitConfig = { limit: 10, windowMs: 60000 }
  } = options;

  // Rate limiting check
  const checkRateLimit = useCallback((): boolean => {
    if (!enableRateLimit) return true;
    
    const identifier = `${toolId}_${Date.now().toString().slice(-6)}`;
    return securityMiddleware.checkRateLimit(
      identifier,
      rateLimitConfig.limit,
      rateLimitConfig.windowMs
    );
  }, [toolId, enableRateLimit, rateLimitConfig]);

  // Input validation
  const validateInput = useCallback((input: any, schema?: any): { valid: boolean; sanitized?: any; error?: string } => {
    if (!enableInputValidation) {
      return { valid: true, sanitized: input };
    }

    try {
      if (typeof input === 'string') {
        const sanitized = securityMiddleware.sanitizeInput(input, {
          maxLength: 1000,
          allowHtml: false
        });
        return { valid: true, sanitized };
      }

      if (input instanceof File) {
        const validation = securityMiddleware.validateFileUpload(input);
        return validation;
      }

      if (Array.isArray(input)) {
        const sanitized = input.map(item => 
          typeof item === 'string' 
            ? securityMiddleware.sanitizeInput(item, { maxLength: 100 })
            : item
        );
        return { valid: true, sanitized };
      }

      return { valid: true, sanitized: input };
    } catch (error) {
      SecurityLogger.log('input_validation_error', {
        toolId,
        input: typeof input,
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 'medium');
      
      return { 
        valid: false, 
        error: 'Input validation failed' 
      };
    }
  }, [toolId, enableInputValidation]);

  // Secure storage operations
  const saveSecure = useCallback(async (key: string, data: any, ttl?: number): Promise<boolean> => {
    if (!enableSecureStorage) {
      try {
        localStorage.setItem(`${toolId}_${key}`, JSON.stringify(data));
        return true;
      } catch {
        return false;
      }
    }

    try {
      await SecureStorage.saveSecure(`${toolId}_${key}`, data, ttl);
      SecurityLogger.log('secure_storage_save', {
        toolId,
        key,
        dataType: typeof data
      }, 'low');
      return true;
    } catch (error) {
      SecurityLogger.log('secure_storage_save_failed', {
        toolId,
        key,
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 'medium');
      return false;
    }
  }, [toolId, enableSecureStorage]);

  const getSecure = useCallback(async (key: string): Promise<any | null> => {
    if (!enableSecureStorage) {
      try {
        const item = localStorage.getItem(`${toolId}_${key}`);
        return item ? JSON.parse(item) : null;
      } catch {
        return null;
      }
    }

    try {
      const data = await SecureStorage.getSecure(`${toolId}_${key}`);
      if (data) {
        SecurityLogger.log('secure_storage_read', {
          toolId,
          key,
          dataType: typeof data
        }, 'low');
      }
      return data;
    } catch (error) {
      SecurityLogger.log('secure_storage_read_failed', {
        toolId,
        key,
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 'medium');
      return null;
    }
  }, [toolId, enableSecureStorage]);

  const removeSecure = useCallback(async (key: string): Promise<void> => {
    if (!enableSecureStorage) {
      localStorage.removeItem(`${toolId}_${key}`);
      return;
    }

    try {
      SecureStorage.removeSecure(`${toolId}_${key}`);
      SecurityLogger.log('secure_storage_remove', {
        toolId,
        key
      }, 'low');
    } catch (error) {
      SecurityLogger.log('secure_storage_remove_failed', {
        toolId,
        key,
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 'medium');
    }
  }, [toolId, enableSecureStorage]);

  // Security event logging for tool usage
  const logSecurityEvent = useCallback((
    eventType: string, 
    details: any, 
    severity: 'low' | 'medium' | 'high' | 'critical' = 'low'
  ) => {
    SecurityLogger.log(eventType, {
      toolId,
      ...details,
      timestamp: Date.now()
    }, severity);
  }, [toolId]);

  // Initialize security monitoring for this tool
  useEffect(() => {
    SecurityLogger.log('tool_initialized', {
      toolId,
      options,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    }, 'low');

    return () => {
      SecurityLogger.log('tool_cleanup', {
        toolId,
        timestamp: Date.now()
      }, 'low');
    };
  }, [toolId, options]);

  return {
    checkRateLimit,
    validateInput,
    saveSecure,
    getSecure,
    removeSecure,
    logSecurityEvent,
    SecurityLogger
  };
};