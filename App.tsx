import React from 'react';
import { HashRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Archive from './pages/Archive';
import { BlogPostProvider } from './context/BlogContext';

const App: React.FC = () => {
  return (
    <BlogPostProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/category/:category" element={<Archive type="category" />} />
            <Route path="/tag/:tag" element={<Archive type="tag" />} />
            <Route path="/search" element={<Archive type="search" />} />
          </Routes>
        </Layout>
      </Router>
    </BlogPostProvider>
  );
};

export default App;