'use client';

import { useState } from 'react';
import { useRouter } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/produce/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          distributor: formData.walletAddress
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

  const handleChange = (field: keyof DistributorFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">GrainChain</h1>
          <p className="text-lg text-blue-600">{t('title')}</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl">{t('updateStatus')}</CardTitle>
            <CardDescription className="text-blue-100">
              {t('updateStatusDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="produceId">{t('produceId')}</Label>
                  <Input
                    id="produceId"
                    placeholder={t('produceIdPlaceholder')}
                    value={formData.produceId}
                    onChange={(e) => handleChange('produceId', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="distributorName">{t('distributorName')}</Label>
                  <Input
                    id="distributorName"
                    placeholder={t('distributorNamePlaceholder')}
                    value={formData.distributorName}
                    onChange={(e) => handleChange('distributorName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">{t('currentStatus')}</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectCurrentStatus')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Transit">{t('inTransit')}</SelectItem>
                      <SelectItem value="At Warehouse">{t('atWarehouse')}</SelectItem>
                      <SelectItem value="Out for Delivery">{t('outForDelivery')}</SelectItem>
                      <SelectItem value="Delayed">{t('delayed')}</SelectItem>
                      <SelectItem value="Customs Clearance">{t('customsClearance')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="walletAddress">{t('walletAddress')}</Label>
                  <Input
                    id="walletAddress"
                    placeholder={t('walletAddressPlaceholder')}
                    value={formData.walletAddress}
                    onChange={(e) => handleChange('walletAddress', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{t('currentLocation')}</Label>
                <Textarea
                  id="location"
                  placeholder={t('currentLocationPlaceholder')}
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">{t('additionalNotes')}</Label>
                <Textarea
                  id="notes"
                  placeholder={t('additionalNotesPlaceholder')}
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? t('updating') : t('update')}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">{t('quickStatusReference')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-600">{t('inTransit')}</h4>
                  <p className="text-gray-600">{t('inTransitDescription')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">{t('atWarehouse')}</h4>
                  <p className="text-gray-600">{t('atWarehouseDescription')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">{t('outForDelivery')}</h4>
                  <p className="text-gray-600">{t('outForDeliveryDescription')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">{t('delayed')}</h4>
                  <p className="text-gray-600">{t('delayedDescription')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
