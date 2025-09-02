import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // Get produce details
    const produce = await db.produce.findUnique({
      where: { produceId: id },
      include: {
        history: {
          orderBy: {
            timestamp: 'asc'
          }
        }
      }
    });

    if (!produce) {
      return NextResponse.json(
        { error: 'Produce not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      produce
    });

  } catch (error) {
    console.error('Error fetching produce:', error);
    return NextResponse.json(
      { error: 'Failed to fetch produce' },
      { status: 500 }
    );
  }
}