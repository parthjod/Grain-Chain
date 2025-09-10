'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';
import '@/app/styles/distributerSuccess.css';

interface ProduceData {
  produceId: string;
  status: string;
  location: string;
  timestamp: string;
}

function DistributorSuccessContent() {
  const t = useTranslations('DistributorSuccess');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [produceData, setProduceData] = useState<ProduceData | null>(null);

  useEffect(() => {
    const produceId = searchParams.get('produceId');
    const status = searchParams.get('status');
    const location = searchParams.get('location');
    const timestamp = searchParams.get('timestamp');

    if (produceId && status && location && timestamp) {
      setProduceData({
        produceId,
        status,
        location,
        timestamp,
      });
    }
  }, [searchParams]);

  const handleBack = () => {
    router.push('/distributor');
  };

  return (
    <div className="success-container">
      <div className="max-w-2xl mx-auto">
        <div className="success-header">
          <h1>GrainChain</h1>
          <p>{t('title')}</p>
        </div>

        <Card className="success-card">
          <CardHeader className="success-card-header">
            <CardTitle>{t('logisticsUpdated')}</CardTitle>
            <CardDescription>
              {t('logisticsUpdatedDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="success-card-body">
            <div className="space-y-6">
              {produceData ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <Badge variant="secondary" className="success-badge">
                      {t('produceIdLabel', { produceId: produceData.produceId })}
                    </Badge>
                  </div>

                  <div className="success-info-grid">
                    <div className="space-y-2">
                      <h3 className="success-info-title">{t('currentStatus')}</h3>
                      <Badge className="bg-blue-100 text-blue-800">
                        {produceData.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h3 className="success-info-title">{t('location')}</h3>
                      <p className="success-info-text">{produceData.location}</p>
                    </div>
                  </div>

                  <Separator className="success-separator" />

                  <div className="space-y-2">
                    <h3 className="success-info-title">{t('updateTime')}</h3>
                    <p className="success-info-text">
                      {new Date(produceData.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <div className="blockchain-box">
                    <h4>{t('blockchainConfirmation')}</h4>
                    <p>{t('blockchainConfirmationDescription')}</p>
                  </div>
                </div>
              ) : (
                <div>Loading produce data...</div>
              )}

              <div className="success-buttons">
                <Button onClick={handleBack} className="primary-btn">
                  {t('updateAnother')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/')}
                  className="outline-btn"
                >
                  {t('backToHome')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="next-steps">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">{t('nextSteps')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
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

export default function DistributorSuccessPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <DistributorSuccessContent />
      </Suspense>
    );
  }
