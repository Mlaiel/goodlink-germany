/**
 * Utility functions for error handling and data safety
 */

export function safeDataAccess<T>(data: T | undefined | null, fallback: T): T {
  try {
    if (data === null || data === undefined) {
      return fallback
    }
    if (Array.isArray(fallback) && !Array.isArray(data)) {
      return fallback
    }
    return data
  } catch (error) {
    console.error('Safe data access error:', error)
    return fallback
  }
}

export function safeArrayAccess<T>(data: T[] | undefined | null, fallback: T[] = []): T[] {
  try {
    return Array.isArray(data) ? data : fallback
  } catch (error) {
    console.error('Safe array access error:', error)
    return fallback
  }
}

export function safeObjectAccess<T extends Record<string, any>>(
  data: T | undefined | null, 
  fallback: T
): T {
  try {
    if (data === null || data === undefined) {
      return fallback
    }
    if (typeof data !== 'object') {
      return fallback
    }
    return data
  } catch (error) {
    console.error('Safe object access error:', error)
    return fallback
  }
}

export function safeNumberAccess(
  data: number | undefined | null, 
  fallback: number = 0
): number {
  try {
    if (typeof data === 'number' && !isNaN(data)) {
      return data
    }
    return fallback
  } catch (error) {
    console.error('Safe number access error:', error)
    return fallback
  }
}

export function safeStringAccess(
  data: string | undefined | null, 
  fallback: string = ''
): string {
  try {
    if (typeof data === 'string') {
      return data
    }
    return fallback
  } catch (error) {
    console.error('Safe string access error:', error)
    return fallback
  }
}