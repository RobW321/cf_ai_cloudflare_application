# ☁️ cf_ai_cloudflare_application

An AI-powered Study & Learning Assistant built on Cloudflare's infrastructure, featuring intelligent study tools, flashcard management, exam planning, and progress tracking.

## 🎯 Overview
This application demonstrates a full-stack AI-powered assistant leveraging:

- LLM: OpenAI GPT-4 for natural language understanding and intelligent responses
- Workflow/Coordination: Cloudflare Workers with built-in scheduling and task management
- User Interaction: Real-time chat interface via Cloudflare Pages
- Memory/State: Persistent conversation history and user data storage using the Agents framework

## Features

Study Tools
1. Flashcard Creator
  - Create and organize flashcard sets for any subject.
  - Stores flashcard sets with unique IDs
  - Organizes by subject and topic
  - Maintains card history for review

2. Study Session Timer
  - Start focused study sessions with automatic break scheduling using the Pomodoro technique.
  - Tracks active study sessions
  - Calculates optimal break times
  - Provides session end time estimates

3. Quiz Generator
  - Generate practice quizzes on any topic with customizable difficulty.
  - Adjustable difficulty levels (easy, medium, hard)
  - Configurable number of questions (1-20)
  - Unique quiz IDs for tracking

4. Study Progress Logger
  - Track your study hours, topics covered, and understanding level per subject.
  - Records study hours by subject
  - Tracks topics covered per session
  - Monitors understanding progression
  - Maintains historical study data

5. Exam Preparation Planner
  - Create personalized study plans leading up to exam dates.
  - Calculates days until exam
  - Distributes study time across subjects
  - Adapts to current knowledge level
  - Generates structured study schedules

## Prerequisites

- Cloudflare account
- OpenAI API key

## Quick Start

1. Create a new project:

```bash
npx create-cloudflare@latest --template cloudflare/agents-starter
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment:

Create a `.dev.vars` file:

```env
OPENAI_API_KEY=your_openai_api_key
```

4. Run locally:

```bash
npm start
```

5. Deploy:

```bash
npm run deploy
```

## Project Structure

```
├── src/
│   ├── app.tsx        # Chat UI implementation
│   ├── server.ts      # Chat agent logic
│   ├── tools.ts       # Tool definitions
│   ├── utils.ts       # Helper functions
│   └── styles.css     # UI styling
```


