'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FinalJourneyQR from '@/components/FinalJourneyQR';
import { useTranslations } from 'next-intl';
import '@/app/styles/retailerSuccess.css';

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
  const t = useTranslations('RetailerSuccess');
  const router = useRouter();
  const [produceData, setProduceData] = useState<CompleteProduceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompleteProduceData = async () => {
      try {
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
      <div className="retailer-success-container flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!produceData) {
    return (
      <div className="retailer-success-container flex items-center justify-center">
        <div className="retailer-card max-w-md">
          <div className="retailer-card-body text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">{t('error')}</h2>
            <p className="text-gray-600">{t('errorMessage')}</p>
            <button onClick={handleBack} className="primary-btn mt-4">
              {t('goBack')}
            </button>
          </div>
        </div>
      </div>
    );
  }

    return (
    <div className="retailer-success-container">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="retailer-success-header">
          <h1 style={{marginTop:"50px"}}>GrainChain</h1>
          <p>{t('title')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Final QR Code */}
          <div className="lg:col-span-1">
            <div className="retailer-card sticky top-4">
              <div className="retailer-card-header">
                <h2>{t('finalJourneyQRCode')}</h2>
                <p>{t('finalJourneyQRCodeDescription')}</p>
              </div>
              <div className="retailer-card-body text-center">
                <FinalJourneyQR
                  produceId={produceData.produceId}
                  produceData={produceData}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Journey Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="retailer-card">
              <div className="retailer-card-header">
                <h2>{t('produceJourneyComplete')}</h2>
                <p>{t('produceJourneyCompleteDescription')}</p>
              </div>
              <div className="retailer-card-body">
                <div className="retailer-info-grid">
                  {/* Left Info */}
                  <div>
                    <div className="text-center mb-4">
                      <span className="retailer-badge">{t('produceIdLabel', { produceId: produceData.produceId })}</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="retailer-info-label">{t('productLabel')}</span>
                        <span className="retailer-info-value">{produceData.produceType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="retailer-info-label">{t('quantityLabel')}</span>
                        <span className="retailer-info-value">
                          {produceData.quantity} {produceData.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="retailer-info-label">{t('farmerLabel')}</span>
                        <span className="retailer-info-value">{produceData.farmerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="retailer-info-label">{t('originLabel')}</span>
                        <span className="retailer-info-value">{produceData.origin}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Info */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="retailer-info-label">{t('priceLabel')}</span>
                      {produceData.price ? (
                        <span className="retailer-badge">${produceData.price}</span>
                      ) : (
                        <span className="retailer-info-value">{t('notSet')}</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="retailer-info-label">{t('statusLabel')}</span>
                      <span className="retailer-badge">{produceData.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="retailer-info-label">{t('soldLabel')}</span>
                      <span className="retailer-badge">
                        {produceData.isSold ? t('yes') : t('no')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="retailer-info-label">{t('currentHolderLabel')}</span>
                      <span className="retailer-info-value">{produceData.currentHolder}</span>
                    </div>
                  </div>
                </div>

                {/* Journey Timeline */}
                <div className="journey-timeline">
                  <h3>{t('completeJourneyTimeline')}</h3>
                  {produceData.history.map((entry, index) => (
                    <div key={index} className="timeline-entry">
                      <div className="timeline-index">{index + 1}</div>
                      <div className="timeline-content">
                        <h4>{entry.action}</h4>
                        <p>{t('by', { actor: entry.actorName })}</p>
                        <p>
                          {new Date(entry.timestamp).toLocaleDateString()} {t('timestampPrefix', { default: 'at' })}{' '}
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </p>
                        {entry.location && <p>{t('location', { location: entry.location })}</p>}
                        {entry.details && <p>{entry.details}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="blockchain-box">
                  <h4>{t('blockchainVerificationComplete')}</h4>
                  <p>{t('blockchainVerificationCompleteDescription')}</p>
                </div>

                <div className="consumer-ready">
                  <h4>{t('readyForConsumers')}</h4>
                  <p>{t('readyForConsumersDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="retailer-buttons">
          <button onClick={handleBack} className="primary-btn">
            {t('confirmAnother')}
          </button>
          <button onClick={() => router.push('/consumer')} className="outline-btn">
            {t('testConsumerView')}
          </button>
          <button onClick={() => router.push('/')} className="outline-btn">
            {t('backToHome')}
          </button>
        </div>
      </div>
    </div>
  );
}
