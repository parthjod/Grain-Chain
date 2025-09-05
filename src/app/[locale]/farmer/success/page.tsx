'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

export default function FarmerSuccessPage() {
  const router = useRouter();
  const t = useTranslations('FarmerSuccess');
  const [qrCode, setQrCode] = useState<string>('');
  const [produceId, setProduceId] = useState<string>('');

  useEffect(() => {
    const storedQR = localStorage.getItem('lastQRCode');
    const storedId = localStorage.getItem('lastProduceId');
    
    if (storedQR) setQrCode(storedQR);
    if (storedId) setProduceId(storedId);
  }, []);

  const handleDownload = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.download = `produce-${produceId}-qr.png`;
      link.href = qrCode;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">{t('title')}</h1>
          <p className="text-lg text-green-600">{t('produceRegistered')}</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-2xl">{t('produceRegistered')}</CardTitle>
            <CardDescription className="text-green-100">
              {t('produceRegisteredDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {t('produceIdLabel', { produceId })}
                </Badge>
                <p className="text-gray-600">
                  {t('saveQRCode')}
                </p>
              </div>

              {qrCode && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-md inline-block">
                    <img 
                      src={qrCode} 
                      alt={t('produceQRCode')} 
                      className="w-64 h-64"
                    />
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                      {t('downloadQRCode')}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => router.push('/farmer')}
                    >
                      {t('registerAnother')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {t('qrCodeInfo')}
          </p>
        </div>
      </div>
    </div>
  );
}