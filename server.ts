import express from 'express';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { createServer as createViteServer } from 'vite';
import { courses, users, enrolments, getNextEnrollmentId } from './src/server/mockData';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- Swagger Documentation ---
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Mock iGOT API",
    version: "1.0.0",
    description: "API for the Mock iGOT Karmayogi LMS integration."
  },
  paths: {
    "/api/health": {
      get: {
        summary: "Health Check",
        responses: {
          200: { description: "Service is healthy" }
        }
      }
    },
    "/api/igot/courses": {
      get: {
        summary: "Get Courses",
        parameters: [
          { in: "query", name: "competency", schema: { type: "string" } },
          { in: "query", name: "level", schema: { type: "string" } },
          { in: "query", name: "category", schema: { type: "string" } }
        ],
        responses: {
          200: { description: "List of matching courses" }
        }
      }
    },
    "/api/igot/courses/{course_id}": {
      get: {
        summary: "Get Course by ID",
        parameters: [
          { in: "path", name: "course_id", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Course details" },
          404: { description: "Course not found" }
        }
      }
    },
    "/api/igot/user/{user_id}": {
      get: {
        summary: "Get User by ID",
        parameters: [
          { in: "path", name: "user_id", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "User details" },
          404: { description: "User not found" }
        }
      }
    },
    "/api/igot/user/{user_id}/learning-history": {
      get: {
        summary: "Get User Learning History",
        parameters: [
          { in: "path", name: "user_id", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "User learning history" }
        }
      }
    },
    "/api/igot/enroll": {
      post: {
        summary: "Enroll User in Course",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user_id: { type: "string" },
                  course_id: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Successfully enrolled" }
        }
      }
    },
    "/api/igot/enrollment/{enrollment_id}": {
      get: {
        summary: "Get Enrollment",
        parameters: [
          { in: "path", name: "enrollment_id", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Enrollment details" },
          404: { description: "Enrollment not found" }
        }
      },
      patch: {
        summary: "Update Enrollment Progress",
        parameters: [
          { in: "path", name: "enrollment_id", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  progress: { type: "integer" },
                  status: { type: "string" },
                  score: { type: "integer" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Successfully updated enrollment" }
        }
      }
    }
  }
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- API Routes ---

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Mock iGOT API" });
});

app.get("/api/igot/courses", (req, res) => {
  const { competency, level, category } = req.query;
  let filteredCourses = courses;

  if (competency) {
    const compStr = String(competency).toLowerCase();
    filteredCourses = filteredCourses.filter(c => c.competencies.some(comp => comp.toLowerCase() === compStr));
  }
  if (level) {
    filteredCourses = filteredCourses.filter(c => c.level.toLowerCase() === String(level).toLowerCase());
  }
  if (category) {
    filteredCourses = filteredCourses.filter(c => c.category.toLowerCase() === String(category).toLowerCase());
  }

  res.json({ courses: filteredCourses.map(({ modules, ...rest }) => rest) });
});

app.get("/api/igot/courses/:course_id", (req, res) => {
  const course = courses.find(c => c.course_id === req.params.course_id);
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ error: "Course not found" });
  }
});

app.get("/api/igot/user/:user_id", (req, res) => {
  const user = users.find(u => u.user_id === req.params.user_id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.get("/api/igot/user/:user_id/learning-history", (req, res) => {
  const userEnrolments = enrolments.filter(e => e.user_id === req.params.user_id);
  
  const history = userEnrolments.map(e => {
    const course = courses.find(c => c.course_id === e.course_id);
    return {
      course_id: e.course_id,
      course_title: course?.title || 'Unknown Course',
      status: e.status,
      progress: e.progress,
      score: e.score,
      learning_hours: e.learning_hours,
      completed_on: e.completed_on
    };
  });

  res.json({
    user_id: req.params.user_id,
    learning_history: history
  });
});

app.post("/api/igot/enroll", (req, res) => {
  const { user_id, course_id } = req.body;
  if (!user_id || !course_id) {
    return res.status(400).json({ success: false, error: "user_id and course_id required" });
  }

  // Check if already enrolled
  const existing = enrolments.find(e => e.user_id === user_id && e.course_id === course_id);
  if (existing) {
    return res.json({ success: true, ...existing });
  }

  const newEnrolment = {
    enrollment_id: getNextEnrollmentId(),
    user_id,
    course_id,
    status: 'enrolled',
    progress: 0,
    score: null,
    learning_hours: 0,
    completed_on: null,
    created_at: new Date().toISOString().split('T')[0]
  };

  enrolments.push(newEnrolment);
  res.json({ success: true, ...newEnrolment });
});

app.get("/api/igot/enrollment/:enrollment_id", (req, res) => {
  const enrolment = enrolments.find(e => e.enrollment_id === req.params.enrollment_id);
  if (enrolment) {
    res.json(enrolment);
  } else {
    res.status(404).json({ error: "Enrollment not found" });
  }
});

app.patch("/api/igot/enrollment/:enrollment_id", (req, res) => {
  const idx = enrolments.findIndex(e => e.enrollment_id === req.params.enrollment_id);
  if (idx === -1) {
    return res.status(404).json({ error: "Enrollment not found" });
  }

  const { progress, status, score } = req.body;
  const enrolment = enrolments[idx];

  if (progress !== undefined) enrolment.progress = progress;
  if (status !== undefined) enrolment.status = status;
  if (score !== undefined) enrolment.score = score;

  if (status === 'completed' && !enrolment.completed_on) {
    enrolment.completed_on = new Date().toISOString().split('T')[0];
  }

  res.json({ success: true, ...enrolment });
});

// --- Vite Integration & Fallback ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
}

startServer();
