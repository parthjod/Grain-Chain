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
          title: "Success",
          description: "Produce arrival confirmed and price set!",
        });

        router.push('/retailer/success');
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to confirm arrival",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to confirm arrival",
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
          <h1 className="text-4xl font-bold text-purple-800 mb-2">GrainChain</h1>
          <p className="text-lg text-purple-600">Retailer Portal - Confirm Arrival & Set Price</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-purple-600 text-white">
            <CardTitle className="text-2xl">Confirm Produce Arrival</CardTitle>
            <CardDescription className="text-purple-100">
              Confirm the arrival of produce and set the retail price
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="produceId">Produce ID</Label>
                  <Input
                    id="produceId"
                    placeholder="e.g., GRAIN-2024-001"
                    value={formData.produceId}
                    onChange={(e) => handleChange('produceId', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retailerName">Retailer Name</Label>
                  <Input
                    id="retailerName"
                    placeholder="Your store name"
                    value={formData.retailerName}
                    onChange={(e) => handleChange('retailerName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Retail Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 4.99"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality">Quality Assessment</Label>
                  <Select value={formData.quality} onValueChange={(value) => handleChange('quality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresh">Fresh</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="acceptable">Acceptable</SelectItem>
                      <SelectItem value="damaged">Damaged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="walletAddress">Wallet Address</Label>
                  <Input
                    id="walletAddress"
                    placeholder="0x..."
                    value={formData.walletAddress}
                    onChange={(e) => handleChange('walletAddress', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shelfLocation">Shelf Location</Label>
                <Textarea
                  id="shelfLocation"
                  placeholder="e.g., Aisle 3, Section B, Shelf 2"
                  value={formData.shelfLocation}
                  onChange={(e) => handleChange('shelfLocation', e.target.value)}
                  required
                />
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Price Setting Guidelines</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Consider the quality and condition of the produce</li>
                  <li>• Factor in transportation and storage costs</li>
                  <li>• Research current market prices for similar products</li>
                  <li>• Set a competitive but profitable price</li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? 'Confirming...' : 'Confirm Arrival & Set Price'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Quality Assessment Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-purple-600">Excellent</h4>
                  <p className="text-gray-600">Premium quality, no defects</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600">Good</h4>
                  <p className="text-gray-600">Minor cosmetic issues</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600">Fair</h4>
                  <p className="text-gray-600">Noticeable defects</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600">Poor</h4>
                  <p className="text-gray-600">Major defects, lower quality</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}