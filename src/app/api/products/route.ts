import { products } from '@/data/api_data';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return NextResponse.json({ data: products });
}
