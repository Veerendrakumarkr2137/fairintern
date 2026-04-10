# FairIntern 🎯

> An AI-powered internship marketplace that evaluates and highlights internship fairness, exposing exploitative opportunities while promoting skill-building experiences.

## 🌟 Overview

FairIntern uses advanced AI analysis to assess internship postings across multiple dimensions—stipend transparency, role clarity, work type, and task nature—to generate comprehensive fairness scores. Students can make informed decisions, while recruiters are incentivized to post transparent, fair opportunities.

## ✨ Key Features

- **AI-Driven Fairness Analysis**: Powered by Gemini API to evaluate internship descriptions
- **Comprehensive Scoring System**: Multi-dimensional fairness metrics (0-10 scale)
- **Interactive 3D Hero**: Built with React Three Fiber for engaging user experience
- **Real-time Application Tracking**: Students can submit and track their applications
- **Recruiter Dashboard**: Post and manage internship opportunities
- **Accessibility-First Design**: WCAG AA compliant for inclusive access

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React features and performance improvements
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling with custom theme
- **React Three Fiber** - 3D graphics for hero elements
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js/Express** - Server framework
- **Supabase** - Real-time database and secure authentication
- **Google Search Grounding** - For real-time internship discovery

### AI/ML
- **Gemini 2.0 Flash** (`@google/genai`) - The world's fastest AI discovery engine
- **Search Vetting** - Real-time verification of internship legitimacy

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Gemini API Key** - Get one from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Supabase Account** - For database and user management

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fairintern.git
cd fairintern
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=3000
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

## 📡 API Documentation

### Internship Endpoints

#### `GET /api/internships`
Retrieve a list of internships with fairness metadata.

**Query Parameters:**
- `limit` (optional, default: 10) - Number of results to return

**Response:**
```json
[
  {
    "id": "1",
    "title": "Software Engineering Intern",
    "company": "TechCorp",
    "location": "Bangalore, India",
    "stipend": "₹15,000/month",
    "fairnessScore": 8,
    "fairnessLabel": "Fair",
    "flags": ["Clear stipend", "Learning focused"]
  }
]
```

#### `GET /api/internships/:id`
Get detailed information for a specific internship.

**Response:**
```json
{
  "id": "1",
  "title": "Software Engineering Intern",
  "company": "TechCorp",
  "description": "Full internship description...",
  "requirements": ["React", "Node.js"],
  "analysis": {
    "stipend": "explicit",
    "work_type": "learning",
    "role_clarity": "clear",
    "task_nature": "skill-building"
  }
}
```

#### `POST /api/internships`
Create a new internship posting (recruiter only).

**Request Body:**
```json
{
  "title": "Data Science Intern",
  "company": "Analytics Inc",
  "description": "Detailed job description...",
  "stipend": "₹20,000/month",
  "location": "Remote",
  "requirements": ["Python", "Machine Learning"]
}
```

### Application Endpoints

#### `POST /api/applications/:internshipId`
Submit an application for an internship.

**Request Body:**
```json
{
  "studentId": "student123",
  "taskData": {
    "coverLetter": "I am interested...",
    "portfolio": "https://portfolio.com"
  }
}
```

### AI Analysis Endpoint

#### `POST /api/analyze`
Analyze internship text for fairness metrics.

**Request Body:**
```json
{
  "text": "We are looking for a software engineering intern to join our team. You will work on real projects, learn from senior developers, and receive a monthly stipend of ₹15,000..."
}
```

**Response:**
```json
{
  "stipend": "explicit",
  "work_type": "learning",
  "role_clarity": "clear",
  "task_nature": "skill-building",
  "fairness_score": 8,
  "fairness_label": "Fair",
  "flags": [
    "Clear stipend mentioned",
    "Learning-focused environment",
    "Mentorship opportunities"
  ]
}
```

### Fairness Score Breakdown

| Score | Label | Description |
|-------|-------|-------------|
| 8-10 | Excellent | Transparent, fair compensation, strong learning focus |
| 6-7 | Fair | Generally positive with minor concerns |
| 4-5 | Questionable | Significant red flags or missing information |
| 0-3 | Exploitative | Unpaid, unclear expectations, or production-heavy work |

## 🎨 Accessibility (WCAG AA Compliant)

FairIntern is built with accessibility as a core principle:

### Color Contrast
- All text-background combinations meet the **4.5:1 contrast ratio** minimum
- Custom Teal/Indigo palette tested for accessibility
- Support for system dark mode preferences

### Semantic HTML
- Proper heading hierarchy (`h1` → `h4`)
- Semantic elements: `<nav>`, `<main>`, `<footer>`, `<article>`
- Landmarks for screen reader navigation

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Visible focus states with `focus:ring` utilities
- Logical tab order throughout the application

### Forms & Labels
- Explicit `<label>` elements with `htmlFor` associations
- Error messages linked to form fields
- Clear input validation feedback

### ARIA Support
- Modal dialogs manage focus appropriately
- Dynamic content updates announced to screen readers
- Descriptive button and link text

## 🔧 Scripts

### Development

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build
```

### Utilities

```bash
node scripts/find_internships.js    # Fetch 5 current internship listings from India
```

This script programmatically retrieves real internship data and can be used to populate the database or test the analysis engine.

## 📁 Project Structure

```
fairintern/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Helper functions
│   │   └── App.jsx        # Main app component
│   └── index.html
├── server/                # Express backend
│   ├── routes/           # API route handlers
│   ├── middleware/       # Custom middleware
│   ├── services/         # Business logic (AI analysis)
│   └── index.js          # Server entry point
├── scripts/              # Utility scripts
│   └── find_internships.js
├── .env                  # Environment variables (not in git)
├── package.json
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style
- Run `npm run lint` before committing
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Gemini API** by Google for powering the AI analysis
- **React Three Fiber** community for 3D graphics support
- Contributors and testers who help improve internship fairness

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/fairintern/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/fairintern/discussions)
- **Email**: support@fairintern.com

## 🗺️ Roadmap

- [ ] Mobile application (React Native)
- [ ] Company verification system
- [ ] Student review platform
- [ ] Advanced ML models for deeper analysis
- [ ] Integration with job boards and university portals
- [ ] Multi-language support

---

**Built with ❤️ to make internships fair for everyone**