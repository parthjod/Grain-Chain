'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/navigation';
import LiveQRCode from '@/components/LiveQRCode';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import '@/app/styles/farmer.css';

interface ProduceFormData {
  produceId: string;
  farmerName: string;
  produceType: string;
  quantity: string;
  unit: string;
  origin: string;
  harvestDate: string;
  walletAddress: string;
}

export default function FarmerPage() {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('Farmer');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProduceFormData>({
    produceId: '',
    farmerName: '',
    produceType: '',
    quantity: '',
    unit: '',
    origin: '',
    harvestDate: '',
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
      const response = await fetch('/api/produce/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          farmer: formData.walletAddress
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: t('success'),
          description: t('successMessage'),
        });

        localStorage.setItem('lastQRCode', data.qrCode);
        localStorage.setItem('lastProduceId', formData.produceId);

        router.push('/farmer/success');
      } else {
        toast({
          title: t('error'),
          description: data.error || t('errorMessage'),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('error'),
        description: t('errorMessage'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof ProduceFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      {/* Floating animated leaves */}
      <div className="bg-decoration">
        <div className="leaf"></div>
        <div className="leaf"></div>
        <div className="leaf"></div>
        <div className="leaf"></div>
      </div>

      <main className="main-container">
        {/* Header */}
        <div className="page-header">
          <h1 style={{color:"#4caf50"}}>{t('title')}</h1>
           <h5 style={{fontSize:"20px", color:"#4caf50"}}>{t('farmerHome')}</h5>
        </div>

        {/* Content wrapper */}
        {isClient && <div className="content-wrapper">
          {/* Form card */}
          <div className="form-card">
            <div className="form-header">
              <h2>{t('register')}</h2>
              <p>{t('registerDescription')}</p>
            </div>
            <div className="form-body">
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="produceId">{t('produceId')}</label>
                    <input
                      type="text"
                      id="produceId"
                      value={formData.produceId}
                      onChange={(e) => handleChange('produceId', e.target.value)}
                      placeholder={t('produceIdPlaceholder')}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="farmerName">{t('farmerName')}</label>
                    <input
                      type="text"
                      id="farmerName"
                      value={formData.farmerName}
                      onChange={(e) => handleChange('farmerName', e.target.value)}
                      placeholder={t('farmerNamePlaceholder')}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="produceType">{t('produceType')}</label>
                    <select
                      id="produceType"
                      value={formData.produceType}
                      onChange={(e) => handleChange('produceType', e.target.value)}
                    >
                      <option value="">{t('selectProduceType')}</option>
                      <option value="wheat">{t('wheat')}</option>
                      <option value="rice">{t('rice')}</option>
                      <option value="corn">{t('corn')}</option>
                      <option value="soybeans">{t('soybeans')}</option>
                      <option value="barley">{t('barley')}</option>
                      <option value="oats">{t('oats')}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="quantity">{t('quantity')}</label>
                    <input
                      type="number"
                      id="quantity"
                      value={formData.quantity}
                      onChange={(e) => handleChange('quantity', e.target.value)}
                      placeholder={t('quantityPlaceholder')}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="unit">{t('unit')}</label>
                    <select
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => handleChange('unit', e.target.value)}
                    >
                      <option value="">{t('selectUnit')}</option>
                      <option value="kg">{t('kg')}</option>
                      <option value="tons">{t('tons')}</option>
                      <option value="bushels">{t('bushels')}</option>
                      <option value="pounds">{t('pounds')}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="harvestDate">{t('harvestDate')}</label>
                    <input
                      type="date"
                      id="harvestDate"
                      value={formData.harvestDate}
                      onChange={(e) => handleChange('harvestDate', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="origin">{t('origin')}</label>
                    <textarea
                      id="origin"
                      value={formData.origin}
                      onChange={(e) => handleChange('origin', e.target.value)}
                      placeholder={t('originPlaceholder')}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="walletAddress">{t('walletAddress')}</label>
                    <input
                      type="text"
                      id="walletAddress"
                      value={formData.walletAddress}
                      onChange={(e) => handleChange('walletAddress', e.target.value)}
                      placeholder={t('walletAddressPlaceholder')}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? t('registering') : t('registerProduce')}
                </button>
              </form>
            </div>
          </div>

          {/* QR Preview card */}
          <div className="qr-preview">
            <h3>{t('liveQRCode')}</h3>
            <p>{t('liveQRCodeDescription')}</p>
            <div className="qr-placeholder">
              <LiveQRCode
                produceId={formData.produceId}
                farmer={formData.walletAddress}
                produceType={formData.produceType}
                origin={formData.origin}
                harvestDate={formData.harvestDate}
              />
            </div>

            <div className="preview-details">
              <div className="preview-item">
                <span className="preview-label">{t('produceIdLabel')}</span>
                <span className="preview-value">{formData.produceId || t('notSet')}</span>
              </div>
              <div className="preview-item">
                <span className="preview-label">{t('typeLabel')}</span>
                <span className="preview-value">{formData.produceType || t('notSet')}</span>
              </div>
              <div className="preview-item">
                <span className="preview-label">{t('quantityLabel')}</span>
                <span className="preview-value">
                  {formData.quantity && formData.unit ? `${formData.quantity} ${formData.unit}` : t('notSet')}
                </span>
              </div>
            </div>
          </div>
        </div>}
      </main>
    </div>
  );
}