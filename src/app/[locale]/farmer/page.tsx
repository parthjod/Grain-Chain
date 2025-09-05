'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import LiveQRCode from '@/components/LiveQRCode';
import { useTranslations } from 'next-intl';

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

        // Store QR code in localStorage for display
        localStorage.setItem('lastQRCode', data.qrCode);
        localStorage.setItem('lastProduceId', formData.produceId);

        // Redirect to a success page or show QR code
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">{t('title')}</h1>
          <p className="text-lg text-green-600">{t('register')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-green-600 text-white">
                <CardTitle className="text-2xl">{t('register')}</CardTitle>
                <CardDescription className="text-green-100">
                  {t('registerDescription')}
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
                      <Label htmlFor="farmerName">{t('farmerName')}</Label>
                      <Input
                        id="farmerName"
                        placeholder={t('farmerNamePlaceholder')}
                        value={formData.farmerName}
                        onChange={(e) => handleChange('farmerName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="produceType">{t('produceType')}</Label>
                      <Select value={formData.produceType} onValueChange={(value) => handleChange('produceType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectProduceType')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wheat">{t('wheat')}</SelectItem>
                          <SelectItem value="rice">{t('rice')}</SelectItem>
                          <SelectItem value="corn">{t('corn')}</SelectItem>
                          <SelectItem value="soybeans">{t('soybeans')}</SelectItem>
                          <SelectItem value="barley">{t('barley')}</SelectItem>
                          <SelectItem value="oats">{t('oats')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">{t('quantity')}</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder={t('quantityPlaceholder')}
                        value={formData.quantity}
                        onChange={(e) => handleChange('quantity', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unit">{t('unit')}</Label>
                      <Select value={formData.unit} onValueChange={(value) => handleChange('unit', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectUnit')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">{t('kg')}</SelectItem>
                          <SelectItem value="tons">{t('tons')}</SelectItem>
                          <SelectItem value="bushels">{t('bushels')}</SelectItem>
                          <SelectItem value="pounds">{t('pounds')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="harvestDate">{t('harvestDate')}</Label>
                      <Input
                        id="harvestDate"
                        type="date"
                        value={formData.harvestDate}
                        onChange={(e) => handleChange('harvestDate', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="origin">{t('origin')}</Label>
                    <Textarea
                      id="origin"
                      placeholder={t('originPlaceholder')}
                      value={formData.origin}
                      onChange={(e) => handleChange('origin', e.target.value)}
                      required
                    />
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

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? t('registering') : t('registerProduce')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-4">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-lg">{t('liveQRCode')}</CardTitle>
                <CardDescription className="text-green-700">
                  {t('liveQRCodeDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <LiveQRCode
                  produceId={formData.produceId}
                  farmer={formData.walletAddress}
                  produceType={formData.produceType}
                  origin={formData.origin}
                  harvestDate={formData.harvestDate}
                />

                <div className="mt-6 space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-green-700">{t('produceIdLabel')}</span>
                    <span className="ml-2 text-gray-600">{formData.produceId || t('notSet')}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-green-700">{t('typeLabel')}</span>
                    <span className="ml-2 text-gray-600">{formData.produceType || t('notSet')}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-green-700">{t('quantityLabel')}</span>
                    <span className="ml-2 text-gray-600">
                      {formData.quantity && formData.unit ? `${formData.quantity} ${formData.unit}` : t('notSet')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}