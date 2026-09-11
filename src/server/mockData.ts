export const users = [
  {
    user_id: 'EMP-1001',
    name: 'Demo Statistical Officer',
    department: 'MoSPI',
    designation: 'Statistical Officer'
  },
  {
    user_id: 'EMP-1002',
    name: 'Jane Doe',
    department: 'NSSO',
    designation: 'Field Investigator'
  },
  {
    user_id: 'EMP-1003',
    name: 'Raj Kumar',
    department: 'MoSPI',
    designation: 'Director'
  }
];

export const courses = [
  {
    course_id: "IGOT-001",
    title: "Python for Data Analysis",
    description: "Learn Python-based techniques for analysing statistical datasets.",
    provider: "iGOT Karmayogi",
    category: "Technical Competency",
    competencies: ["Python", "Data Analysis", "Data Visualization"],
    level: "Intermediate",
    duration_hours: 12,
    language: "English",
    rating: 4.5,
    enrolled_users: 1250,
    status: "active",
    learning_objectives: [
      "Understand Python fundamentals",
      "Clean statistical datasets",
      "Perform data analysis",
      "Create visualizations"
    ],
    prerequisites: ["Basic programming knowledge"],
    modules: [
      { id: "M1", title: "Introduction to Python", duration: "2 hours", description: "Basics of Python programming." },
      { id: "M2", title: "Python Fundamentals", duration: "2 hours", description: "Variables, loops, and functions." },
      { id: "M3", title: "Working with Data", duration: "3 hours", description: "DataFrames, Data cleaning, Missing values." },
      { id: "M4", title: "Statistical Analysis", duration: "3 hours", description: "Descriptive statistics using Python." },
      { id: "M5", title: "Data Visualization", duration: "2 hours", description: "Plotting with matplotlib and seaborn." }
    ]
  },
  {
    course_id: "IGOT-002",
    title: "R Programming for Statisticians",
    description: "Master R programming for advanced statistical modeling.",
    provider: "iGOT Karmayogi",
    category: "Technical Competency",
    competencies: ["R Programming", "Statistical Computing", "Data Analysis"],
    level: "Advanced",
    duration_hours: 15,
    language: "English",
    rating: 4.7,
    enrolled_users: 850,
    status: "active",
    learning_objectives: ["Master R syntax", "Statistical modeling in R", "Data manipulation"],
    prerequisites: ["Statistics background"],
    modules: [
      { id: "M1", title: "Introduction to R", duration: "3 hours", description: "Getting started with R." },
      { id: "M2", title: "Data Wrangling", duration: "4 hours", description: "Using dplyr and tidyr." },
      { id: "M3", title: "Statistical Models", duration: "8 hours", description: "Linear and logistic regression." }
    ]
  },
  {
    course_id: "IGOT-003",
    title: "SQL for Statistical Applications",
    description: "Essential SQL skills for querying large national datasets.",
    provider: "iGOT Karmayogi",
    category: "Technical Competency",
    competencies: ["SQL", "Data Analysis"],
    level: "Beginner",
    duration_hours: 8,
    language: "English",
    rating: 4.6,
    enrolled_users: 2100,
    status: "active",
    learning_objectives: ["Write SQL queries", "Joins and aggregations", "Database management"],
    prerequisites: ["None"],
    modules: [
      { id: "M1", title: "SQL Basics", duration: "2 hours", description: "SELECT statements and filtering." },
      { id: "M2", title: "Joins and Grouping", duration: "3 hours", description: "Combining data from multiple tables." },
      { id: "M3", title: "Advanced SQL", duration: "3 hours", description: "Window functions and subqueries." }
    ]
  },
  {
    course_id: "IGOT-004",
    title: "Data Visualization Techniques",
    description: "Learn to present statistical findings clearly and effectively.",
    provider: "iGOT Karmayogi",
    category: "Technical Competency",
    competencies: ["Data Visualization", "Communication"],
    level: "Intermediate",
    duration_hours: 6,
    language: "English",
    rating: 4.8,
    enrolled_users: 1540,
    status: "active",
    learning_objectives: ["Principles of visual design", "Creating dashboards", "Effective communication"],
    prerequisites: ["Basic Data Analysis"],
    modules: [
      { id: "M1", title: "Design Principles", duration: "2 hours", description: "Choosing the right chart." },
      { id: "M2", title: "Building Dashboards", duration: "4 hours", description: "Interactive data presentation." }
    ]
  },
  {
    course_id: "IGOT-005",
    title: "Survey Design Methodology",
    description: "Best practices for designing national surveys.",
    provider: "MoSPI",
    category: "Statistical Competency",
    competencies: ["Survey Design", "Sampling Techniques"],
    level: "Advanced",
    duration_hours: 10,
    language: "English",
    rating: 4.9,
    enrolled_users: 600,
    status: "active",
    learning_objectives: ["Questionnaire design", "Survey sampling methods"],
    prerequisites: ["Basic Statistics"],
    modules: [
      { id: "M1", title: "Questionnaire Design", duration: "4 hours", description: "Creating effective questions." },
      { id: "M2", title: "Sampling Methods", duration: "6 hours", description: "Stratified and cluster sampling." }
    ]
  },
  {
    course_id: "IGOT-006",
    title: "National Accounts Framework",
    description: "Understanding the system of national accounts (SNA).",
    provider: "MoSPI",
    category: "Statistical Competency",
    competencies: ["National Accounts", "Macroeconomics"],
    level: "Advanced",
    duration_hours: 20,
    language: "English",
    rating: 4.4,
    enrolled_users: 900,
    status: "active",
    learning_objectives: ["Understand SNA 2008", "GDP calculation methods"],
    prerequisites: ["Economics background"],
    modules: [
      { id: "M1", title: "Intro to SNA", duration: "5 hours", description: "Basic concepts." },
      { id: "M2", title: "GDP Calculation", duration: "15 hours", description: "Production, Income, and Expenditure approaches." }
    ]
  },
  {
    course_id: "IGOT-007",
    title: "Python for Statistical Computing",
    description: "A specialized course on using Python for rigorous statistical computing.",
    provider: "iGOT Karmayogi",
    category: "Technical Competency",
    competencies: ["Python", "Statistical Computing"],
    level: "Intermediate",
    duration_hours: 10,
    language: "English",
    rating: 4.3,
    enrolled_users: 1100,
    status: "active",
    learning_objectives: ["SciPy", "Statsmodels", "Hypothesis testing"],
    prerequisites: ["Python for Data Analysis"],
    modules: [
      { id: "M1", title: "SciPy Basics", duration: "3 hours", description: "Scientific computing." },
      { id: "M2", title: "Statsmodels", duration: "7 hours", description: "Statistical modeling in Python." }
    ]
  },
  {
    course_id: "IGOT-008",
    title: "Introduction to Data Quality",
    description: "Frameworks for ensuring high quality in statistical data.",
    provider: "MoSPI",
    category: "Statistical Competency",
    competencies: ["Data Quality Frameworks", "Metadata Standards"],
    level: "Beginner",
    duration_hours: 5,
    language: "English",
    rating: 4.6,
    enrolled_users: 3200,
    status: "active",
    learning_objectives: ["Understand data quality dimensions", "Implement quality checks"],
    prerequisites: ["None"],
    modules: [
      { id: "M1", title: "Quality Dimensions", duration: "2 hours", description: "Accuracy, timeliness, relevance." },
      { id: "M2", title: "Quality Assurance", duration: "3 hours", description: "Methods for ensuring quality." }
    ]
  },
  {
    course_id: "IGOT-009",
    title: "Statistical Data Analysis",
    description: "Core concepts of statistical analysis for government officers.",
    provider: "MoSPI",
    category: "Statistical Competency",
    competencies: ["Data Analysis", "Statistics"],
    level: "Intermediate",
    duration_hours: 14,
    language: "English",
    rating: 4.7,
    enrolled_users: 4500,
    status: "active",
    learning_objectives: ["Descriptive statistics", "Inferential statistics"],
    prerequisites: ["Basic math"],
    modules: [
      { id: "M1", title: "Descriptive Stats", duration: "5 hours", description: "Mean, median, variance." },
      { id: "M2", title: "Inferential Stats", duration: "9 hours", description: "Hypothesis testing, confidence intervals." }
    ]
  },
  {
    course_id: "IGOT-010",
    title: "Leadership in Government",
    description: "Developing leadership skills for public administrators.",
    provider: "DoPT",
    category: "Behavioural and Managerial",
    competencies: ["Leadership", "Decision Making"],
    level: "Intermediate",
    duration_hours: 8,
    language: "English",
    rating: 4.9,
    enrolled_users: 12000,
    status: "active",
    learning_objectives: ["Team management", "Strategic decision making"],
    prerequisites: ["None"],
    modules: [
      { id: "M1", title: "Public Sector Leadership", duration: "4 hours", description: "Unique challenges in government." },
      { id: "M2", title: "Strategic Planning", duration: "4 hours", description: "Setting goals and executing." }
    ]
  },
  {
    course_id: "IGOT-011",
    title: "Cybersecurity Basics",
    description: "Essential cybersecurity awareness for government officials.",
    provider: "MeitY",
    category: "Digital Governance",
    competencies: ["Cybersecurity", "Data Privacy"],
    level: "Beginner",
    duration_hours: 4,
    language: "English",
    rating: 4.5,
    enrolled_users: 25000,
    status: "active",
    learning_objectives: ["Identify phishing", "Secure data handling"],
    prerequisites: ["None"],
    modules: [
      { id: "M1", title: "Threat Landscape", duration: "2 hours", description: "Common cyber threats." },
      { id: "M2", title: "Best Practices", duration: "2 hours", description: "Passwords, 2FA, data protection." }
    ]
  },
  {
    course_id: "IGOT-012",
    title: "Agricultural Statistics Methodology",
    description: "Methods for collecting and analyzing agricultural data.",
    provider: "MoA",
    category: "Statistical Competency",
    competencies: ["Agricultural Statistics", "Survey Design"],
    level: "Advanced",
    duration_hours: 12,
    language: "English",
    rating: 4.2,
    enrolled_users: 800,
    status: "active",
    learning_objectives: ["Crop estimation", "Livestock census methods"],
    prerequisites: ["Basic Statistics"],
    modules: [
      { id: "M1", title: "Crop Area Estimation", duration: "6 hours", description: "Remote sensing and surveys." },
      { id: "M2", title: "Yield Estimation", duration: "6 hours", description: "Crop cutting experiments." }
    ]
  }
];

// Additional mock courses to meet the 25-30 requirement
for (let i = 13; i <= 25; i++) {
  courses.push({
    course_id: `IGOT-0${i < 100 ? i.toString().padStart(2, '0') : i}`,
    title: `Advanced Topic ${i} in Statistics`,
    description: `A specialized module covering advanced topic ${i} for statisticians.`,
    provider: "iGOT Karmayogi",
    category: i % 2 === 0 ? "Statistical Competency" : "Technical Competency",
    competencies: ["Statistics", "Data Analysis"],
    level: i % 3 === 0 ? "Advanced" : "Intermediate",
    duration_hours: 4 + (i % 5) * 2,
    language: "English",
    rating: 4.0 + (i % 10) / 10,
    enrolled_users: 100 + i * 15,
    status: "active",
    learning_objectives: ["Master specific domain knowledge", "Apply techniques practically"],
    prerequisites: ["Basic concepts"],
    modules: [
      { id: "M1", title: "Introduction", duration: "2 hours", description: "Overview of the topic." },
      { id: "M2", title: "Deep Dive", duration: "4 hours", description: "In-depth analysis." }
    ]
  });
}

// In-memory store for enrolments
export const enrolments = [
  {
    enrollment_id: 'ENR-1001',
    user_id: 'EMP-1001',
    course_id: 'IGOT-009', // Statistical Data Analysis
    status: 'completed',
    progress: 100,
    score: 87,
    learning_hours: 14,
    completed_on: '2026-09-11',
    created_at: '2026-08-01'
  },
  {
    enrollment_id: 'ENR-1002',
    user_id: 'EMP-1001',
    course_id: 'IGOT-008', // Introduction to Data Quality
    status: 'completed',
    progress: 100,
    score: 91,
    learning_hours: 5,
    completed_on: '2026-08-15',
    created_at: '2026-07-20'
  },
  {
    enrollment_id: 'ENR-1003',
    user_id: 'EMP-1001',
    course_id: 'IGOT-001', // Python for Data Analysis
    status: 'in_progress',
    progress: 65,
    score: null,
    learning_hours: 8,
    completed_on: null,
    created_at: '2026-09-01'
  },
  {
    enrollment_id: 'ENR-1004',
    user_id: 'EMP-1001',
    course_id: 'IGOT-004', // Data Visualization Techniques
    status: 'enrolled',
    progress: 0,
    score: null,
    learning_hours: 0,
    completed_on: null,
    created_at: '2026-09-10'
  }
];

export let nextEnrollmentId = 5000;
export const getNextEnrollmentId = () => `ENR-${++nextEnrollmentId}`;
