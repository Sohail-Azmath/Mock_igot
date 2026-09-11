import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, BarChart, Globe, Star, BookOpen, CheckCircle } from 'lucide-react';
import { Course, Enrollment } from '../types';

export default function CourseDetails({ userId }: { userId: string }) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    // Fetch course details
    fetch(`/api/igot/courses/${courseId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setCourse(data);
      });

    // Check enrollment status
    fetch(`/api/igot/user/${userId}/learning-history`)
      .then(res => res.json())
      .then(data => {
        if (data.learning_history) {
          const found = data.learning_history.find((h: any) => h.course_id === courseId);
          if (found) setEnrollment(found);
        }
        setLoading(false);
      });
  }, [courseId, userId]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const res = await fetch('/api/igot/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, course_id: courseId })
      });
      const data = await res.json();
      if (data.success) {
        setEnrollment(data);
      }
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="py-12 text-center text-slate-500">Loading course...</div>;
  if (!course) return <div className="py-12 text-center text-red-500">Course not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Course Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <div className="flex-1">
            <div className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wide">{course.provider}</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{course.title}</h1>
            <p className="text-lg text-slate-600 mb-6 max-w-3xl">{course.description}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-700">
              <div className="flex items-center gap-2"><BarChart className="w-5 h-5 text-slate-400" /> {course.level}</div>
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-slate-400" /> {course.duration_hours} Hours</div>
              <div className="flex items-center gap-2"><Globe className="w-5 h-5 text-slate-400" /> {course.language}</div>
              <div className="flex items-center gap-1 font-medium text-amber-500"><Star className="w-5 h-5 fill-amber-500 text-amber-500" /> {course.rating}</div>
            </div>
          </div>
          
          <div className="shrink-0 w-full md:w-72 bg-slate-50 p-6 rounded-xl border border-slate-200 text-center flex flex-col justify-center">
            {enrollment ? (
              enrollment.status === 'completed' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-lg">
                    <CheckCircle className="w-6 h-6" />
                    Course Completed
                  </div>
                  <div className="text-slate-600 text-sm">Score: <span className="font-bold text-slate-900">{enrollment.score}%</span></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm font-medium text-slate-600">Progress: {enrollment.progress}%</div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${enrollment.progress}%` }}></div>
                  </div>
                  <Link 
                    to={`/course/${course.course_id}/learn?user=${userId}`}
                    className="block w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Continue Learning
                  </Link>
                </div>
              )
            ) : (
              <button 
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70"
              >
                {enrolling ? 'Enrolling...' : 'Enrol in Course'}
              </button>
            )}
            
            <div className="text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
              <BookOpen className="w-4 h-4" /> {course.enrolled_users.toLocaleString()} users enrolled
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Modules */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Modules</h2>
            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <div key={module.id} className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-colors group">
                  <div className="shrink-0 w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg group-hover:text-indigo-700 transition-colors">{module.title}</h3>
                    <p className="text-slate-600 mt-1">{module.description}</p>
                    <div className="text-sm text-slate-500 mt-2 flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {module.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {enrollment && enrollment.status !== 'completed' && (
               <div className="mt-8 text-center">
                 <Link 
                    to={`/course/${course.course_id}/learn?user=${userId}`}
                    className="inline-block bg-indigo-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Start Course
                  </Link>
               </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {course.competencies.map((comp, i) => (
                <span key={i} className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-full font-medium">
                  {comp}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Learning Objectives</h3>
            <ul className="space-y-3">
              {course.learning_objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Prerequisites</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              {course.prerequisites.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
