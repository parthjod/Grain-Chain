'use client';

import { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface ProduceData {
  produceId: string;
  farmerName: string;
  produceType: string;
  quantity: number;
  unit: string;
  origin: string;
  harvestDate: string;
  status: string;
  price?: number;
  isSold: boolean;
  history: Array<{
    actor: string;
    actorName: string;
    action: string;
    details?: string;
    timestamp: string;
    location?: string;
  }>;
}

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  location?: string;
  status: 'completed' | 'current' | 'upcoming';
}

export default function ConsumerPage() {
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [produceData, setProduceData] = useState<ProduceData | null>(null);
  const [timeline, setTimeline] = useState<TimelineStep[]>([]);
  const [error, setError] = useState<string>('');

  const handleScan = async (data: string | null) => {
    if (data) {
      try {
        // Parse QR code data
        const qrData = JSON.parse(data);
        
        if (qrData.produceId) {
          // Fetch produce details from API
          const response = await fetch(`/api/produce/${qrData.produceId}`);
          const result = await response.json();
          
          if (result.success) {
            setProduceData(result.produce);
            generateTimeline(result.produce);
            setScanning(false);
            toast({
              title: "Success",
              description: "Produce information loaded successfully!",
            });
          } else {
            setError('Produce not found');
            toast({
              title: "Error",
              description: "Produce not found in database",
              variant: "destructive",
            });
          }
        }
      } catch (err) {
        setError('Invalid QR code format');
        toast({
          title: "Error",
          description: "Invalid QR code format",
          variant: "destructive",
        });
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setError('Camera access denied or not available');
  };

  const generateTimeline = (data: ProduceData) => {
    const steps: TimelineStep[] = [
      {
        id: '1',
        title: 'Farm Registration',
        description: `${data.produceType} registered by ${data.farmerName}`,
        actor: data.farmerName,
        timestamp: data.harvestDate,
        status: 'completed'
      }
    ];

    data.history.forEach((entry, index) => {
      steps.push({
        id: (index + 2).toString(),
        title: entry.action,
        description: entry.details || `${entry.action} by ${entry.actorName}`,
        actor: entry.actorName,
        timestamp: entry.timestamp,
        location: entry.location,
        status: index === data.history.length - 1 ? 'current' : 'completed'
      });
    });

    setTimeline(steps);
  };

  const resetScanner = () => {
    setScanning(true);
    setProduceData(null);
    setTimeline([]);
    setError('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-800 mb-2">GrainChain</h1>
          <p className="text-lg text-orange-600">Consumer Portal - Trace Your Food</p>
        </div>

        {!scanning && !produceData && (
          <Card className="shadow-lg">
            <CardHeader className="bg-orange-600 text-white">
              <CardTitle className="text-2xl">Scan QR Code</CardTitle>
              <CardDescription className="text-orange-100">
                Scan the QR code on the product packaging to trace its journey
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                <div className="bg-orange-50 p-8 rounded-lg">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-gray-600 mb-6">
                    Click the button below to start scanning and discover the complete journey of your food
                  </p>
                  <Button 
                    onClick={() => setScanning(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-3"
                  >
                    Start Scanning
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-orange-600 mb-2">🌱 Farm to Table</h3>
                    <p className="text-gray-600">Trace the complete journey from farm to your table</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-orange-600 mb-2">🔒 Blockchain Verified</h3>
                    <p className="text-gray-600">All information is securely stored on the blockchain</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-orange-600 mb-2">👁️ Full Transparency</h3>
                    <p className="text-gray-600">See every step of the supply chain in real-time</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {scanning && (
          <Card className="shadow-lg">
            <CardHeader className="bg-orange-600 text-white">
              <CardTitle className="text-2xl">Scanning QR Code</CardTitle>
              <CardDescription className="text-orange-100">
                Point your camera at the QR code on the product packaging
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <QrScanner
                    onScan={(result) => handleScan(result?.text)}
                    onError={handleError}
                    style={{ width: '100%' }}
                    constraints={{ video: { facingMode: 'environment' } }}
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                
                <div className="flex justify-center">
                  <Button 
                    onClick={() => setScanning(false)}
                    variant="outline"
                  >
                    Cancel Scanning
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {produceData && (
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-orange-600 text-white">
                <CardTitle className="text-2xl">Product Journey</CardTitle>
                <CardDescription className="text-orange-100">
                  Complete traceability from farm to table
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Product ID</h3>
                      <Badge variant="secondary" className="text-sm">
                        {produceData.produceId}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700">Product Type</h3>
                      <p className="text-lg font-medium text-orange-600">{produceData.produceType}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700">Farmer</h3>
                      <p className="text-gray-600">{produceData.farmerName}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700">Origin</h3>
                      <p className="text-gray-600">{produceData.origin}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Quantity</h3>
                      <p className="text-lg">{produceData.quantity} {produceData.unit}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700">Harvest Date</h3>
                      <p className="text-gray-600">{formatDate(produceData.harvestDate)}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700">Current Status</h3>
                      <Badge className="bg-green-100 text-green-800">
                        {produceData.status}
                      </Badge>
                    </div>
                    
                    {produceData.price && (
                      <div>
                        <h3 className="font-semibold text-gray-700">Retail Price</h3>
                        <p className="text-lg font-medium text-green-600">${produceData.price}</p>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Journey Timeline</h3>
                  <div className="space-y-4">
                    {timeline.map((step, index) => (
                      <div key={step.id} className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          step.status === 'completed' ? 'bg-green-500' : 
                          step.status === 'current' ? 'bg-orange-500' : 'bg-gray-300'
                        }`}>
                          <span className="text-white text-sm font-semibold">{step.id}</span>
                        </div>
                        <div className="flex-grow">
                          <div className="bg-white p-4 rounded-lg shadow">
                            <h4 className="font-semibold text-gray-800">{step.title}</h4>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                            <div className="mt-2 text-xs text-gray-500">
                              <p>By: {step.actor}</p>
                              <p>{formatDate(step.timestamp)}</p>
                              {step.location && <p>Location: {step.location}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button onClick={resetScanner} className="bg-orange-600 hover:bg-orange-700">
                    Scan Another Product
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Blockchain Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">✅ Verified on Blockchain</h4>
                  <p className="text-sm text-orange-700">
                    All the information displayed above has been verified and stored on the blockchain. 
                    This ensures the data is authentic, tamper-proof, and transparent. 
                    You can trust that this product has been through a verified supply chain.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}