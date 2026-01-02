"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useTaskStore, Task } from "@/store/useTaskStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { submitTask } = useTaskStore();
  const [task, setTask] = useState<Task | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`);
        if (res.ok) {
          const data = await res.json();
          setTask(data);
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

  const handleOptionSelect = (qIndex: number, optIndex: number) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmit = async () => {
    if (!task) return;

    // Format answers for API
    const formattedAnswers = Object.entries(answers).map(([qIdx, optIdx]) => ({
      questionIndex: Number(qIdx),
      selectedOption: optIdx,
    }));

    if (formattedAnswers.length !== task.questions.length) {
      alert("Please answer all questions");
      return;
    }

    try {
      const res = await submitTask(task._id, formattedAnswers);
      setResult(res);
    } catch (error) {
      alert("Submission failed");
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading assessment...</div>;
  if (!task)
    return <div className="p-10 text-center text-red-500">Task not found</div>;

  if (result) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <Card
          className={
            result.passed
              ? "border-green-500 bg-green-50"
              : "border-red-500 bg-red-50"
          }
        >
          <CardHeader>
            <CardTitle
              className={result.passed ? "text-green-700" : "text-red-700"}
            >
              {result.passed ? "Assessment Passed!" : "Assessment Failed"}
            </CardTitle>
            <CardDescription>
              You scored {result.score} out of {result.maxScore}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              {result.passed
                ? "Congratulations! This skill has been verified on your profile."
                : "Don't worry, you can try again later to verify this skill."}
            </p>
            <Button onClick={() => router.push("/dashboard/worker")}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{task.title}</h1>
        <p className="text-gray-500">{task.description}</p>
        <div className="flex gap-4 text-sm font-medium">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
            {task.difficulty}
          </span>
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
            Time: {task.timeLimit} mins
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {task.questions.map((q, qIdx) => (
          <Card key={qIdx}>
            <CardHeader>
              <CardTitle className="text-lg">Question {qIdx + 1}</CardTitle>
              <CardDescription className="text-base text-gray-900 font-medium mt-2">
                {q.question}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {q.options.map((opt, optIdx) => (
                  <div
                    key={optIdx}
                    className="flex items-center space-x-2 p-2 rounded hover:bg-slate-50 cursor-pointer"
                    onClick={() => handleOptionSelect(qIdx, optIdx)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        answers[qIdx] === optIdx
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

      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={handleSubmit}>
          Submit Assessment
        </Button>
      </div>
    </div>
  );
}
