import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ethers } from 'ethers';
import QRCode from 'qrcode';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      produceId,
      farmer,
      farmerName,
      produceType,
      quantity,
      unit,
      origin,
      harvestDate,
      walletAddress
    } = body;

    // Validate required fields
    if (!produceId || !farmer || !produceType || !quantity || !unit || !origin || !harvestDate || !walletAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate hash for the produce data
    const dataString = JSON.stringify({
      produceId,
      farmer,
      produceType,
      origin,
      harvestDate
    });
    const dataHash = ethers.keccak256(ethers.toUtf8Bytes(dataString));

    // For development, skip blockchain interaction
    // In production, you would connect to the actual blockchain
    let transactionHash = 'dev-tx-hash-' + Date.now();

    // Generate QR code
    const qrCode = await QRCode.toDataURL(JSON.stringify({
      produceId,
      farmer,
      produceType,
      origin,
      harvestDate
    }));

    // Store in database
    const produce = await db.produce.create({
      data: {
        produceId,
        farmer,
        farmerName,
        produceType,
        quantity: parseFloat(quantity),
        unit,
        origin,
        harvestDate: new Date(harvestDate),
        blockchainHash: dataHash,
        status: 'Registered',
        currentHolder: farmer,
        qrCode
      }
    });

    // Create history entry
    await db.produceHistory.create({
      data: {
        produceId,
        actor: farmer,
        actorName: farmerName,
        action: 'Registered',
        details: `Produce registered on blockchain with hash: ${dataHash}`,
        timestamp: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      produce,
      transactionHash,
      qrCode
    });

  } catch (error) {
    console.error('Error registering produce:', error);
    return NextResponse.json(
      { error: 'Failed to register produce' },
      { status: 500 }
    );
  }
}