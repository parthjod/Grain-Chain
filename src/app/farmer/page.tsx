'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import LiveQRCode from '@/components/LiveQRCode';

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
          title: "Success",
          description: "Produce registered successfully! QR code generated.",
        });
        
        // Store QR code in localStorage for display
        localStorage.setItem('lastQRCode', data.qrCode);
        localStorage.setItem('lastProduceId', formData.produceId);
        
        // Redirect to a success page or show QR code
        router.push('/farmer/success');
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to register produce",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register produce",
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
          <h1 className="text-4xl font-bold text-green-800 mb-2">GrainChain</h1>
          <p className="text-lg text-green-600">Farmer Portal - Register Your Produce</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-green-600 text-white">
                <CardTitle className="text-2xl">Register New Produce</CardTitle>
                <CardDescription className="text-green-100">
                  Enter the details of your produce to register it on the blockchain
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
                      <Label htmlFor="farmerName">Farmer Name</Label>
                      <Input
                        id="farmerName"
                        placeholder="Your full name"
                        value={formData.farmerName}
                        onChange={(e) => handleChange('farmerName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="produceType">Produce Type</Label>
                      <Select value={formData.produceType} onValueChange={(value) => handleChange('produceType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select produce type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                          <SelectItem value="corn">Corn</SelectItem>
                          <SelectItem value="soybeans">Soybeans</SelectItem>
                          <SelectItem value="barley">Barley</SelectItem>
                          <SelectItem value="oats">Oats</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="e.g., 100"
                        value={formData.quantity}
                        onChange={(e) => handleChange('quantity', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Select value={formData.unit} onValueChange={(value) => handleChange('unit', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Kilograms (kg)</SelectItem>
                          <SelectItem value="tons">Tons</SelectItem>
                          <SelectItem value="bushels">Bushels</SelectItem>
                          <SelectItem value="pounds">Pounds (lbs)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="harvestDate">Harvest Date</Label>
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
                    <Label htmlFor="origin">Origin/Farm Location</Label>
                    <Textarea
                      id="origin"
                      placeholder="Farm address or location"
                      value={formData.origin}
                      onChange={(e) => handleChange('origin', e.target.value)}
                      required
                    />
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

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Registering...' : 'Register Produce'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-4">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-lg">Live QR Code Preview</CardTitle>
                <CardDescription className="text-green-700">
                  QR code updates in real-time as you fill the form
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
                    <span className="font-medium text-green-700">Produce ID:</span>
                    <span className="ml-2 text-gray-600">{formData.produceId || 'Not set'}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-green-700">Type:</span>
                    <span className="ml-2 text-gray-600">{formData.produceType || 'Not set'}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-green-700">Quantity:</span>
                    <span className="ml-2 text-gray-600">
                      {formData.quantity && formData.unit ? `${formData.quantity} ${formData.unit}` : 'Not set'}
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