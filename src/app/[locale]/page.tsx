'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { Globe, Lock, Rss, Smartphone } from 'lucide-react';

export default function Home() {
  const t = useTranslations('Index');

  const features = [
    {
      title: t('keyFeatures.features.1.title'),
      description: t('keyFeatures.features.1.description'),
      icon: <Lock className="h-12 w-12 text-green-500" />,
    },
    {
      title: t('keyFeatures.features.2.title'),
      description: t('keyFeatures.features.2.description'),
      icon: <Rss className="h-12 w-12 text-blue-500" />,
    },
    {
      title: t('keyFeatures.features.3.title'),
      description: t('keyFeatures.features.3.description'),
      icon: <Smartphone className="h-12 w-12 text-purple-500" />,
    },
    {
        title: t('keyFeatures.features.4.title'),
        description: t('keyFeatures.features.4.description'),
        icon: <Globe className="h-12 w-12 text-orange-500" />,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://cdn.pixabay.com/video/2020/09/13/5045-458453373.mp4" type="video/mp4" />
          </video>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('title')}</h1>
            <p className="text-lg md:text-2xl mb-8">{t('subtitle')}</p>
            <Button size="lg" asChild>
              <Link href="/consumer">{t('consumerCard.button')}</Link>
            </Button>
          </div>
        </section>

        {/* Role-based cards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Link href="/farmer">
                <Card className="hover:shadow-xl transition-shadow h-full">
                  <CardHeader className="bg-green-600 text-white">
                    <CardTitle>{t('farmerCard.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p>{t('farmerCard.description')}</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/distributor">
                <Card className="hover:shadow-xl transition-shadow h-full">
                  <CardHeader className="bg-blue-600 text-white">
                    <CardTitle>{t('distributorCard.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p>{t('distributorCard.description')}</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/retailer">
                <Card className="hover:shadow-xl transition-shadow h-full">
                  <CardHeader className="bg-purple-600 text-white">
                    <CardTitle>{t('retailerCard.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p>{t('retailerCard.description')}</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/consumer">
                <Card className="hover:shadow-xl transition-shadow h-full">
                  <CardHeader className="bg-orange-600 text-white">
                    <CardTitle>{t('consumerCard.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p>{t('consumerCard.description')}</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('keyFeatures.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">{t('howItWorks.title')}</h2>
                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-300"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        <div className="text-center">
                            <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
                            <h3 className="text-lg font-semibold">{t('howItWorks.steps.1.title')}</h3>
                            <p className="text-gray-600">{t('howItWorks.steps.1.description')}</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
                            <h3 className="text-lg font-semibold">{t('howItWorks.steps.2.title')}</h3>
                            <p className="text-gray-600">{t('howItWorks.steps.2.description')}</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
                            <h3 className="text-lg font-semibold">{t('howItWorks.steps.3.title')}</h3>
                            <p className="text-gray-600">{t('howItWorks.steps.3.description')}</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">4</div>
                            <h3 className="text-lg font-semibold">{t('howItWorks.steps.4.title')}</h3>
                            <p className="text-gray-600">{t('howItWorks.steps.4.description')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} GrainChain. {t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  );
}
