import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Course } from '../types';

export default function Catalogue({ userId }: { userId: string }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/igot/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data.courses);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Course Catalogue</h1>
          <p className="text-slate-500 mt-1">Explore available learning resources on iGOT Karmayogi.</p>
        </div>
        
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <Link 
              key={course.course_id}
              to={`/course/${course.course_id}?user=${userId}`}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all group flex flex-col h-full"
            >
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-medium">
                    {course.category}
                  </span>
                  <span className="flex items-center text-amber-500 text-sm font-medium">
                    ★ {course.rating}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors line-clamp-2">
                  {course.title}
                </h3>
                
                <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-1">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.duration_hours} Hours</span>
                  </div>
                  <div>{course.level}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
