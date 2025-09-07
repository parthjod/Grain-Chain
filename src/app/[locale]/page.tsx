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
          <h1>Grain<span>Chain</span></h1>
          <p>
            Blockchain-powered supply chain transparency for agricultural products.
            From seed to shelf, track every step with trust and transparency.
          </p>
          <Link href="/consumer">
            <button>Enter Consumer Portal</button>
          </Link>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="ecosystem">
        <div className="container">
          <h2>Our Ecosystem</h2>
          <div className="ecosystem-cards">
<a href="/farmer" style={{ textDecoration: 'none' }}>
            <div className="ecosystem-card farmer">Farmer</div>
</a>
<a href="/distributor" style={{ textDecoration: 'none' }}>
            <div className="ecosystem-card distributor">Distributor</div>
            </a>
            <a href="/retailer" style={{ textDecoration: 'none' }}>
            <div className="ecosystem-card retailer">Retailer</div></a>
            <a href="/consumer" style={{ textDecoration: 'none' }}>
            <div className="ecosystem-card consumer">Consumer</div>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2>Key Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Blockchain Security</h3>
              <p>All data is securely stored on the blockchain, ensuring immutability and trust.</p>
            </div>
            <div className="feature-card">
              <h3>Complete Transparency</h3>
              <p>Full visibility into every step of the supply chain from farm to table.</p>
            </div>
            <div className="feature-card">
              <h3>Easy QR Scanning</h3>
              <p>Instant QR code scanning to access product information.</p>
            </div>
            <div className="feature-card">
              <h3>Real-time Updates</h3>
              <p>Live tracking and status updates throughout the supply chain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number step-1">1</div>
              <h3>Farmer Registration</h3>
              <p>Farmers register their produce and generate unique QR codes.</p>
            </div>
            <div className="step">
              <div className="step-number step-2">2</div>
              <h3>Distribution Tracking</h3>
              <p>Distributors update logistics and track products.</p>
            </div>
            <div className="step">
              <div className="step-number step-3">3</div>
              <h3>Retail Confirmation</h3>
              <p>Retailers confirm arrival, assess quality, and set pricing.</p>
            </div>
            <div className="step">
              <div className="step-number step-4">4</div>
              <h3>Consumer Verification</h3>
              <p>Consumers scan QR codes to verify authenticity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} GrainChain. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
