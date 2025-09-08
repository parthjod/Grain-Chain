'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';

interface ProduceData {
  produceId: string;
  status: string;
  location: string;
  timestamp: string;
}

export default function DistributorSuccessPage() {
  const t = useTranslations('DistributorSuccess');
  const router = useRouter();
  const [produceData, setProduceData] = useState<ProduceData | null>(null);

  useEffect(() => {
    // In a real app, you'd fetch the latest produce data
    // For now, we'll use mock data
    setProduceData({
      produceId: 'GRAIN-2024-001',
      status: 'In Transit',
      location: 'Distribution Center, City',
      timestamp: new Date().toISOString()
    });
  }, []);

  const handleBack = () => {
    router.push('/distributor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">GrainChain</h1>
          <p className="text-lg text-emerald-700">{t('title')}</p>
        </div>

        <Card className="shadow-lg border border-emerald-100">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
            <CardTitle className="text-2xl">{t('logisticsUpdated')}</CardTitle>
            <CardDescription className="text-emerald-100">
              {t('logisticsUpdatedDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {produceData && (
                <div className="space-y-4">
                  <div className="text-center">
                    <Badge variant="secondary" className="text-lg px-4 py-2 mb-4 bg-emerald-50 text-emerald-800">
                      {t('produceIdLabel', { produceId: produceData.produceId })}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-emerald-800">{t('currentStatus')}</h3>
                      <Badge className="bg-emerald-100 text-emerald-800">
                        {produceData.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-emerald-800">{t('location')}</h3>
                      <p className="text-emerald-700/80">{produceData.location}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-semibold text-emerald-800">{t('updateTime')}</h3>
                    <p className="text-emerald-700/80">
                      {new Date(produceData.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-emerald-800 mb-2">{t('blockchainConfirmation')}</h4>
                    <p className="text-sm text-emerald-700">
                      {t('blockchainConfirmationDescription')}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <Button onClick={handleBack} className="bg-emerald-600 hover:bg-emerald-700">
                  {t('updateAnother')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/')}
                >
                  {t('backToHome')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">{t('nextSteps')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-emerald-700/80">
                {t.raw('nextStepsItems').map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}