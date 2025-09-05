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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/produce/retail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

  const handleChange = (field: keyof RetailerFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">{t('grainChain')}</h1>
          <p className="text-lg text-purple-600">{t('title')}</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-purple-600 text-white">
            <CardTitle className="text-2xl">{t('confirmArrival')}</CardTitle>
            <CardDescription className="text-purple-100">
              {t('confirmArrivalDescription')}
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
                  <Label htmlFor="retailerName">{t('retailerName')}</Label>
                  <Input
                    id="retailerName"
                    placeholder={t('retailerNamePlaceholder')}
                    value={formData.retailerName}
                    onChange={(e) => handleChange('retailerName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">{t('retailPrice')}</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder={t('retailPricePlaceholder')}
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality">{t('qualityAssessment')}</Label>
                  <Select value={formData.quality} onValueChange={(value) => handleChange('quality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectQuality')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">{t('excellent')}</SelectItem>
                      <SelectItem value="good">{t('good')}</SelectItem>
                      <SelectItem value="fair">{t('fair')}</SelectItem>
                      <SelectItem value="poor">{t('poor')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">{t('condition')}</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectCondition')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresh">{t('fresh')}</SelectItem>
                      <SelectItem value="good">{t('good')}</SelectItem>
                      <SelectItem value="acceptable">{t('acceptable')}</SelectItem>
                      <SelectItem value="damaged">{t('damaged')}</SelectItem>
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
                <Label htmlFor="shelfLocation">{t('shelfLocation')}</Label>
                <Textarea
                  id="shelfLocation"
                  placeholder={t('shelfLocationPlaceholder')}
                  value={formData.shelfLocation}
                  onChange={(e) => handleChange('shelfLocation', e.target.value)}
                  required
                />
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">{t('priceSettingGuidelines')}</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  {t.raw('priceSettingGuidelinesItems').map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? t('confirming') : t('confirmAndSetPrice')}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">{t('qualityAssessmentGuide')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-purple-600">{t('excellent')}</h4>
                  <p className="text-gray-600">{t('excellentDescription')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600">{t('good')}</h4>
                  <p className="text-gray-600">{t('goodDescription')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600">{t('fair')}</h4>
                  <p className="text-gray-600">{t('fairDescription')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600">{t('poor')}</h4>
                  <p className="text-gray-600">{t('poorDescription')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}