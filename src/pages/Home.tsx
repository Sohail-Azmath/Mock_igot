import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, Clock } from 'lucide-react';
import { LearningHistoryEntry } from '../types';

export default function Home({ userId }: { userId: string }) {
  const [history, setHistory] = useState<LearningHistoryEntry[]>([]);

  useEffect(() => {
    fetch(`/api/igot/user/${userId}/learning-history`)
      .then(res => res.json())
      .then(data => {
        if (data.learning_history) setHistory(data.learning_history);
      });
  }, [userId]);

  const inProgress = history.filter(h => h.status === 'in_progress');
  const completed = history.filter(h => h.status === 'completed');
  const enrolled = history.filter(h => h.status === 'enrolled');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
              <PlayCircle className="text-indigo-600" /> Continue Learning
            </h2>
            {inProgress.length > 0 ? (
              <div className="space-y-4">
                {inProgress.map(course => (
                  <div key={course.course_id} className="border border-slate-100 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
                    <div>
                      <h3 className="font-semibold text-slate-900">{course.course_title}</h3>
                      <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex-1 w-32 sm:w-48 bg-slate-200 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <span>{course.progress}%</span>
                      </div>
                    </div>
                    <Link 
                      to={`/course/${course.course_id}/learn?user=${userId}`}
                      className="shrink-0 bg-indigo-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-indigo-700 transition-colors text-center"
                    >
                      Continue
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No courses currently in progress.</p>
            )}
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 flex items-center gap-2">
              <CheckCircle className="text-emerald-600" /> Recently Completed
            </h2>
            {completed.length > 0 ? (
              <div className="space-y-4">
                {completed.slice(0,3).map(course => (
                  <div key={course.course_id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-colors">
                    <div>
                      <h3 className="font-medium text-slate-900">{course.course_title}</h3>
                      <p className="text-xs text-slate-500 mt-1">Completed on: {course.completed_on}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-700 font-bold">{course.score}%</span>
                      <p className="text-xs text-slate-500">Score</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No completed courses yet.</p>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-indigo-50 rounded-xl border border-indigo-100 p-6">
            <h2 className="text-lg font-semibold mb-4 text-indigo-900">Learning Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Courses Enrolled</span>
                <span className="font-bold text-slate-900">{history.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Courses Completed</span>
                <span className="font-bold text-slate-900">{completed.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">In Progress</span>
                <span className="font-bold text-slate-900">{inProgress.length}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-indigo-200 flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Learning Hours</span>
                <span className="font-bold text-indigo-700">{history.reduce((acc, curr) => acc + (curr.learning_hours || 0), 0)}h</span>
              </div>
            </div>
          </section>
          
          <Link 
            to={`/catalogue?user=${userId}`}
            className="block w-full text-center bg-white border-2 border-indigo-600 text-indigo-700 font-medium py-3 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Browse Course Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
