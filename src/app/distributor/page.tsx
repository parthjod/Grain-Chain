'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface DistributorFormData {
  produceId: string;
  distributorName: string;
  status: string;
  location: string;
  notes: string;
  walletAddress: string;
}

export default function DistributorPage() {
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
          title: "Success",
          description: "Produce status updated successfully!",
        });
        
        router.push('/distributor/success');
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update produce status",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update produce status",
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
          <p className="text-lg text-blue-600">Distributor Portal - Update Logistics</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl">Update Produce Status</CardTitle>
            <CardDescription className="text-blue-100">
              Update the logistics status and location of produce in transit
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
                  <Label htmlFor="distributorName">Distributor Name</Label>
                  <Input
                    id="distributorName"
                    placeholder="Your company name"
                    value={formData.distributorName}
                    onChange={(e) => handleChange('distributorName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Current Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select current status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Transit">In Transit</SelectItem>
                      <SelectItem value="At Warehouse">At Warehouse</SelectItem>
                      <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                      <SelectItem value="Delayed">Delayed</SelectItem>
                      <SelectItem value="Customs Clearance">Customs Clearance</SelectItem>
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
                <Label htmlFor="location">Current Location</Label>
                <Textarea
                  id="location"
                  placeholder="Current location or facility address"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information about the shipment"
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
                {isLoading ? 'Updating...' : 'Update Status'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Quick Status Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-600">In Transit</h4>
                  <p className="text-gray-600">Produce is being transported</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">At Warehouse</h4>
                  <p className="text-gray-600">Produce is stored at facility</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">Out for Delivery</h4>
                  <p className="text-gray-600">En route to final destination</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600">Delayed</h4>
                  <p className="text-gray-600">Shipment is delayed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}