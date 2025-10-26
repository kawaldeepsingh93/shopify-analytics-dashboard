const MetricCard = ({ title, value, icon: Icon, delay = 0 }) => {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (title.toLowerCase().includes('revenue') || title.toLowerCase().includes('profit') || title.toLowerCase().includes('value')) {
        return `₹${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      if (title.toLowerCase().includes('margin')) {
        return `${val.toFixed(1)}%`;
      }
      return val.toLocaleString('en-IN');
    }
    return val;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{formatValue(value)}</p>
        </div>
        <div className="p-3 rounded-full bg-emerald-100">
          <Icon className="h-6 w-6 text-emerald-600" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;