import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      produceId,
      distributor,
      distributorName,
      status,
      location,
      walletAddress
    } = body;

    // Validate required fields
    if (!produceId || !distributor || !status || !walletAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if produce exists
    const existingProduce = await db.produce.findUnique({
      where: { produceId }
    });

    if (!existingProduce) {
      return NextResponse.json(
        { error: 'Produce not found' },
        { status: 404 }
      );
    }

    // For development, skip blockchain interaction
    // In production, you would connect to the actual blockchain
    let transactionHash = 'dev-tx-hash-' + Date.now();

    // Update produce in database
    const updatedProduce = await db.produce.update({
      where: { produceId },
      data: {
        status,
        currentHolder: distributor
      }
    });

    // Create history entry
    await db.produceHistory.create({
      data: {
        produceId,
        actor: distributor,
        actorName: distributorName,
        action: 'Status Update',
        details: `Status updated to: ${status}${location ? ` at ${location}` : ''}`,
        timestamp: new Date(),
        location
      }
    });

    return NextResponse.json({
      success: true,
      produce: updatedProduce,
      transactionHash
    });

  } catch (error) {
    console.error('Error updating produce:', error);
    return NextResponse.json(
      { error: 'Failed to update produce' },
      { status: 500 }
    );
  }
}