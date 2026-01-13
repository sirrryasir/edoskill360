export interface Question {
    question: string;
    type: "coding" | "quiz";
    difficulty: "easy" | "medium" | "hard";
}

export const questionBank: Record<string, Question[]> = {
    "UI/UX Design": [
        {
            question: "Explain the importance of 'White Space' in UI design. How does it affect user experience?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "Describe the 'F-Pattern' layout and when it should be used in web design.",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "What is the difference between specific usability testing and A/B testing?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "How do you ensure accessibility (a11y) in your color choices?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "Define 'Micro-interactions' and give three examples of where they improve UX.",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "What is a 'User Persona' and why is it critical in the design process?",
            type: "coding",
            difficulty: "easy"
        }
    ],
    "TypeScript": [
        {
            question: "Explain the difference between `interface` and `type` in TypeScript. When would you use one over the other?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "What are Generics in TypeScript? Provide a simple example of a generic function.",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "How does TypeScript handle 'Union Types' and 'Intersection Types'?",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "What is the `any` type, and why should it be avoided? what is the alternative?",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "Explain the concept of 'Type Guards' with an example.",
            type: "coding",
            difficulty: "hard"
        },
        {
            question: "What does the `readonly` modifier do in TypeScript classes or interfaces?",
            type: "coding",
            difficulty: "easy"
        }
    ],
    "JavaScript": [
        {
            question: "Explain the 'Event Loop' in JavaScript and how it handles asynchronous operations.",
            type: "coding",
            difficulty: "hard"
        },
        {
            question: "What is the difference between `var`, `let`, and `const`? Explain scope and hoisting.",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "Explain Closures in JavaScript with a code example.",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "What is the difference between `==` and `===`?",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "Explain 'Prototypal Inheritance' in JavaScript.",
            type: "coding",
            difficulty: "hard"
        }
    ],
    "Python": [
        {
            question: "Explain the difference between a List and a Tuple in Python.",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "What are Decorators in Python? Provide an example of how to create one.",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "Explain the concept of 'List Comprehensions' with an example.",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "What is the Global Interpreter Lock (GIL) and how does it affect multi-threading?",
            type: "coding",
            difficulty: "hard"
        }
    ],
    "React": [
        {
            question: "Explain the `useEffect` hook. When does it run?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "What is the Virtual DOM and how does it improve performance?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "Explain the difference between State and Props.",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "What are High Order Components (HOCs)?",
            type: "coding",
            difficulty: "hard"
        }
    ],
    "Node.js": [
        {
            question: "Explain the concept of 'Event Loop' in Node.js.",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "What is the difference between `process.nextTick()` and `setImmediate()`?",
            type: "coding",
            difficulty: "hard"
        },
        {
            question: "How do you handle error handling in asynchronous code in Node.js?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "What are Streams in Node.js? Explain the different types.",
            type: "coding",
            difficulty: "hard"
        },
        {
            question: "Explain the purpose of `package.json` file.",
            type: "coding",
            difficulty: "easy"
        }
    ],
    "Figma": [
        {
            question: "What is Auto Layout in Figma and why is it useful?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "Explain the difference between a Frame and a Group.",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "What are Components and Variants in Figma?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "How do you use Constraints to make responsive designs?",
            type: "coding",
            difficulty: "medium"
        }
    ],
    "Digital Marketing": [
        {
            question: "What is the difference between SEO and SEM?",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "Explain the concept of a 'Sales Funnel'.",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "How do you measure the ROI of a social media campaign?",
            type: "coding",
            difficulty: "hard"
        },
        {
            question: "What is A/B testing in the context of email marketing?",
            type: "coding",
            difficulty: "medium"
        }
    ],
    "SEO Optimization": [
        {
            question: "What are the key differences between On-Page and Off-Page SEO?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "Explain the importance of 'Keywords' and 'Long-tail Keywords'.",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "What is a 'Backlink' and why is it important for ranking?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "How does site speed affect SEO?",
            type: "coding",
            difficulty: "medium"
        }
    ],
    "Data Analysis": [
        {
            question: "Explain the difference between specialized Data Analysis and Data Science.",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "How do you handle missing data in a dataset?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "What is the difference between structured and unstructured data?",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "Explain the concept of 'Correlation vs. Causation'.",
            type: "coding",
            difficulty: "hard"
        }
    ],
    "Project Management": [
        {
            question: "What is the Agile methodology and how does it differ from Waterfall?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "Explain the role of a Scrum Master.",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "What is the 'Critical Path Method' (CPM)?",
            type: "coding",
            difficulty: "hard"
        },
        {
            question: "How do you handle scope creep in a project?",
            type: "coding",
            difficulty: "hard"
        }
    ],
    "Content Writing": [
        {
            question: "What are the key elements of a compelling headline?",
            type: "coding",
            difficulty: "easy"
        },
        {
            question: "How do you optimize content for SEO without keyword stuffing?",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "Explain the difference between B2B and B2C writing styles.",
            type: "coding",
            difficulty: "medium"
        },
        {
            question: "What is the 'inverted pyramid' style of writing?",
            type: "coding",
            difficulty: "medium"
        }
    ]
};

export const getQuestionsForSkill = (skillName: string, count: number = 3): Question[] => {
    // Normalize skill name matching
    const normalizedInput = skillName.toLowerCase();
    const key = Object.keys(questionBank).find(k => k.toLowerCase() === normalizedInput) || "JavaScript"; // Default to JS if not found

    const questions = questionBank[key];
    // Shuffle and slice
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
