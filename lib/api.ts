import { NextResponse } from 'next/server'

export type ApiResponse<T> = {
  data?: T
  error?: string
  pagination?: {
    total: number
    pages: number
    page: number
    limit: number
  }
}

export function successResponse<T>(
  data: T,
  pagination?: ApiResponse<T>['pagination']
): NextResponse {
  return NextResponse.json({
    data,
    ...(pagination && { pagination }),
  })
}

export function errorResponse(
  error: string,
  status: number = 500
): NextResponse {
  return NextResponse.json({ error }, { status })
}

export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error)
  return errorResponse(
    error instanceof Error ? error.message : 'An unexpected error occurred'
  )
} 