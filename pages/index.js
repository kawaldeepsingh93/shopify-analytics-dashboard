import { useState } from 'react';
import Head from 'next/head';
import { ShoppingBag, IndianRupee, TrendingUp, Users, BarChart3 } from 'lucide-react';

import FileUpload from '../components/FileUpload';
import MetricCard from '../components/MetricCard';
import { SalesTrendChart, TopProductsChart, CountryChart, OrdersChart } from '../components/Charts';
import ProductTable from '../components/ProductTable';
import InventoryTable from '../components/InventoryTable';
import { parseShopifyCSV } from '../utils/csvParser';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await parseShopifyCSV(file);
      setAnalytics(data);
      setUploadedFile(file);
    } catch (err) {
      setError('Error parsing CSV file. Please check the format and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUploadedFile(null);
    setAnalytics(null);
    setError('');
  };

  return (
    <>
      <Head>
        <title>Shopify Analytics Dashboard</title>
        <meta name="description" content="Analyze your Shopify orders data instantly" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-emerald-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Shopify Analytics Dashboard
                </h1>
                <p className="text-gray-600">
                  Upload your orders CSV and get instant insights
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <FileUpload 
              onFileUpload={handleFileUpload}
              uploadedFile={uploadedFile}
              onClear={handleClear}
            />
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-gray-600">Processing your data...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {analytics && !loading && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <MetricCard
                  title="Total Orders"
                  value={analytics.summary.totalOrders}
                  icon={ShoppingBag}
                  delay={0.1}
                />
                <MetricCard
                  title="Total Revenue"
                  value={analytics.summary.totalRevenue}
                  icon={IndianRupee}
                  delay={0.2}
                />
                <div className="relative group">
                  <MetricCard
                    title="Total Profit"
                    value={analytics.summary.totalProfit}
                    icon={TrendingUp}
                    delay={0.3}
                  />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    <div className="text-center">
                      <div className="font-semibold mb-1">Profit Formula:</div>
                      <div>Revenue - (Cost Price + Delivery + Ads + Packaging + Shopify Fee)</div>
                      <div className="mt-1 text-gray-300">
                        Cost: Actual inventory cost | Ads: 10% | Delivery: From CSV | Shopify: 2.5% | Packaging: ₹15
                      </div>
                    </div>
                  </div>
                </div>
                <MetricCard
                  title="Avg Order Value"
                  value={analytics.summary.avgOrderValue}
                  icon={Users}
                  delay={0.4}
                />
                <div className="relative group">
                  <MetricCard
                    title="Profit Margin"
                    value={analytics.summary.avgProfitMargin}
                    icon={TrendingUp}
                    delay={0.5}
                  />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    <div className="text-center">
                      <div className="font-semibold mb-1">Margin Formula:</div>
                      <div>(Total Profit ÷ Total Revenue) × 100</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesTrendChart data={analytics.salesTrend} />
                <TopProductsChart data={analytics.topProducts} />
                <CountryChart data={analytics.stateData} />
                <OrdersChart data={analytics.salesTrend} />
              </div>

              <ProductTable data={analytics.productTable} />
              
              <InventoryTable data={analytics.inventoryStatus} />
            </div>
          )}

          {!analytics && !loading && !error && (
            <div className="text-center py-12">
              <BarChart3 className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ready to analyze your data
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Upload your Shopify orders CSV file to see detailed analytics, 
                sales trends, and product performance insights.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}