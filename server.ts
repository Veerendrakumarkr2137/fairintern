import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;

app.use(express.json());

// --- Mock Data ---
const mockInternships = [
  {
    id: "int-001",
    role: "Frontend Intern",
    company: "SparkLabs",
    stipend: "₹8,000/month",
    description: "Build UI components for an internal dashboard. Expected 20 hrs/week.",
    work_type: "learning",
    tasks: [
      { id: "t1", title: "Create a simple React component", type: "link" }
    ],
    posted_at: "2026-03-20",
    fairnessScore: 8,
    fairnessLabel: "Fair",
    flags: ["Clear stipend", "Reasonable hours", "Learning focused"]
  },
  {
    id: "int-002",
    role: "Marketing Intern",
    company: "GrowthX",
    stipend: "Unpaid",
    description: "Manage all social media accounts, create daily content, and run ad campaigns. Expected 40 hrs/week.",
    work_type: "production",
    tasks: [
      { id: "t1", title: "Submit a 1-month content calendar", type: "file" }
    ],
    posted_at: "2026-03-22",
    fairnessScore: 2,
    fairnessLabel: "Exploitative Risk",
    flags: ["Unpaid internship", "Production work (managing all accounts)", "High weekly hours (40)"]
  },
  {
    id: "int-003",
    role: "Data Science Intern",
    company: "AI Solutions",
    stipend: "₹15,000/month",
    description: "Assist in cleaning datasets and training basic models under senior supervision.",
    work_type: "learning",
    tasks: [
      { id: "t1", title: "Write a Python script to clean a CSV", type: "text" }
    ],
    posted_at: "2026-03-25",
    fairnessScore: 9,
    fairnessLabel: "Fair",
    flags: ["Good stipend", "Mentorship mentioned"]
  },
  {
    id: "int-004",
    role: "Graphic Design Intern",
    company: "Creative Agency",
    stipend: "Not listed",
    description: "Design logos and marketing materials for our clients. Must have own Adobe CC subscription.",
    work_type: "production",
    tasks: [
      { id: "t1", title: "Design 3 logo concepts", type: "file" }
    ],
    posted_at: "2026-03-28",
    fairnessScore: 4,
    fairnessLabel: "Suspicious",
    flags: ["Missing stipend", "Mandatory purchase (Adobe CC)", "Production work"]
  },
  {
    id: "int-005",
    role: "Software Engineering Intern",
    company: "TechNova",
    stipend: "₹25,000/month",
    description: "Join our core team to develop new features. You will be paired with a mentor.",
    work_type: "learning",
    tasks: [
      { id: "t1", title: "Solve a basic algorithmic problem", type: "text" }
    ],
    posted_at: "2026-04-01",
    fairnessScore: 10,
    fairnessLabel: "Fair",
    flags: ["Excellent stipend", "Clear mentorship", "Skill-building tasks"]
  },
  {
    id: "int-006",
    role: "Content Writing Intern",
    company: "Blogosphere",
    stipend: "Unpaid",
    description: "Write 5 SEO-optimized articles per week. Great for exposure.",
    work_type: "production",
    tasks: [
      { id: "t1", title: "Submit a 1000-word sample article", type: "text" }
    ],
    posted_at: "2026-04-05",
    fairnessScore: 3,
    fairnessLabel: "Exploitative Risk",
    flags: ["Unpaid internship", "Production work (5 articles/week)", "Vague 'exposure' compensation"]
  }
];

const mockSubmissions = [
  { id: "sub-001", internshipId: "int-001", studentId: "stu-1", status: "reviewed", score: 8, feedback: "Good component structure." },
  { id: "sub-002", internshipId: "int-003", studentId: "stu-1", status: "pending", score: null, feedback: null },
  { id: "sub-003", internshipId: "int-005", studentId: "stu-2", status: "accepted", score: 10, feedback: "Excellent algorithmic approach." },
  { id: "sub-004", internshipId: "int-002", studentId: "stu-3", status: "rejected", score: 4, feedback: "Content calendar lacks detail." },
  { id: "sub-005", internshipId: "int-004", studentId: "stu-1", status: "reviewed", score: 7, feedback: "Creative logos, but missing some brand guidelines." }
];

// --- API Routes ---

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/internships', (req, res) => {
  const limit = parseInt(req.query.limit as string) || 10;
  res.json(mockInternships.slice(0, limit));
});

app.get('/api/internships/:id', (req, res) => {
  const internship = mockInternships.find(i => i.id === req.params.id);
  if (internship) {
    res.json(internship);
  } else {
    res.status(404).json({ error: 'Internship not found' });
  }
});

app.get('/api/search', (req, res) => {
  // Mock search returning curated India internships
  const limit = parseInt(req.query.limit as string) || 5;
  res.json(mockInternships.slice(0, limit));
});

app.post('/api/internships', (req, res) => {
  const newInternship = {
    id: `int-00${mockInternships.length + 1}`,
    ...req.body,
    posted_at: new Date().toISOString().split('T')[0],
    fairnessScore: 5, // Mock default
    fairnessLabel: "Suspicious",
    flags: ["Pending AI analysis"]
  };
  mockInternships.push(newInternship);
  res.status(201).json(newInternship);
});

app.post('/api/applications/:internshipId', (req, res) => {
  const newSubmission = {
    id: `sub-00${mockSubmissions.length + 1}`,
    internshipId: req.params.internshipId,
    studentId: "stu-current", // Mock current user
    status: "pending",
    score: null,
    feedback: null,
    ...req.body
  };
  mockSubmissions.push(newSubmission);
  res.status(201).json(newSubmission);
});

// --- AI Analyzer Service ---
app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `Analyze the following internship description for fairness based on these criteria:
      - stipend: "explicit" (has currency), "unpaid" (explicitly says unpaid), "missing".
      - work_type: "learning" (mentions mentoring/training), "production" (shipping features/replaceable labor), "unclear".
      - role_clarity: "clear" (metrics/responsibilities defined), "vague" (generic).
      - task_nature: "skill-building" (portfolio-worthy), "exploitative" (free labor, pure data entry without mentorship), "unclear".
      
      Calculate fairness_score (0-10):
      - Start at 10.
      - If unpaid AND production-focused: -6
      - If missing stipend AND long hours implied: -4
      - If vague role: -2
      - If exploitative task: -4
      - If no task-based application mechanism mentioned: -1
      - If "mandatory purchase" or "paid training" required: -4
      - If "college credit ONLY" required: -2
      - Floor at 0, round to integer.
      
      Determine fairness_label:
      - 8-10: Fair
      - 5-7: Suspicious
      - 0-4: Exploitative Risk
      
      Provide flags as a string array of concise reasons for the score deductions.

      Internship Description:
      "${text}"
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stipend: { type: Type.STRING, description: "explicit | missing | unpaid" },
            work_type: { type: Type.STRING, description: "learning | production | unclear" },
            role_clarity: { type: Type.STRING, description: "clear | vague" },
            task_nature: { type: Type.STRING, description: "skill-building | exploitative | unclear" },
            fairness_score: { type: Type.INTEGER, description: "Int from 0 to 10" },
            fairness_label: { type: Type.STRING, description: "Fair | Suspicious | Exploitative Risk" },
            flags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "string array of concise reasons"
            }
          },
          required: ["stipend", "work_type", "role_clarity", "task_nature", "fairness_score", "fairness_label", "flags"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error) {
    console.error('Analyzer error:', error);
    res.status(500).json({ error: 'Failed to analyze internship' });
  }
});

// --- Auth Routes (Mock) ---
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = jwt.sign({ userId: 'user-1', email, role: email.includes('recruiter') ? 'recruiter' : 'student' }, JWT_SECRET);
    res.json({ token, user: { email, role: email.includes('recruiter') ? 'recruiter' : 'student' } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, role } = req.body;
  const token = jwt.sign({ userId: 'user-new', email, role }, JWT_SECRET);
  res.json({ token, user: { email, role } });
});

app.get('/api/auth/google/url', (req, res) => {
  // Mock Google OAuth URL
  res.json({ url: `${process.env.APP_URL || 'http://localhost:3000'}/auth/callback?code=mock-google-code` });
});

app.get('/auth/callback', (req, res) => {
  res.send(`
    <html>
      <body>
        <script>
          if (window.opener) {
            window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', token: 'mock-google-token' }, '*');
            window.close();
          } else {
            window.location.href = '/';
          }
        </script>
        <p>Authentication successful. This window should close automatically.</p>
      </body>
    </html>
  `);
});


async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
