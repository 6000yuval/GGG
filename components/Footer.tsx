import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">AI Blog IL</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              מקור הידע המוביל בישראל לבינה מלאכותית, למידת מכונה וטכנולוגיות עתידניות.
              התוכן באתר נכתב למטרות לימוד והעשרה.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">קישורים מהירים</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">אודות</a></li>
              <li><a href="#" className="hover:text-white transition-colors">צור קשר</a></li>
              <li><a href="#" className="hover:text-white transition-colors">מדיניות פרטיות</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">הירשמו לניוזלטר</h3>
            <p className="text-sm text-slate-400 mb-4">קבלו עדכונים חמים ישירות למייל.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="כתובת מייל" 
                className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-primary"
              />
              <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                שלח
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} AI Blog IL. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
};

export default Footer;