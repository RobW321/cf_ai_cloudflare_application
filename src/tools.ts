/**
 * Tool definitions for the AI chat agent
 * Tools can either require human confirmation or execute automatically
 */
import { tool, type ToolSet, generateId } from "ai";
import { z } from "zod/v3";

import type { Chat } from "./server";
import { getCurrentAgent } from "agents";
import { scheduleSchema } from "agents/schedule";


// 1. Create Flashcard Set
const createFlashcards = tool({
  description: "Create a set of flashcards for studying a topic",
  inputSchema: z.object({
    subject: z.string(),
    topic: z.string(),
    cards: z.array(z.object({
      question: z.string(),
      answer: z.string()
    }))
  }),
  execute: async ({ subject, topic, cards }) => {
    const setId = `flashcard-${Date.now()}`;
    const { agent } = getCurrentAgent<Chat>();
    
    await agent!.saveMessages([
      ...agent!.messages,
      {
        id: generateId(),
        role: "system",
        parts: [{ type: "text", text: `Flashcard set created: ${topic}` }],
        metadata: { flashcards: { id: setId, subject, topic, cards, createdAt: new Date().toISOString() }}
      }
    ]);
    
    return `Created flashcard set "${topic}" for ${subject} with ${cards.length} cards. ID: ${setId}`;
  }
});

// 2. Study Session Timer
const startStudySession = tool({
  description: "Start a timed study session with breaks (Pomodoro technique)",
  inputSchema: z.object({
    subject: z.string(),
    durationMinutes: z.number(),
    breakMinutes: z.number().optional()
  }),
  execute: async ({ subject, durationMinutes, breakMinutes = 5 }) => {
    const sessionId = `study-${Date.now()}`;
    const endTime = new Date(Date.now() + durationMinutes * 60000).toLocaleTimeString();
    
    return `Study session started for ${subject}
Duration: ${durationMinutes} minutes
Break after: ${breakMinutes} minutes
Session ends at: ${endTime}
Session ID: ${sessionId}`;
  }
});

// 3. Quiz Generator
const generateQuiz = tool({
  description: "Generate a quiz based on study material or topic",
  inputSchema: z.object({
    topic: z.string(),
    numberOfQuestions: z.number().min(1).max(20),
    difficulty: z.enum(["easy", "medium", "hard"])
  }),
  execute: async ({ topic, numberOfQuestions, difficulty }) => {
    const quizId = `quiz-${Date.now()}`;
    
    return `Generated ${difficulty} quiz on "${topic}"
Questions: ${numberOfQuestions}
Quiz ID: ${quizId}
Ready to start the quiz!`;
  }
});

// 4. Study Progress Tracker
const logStudyProgress = tool({
  description: "Log your study progress and track hours studied per subject",
  inputSchema: z.object({
    subject: z.string(),
    hoursStudied: z.number(),
    topicsCovered: z.array(z.string()),
    understandingLevel: z.enum(["beginner", "intermediate", "advanced"])
  }),
  execute: async ({ subject, hoursStudied, topicsCovered, understandingLevel }) => {
    const { agent } = getCurrentAgent<Chat>();
    
    await agent!.saveMessages([
      ...agent!.messages,
      {
        id: generateId(),
        role: "system",
        parts: [{ type: "text", text: `Study progress logged for ${subject}` }],
        metadata: { 
          studyLog: { 
            subject, 
            hoursStudied, 
            topicsCovered, 
            understandingLevel,
            date: new Date().toISOString() 
          }
        }
      }
    ]);
    
    return `Logged ${hoursStudied} hours for ${subject}
Topics covered: ${topicsCovered.join(", ")}
Understanding level: ${understandingLevel}`;
  }
});

// 5. Exam Preparation Planner
const createExamPlan = tool({
  description: "Create a study plan leading up to an exam date",
  inputSchema: z.object({
    examName: z.string(),
    examDate: z.string(),
    subjects: z.array(z.string()),
    currentKnowledgeLevel: z.enum(["low", "medium", "high"])
  }),
  execute: async ({ examName, examDate, subjects, currentKnowledgeLevel }) => {
    const daysUntilExam = Math.ceil((new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const studyDaysPerSubject = Math.floor(daysUntilExam / subjects.length);
    
    return `Exam Preparation Plan for "${examName}"
Exam Date: ${examDate} (${daysUntilExam} days away)
Subjects: ${subjects.join(", ")}
Current level: ${currentKnowledgeLevel}
Recommended: ${studyDaysPerSubject} days per subject
Plan created successfully!`;
  }
});


/**
 * Export all available tools
 * These will be provided to the AI model to describe available capabilities
 */
export const tools = {
  createFlashcards,
  startStudySession,
  generateQuiz,
  logStudyProgress,
  createExamPlan,
} satisfies ToolSet;

/**
 * Implementation of confirmation-required tools
 * This object contains the actual logic for tools that need human approval
 * Each function here corresponds to a tool above that doesn't have an execute function
 */
export const executions = {
  getWeatherInformation: async ({ city }: { city: string }) => {
    console.log(`Getting weather information for ${city}`);
    return `The weather in ${city} is sunny`;
  }
};
