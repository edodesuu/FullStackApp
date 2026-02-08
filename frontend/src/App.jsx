import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesDashboard from './components/FeaturesDashboard';
import FeaturesGrid from './components/FeaturesGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <FeaturesDashboard />
      <FeaturesGrid />
      <Footer />
    </div>
  );
}

export default App;