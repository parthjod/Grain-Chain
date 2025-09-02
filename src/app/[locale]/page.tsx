'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <div>
      <h1>{t('title')}</h1>
      <h2>{t('subtitle')}</h2>
      <p>{t('description')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Link href="/farmer">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader className="bg-green-600 text-white">
              <CardTitle className="text-xl">{t('farmerCard.title')}</CardTitle>
              <CardDescription className="text-green-100">
                {t('farmerCard.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600">
                {t('farmerCard.content')}
              </p>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                {t('farmerCard.button')}
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/distributor">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="text-xl">{t('distributorCard.title')}</CardTitle>
              <CardDescription className="text-blue-100">
                {t('distributorCard.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600">
                {t('distributorCard.content')}
              </p>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                {t('distributorCard.button')}
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/retailer">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader className="bg-purple-600 text-white">
              <CardTitle className="text-xl">{t('retailerCard.title')}</CardTitle>
              <CardDescription className="text-purple-100">
                {t('retailerCard.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600">
                {t('retailerCard.content')}
              </p>
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                {t('retailerCard.button')}
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/consumer">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader className="bg-orange-600 text-white">
              <CardTitle className="text-xl">{t('consumerCard.title')}</CardTitle>
              <CardDescription className="text-orange-100">
                {t('consumerCard.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600">
                {t('consumerCard.content')}
              </p>
              <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                {t('consumerCard.button')}
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{t('howItWorks.title')}</CardTitle>
            <CardDescription>
              {t('howItWorks.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold">{t('howItWorks.steps.1.title')}</h3>
                <p className="text-gray-600">{t('howItWorks.steps.1.description')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold">{t('howItWorks.steps.2.title')}</h3>
                <p className="text-gray-600">{t('howItWorks.steps.2.description')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold">{t('howItWorks.steps.3.title')}</h3>
                <p className="text-gray-600">{t('howItWorks.steps.3.description')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold">{t('howItWorks.steps.4.title')}</h3>
                <p className="text-gray-600">{t('howItWorks.steps.4.description')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{t('keyFeatures.title')}</CardTitle>
            <CardDescription>
              {t('keyFeatures.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🔒</div>
              <div>
                <h3 className="font-semibold">{t('keyFeatures.features.1.title')}</h3>
                <p className="text-gray-600">{t('keyFeatures.features.1.description')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-2xl">👁️</div>
              <div>
                <h3 className="font-semibold">{t('keyFeatures.features.2.title')}</h3>
                <p className="text-gray-600">{t('keyFeatures.features.2.description')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-2xl">📱</div>
              <div>
                <h3 className="font-semibold">{t('keyFeatures.features.3.title')}</h3>
                <p className="text-gray-600">{t('keyFeatures.features.3.description')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-2xl">🌍</div>
              <div>
                <h3 className="font-semibold">{t('keyFeatures.features.4.title')}</h3>
                <p className="text-gray-600">{t('keyFeatures.features.4.description')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Card className="shadow-lg max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">{t('benefits.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-green-600 mb-2">{t('benefits.farmers.title')}</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {(t.raw('benefits.farmers.points') as string[]).map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">{t('benefits.distributors.title')}</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {(t.raw('benefits.distributors.points') as string[]).map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-purple-600 mb-2">{t('benefits.retailers.title')}</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {(t.raw('benefits.retailers.points') as string[]).map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-orange-600 mb-2">{t('benefits.consumers.title')}</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {(t.raw('benefits.consumers.points') as string[]).map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}