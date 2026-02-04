import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Cpu } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { categories } = useBlog();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Cpu className="w-8 h-8" />
            <span>AI Blog IL</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">ראשי</Link>
            {categories.slice(0, 4).map(cat => (
              <Link key={cat} to={`/category/${cat}`} className="text-gray-600 hover:text-primary font-medium transition-colors">
                {cat}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5 focus-within:ring-2 ring-primary/20">
            <input
              type="text"
              placeholder="חיפוש מאמרים..."
              className="bg-transparent border-none outline-none text-sm w-48 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="text-gray-500 hover:text-primary">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-4 absolute w-full shadow-lg">
          <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg px-4 py-2 mb-4">
            <input
              type="text"
              placeholder="חיפוש..."
              className="bg-transparent border-none outline-none text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </form>
          <nav className="flex flex-col gap-4">
            <Link to="/" className="text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>ראשי</Link>
            {categories.map(cat => (
              <Link 
                key={cat} 
                to={`/category/${cat}`} 
                className="text-gray-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;