'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            GrainChain
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Blockchain-powered supply chain transparency for agricultural products
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Track your food from farm to table with complete transparency and security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link href="/farmer">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="bg-green-600 text-white">
                <CardTitle className="text-xl">🌾 Farmer</CardTitle>
                <CardDescription className="text-green-100">
                  Register your produce on the blockchain
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">
                  Register new produce, generate QR codes, and start the traceability journey
                </p>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  Enter Farmer Portal
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/distributor">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle className="text-xl">🚚 Distributor</CardTitle>
                <CardDescription className="text-blue-100">
                  Update logistics and track shipments
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">
                  Update shipment status, track logistics, and maintain chain of custody
                </p>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  Enter Distributor Portal
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/retailer">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="bg-purple-600 text-white">
                <CardTitle className="text-xl">🏪 Retailer</CardTitle>
                <CardDescription className="text-purple-100">
                  Confirm arrival and set pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">
                  Confirm product arrival, assess quality, and set retail prices
                </p>
                <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                  Enter Retailer Portal
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/consumer">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="bg-orange-600 text-white">
                <CardTitle className="text-xl">👥 Consumer</CardTitle>
                <CardDescription className="text-orange-100">
                  Trace product journey and verify authenticity
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">
                  Scan QR codes to trace the complete journey of your food products
                </p>
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                  Enter Consumer Portal
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">How It Works</CardTitle>
              <CardDescription>
                The complete GrainChain supply chain process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Farmer Registration</h3>
                  <p className="text-gray-600">Farmers register their produce with detailed information and generate unique QR codes</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Distribution Tracking</h3>
                  <p className="text-gray-600">Distributors update logistics and track products through the supply chain</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Retail Confirmation</h3>
                  <p className="text-gray-600">Retailers confirm arrival, assess quality, and set final pricing</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold">Consumer Verification</h3>
                  <p className="text-gray-600">Consumers scan QR codes to verify authenticity and trace the complete journey</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Key Features</CardTitle>
              <CardDescription>
                Why choose GrainChain for supply chain transparency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🔒</div>
                <div>
                  <h3 className="font-semibold">Blockchain Security</h3>
                  <p className="text-gray-600">All data is securely stored on the blockchain, ensuring immutability and trust</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-2xl">👁️</div>
                <div>
                  <h3 className="font-semibold">Complete Transparency</h3>
                  <p className="text-gray-600">Full visibility into every step of the supply chain from farm to table</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="font-semibold">Easy QR Scanning</h3>
                  <p className="text-gray-600">Simple QR code scanning for instant access to product information</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🌍</div>
                <div>
                  <h3 className="font-semibold">Real-time Updates</h3>
                  <p className="text-gray-600">Live tracking and status updates throughout the supply chain journey</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="shadow-lg max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Benefits for Everyone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-green-600 mb-2">For Farmers</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Provenance tracking</li>
                    <li>• Fair pricing</li>
                    <li>• Market access</li>
                    <li>• Quality recognition</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-600 mb-2">For Distributors</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Logistics optimization</li>
                    <li>• Real-time tracking</li>
                    <li>• Reduced fraud</li>
                    <li>• Efficient operations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-600 mb-2">For Retailers</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Product verification</li>
                    <li>• Quality assurance</li>
                    <li>• Customer trust</li>
                    <li>• Brand protection</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-600 mb-2">For Consumers</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Food safety</li>
                    <li>• Transparency</li>
                    <li>• Ethical sourcing</li>
                    <li>• Informed choices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}