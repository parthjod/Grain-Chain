'use client';

import { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import '@/app/styles/consumer.css';

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
        const qrData = JSON.parse(data);

        if (qrData.produceId) {
          const response = await fetch(`/api/produce/${qrData.produceId}`);
          const result = await response.json();

          if (result.success) {
            setProduceData(result.produce);
            generateTimeline(result.produce);
            setScanning(false);
            toast({ title: t('success'), description: t('successMessage') });
          } else {
            setError(t('errorMessage'));
            toast({
              title: t('error'),
              description: t('errorMessage'),
              variant: 'destructive',
            });
          }
        }
      } catch (err) {
        setError(t('invalidQRCode'));
        toast({
          title: t('error'),
          description: t('invalidQRCode'),
          variant: 'destructive',
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
        status: 'completed',
      },
    ];

    data.history.forEach((entry, index) => {
      steps.push({
        id: (index + 2).toString(),
        title: entry.action,
        description: entry.details || `${entry.action} ${t('by', { actor: entry.actorName })}`,
        actor: entry.actorName,
        timestamp: entry.timestamp,
        location: entry.location,
        status: index === data.history.length - 1 ? 'current' : 'completed',
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
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <div className="grain-bg"></div>

      <main className="main-container">
        {/* Hero Section */}
        <section className="hero-section">
          <h1>{t('grainChain')}</h1>
          <p>{t('title')}</p>
        </section>

        {/* Initial Scan Card */}
        {!scanning && !produceData && (
          <div className="scanner-card">
            <div className="scanner-header">
              <h2>{t('scanQRCode')}</h2>
              <p>{t('scanQRCodeDescription')}</p>
            </div>
            <div className="scanner-body">
              <div className="qr-icon-wrapper">
                <div className="qr-icon">
                  <div className="qr-grid">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="qr-cell"></div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="scan-text">{t('scanButtonDescription')}</p>
              <button onClick={() => setScanning(true)} className="scan-btn">
                {t('scanButton')}
              </button>
            </div>
          </div>
        )}

        {/* QR Scanning Active */}
        {scanning && (
          <div className="scanner-card">
            <div className="scanner-header">
              <h2>{t('scanning')}</h2>
              <p>{t('scanningDescription')}</p>
            </div>
            <div className="scanner-body">
              <QrScanner
                onScan={(result) => handleScan(result?.text)}
                onError={handleError}
                style={{ width: '100%' }}
                constraints={{ video: { facingMode: 'environment' } }}
              />
              {error && <div className="error">{error}</div>}
              <button onClick={() => setScanning(false)} className="scan-btn">
                {t('cancel')}
              </button>
            </div>
          </div>
        )}

        {/* Produce Data */}
        {produceData && (
          <>
            <div className="scanner-card">
              <div className="scanner-header">
                <h2>{t('productJourney')}</h2>
                <p>{t('productJourneyDescription')}</p>
              </div>
              <div className="scanner-body">
                <div className="details-grid">
                  <div>
                    <h3>{t('produceId')}</h3>
                    <span>{produceData.produceId}</span>
                  </div>
                  <div>
                    <h3>{t('produceType')}</h3>
                    <p>{produceData.produceType}</p>
                  </div>
                  <div>
                    <h3>{t('farmer')}</h3>
                    <p>{produceData.farmerName}</p>
                  </div>
                  <div>
                    <h3>{t('origin')}</h3>
                    <p>{produceData.origin}</p>
                  </div>
                  <div>
                    <h3>{t('quantity')}</h3>
                    <p>
                      {produceData.quantity} {produceData.unit}
                    </p>
                  </div>
                  <div>
                    <h3>{t('harvestDate')}</h3>
                    <p>{formatDate(produceData.harvestDate)}</p>
                  </div>
                  <div>
                    <h3>{t('currentStatus')}</h3>
                    <p>{produceData.status}</p>
                  </div>
                  {produceData.price && (
                    <div>
                      <h3>{t('retailPrice')}</h3>
                      <p>${produceData.price}</p>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div className="timeline">
                  {timeline.map((step) => (
                    <div key={step.id} className={`timeline-step ${step.status}`}>
                      <div className="timeline-marker">{step.id}</div>
                      <div className="timeline-content">
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                        <small>
                          {t('by', { actor: step.actor })} – {formatDate(step.timestamp)}
                          {step.location && ` | ${t('location', { location: step.location })}`}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={resetScanner} className="scan-btn">
                  {t('scanAnother')}
                </button>
              </div>
            </div>

            <div className="scanner-card">
              <div className="scanner-header">
                <h2>{t('blockchainVerification')}</h2>
              </div>
              <div className="scanner-body">
                <p>{t('blockchainVerificationDetail')}</p>
              </div>
            </div>
          </>
        )}

        {/* Features Section */}
        <section className="features-section">
          <div className="feature-card">
            <div className="feature-icon farm">🌾</div>
            <h3>{t('farmToTable')}</h3>
            <p>{t('farmToTableDescription')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon blockchain">🔗</div>
            <h3>{t('blockchainVerified')}</h3>
            <p>{t('blockchainVerifiedDescription')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon transparency">👁</div>
            <h3>{t('fullTransparency')}</h3>
            <p>{t('fullTransparencyDescription')}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
