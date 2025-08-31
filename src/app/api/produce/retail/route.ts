import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      produceId,
      retailer,
      retailerName,
      price,
      quality,
      condition,
      shelfLocation,
      walletAddress
    } = body;

    // Validate required fields
    if (!produceId || !retailer || !price || !walletAddress) {
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
        status: `Arrived at Retail - Priced at $${price}`,
        currentHolder: retailer,
        price: parseFloat(price),
        isSold: true
      }
    });

    // Create history entry
    await db.produceHistory.create({
      data: {
        produceId,
        actor: retailer,
        actorName: retailerName,
        action: 'Retail Sale',
        details: `Sold at retail price: $${price}. Quality: ${quality}, Condition: ${condition}`,
        timestamp: new Date(),
        location: shelfLocation
      }
    });

    return NextResponse.json({
      success: true,
      produce: updatedProduce,
      transactionHash
    });

  } catch (error) {
    console.error('Error confirming retail sale:', error);
    return NextResponse.json(
      { error: 'Failed to confirm retail sale' },
      { status: 500 }
    );
  }
}