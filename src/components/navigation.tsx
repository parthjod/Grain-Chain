'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const navigation = [
  { name: 'Farmer', href: '/farmer', description: 'Register new produce', color: 'bg-green-600 hover:bg-green-700' },
  { name: 'Distributor', href: '/distributor', description: 'Update logistics', color: 'bg-blue-600 hover:bg-blue-700' },
  { name: 'Retailer', href: '/retailer', description: 'Confirm arrival & set price', color: 'bg-purple-600 hover:bg-purple-700' },
  { name: 'Consumer', href: '/consumer', description: 'Trace product journey', color: 'bg-orange-600 hover:bg-orange-700' },
];

export function Navigation() {
  const pathname = usePathname();

  if (pathname === '/') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">GrainChain</h1>
            <p className="text-xl text-gray-600 mb-2">Blockchain Supply Chain for Agriculture</p>
            <p className="text-lg text-gray-500">Complete transparency from farm to table</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${item.color}`}>
                      <span className="text-white text-2xl font-bold">{item.name.charAt(0)}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Farmer Registers</h3>
                <p className="text-gray-600 text-sm">Farmers register their produce on the blockchain, creating a permanent record.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Distributor Updates</h3>
                <p className="text-gray-600 text-sm">Distributors track and update the logistics as produce moves through the supply chain.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Consumer Verifies</h3>
                <p className="text-gray-600 text-sm">Consumers scan QR codes to verify the complete journey and authenticity.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-900 mb-2">🔒 Immutable Records</h3>
                <p className="text-gray-600 text-sm">All transactions are permanently recorded on the blockchain.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-900 mb-2">📍 Full Traceability</h3>
                <p className="text-gray-600 text-sm">Track every step from farm to retail store.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-900 mb-2">🔍 Easy Verification</h3>
                <p className="text-gray-600 text-sm">Simple QR code scanning for instant verification.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-900 mb-2">🤝 Build Trust</h3>
                <p className="text-gray-600 text-sm">Transparency builds trust between all stakeholders.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">GrainChain</h1>
          </Link>
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button 
                  variant={pathname === item.href ? "default" : "outline"}
                  className={pathname === item.href ? item.color : ""}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}