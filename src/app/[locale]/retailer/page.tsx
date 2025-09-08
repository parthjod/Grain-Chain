'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import '@/app/styles/retailer.css';

interface RetailerFormData {
  produceId: string;
  retailerName: string;
  price: string;
  quality: string;
  condition: string;
  shelfLocation: string;
  walletAddress: string;
}

export default function RetailerPage() {
  const t = useTranslations('Retailer');
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RetailerFormData>({
    produceId: '',
    retailerName: '',
    price: '',
    quality: '',
    condition: '',
    shelfLocation: '',
    walletAddress: ''
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/produce/retail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          retailer: formData.walletAddress
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: t('success'),
          description: t('successMessage'),
        });
        router.push('/retailer/success');
      } else {
        toast({
          title: t('error'),
          description: data.error || t('errorMessage'),
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: t('error'),
        description: t('errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof RetailerFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="main-container">
      {/* Floating Background Shapes */}
      <div className="bg-pattern">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      {/* Page Header */}
      <div className="page-header">
        <h1>{t('retailerHome')}</h1>
        <p>{t('title')}</p>
      </div>

      {/* Content Layout */}
      <div className="content-grid">
        {/* Form Section */}
        <div className="form-card">
          <div className="form-header">
            <h2>{t('confirmArrival')}</h2>
            <p>{t('confirmArrivalDescription')}</p>
          </div>

          {isClient && <form onSubmit={handleSubmit} className="form-body">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="produceId">{t('produceId')}</label>
                <input
                  id="produceId"
                  type="text"
                  placeholder={t('produceIdPlaceholder')}
                  value={formData.produceId}
                  onChange={(e) => handleChange('produceId', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="retailerName">{t('retailerName')}</label>
                <input
                  id="retailerName"
                  type="text"
                  placeholder={t('retailerNamePlaceholder')}
                  value={formData.retailerName}
                  onChange={(e) => handleChange('retailerName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group price-input-wrapper">
                <label htmlFor="price">{t('retailPrice')}</label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder={t('retailPricePlaceholder')}
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="quality">{t('qualityAssessment')}</label>
                <select
                  id="quality"
                  value={formData.quality}
                  onChange={(e) => handleChange('quality', e.target.value)}
                  required
                >
                  <option value="">{t('selectQuality')}</option>
                  <option value="excellent">{t('excellent')}</option>
                  <option value="good">{t('good')}</option>
                  <option value="fair">{t('fair')}</option>
                  <option value="poor">{t('poor')}</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="condition">{t('condition')}</label>
                <select
                  id="condition"
                  value={formData.condition}
                  onChange={(e) => handleChange('condition', e.target.value)}
                  required
                >
                  <option value="">{t('selectCondition')}</option>
                  <option value="fresh">{t('fresh')}</option>
                  <option value="good">{t('good')}</option>
                  <option value="acceptable">{t('acceptable')}</option>
                  <option value="damaged">{t('damaged')}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="walletAddress">{t('walletAddress')}</label>
                <input
                  id="walletAddress"
                  type="text"
                  placeholder={t('walletAddressPlaceholder')}
                  value={formData.walletAddress}
                  onChange={(e) => handleChange('walletAddress', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="shelfLocation">{t('shelfLocation')}</label>
              <textarea
                id="shelfLocation"
                placeholder={t('shelfLocationPlaceholder')}
                value={formData.shelfLocation}
                onChange={(e) => handleChange('shelfLocation', e.target.value)}
                required
              />
            </div>

            {/* Guidelines Section */}
            <div className="guidelines-box">
              <h3>{t('priceSettingGuidelines')}</h3>
              <ul>
                {t.raw('priceSettingGuidelinesItems').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? t('confirming') : t('confirmAndSetPrice')}
            </button>
          </form>}
        </div>

        {/* Quality Guide Section */}
        <div className="quality-guide">
          <h3>{t('qualityAssessmentGuide')}</h3>
          <div className="quality-item">
            <div className="quality-level excellent">{t('excellent')}</div>
            <div className="quality-description">{t('excellentDescription')}</div>
          </div>
          <div className="quality-item">
            <div className="quality-level good">{t('good')}</div>
            <div className="quality-description">{t('goodDescription')}</div>
          </div>
          <div className="quality-item">
            <div className="quality-level fair">{t('fair')}</div>
            <div className="quality-description">{t('fairDescription')}</div>
          </div>
          <div className="quality-item">
            <div className="quality-level poor">{t('poor')}</div>
            <div className="quality-description">{t('poorDescription')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
