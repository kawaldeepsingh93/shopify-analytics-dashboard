import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

export const SalesTrendChart = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2 }}
    className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
  >
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} />
        <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  </motion.div>
);

export const TopProductsChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Products</h3>
      <div className="space-y-3">
        {data.slice(0, 5).map((product, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">
                {product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}
              </p>
              <p className="text-xs text-gray-500">{product.quantity} units sold</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-emerald-600">
                ₹{product.revenue.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-gray-500">
                ₹{(product.revenue / product.quantity).toFixed(0)}/unit
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CountryChart = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.4 }}
    className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
  >
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Orders by State</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ state, percent }) => `${state} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="orders"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </motion.div>
);

export const OrdersChart = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5 }}
    className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
  >
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Orders by Month</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </motion.div>
);