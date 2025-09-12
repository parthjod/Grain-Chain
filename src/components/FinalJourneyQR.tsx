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
          <span className="text-purple-400 text-xs text-center">Final Journey<br />QR Code</span>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-card flex flex-col items-center space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-md border-2 border-purple-200">
        <img
          src={qrCode}
          alt="Final Journey QR Code"
          className="w-40 h-40"
        />
      </div>

      <div className="text-center space-y-2">
       <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            fontWeight: 600,
            color: "#1f2937",
            marginBottom: "12px",
            letterSpacing: "-0.5px",
            lineHeight: 1.2
        }}>
            <span style={{
                fontSize: "2.2rem",
                marginRight: "8px",
                display: "inline-block",
                animation: "bounce 2s infinite"
            }}>🎉</span>
            Complete Journey QR Code
        </h1>
        <p style={{
            fontSize: "1.1rem",
            color: "#000000",
            fontWeight: 500,
            marginBottom: "8px",
            letterSpacing: "0.25px"
        }}>
            Contains entire supply chain data
        </p>
        <div className="text-xs text-gray-500 max-w-xs">
          Scan to view complete journey from farm to table
        </div>
      </div>

<div
  style={{
    background: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
    padding: "24px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 8px 25px rgba(139, 92, 246, 0.15)",
    border: "1px solid rgba(139, 92, 246, 0.2)"
  }}
>
  <h4
    style={{
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      color: "#6b21a8",
      marginBottom: "16px",
      fontSize: "1.1rem",
      letterSpacing: "0.025em"
    }}
  >
    Journey Summary:
  </h4>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      fontSize: "0.875rem"
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid rgba(139, 92, 246, 0.1)"
      }}
    >
      <span style={{ color: "#7c3aed", fontWeight: 500 }}>Product:</span>
      <span style={{ color: "#374151", fontWeight: 600 }}>{produceData.produceType}</span>
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid rgba(139, 92, 246, 0.1)"
      }}
    >
      <span style={{ color: "#7c3aed", fontWeight: 500 }}>Quantity:</span>
      <span style={{ color: "#374151", fontWeight: 600 }}>
        {produceData.quantity} {produceData.unit}
      </span>
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid rgba(139, 92, 246, 0.1)"
      }}
    >
      <span style={{ color: "#7c3aed", fontWeight: 500 }}>Farmer:</span>
      <span style={{ color: "#374151", fontWeight: 600 }}>{produceData.farmerName}</span>
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid rgba(139, 92, 246, 0.1)"
      }}
    >
      <span style={{ color: "#7c3aed", fontWeight: 500 }}>Status:</span>
      <span
        style={{
          background: "linear-gradient(135deg, #10b981, #059669)",
          color: "white",
          padding: "4px 12px",
          borderRadius: "16px",
          fontSize: "0.75rem",
          fontWeight: 500,
          boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)"
        }}
      >
        {produceData.status}
      </span>
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0"
      }}
    >
      <span style={{ color: "#7c3aed", fontWeight: 500 }}>Journey Steps:</span>
      <span
        style={{
          color: "#374151",
          fontWeight: 600,
          background: "rgba(139, 92, 246, 0.1)",
          padding: "2px 8px",
          borderRadius: "12px"
        }}
      >
        {produceData.history.length} stages
      </span>
    </div>
  </div>
</div>
    </div>
  );
}