# Shopify Analytics Dashboard

A beautiful, client-side web application that instantly analyzes your Shopify orders CSV data and generates comprehensive business insights without requiring any database or authentication.

## ✨ Features

### 📊 **Instant Analytics**
- **Total Orders & Revenue**: Complete sales overview
- **Profit Estimation**: Automated profit calculations
- **Average Order Value**: Customer spending insights
- **Product Performance**: Top-selling products analysis

### 📈 **Interactive Charts**
- **Sales Trend**: Monthly revenue and order patterns
- **Top Products**: Best performers by revenue
- **Geographic Analysis**: Orders by country/region
- **Time Series**: Order volume over time

### 🔍 **Advanced Data Views**
- **Sortable Product Table**: Revenue, quantity, and pricing
- **Search & Filter**: Find specific products instantly
- **Responsive Design**: Perfect on desktop and mobile

### 🚀 **Zero Setup Required**
- **Client-Side Processing**: No data leaves your browser
- **No Database**: Everything runs locally
- **No Authentication**: Upload and analyze immediately
- **Static Hosting**: Deploy anywhere (GitHub Pages, Vercel)

## 🛠 Tech Stack

- **Framework**: Next.js (Static Export)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **CSV Processing**: PapaParse
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 🎨 Design System

### Color Palette
- **Primary**: Emerald (#10b981) - Trust and growth
- **Secondary**: Blue (#3b82f6) - Professional and reliable
- **Accent**: Purple (#8b5cf6) - Premium feel
- **Warning**: Amber (#f59e0b) - Attention
- **Error**: Red (#ef4444) - Alerts

### Typography
- **Font**: Inter (Clean, modern, highly readable)
- **Hierarchy**: Clear heading and body text distinction
- **Spacing**: Consistent vertical rhythm

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm run export
```

## 📁 Project Structure

```
shopify-analytics-dashboard/
├── components/
│   ├── FileUpload.js      # Drag & drop CSV upload
│   ├── MetricCard.js      # Key metrics display
│   ├── Charts.js          # All chart components
│   └── ProductTable.js    # Sortable data table
├── utils/
│   └── csvParser.js       # CSV processing & analytics
├── pages/
│   ├── _app.js           # Next.js app wrapper
│   └── index.js          # Main dashboard page
├── styles/
│   └── globals.css       # Tailwind + custom styles
└── public/               # Static assets
```

## 📊 Supported CSV Formats

The app automatically detects and processes standard Shopify order exports with these columns:

**Required Fields:**
- `Name` or `Order` - Order identifier
- `Total` or `Subtotal` - Order value
- `Created at` or `Date` - Order date
- `Lineitem name` or `Product` - Product name

**Optional Fields:**
- `Email` - Customer email
- `Lineitem quantity` or `Quantity` - Product quantity
- `Shipping Country` or `Country` - Customer location
- `Lineitem price` or `Price` - Product price

## 🔧 Analytics Engine

### Metrics Calculated
1. **Total Orders**: Count of unique orders
2. **Total Revenue**: Sum of all order values
3. **Estimated Profit**: 30% margin assumption
4. **Average Order Value**: Revenue ÷ Orders
5. **Product Performance**: Revenue and quantity by product
6. **Geographic Distribution**: Orders by country
7. **Time Series**: Monthly trends and patterns

### Data Processing
- **Client-Side Only**: All processing happens in browser
- **Real-Time**: Instant results after upload
- **Memory Efficient**: Optimized for large CSV files
- **Error Handling**: Graceful handling of malformed data

## 🌐 Deployment

### GitHub Pages
```bash
npm run export
# Upload 'out' folder to GitHub Pages
```

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
npm run export
# Drag 'out' folder to Netlify deploy
```

## 🔮 Future Enhancements

### Phase 1: Enhanced Analytics
- [ ] **Cohort Analysis**: Customer retention insights
- [ ] **Seasonal Trends**: Holiday and seasonal patterns
- [ ] **Product Categories**: Group products for better analysis
- [ ] **Customer Segmentation**: RFM analysis

### Phase 2: Advanced Features
- [ ] **PDF Export**: Download dashboard as PDF report
- [ ] **Data Comparison**: Compare multiple time periods
- [ ] **Forecasting**: Predict future sales trends
- [ ] **Custom Metrics**: User-defined KPIs

### Phase 3: Integration & AI
- [ ] **Live Shopify API**: Real-time data sync
- [ ] **AI Insights**: Automated business recommendations
- [ ] **Multi-Store**: Support multiple Shopify stores
- [ ] **Alerts**: Automated performance notifications

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For questions or issues, please open a GitHub issue or contact the development team.

---

**Built with ❤️ for Shopify merchants who want instant, beautiful analytics without the complexity.**