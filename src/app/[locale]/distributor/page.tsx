'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import styles from '@/app/styles/distributor.module.css';

interface DistributorFormData {
  produceId: string;
  distributorName: string;
  status: string;
  location: string;
  notes: string;
  walletAddress: string;
}

export default function DistributorPage() {
  const t = useTranslations('Distributor');
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DistributorFormData>({
    produceId: '',
    distributorName: '',
    status: '',
    location: '',
    notes: '',
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
      const response = await fetch('/api/produce/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          distributor: formData.walletAddress,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: t('success'),
          description: t('successMessage'),
        });
        router.push('/distributor/success');
      } else {
        toast({
          title: t('error'),
          description: data.error || t('errorMessage'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: t('error'),
        description: t('errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof DistributorFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      {/* Floating background particles */}
      <div className={styles.particles}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
      </div>

      

      {/* Main content */}
      {isClient && <main className={styles['main-container']}>
        <div className={styles['page-header']}>
          <h1>{t('title')}</h1>
          <p>{t('updateStatusDescription')}</p>
        </div>

        <div className={styles['form-card']}>
          <div className={styles['form-header']}>
            <h2>{t('updateStatus')}</h2>
          </div>

          <form onSubmit={handleSubmit} className={styles['form-body']}>
            <div className={styles['form-grid']}>
              <div className={styles['form-group']}>
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

              <div className={styles['form-group']}>
                <label htmlFor="distributorName">{t('distributorName')}</label>
                <input
                  type="text"
                  id="distributorName"
                  value={formData.distributorName}
                  onChange={(e) => handleChange('distributorName', e.target.value)}
                  placeholder={t('distributorNamePlaceholder')}
                  required
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="status">{t('currentStatus')}</label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="">{t('selectCurrentStatus')}</option>
                  <option value="In Transit">{t('inTransit')}</option>
                  <option value="At Warehouse">{t('atWarehouse')}</option>
                  <option value="Out for Delivery">{t('outForDelivery')}</option>
                  <option value="Delayed">{t('delayed')}</option>
                  <option value="Customs Clearance">{t('customsClearance')}</option>
                </select>
              </div>

              <div className={styles['form-group']}>
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

            <div className={`${styles['form-group']} ${styles['full-width']}`}>
              <label htmlFor="location">{t('currentLocation')}</label>
              <textarea
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder={t('currentLocationPlaceholder')}
                required
              ></textarea>
            </div>

            <div className={`${styles['form-group']} ${styles['full-width']}`}>
              <label htmlFor="notes">{t('additionalNotes')}</label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder={t('additionalNotesPlaceholder')}
                rows={3}
              ></textarea>
            </div>

            <button type="submit" className={styles['submit-button']} disabled={isLoading}>
              {isLoading ? t('updating') : t('update')}
            </button>
          </form>
        </div>

        {/* Quick Status Reference */}
        <div className={styles['form-card']} style={{ marginTop: '2rem' }}>
          <div className={styles['form-header']}>
            <h2>{t('quickStatusReference')}</h2>
          </div>
          <div className={styles['reference-grid']}>
            <div>
              <h4 className={styles['ref-title']}>{t('inTransit')}</h4>
              <p>{t('inTransitDescription')}</p>
            </div>
            <div>
              <h4 className={styles['ref-title']}>{t('atWarehouse')}</h4>
              <p>{t('atWarehouseDescription')}</p>
            </div>
            <div>
              <h4 className={styles['ref-title']}>{t('outForDelivery')}</h4>
              <p>{t('outForDeliveryDescription')}</p>
            </div>
            <div>
              <h4 className={styles['ref-title']}>{t('delayed')}</h4>
              <p>{t('delayedDescription')}</p>
            </div>
          </div>
        </div>
      </main>}
    </div>
  );
}
