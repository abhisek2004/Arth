import { Link, useLocation } from 'react-router-dom';
import { Home, Image, FileText, Newspaper, Upload, Bug } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/media', label: 'Media', icon: Image },
    { path: '/writing', label: 'Writing', icon: FileText },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/upload', label: 'Upload', icon: Upload },
    // { path: '/debug', label: 'Debug', icon: Bug },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/Arth.png"
              alt="ART-H Logo"
              className="object-contain w-8 h-8 rounded-lg"
              width={32}
              height={32}
            />
            <span className="text-xl font-semibold text-gray-900">ARTH </span>
          </Link>

          <div className="flex space-x-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isActive(path)
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
