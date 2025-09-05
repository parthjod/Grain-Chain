'use client';

import { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

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

import { useLocale } from 'next-intl';

export default function ConsumerPage() {
  const t = useTranslations('Consumer');
  const locale = useLocale();
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
              title: t('success'),
              description: t('successMessage'),
            });
          } else {
            setError(t('errorMessage'));
            toast({
              title: t('error'),
              description: t('errorMessage'),
              variant: "destructive",
            });
          }
        }
      } catch (err) {
        setError(t('invalidQRCode'));
        toast({
          title: t('error'),
          description: t('invalidQRCode'),
          variant: "destructive",
        });
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setError(t('cameraError'));
  };

  const generateTimeline = (data: ProduceData) => {
    const steps: TimelineStep[] = [
      {
        id: '1',
        title: t('farmRegistration'),
        description: `${data.produceType} ${t('registeredBy')} ${data.farmerName}`,
        actor: data.farmerName,
        timestamp: data.harvestDate,
        status: 'completed'
      }
    ];

    data.history.forEach((entry, index) => {
      steps.push({
        id: (index + 2).toString(),
        title: entry.action,
        description: entry.details || `${entry.action} ${t('by', { actor: entry.actorName })}`,
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
          <h1 className="text-4xl font-bold text-orange-800 mb-2">{t('grainChain')}</h1>
          <p className="text-lg text-orange-600">{t('title')}</p>
        </div>

        {!scanning && !produceData && (
          <Card className="shadow-lg">
            <CardHeader className="bg-orange-600 text-white">
              <CardTitle className="text-2xl">{t('scanQRCode')}</CardTitle>
              <CardDescription className="text-orange-100">
                {t('scanQRCodeDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                <div className="bg-orange-50 p-8 rounded-lg">
                  <div className="text-6xl mb-4">{t('emoji')}</div>
                  <p className="text-gray-600 mb-6">
                    {t('scanButtonDescription')}
                  </p>
                  <Button 
                    onClick={() => setScanning(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-3"
                  >
                    {t('scanButton')}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-orange-600 mb-2">{t('farmToTable')}</h3>
                    <p className="text-gray-600">{t('farmToTableDescription')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-orange-600 mb-2">{t('blockchainVerified')}</h3>
                    <p className="text-gray-600">{t('blockchainVerifiedDescription')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-orange-600 mb-2">{t('fullTransparency')}</h3>
                    <p className="text-gray-600">{t('fullTransparencyDescription')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {scanning && (
          <Card className="shadow-lg">
            <CardHeader className="bg-orange-600 text-white">
              <CardTitle className="text-2xl">{t('scanning')}</CardTitle>
              <CardDescription className="text-orange-100">
                {t('scanningDescription')}
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
                    {t('cancel')}
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
                <CardTitle className="text-2xl">{t('productJourney')}</CardTitle>
                <CardDescription className="text-orange-100">
                  {t('productJourneyDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">{t('produceId')}</h3>
                      <Badge variant="secondary" className="text-sm">
                        {produceData.produceId}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700">{t('produceType')}</h3>
                      <p className="text-lg font-medium text-orange-600">{produceData.produceType}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700">{t('farmer')}</h3>
                      <p className="text-gray-600">{produceData.farmerName}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700">{t('origin')}</h3>
                      <p className="text-gray-600">{produceData.origin}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">{t('quantity')}</h3>
                      <p className="text-lg">{produceData.quantity} {produceData.unit}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700">{t('harvestDate')}</h3>
                      <p className="text-gray-600">{formatDate(produceData.harvestDate)}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700">{t('currentStatus')}</h3>
                      <Badge className="bg-green-100 text-green-800">
                        {produceData.status}
                      </Badge>
                    </div>
                    
                    {produceData.price && (
                      <div>
                        <h3 className="font-semibold text-gray-700">{t('retailPrice')}</h3>
                        <p className="text-lg font-medium text-green-600">${produceData.price}</p>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">{t('journeyTimeline')}</h3>
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
                              <p>{t('by', { actor: step.actor })}</p>
                              <p>{formatDate(step.timestamp)}</p>
                              {step.location && <p>{t('location', { location: step.location })}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button onClick={resetScanner} className="bg-orange-600 hover:bg-orange-700">
                    {t('scanAnother')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{t('blockchainVerification')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">{t('blockchainVerificationDescription')}</h4>
                  <p className="text-sm text-orange-700">
                    {t('blockchainVerificationDetail')}
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