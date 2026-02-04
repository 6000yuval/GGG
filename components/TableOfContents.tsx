import React from 'react';

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  // Simple regex to find headers in markdown
  const headers = content.match(/^#{1,3} (.*$)/gm);

  if (!headers || headers.length === 0) return null;

  return (
    <nav className="bg-gray-50 rounded-xl p-6 border border-gray-100 sticky top-24">
      <h4 className="font-bold text-gray-900 mb-4 text-lg border-b border-gray-200 pb-2">תוכן העניינים</h4>
      <ul className="space-y-2 text-sm">
        {headers.map((header, index) => {
          const level = header.match(/^#+/)?.[0].length || 1;
          const text = header.replace(/^#+ /, '');
          // Create a simplified anchor id (in a real app, use a slugify library)
          const id = text.toLowerCase().replace(/[^\w\u0590-\u05FF]+/g, '-');
          
          return (
            <li key={index} style={{ paddingRight: `${(level - 1) * 12}px` }}>
              <span className="text-gray-600 hover:text-primary cursor-pointer block py-1 border-r-2 border-transparent hover:border-primary pr-2 transition-all">
                {text}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;