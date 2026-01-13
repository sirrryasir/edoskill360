"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useTaskStore, Task } from "@/store/useTaskStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { submitTask } = useTaskStore();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [taskType, setTaskType] = useState<"static" | "ai-generated">("static");

  // AI State
  const [aiQuestions, setAiQuestions] = useState<any[]>([]);
  const [resultId, setResultId] = useState<string | null>(null);
  const [aiAnswers, setAiAnswers] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Static Quiz State
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const [result, setResult] = useState<any>(null);

  // 1. Load initial task metadata (no questions yet)
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`);
        if (res.ok) {
          const data = await res.json();
          setTask(data);
          setTaskType(data.type || "static");
        } else {
          console.error("Task not found");
        }
      } catch (error) {
        console.error("Failed to load task", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  // 2. Start Assessment
  const handleStart = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/tasks/${id}/start`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setStarted(true);
        setResultId(data.resultId);

        if (data.type === 'ai-generated') {
          // Handle new array structure or legacy single object
          const questions = data.generatedQuestion.questions || [data.generatedQuestion];
          setAiQuestions(questions);
          setAiAnswers(new Array(questions.length).fill(""));
          setTaskType('ai-generated');
        } else {
          setQuizQuestions(data.questions);
          setTaskType('static');
        }
      } else {
        alert("Failed to start assessment");
      }
    } catch (e) {
      console.error(e);
      alert("Error starting assessment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionSelect = (qIndex: number, optIndex: number) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleAiAnswerChange = (index: number, val: string) => {
    const newAnswers = [...aiAnswers];
    newAnswers[index] = val;
    setAiAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!task) return;
    setIsSubmitting(true);

    try {
      if (taskType === 'ai-generated') {
        const hasEmpty = aiAnswers.some(a => !a.trim());
        if (hasEmpty) return alert("Please answer all questions");

        const res = await fetch('/api/tasks/submit-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resultId, answers: aiAnswers })
        });

        const data = await res.json();
        setResult({ ...data, maxScore: task.maxScore });
      } else {
        // Static Quiz
        const formattedAnswers = Object.entries(answers).map(([qIdx, optIdx]) => ({
          questionIndex: Number(qIdx),
          selectedOption: optIdx,
        }));

        if (formattedAnswers.length !== quizQuestions.length) {
          alert("Please answer all questions");
          setIsSubmitting(false);
          return;
        }

        const res = await submitTask(task._id, formattedAnswers);
        setResult(res);
      }
    } catch (error) {
      alert("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading assessment...</div>;
  if (!task)
    return <div className="p-10 text-center text-red-500">Task not found</div>;

  // Render Result
  if (result) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card
          className={
            result.passed
              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
              : "border-red-500 bg-red-50 dark:bg-red-900/20"
          }
        >
          <CardHeader>
            <CardTitle
              className={result.passed ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}
            >
              {result.passed ? "Assessment Passed! 🎉" : "Assessment Failed"}
            </CardTitle>
            <CardDescription>
              You scored {result.score} out of {task.maxScore || 100}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm md:text-base">
              {result.passed
                ? "Congratulations! This skill has been verified on your profile."
                : "Don't worry, you can try again later to verify this skill."}
            </p>

            {result.feedback && (
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold mb-2">Feedback:</h4>
                <p className="text-slate-600 dark:text-slate-300 italic text-sm whitespace-pre-line">{result.feedback}</p>
              </div>
            )}

            <Button onClick={() => router.push("/dashboard/worker?tab=verification")} className="w-full">
              Return to Verification
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render Start Screen
  if (!started) {
    return (
      <div className="container mx-auto p-6 max-w-2xl mt-10">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{task.title}</CardTitle>
                <CardDescription className="mt-2">{task.description}</CardDescription>
              </div>
              <Badge variant={task.type === 'ai-generated' ? 'default' : 'secondary'}>
                {task.type === 'ai-generated' ? 'AI Assessment' : 'Standard Quiz'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded">
                <span className="text-slate-500 block">Difficulty</span>
                <span className="font-semibold capitalize">{task.difficulty}</span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded">
                <span className="text-slate-500 block">Time Limit</span>
                <span className="font-semibold">{task.timeLimit} mins</span>
              </div>
            </div>
            {task.type === 'ai-generated' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border border-blue-100 dark:border-blue-900 text-blue-800 dark:text-blue-300 text-sm">
                <strong>Note:</strong> This assessment consists of 3 unique, AI-generated questions. You must answer all of them to complete the validaton.
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={handleStart} disabled={isSubmitting}>
              {isSubmitting ? "Starting..." : "Start Assessment"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Render Active Assessment
  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border">
        <h1 className="text-xl font-bold">{task.title}</h1>
        <Badge variant="outline">Timer: {task.timeLimit}:00</Badge>
      </div>

      {taskType === 'ai-generated' && aiQuestions.length > 0 ? (
        <div className="space-y-6">
          {aiQuestions.map((q, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-lg">Question {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border">
                  <p className="whitespace-pre-wrap font-medium">{q.question}</p>
                </div>

                <div className="space-y-2">
                  <Label>Your Answer</Label>
                  <Textarea
                    placeholder="Type your answer here..."
                    className="min-h-[150px] font-mono"
                    value={aiAnswers[idx] || ""}
                    onChange={(e) => handleAiAnswerChange(idx, e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {quizQuestions.map((q, qIdx) => (
            <Card key={qIdx}>
              <CardHeader>
                <CardTitle className="text-lg">Question {qIdx + 1}</CardTitle>
                <CardDescription className="text-base text-gray-900 dark:text-gray-100 font-medium mt-2">
                  {q.question}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {q.options.map((opt: string, optIdx: number) => (
                    <div
                      key={optIdx}
                      className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${answers[qIdx] === optIdx
                        ? "border-primary bg-primary/5 dark:bg-primary/20"
                        : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      onClick={() => handleOptionSelect(qIdx, optIdx)}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers[qIdx] === optIdx
                          ? "border-primary bg-primary"
                          : "border-gray-300"
                          }`}
                      >
                        {answers[qIdx] === optIdx && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <Label className="cursor-pointer flex-1">{opt}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-end pt-4 pb-10">
        <Button size="lg" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Assessment"}
        </Button>
      </div>
    </div>
  );
}
