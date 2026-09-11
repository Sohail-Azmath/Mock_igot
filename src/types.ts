export interface Course {
  course_id: string;
  title: string;
  description: string;
  provider: string;
  category: string;
  competencies: string[];
  level: string;
  duration_hours: number;
  language: string;
  rating: number;
  enrolled_users: number;
  status: string;
  learning_objectives: string[];
  prerequisites: string[];
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  description: string;
}

export interface User {
  user_id: string;
  name: string;
  department: string;
  designation: string;
}

export interface Enrollment {
  enrollment_id: string;
  user_id: string;
  course_id: string;
  status: 'enrolled' | 'in_progress' | 'completed';
  progress: number;
  score: number | null;
  learning_hours: number;
  completed_on: string | null;
  created_at: string;
}

export interface LearningHistoryEntry {
  course_id: string;
  course_title: string;
  status: 'enrolled' | 'in_progress' | 'completed';
  progress: number;
  score: number | null;
  learning_hours: number;
  completed_on: string | null;
}
