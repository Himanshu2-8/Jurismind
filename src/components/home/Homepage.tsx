import { Upload, FileText, Shield, Zap, CheckCircle, ArrowRight, Scale, Users, Clock } from 'lucide-react';

export default function HomePage() {

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-amber-600" />,
      title: "Document Analysis",
      description: "AI-powered analysis of contracts, agreements, and legal documents with detailed insights."
    },
    {
      icon: <Shield className="w-8 h-8 text-amber-600" />,
      title: "Risk Assessment",
      description: "Identify potential risks, unfavorable clauses, and areas requiring legal attention."
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-600" />,
      title: "Instant Results",
      description: "Get comprehensive analysis and recommendations in seconds, not hours."
    }
  ];

  const stats = [
    { number: "10k+", label: "Documents Analyzed" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "5min", label: "Average Processing Time" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream to-amber-50/30">      

      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Analyze Legal Documents with
              <span className="text-amber-600 block">AI Precision</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Upload your contracts, agreements, and legal documents. Get instant AI-powered analysis, 
              risk assessment, and actionable insights to make informed decisions.
            </p>
            
            <div className="max-w-2xl mx-auto mb-8">
              <div 
                className="border-2 border-dashed border-amber-300 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-300 cursor-pointer group"
              >
                <div className="p-12 text-center">
                  <Upload className="" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Drop your document here</h3>
                  <p className="text-gray-600 mb-4">or click to browse files</p>
                  <p className="text-sm text-gray-500">Supports PDF, DOCX, TXT • Max 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 transition-all transform hover:scale-105">
                <span>Start Analysis</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-xl font-semibold transition-colors">
                View Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-amber-600">{stat.number}</div>
                  <div className="text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful AI Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our advanced AI technology provides comprehensive analysis and insights for all your legal documents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-amber-100 group cursor-pointer"
              >
                <div className="">
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get professional legal insights in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                <Upload className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Upload Document</h3>
              <p className="text-gray-600">Simply drag and drop or select your legal document to upload securely.</p>
            </div>

            <div className="text-center group">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                <Zap className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. AI Analysis</h3>
              <p className="text-gray-600">Our AI processes your document and identifies key clauses, risks, and opportunities.</p>
            </div>

            <div className="text-center group">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                <CheckCircle className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Get Insights</h3>
              <p className="text-gray-600">Receive detailed analysis, recommendations, and actionable insights instantly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-amber-100 mb-8">
            Join thousands of professionals who trust LegalAI for their document analysis needs.
          </p>
          <button className="bg-white text-amber-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors transform hover:scale-105">
            Start Your Free Trial
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-amber-600 p-2 rounded-lg">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">LegalAI</span>
              </div>
              <p className="text-gray-400">
                AI-powered legal document analysis for modern professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LegalAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}