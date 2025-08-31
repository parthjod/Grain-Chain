'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface LiveQRCodeProps {
  produceId: string;
  farmer: string;
  produceType: string;
  origin: string;
  harvestDate: string;
}

export default function LiveQRCode({ 
  produceId, 
  farmer, 
  produceType, 
  origin, 
  harvestDate 
}: LiveQRCodeProps) {
  const [qrCode, setQrCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const generateQR = async () => {
      if (!produceId || !farmer || !produceType || !origin || !harvestDate) {
        setQrCode('');
        return;
      }

      setIsGenerating(true);
      try {
        const data = JSON.stringify({
          produceId,
          farmer,
          produceType,
          origin,
          harvestDate
        });
        
        const generatedQR = await QRCode.toDataURL(data, {
          width: 200,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        
        setQrCode(generatedQR);
      } catch (error) {
        console.error('Error generating QR code:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    // Debounce the QR code generation
    const timeoutId = setTimeout(generateQR, 500);
    return () => clearTimeout(timeoutId);
  }, [produceId, farmer, produceType, origin, harvestDate]);

  if (!qrCode) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        <div className="text-gray-400 text-sm mb-2">
          {isGenerating ? 'Generating...' : 'Fill in all fields to see QR code'}
        </div>
        <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-gray-400 text-xs">QR Code</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="bg-white p-2 rounded-lg shadow-sm border">
        <img 
          src={qrCode} 
          alt="Live QR Code" 
          className="w-32 h-32"
        />
      </div>
      <div className="text-xs text-gray-600 text-center">
        <p className="font-medium">Live Preview</p>
        <p>Updates as you type</p>
      </div>
    </div>
  );
}