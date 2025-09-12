'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import '@/app/styles/farmerSuccess.css';

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
    <div className="success-container">
      <div className="success-card">
        <div className="success-header">
          <h1>{t('title')}</h1>
          <p>{t('produceRegistered')}</p>
        </div>

        <div className="confirmation-details">
          <div className="confirmation-item">
            <span className="confirmation-label">{t('produceIdLabel')}</span>
            <span className="confirmation-value">{produceId}</span>
          </div>
          <p>{t('saveQRCode')}</p>
        </div>

        {qrCode && (
          <div>
            <div className="qr-wrapper">
              <img
                src={qrCode}
                alt={t('produceQRCode')}
                className="qr-image"
              />
            </div>

            <div className="button-group">
              <button onClick={handleDownload} className="back-button">
                {t('downloadQRCode')}
              </button>
              <button
                onClick={() => router.push('/farmer')}
                className="back-button"
              >
                {t('registerAnother')}
              </button>
            </div>
          </div>
        )}

        <p className="info-text">{t('qrCodeInfo')}</p>
      </div>
    </div>
  );
}
