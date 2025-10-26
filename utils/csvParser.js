import Papa from 'papaparse';
import { format, parseISO, startOfMonth } from 'date-fns';

export const parseShopifyCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          console.log('CSV parsed, rows:', results.data.length);
          if (results.data.length === 0) {
            throw new Error('No data found in CSV');
          }
          const analytics = analyzeData(results.data);
          resolve(analytics);
        } catch (error) {
          console.error('Parse error:', error);
          reject(error);
        }
      },
      error: (error) => reject(error)
    });
  });
};

const analyzeData = (data) => {
  // Product cost mapping from inventory
  const productCosts = {
    'MUG-OVL-001': 78, 'MUG-OVL-002': 65, 'CUP-MIL-001': 70, 'CUP-MIL-002': 59,
    'MUG-CFM-001': 63, 'MUG-CFG-001': 63, 'MUG-BEE-001': 50, 'MUG-HRT-001': 50,
    'MUG-MOR-001': 75, 'MUG-TRI-001': 62, 'SET-KUL-001': 405, 'POT-TPS-001': 50,
    'POT-TPS-002': 50, 'POT-TPS-003': 50, 'POT-TPS-004': 50, 'POT-EMB-001': 130,
    'POT-EMB-002': 130, 'IDL-DUR-001': 135, 'MUG-BER-001': 100, 'MUG-BER-002': 100,
    'MUG-BER-003': 100, 'MUG-BER-004': 100, 'MUG-COF-001': 60, 'SET-KUL-002': 150,
    'DIY-TUL-001': 15, 'DIY-TUL-002': 15, 'SET-DIY-001': 80, 'SET-TEA-001': 130
  };

  // Clean and process data
  const orders = data.map(row => {
    const sku = row['Lineitem sku'] || '';
    const actualCost = productCosts[sku] || parseFloat(row['Lineitem price'] || 0) * 0.4;
    
    return {
      name: row['Name'] || '',
      email: row['Email'] || '',
      total: parseFloat(row['Total'] || 0),
      quantity: parseInt(row['Lineitem quantity'] || 1),
      product: row['Lineitem name'] || 'Unknown Product',
      date: row['Created at'] || new Date().toISOString(),
      country: row['Shipping Country'] || 'India',
      state: row['Shipping Province'] || row['Billing Province'] || 'Unknown',
      sellingPrice: parseFloat(row['Lineitem price'] || 0),
      shipping: parseFloat(row['Shipping'] || 0),
      taxes: parseFloat(row['Taxes'] || 0),
      subtotal: parseFloat(row['Subtotal'] || 0),
      sku: sku,
      // Actual costs for profit calculation
      costPrice: actualCost,
      deliveryCharge: parseFloat(row['Shipping'] || 50),
      adsSpend: parseFloat(row['Lineitem price'] || 0) * 0.1, // 10% of selling price
      packagingCost: 15,
      shopifyFee: parseFloat(row['Total'] || 0) * 0.025 // 2.5% platform fee
    };
  }).filter(order => order.total > 0);

  // Calculate profit for each order
  orders.forEach(order => {
    const revenue = order.sellingPrice * order.quantity;
    const totalProductCost = order.costPrice * order.quantity;
    const totalCosts = totalProductCost + order.deliveryCharge + 
                      order.adsSpend + order.packagingCost + order.shopifyFee;
    order.profit = Math.max(0, revenue - totalCosts);
    order.profitMargin = revenue > 0 ? (order.profit / revenue) * 100 : 0;
    order.totalProductCost = totalProductCost;
  });

  // Calculate metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProfit = orders.reduce((sum, order) => sum + order.profit, 0);
  const totalQuantity = orders.reduce((sum, order) => sum + order.quantity, 0);
  const avgOrderValue = totalRevenue / totalOrders || 0;

  // Product analysis with inventory tracking
  const inventoryData = {
    'MUG-OVL-001': { name: 'Mustard Oval Ceramic Cup - Set of 2', totalStock: 30, sold: 0 },
    'MUG-OVL-002': { name: 'Cream Oval Comfort Cup', totalStock: 30, sold: 0 },
    'CUP-MIL-001': { name: 'Army Green Military Cup', totalStock: 29, sold: 0 },
    'CUP-MIL-002': { name: 'Tough Steel Military Cup', totalStock: 30, sold: 0 },
    'MUG-MOR-001': { name: 'Moroccan Pattern Mug (Pair of 2)', totalStock: 12, sold: 6 },
    'IDL-DUR-001': { name: 'Durga Idol – Handcrafted Divine Figurine', totalStock: 60, sold: 0 },
    'MUG-BER-001': { name: 'Terracotta BrickHold Mug - Handcrafted', totalStock: 10, sold: 0 },
    'MUG-BER-002': { name: 'Terracotta Tankard Mug – Handcrafted', totalStock: 10, sold: 0 },
    'DIY-TUL-001': { name: 'Sacred Tulsi Diya - Copper & Silver', totalStock: 49, sold: 0 }
  };

  const productStats = {};
  orders.forEach(order => {
    if (!productStats[order.product]) {
      productStats[order.product] = { quantity: 0, revenue: 0, sku: order.sku };
    }
    productStats[order.product].quantity += order.quantity;
    productStats[order.product].revenue += order.total;
    
    // Update inventory sold count
    if (inventoryData[order.sku]) {
      inventoryData[order.sku].sold += order.quantity;
    }
  });

  // Calculate inventory status
  const inventoryStatus = Object.entries(inventoryData).map(([sku, data]) => ({
    sku,
    name: data.name,
    totalStock: data.totalStock,
    sold: data.sold,
    remaining: data.totalStock - data.sold,
    soldPercentage: ((data.sold / data.totalStock) * 100).toFixed(1)
  })).sort((a, b) => b.soldPercentage - a.soldPercentage);

  const topProducts = Object.entries(productStats)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Sales trend by month
  const salesByMonth = {};
  orders.forEach(order => {
    try {
      let date;
      if (order.date.includes('T')) {
        date = parseISO(order.date);
      } else {
        date = new Date(order.date);
      }
      const month = format(startOfMonth(date), 'MMM yyyy');
      if (!salesByMonth[month]) {
        salesByMonth[month] = { month, revenue: 0, orders: 0 };
      }
      salesByMonth[month].revenue += order.total;
      salesByMonth[month].orders += 1;
    } catch (e) {
      const currentMonth = format(startOfMonth(new Date()), 'MMM yyyy');
      if (!salesByMonth[currentMonth]) {
        salesByMonth[currentMonth] = { month: currentMonth, revenue: 0, orders: 0 };
      }
      salesByMonth[currentMonth].revenue += order.total;
      salesByMonth[currentMonth].orders += 1;
    }
  });

  const salesTrend = Object.values(salesByMonth).sort((a, b) => {
    const dateA = new Date(a.month + ' 01');
    const dateB = new Date(b.month + ' 01');
    return dateA - dateB;
  });

  // Orders by state
  const ordersByState = {};
  orders.forEach(order => {
    ordersByState[order.state] = (ordersByState[order.state] || 0) + 1;
  });

  const stateData = Object.entries(ordersByState)
    .map(([state, count]) => ({ state, orders: count }))
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 10);

  return {
    summary: {
      totalOrders,
      totalRevenue,
      totalQuantity,
      avgOrderValue,
      totalProfit,
      avgProfitMargin: totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0
    },
    topProducts,
    salesTrend,
    stateData,
    productTable: Object.entries(productStats).map(([name, stats]) => ({
      product: name,
      quantity: stats.quantity,
      revenue: stats.revenue,
      avgPrice: stats.revenue / stats.quantity
    })).sort((a, b) => b.revenue - a.revenue),
    inventoryStatus,
    rawOrders: orders
  };
};