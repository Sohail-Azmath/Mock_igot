/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BookOpen, Search, UserCircle, CheckCircle, Clock } from 'lucide-react';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import CourseDetails from './pages/CourseDetails';
import CourseLearning from './pages/CourseLearning';
import MyLearning from './pages/MyLearning';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

function AppLayout() {
  const [searchParams] = useSearchParams();
  const userParam = searchParams.get('user') || 'EMP-1001';
  const [user, setUser] = useState<{name: string; designation: string; department: string} | null>(null);

  useEffect(() => {
    fetch(`/api/igot/user/${userParam}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setUser(data);
        }
      });
  }, [userParam]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Demo Banner */}
      <div className="bg-amber-100 text-amber-800 text-xs font-bold text-center py-1 uppercase tracking-widest border-b border-amber-200">
        Demo Environment • Mock iGOT Integration
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to={`/?user=${userParam}`} className="flex items-center gap-2 text-indigo-700">
              <BookOpen className="w-6 h-6" />
              <span className="font-bold text-xl tracking-tight">iGOT <span className="font-light">Karmayogi</span></span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link to={`/?user=${userParam}`} className="hover:text-indigo-600 transition-colors">Home</Link>
              <Link to={`/catalogue?user=${userParam}`} className="hover:text-indigo-600 transition-colors">Courses</Link>
              <Link to={`/my-learning?user=${userParam}`} className="hover:text-indigo-600 transition-colors">My Learning</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-slate-900">{user.name}</div>
                <div className="text-xs text-slate-500">{user.designation}, {user.department}</div>
              </div>
            )}
            <UserCircle className="w-8 h-8 text-slate-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16 md:mb-0">
        <Routes>
          <Route path="/" element={<Home userId={userParam} />} />
          <Route path="/catalogue" element={<Catalogue userId={userParam} />} />
          <Route path="/course/:courseId" element={<CourseDetails userId={userParam} />} />
          <Route path="/course/:courseId/learn" element={<CourseLearning userId={userParam} />} />
          <Route path="/my-learning" element={<MyLearning userId={userParam} />} />
        </Routes>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex justify-around p-3 text-xs font-medium text-slate-600">
        <Link to={`/?user=${userParam}`} className="flex flex-col items-center gap-1 hover:text-indigo-600">
          <BookOpen className="w-5 h-5" />
          Home
        </Link>
        <Link to={`/catalogue?user=${userParam}`} className="flex flex-col items-center gap-1 hover:text-indigo-600">
          <Search className="w-5 h-5" />
          Courses
        </Link>
        <Link to={`/my-learning?user=${userParam}`} className="flex flex-col items-center gap-1 hover:text-indigo-600">
          <CheckCircle className="w-5 h-5" />
          Learning
        </Link>
      </nav>
      
      {/* Footer */}
      <footer className="hidden md:block bg-slate-900 text-slate-400 py-8 text-center text-sm mt-auto">
        <p>Mock iGOT Integration Environment for AI Platform Prototype</p>
        <p className="mt-2 text-xs text-slate-500">In production, this handoff would be implemented using the official authentication/SSO mechanism provided by the government ecosystem. For this prototype, authentication is simulated.</p>
      </footer>
    </div>
  );
}
