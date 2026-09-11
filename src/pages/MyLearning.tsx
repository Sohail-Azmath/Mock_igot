import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, PlayCircle, BookOpen } from 'lucide-react';
import { LearningHistoryEntry } from '../types';

export default function MyLearning({ userId }: { userId: string }) {
  const [history, setHistory] = useState<LearningHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/igot/user/${userId}/learning-history`)
      .then(res => res.json())
      .then(data => {
        if (data.learning_history) setHistory(data.learning_history);
        setLoading(false);
      });
  }, [userId]);

  const inProgress = history.filter(h => h.status === 'in_progress');
  const completed = history.filter(h => h.status === 'completed');
  const enrolled = history.filter(h => h.status === 'enrolled');

  if (loading) return <div className="py-12 text-center text-slate-500">Loading learning history...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Learning</h1>
        <p className="text-slate-500 mt-1">Track your progress and review completed courses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* In Progress Column */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
            <PlayCircle className="text-indigo-600" /> In Progress
          </h2>
          {inProgress.length > 0 ? (
            inProgress.map(course => (
              <div key={course.course_id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-slate-900 mb-3">{course.course_title}</h3>
                
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Progress</span>
                    <span className="font-medium text-indigo-700">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
                
                <Link 
                  to={`/course/${course.course_id}/learn?user=${userId}`}
                  className="block w-full bg-slate-900 text-white text-center text-sm font-medium py-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Continue
                </Link>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-center">No courses in progress.</p>
          )}
        </div>

        {/* Enrolled Column */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
            <BookOpen className="text-amber-500" /> Enrolled
          </h2>
          {enrolled.length > 0 ? (
            enrolled.map(course => (
              <div key={course.course_id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-slate-900 mb-3">{course.course_title}</h3>
                <div className="text-sm text-slate-500 mb-4">0% Complete</div>
                
                <Link 
                  to={`/course/${course.course_id}/learn?user=${userId}`}
                  className="block w-full bg-white border border-slate-300 text-slate-700 text-center text-sm font-medium py-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Start Course
                </Link>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-center">No newly enrolled courses.</p>
          )}
        </div>

        {/* Completed Column */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
            <CheckCircle className="text-emerald-500" /> Completed
          </h2>
          {completed.length > 0 ? (
            completed.map(course => (
              <div key={course.course_id} className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-900 pr-4">{course.course_title}</h3>
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                </div>
                
                <div className="flex justify-between items-end mt-4">
                  <div className="text-xs text-slate-500">
                    <div>Completed on:</div>
                    <div className="font-medium text-slate-700">{course.completed_on}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Score</div>
                    <div className="text-xl font-black text-emerald-700">{course.score}%</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-center">No completed courses yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}
