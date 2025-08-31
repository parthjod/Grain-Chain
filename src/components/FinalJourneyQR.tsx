'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface FinalJourneyQRProps {
  produceId: string;
  produceData: {
    farmerName: string;
    produceType: string;
    quantity: number;
    unit: string;
    origin: string;
    harvestDate: string;
    status: string;
    price?: number;
    currentHolder: string;
    isSold: boolean;
    history: Array<{
      actor: string;
      actorName: string;
      action: string;
      details?: string;
      timestamp: string;
      location?: string;
    }>;
  };
}

export default function FinalJourneyQR({ produceId, produceData }: FinalJourneyQRProps) {
  const [qrCode, setQrCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const generateFinalQR = async () => {
      if (!produceId || !produceData.farmerName) {
        setQrCode('');
        return;
      }

      setIsGenerating(true);
      try {
        const journeyData = {
          produceId,
          farmer: produceData.farmerName,
          produceType: produceData.produceType,
          quantity: produceData.quantity,
          unit: produceData.unit,
          origin: produceData.origin,
          harvestDate: produceData.harvestDate,
          status: produceData.status,
          price: produceData.price,
          isSold: produceData.isSold,
          currentHolder: produceData.currentHolder,
          journey: produceData.history.map(entry => ({
            actor: entry.actorName,
            action: entry.action,
            timestamp: entry.timestamp,
            location: entry.location,
            details: entry.details
          }))
        };
        
        const generatedQR = await QRCode.toDataURL(JSON.stringify(journeyData), {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        
        setQrCode(generatedQR);
      } catch (error) {
        console.error('Error generating final QR code:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateFinalQR();
  }, [produceId, produceData]);

  if (!qrCode) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50">
        <div className="text-purple-400 text-sm mb-4">
          {isGenerating ? 'Generating final journey QR code...' : 'Complete all sections to generate final QR code'}
        </div>
        <div className="w-40 h-40 bg-purple-200 rounded flex items-center justify-center">
          <span className="text-purple-400 text-xs text-center">Final Journey<br/>QR Code</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-md border-2 border-purple-200">
        <img 
          src={qrCode} 
          alt="Final Journey QR Code" 
          className="w-40 h-40"
        />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold text-purple-800">🎉 Complete Journey QR Code</h3>
        <p className="text-sm text-purple-600">Contains entire supply chain data</p>
        <div className="text-xs text-gray-500 max-w-xs">
          Scan to view complete journey from farm to table
        </div>
      </div>

      <div className="bg-purple-100 p-4 rounded-lg w-full max-w-sm">
        <h4 className="font-semibold text-purple-800 mb-3 text-sm">Journey Summary:</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-purple-700">Product:</span>
            <span className="text-gray-700">{produceData.produceType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-700">Quantity:</span>
            <span className="text-gray-700">{produceData.quantity} {produceData.unit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-700">Farmer:</span>
            <span className="text-gray-700">{produceData.farmerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-700">Status:</span>
            <span className="text-gray-700">{produceData.status}</span>
          </div>
          {produceData.price && (
            <div className="flex justify-between">
              <span className="text-purple-700">Price:</span>
              <span className="text-green-700 font-semibold">${produceData.price}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-purple-700">Journey Steps:</span>
            <span className="text-gray-700">{produceData.history.length} stages</span>
          </div>
        </div>
      </div>
    </div>
  );
}