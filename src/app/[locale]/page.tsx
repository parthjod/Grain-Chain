'use client';

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import '@/app/styles/landing.css';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{t.rich('title', { span: (chunks) => <span>{chunks}</span> })}</h1>
          <p>{t('heroSubtitle')}</p>
          <Link href="/consumer">
            <button>{t('heroButton')}</button>
          </Link>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="ecosystem">
        <div className="container">
          <h2>{t('ecosystemTitle')}</h2>
          <div className="ecosystem-cards">
<a href="/farmer" style={{ textDecoration: 'none' }}>
            <div className="ecosystem-card farmer">{t('ecosystemFarmer')}</div>
</a>
<a href="/distributor" style={{ textDecoration: 'none' }}>
            <div className="ecosystem-card distributor">{t('ecosystemDistributor')}</div>
            </a>
            <a href="/retailer" style={{ textDecoration: 'none' }}>
            <div className="ecosystem-card retailer">{t('ecosystemRetailer')}</div></a>
            <a href="/consumer" style={{ textDecoration: 'none' }}>
            <div className="ecosystem-card consumer">{t('ecosystemConsumer')}</div>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2>{t('featuresTitle')}</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>{t('featureBlockchainTitle')}</h3>
              <p>{t('featureBlockchainDescription')}</p>
            </div>
            <div className="feature-card">
              <h3>{t('featureTransparencyTitle')}</h3>
              <p>{t('featureTransparencyDescription')}</p>
            </div>
            <div className="feature-card">
              <h3>{t('featureScanningTitle')}</h3>
              <p>{t('featureScanningDescription')}</p>
            </div>
            <div className="feature-card">
              <h3>{t('featureRealtimeTitle')}</h3>
              <p>{t('featureRealtimeDescription')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <div className="container">
          <h2>{t('howItWorksTitle')}</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number step-1">1</div>
              <h3>{t('stepFarmerTitle')}</h3>
              <p>{t('stepFarmerDescription')}</p>
            </div>
            <div className="step">
              <div className="step-number step-2">2</div>
              <h3>{t('stepDistributorTitle')}</h3>
              <p>{t('stepDistributorDescription')}</p>
            </div>
            <div className="step">
              <div className="step-number step-3">3</div>
              <h3>{t('stepRetailerTitle')}</h3>
              <p>{t('stepRetailerDescription')}</p>
            </div>
            <div className="step">
              <div className="step-number step-4">4</div>
              <h3>{t('stepConsumerTitle')}</h3>
              <p>{t('stepConsumerDescription')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>{t('footerText', { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  );
}