'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import FinalJourneyQR from '@/components/FinalJourneyQR';

interface CompleteProduceData {
  produceId: string;
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
}

export default function RetailerSuccessPage() {
  const router = useRouter();
  const [produceData, setProduceData] = useState<CompleteProduceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompleteProduceData = async () => {
      try {
        // Get the last produce ID from localStorage or use a default
        const lastProduceId = localStorage.getItem('lastProduceId') || 'WORKFLOW-TEST-001';
        
        const response = await fetch(`/api/produce/${lastProduceId}`);
        const data = await response.json();
        
        if (data.success) {
          setProduceData(data.produce);
        } else {
          console.error('Failed to fetch produce data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching produce data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompleteProduceData();
  }, []);

  const handleBack = () => {
    router.push('/retailer');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600">Loading complete journey data...</p>
        </div>
      </div>
    );
  }

  if (!produceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 flex items-center justify-center">
        <Card className="shadow-lg max-w-md">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
              <p className="text-gray-600">Unable to load produce data. Please try again.</p>
              <Button onClick={handleBack} className="mt-4">
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">GrainChain</h1>
          <p className="text-lg text-purple-600">🎉 Complete Journey - Ready for Consumers!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Final QR Code */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-4">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="text-xl">🎯 Final Journey QR Code</CardTitle>
                <CardDescription className="text-purple-100">
                  Complete supply chain data in one scan
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <FinalJourneyQR 
                  produceId={produceData.produceId}
                  produceData={produceData}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Journey Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Summary */}
            <Card className="shadow-lg">
              <CardHeader className="bg-purple-600 text-white">
                <CardTitle className="text-2xl">✅ Produce Journey Complete</CardTitle>
                <CardDescription className="text-purple-100">
                  The produce has successfully traveled through the entire supply chain
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge variant="secondary" className="text-lg px-4 py-2 mb-4">
                        🆔 {produceData.produceId}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">🌾 Product:</span>
                        <Badge className="bg-green-100 text-green-800">
                          {produceData.produceType}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">📏 Quantity:</span>
                        <span className="font-semibold">{produceData.quantity} {produceData.unit}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">👨‍🌾 Farmer:</span>
                        <span className="text-sm">{produceData.farmerName}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">📍 Origin:</span>
                        <span className="text-sm">{produceData.origin}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">💰 Price:</span>
                        {produceData.price ? (
                          <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                            ${produceData.price}
                          </Badge>
                        ) : (
                          <span className="text-gray-500">Not set</span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">📊 Status:</span>
                        <Badge className="bg-blue-100 text-blue-800">
                          {produceData.status}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">✅ Sold:</span>
                        <Badge className={produceData.isSold ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {produceData.isSold ? "Yes" : "No"}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">🏪 Current Holder:</span>
                        <span className="text-sm">{produceData.currentHolder}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Journey Timeline */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Complete Journey Timeline</h3>
                  <div className="space-y-3">
                    {produceData.history.map((entry, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-800">{entry.action}</h4>
                          <p className="text-sm text-gray-600">by {entry.actorName}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(entry.timestamp).toLocaleDateString()} at {new Date(entry.timestamp).toLocaleTimeString()}
                          </p>
                          {entry.location && (
                            <p className="text-xs text-blue-600 mt-1">📍 {entry.location}</p>
                          )}
                          {entry.details && (
                            <p className="text-xs text-gray-600 mt-1">{entry.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mt-6">
                  <h4 className="font-semibold text-purple-800 mb-2">🎉 Blockchain Verification Complete</h4>
                  <p className="text-sm text-purple-700">
                    This complete journey has been permanently recorded on the blockchain. 
                    Every step from farm to retail is now verifiable and transparent.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">🛍️ Ready for Consumers</h4>
                  <p className="text-sm text-green-700">
                    Display the final QR code prominently so consumers can scan and verify 
                    the complete journey of their food product.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <Button onClick={handleBack} className="bg-purple-600 hover:bg-purple-700">
            Confirm Another Product
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/consumer')}
          >
            Test Consumer View
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}