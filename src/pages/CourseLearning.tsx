import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { Course, Enrollment, Module } from '../types';

export default function CourseLearning({ userId }: { userId: string }) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch(`/api/igot/courses/${courseId}`).then(res => res.json()),
      fetch(`/api/igot/user/${userId}/learning-history`).then(res => res.json())
    ]).then(([courseData, historyData]) => {
      if (!courseData.error) setCourse(courseData);
      
      if (historyData.learning_history) {
        const found = historyData.learning_history.find((h: any) => h.course_id === courseId);
        if (found) {
          // fetch full enrollment to allow updates
          fetch(`/api/igot/enrollment/${found.enrollment_id}`)
            .then(res => res.json())
            .then(data => {
              if (!data.error) {
                setEnrollment(data);
                // Set active module based on progress (rough estimation)
                if (courseData && courseData.modules) {
                  const progressModule = Math.floor((data.progress / 100) * courseData.modules.length);
                  setActiveModuleIndex(Math.min(progressModule, courseData.modules.length - 1));
                }
              }
            });
        } else {
           // Not enrolled, kick out
           navigate(`/course/${courseId}?user=${userId}`);
        }
      }
      setLoading(false);
    });
  }, [courseId, userId, navigate]);

  const completeModule = async () => {
    if (!course || !enrollment) return;
    
    // Calculate new progress
    const totalModules = course.modules.length;
    const currentCompleted = activeModuleIndex + 1;
    const newProgress = Math.min(Math.round((currentCompleted / totalModules) * 100), 100);
    
    const isCompleted = newProgress === 100;
    
    try {
      const res = await fetch(`/api/igot/enrollment/${enrollment.enrollment_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          progress: newProgress,
          status: isCompleted ? 'completed' : 'in_progress',
          score: isCompleted ? Math.floor(Math.random() * (100 - 80 + 1) + 80) : null // Mock random score 80-100
        })
      });
      const updated = await res.json();
      if (updated.success) {
        setEnrollment(updated);
        
        if (isCompleted) {
          // Stay on the same view but show completion state
        } else if (activeModuleIndex < totalModules - 1) {
          setActiveModuleIndex(curr => curr + 1);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="py-12 text-center">Loading learning content...</div>;
  if (!course || !enrollment) return null;

  const activeModule = course.modules[activeModuleIndex];
  const isLastModule = activeModuleIndex === course.modules.length - 1;

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] -mt-4 animate-in fade-in">
      {/* Header bar */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0 rounded-t-2xl">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(`/course/${course.course_id}?user=${userId}`)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-lg leading-tight line-clamp-1">{course.title}</h2>
            <div className="text-slate-400 text-xs">Module {activeModuleIndex + 1} of {course.modules.length}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-sm text-slate-300">Progress</div>
          <div className="w-24 sm:w-32 bg-slate-700 rounded-full h-2 relative">
            <div className="bg-emerald-500 h-2 rounded-full absolute left-0 top-0 transition-all duration-500" style={{ width: `${enrollment.progress}%` }}></div>
          </div>
          <div className="font-medium text-sm w-9 text-right">{enrollment.progress}%</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden rounded-b-2xl border border-t-0 border-slate-200 bg-white">
        
        {/* Sidebar */}
        <div className="w-72 border-r border-slate-200 bg-slate-50 overflow-y-auto hidden md:block shrink-0 p-4">
          <h3 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-wider">Course Modules</h3>
          <div className="space-y-2">
            {course.modules.map((m, idx) => {
              const isActive = idx === activeModuleIndex;
              const isCompleted = (idx + 1) / course.modules.length * 100 <= enrollment.progress;
              
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`w-full text-left p-3 rounded-lg border flex gap-3 transition-colors ${
                    isActive 
                      ? 'bg-white border-indigo-200 shadow-sm ring-1 ring-indigo-500' 
                      : 'border-transparent hover:bg-slate-100'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${isActive ? 'border-indigo-600 text-indigo-600' : 'border-slate-300 text-slate-400'}`}>
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>{m.title}</div>
                    <div className="text-xs text-slate-500">{m.duration}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Learning Pane */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {enrollment.status === 'completed' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Congratulations!</h2>
              <p className="text-lg text-slate-600 mb-6">You have successfully completed {course.title}</p>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-sm w-full mb-8">
                <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Final Score</div>
                <div className="text-5xl font-black text-slate-900">{enrollment.score}%</div>
              </div>
              
              <button 
                onClick={() => navigate(`/?user=${userId}`)}
                className="bg-indigo-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Return to Home
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">{activeModule.title}</h1>
                
                {/* Mock Video Player */}
                <div className="w-full aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white shadow-lg overflow-hidden relative mb-8 group">
                  <PlayCircle className="w-20 h-20 text-white/80 group-hover:text-white transition-colors group-hover:scale-110 duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-sm font-medium opacity-70">
                    <span>{activeModule.title}</span>
                    <span>{activeModule.duration}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
                </div>
                
                {/* Mock Text Content */}
                <div className="prose prose-slate max-w-none">
                  <p className="text-lg text-slate-700 leading-relaxed mb-6">{activeModule.description}</p>
                  <p className="text-slate-600 mb-4">This is a mock learning environment. In a real iGOT deployment, this area would contain SCORM packages, interactive HTML5 content, PDFs, or external video integrations provided by the course author.</p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
                    <p className="text-blue-800 text-sm m-0"><strong>Note for Prototype:</strong> Completing this module will update your progress in the Mock Database, which is accessible to the AI Platform via REST API.</p>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="bg-white border-t border-slate-200 p-4 sm:p-6 flex items-center justify-between sticky bottom-0">
                <button 
                  onClick={() => setActiveModuleIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeModuleIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <ChevronLeft className="w-5 h-5" /> Previous
                </button>
                
                <button 
                  onClick={completeModule}
                  className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
                >
                  {isLastModule ? 'Complete Course' : 'Complete Module'} <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
