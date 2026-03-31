/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Clock, 
  Calendar, 
  Code, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Layout, 
  Menu, 
  X,
  ArrowRight,
  Info,
  Zap,
  BarChart3,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---
interface Question {
  id: string;
  priority: "HIGH" | "MEDIUM" | "LOW" | "MUST PREPARE" | "VERY LIKELY" | "BEST BET";
  marks: number;
  years: string[];
  question: string;
  answer: {
    definition?: string;
    explanation?: string;
    algorithm?: string[];
    pseudocode?: string;
    code?: string;
    complexity?: string;
    example?: string;
    diagram?: string;
    prosCons?: { pros: string[]; cons: string[] };
    comparison?: { title: string; points: { key: string; val1: string; val2: string }[] };
    examTip?: string;
  };
}

interface Unit {
  id: string;
  title: string;
  hours: number;
  summary: string;
  questions: Question[];
}

// --- Data ---
const UNITS: Unit[] = [
  {
    id: "unit1",
    title: "Unit 1: Introduction to DSA & Algorithm Analysis",
    hours: 7,
    summary: "Covers core concepts of ADT, algorithm characteristics, time/space complexity, and asymptotic notations.",
    questions: [
      {
        id: "u1-q1",
        priority: "MUST PREPARE",
        marks: 7,
        years: ["2025", "2024 Spring", "2022"],
        question: "Define ADT (Abstract Data Type). Explain why it is needed and list different types of data structures with examples.",
        answer: {
          definition: "An Abstract Data Type (ADT) is a mathematical model for data types where the data type is defined by its behavior (semantics) from the point of view of a user of the data, specifically in terms of possible values, possible operations on data of this type, and the behavior of these operations.",
          explanation: "ADT is needed because it provides a clear separation between the logical properties of data and its physical implementation. This abstraction allows programmers to focus on 'what' the data does rather than 'how' it is stored.",
          example: "Examples of ADTs include Stack, Queue, and List. For instance, a Stack ADT defines operations like push() and pop() without specifying if it's implemented using an array or a linked list.",
          diagram: `
Linear Data Structures: Array, Stack, Queue, Linked List
Non-Linear Data Structures: Tree, Graph
          `,
          examTip: "Always mention that ADT defines 'what' to do, while Data Structure defines 'how' to do it."
        }
      },
      {
        id: "u1-q2",
        priority: "HIGH",
        marks: 8,
        years: ["2025", "2024 Spring", "2023", "2022"],
        question: "What is Time Complexity and Space Complexity? Explain different types of asymptotic notations with proper diagrams.",
        answer: {
          explanation: "Time Complexity is the amount of time an algorithm takes to run as a function of the length of the input. Space Complexity is the amount of memory space required by the algorithm in its life cycle.",
          algorithm: [
            "Big O (O): Represents the upper bound (Worst Case).",
            "Omega (Ω): Represents the lower bound (Best Case).",
            "Theta (Θ): Represents the tight bound (Average Case)."
          ],
          diagram: `
f(n) = O(g(n))  => f(n) <= c * g(n) for n >= n0
f(n) = Ω(g(n))  => f(n) >= c * g(n) for n >= n0
f(n) = Θ(g(n))  => c1*g(n) <= f(n) <= c2*g(n)
          `,
          examTip: "Draw the graph showing n vs Time for each notation to score full marks."
        }
      }
    ]
  },
  {
    id: "unit2",
    title: "Unit 2: Stack, Queues and Recursion",
    hours: 8,
    summary: "Focuses on linear data structures with restricted access and the concept of self-referential functions.",
    questions: [
      {
        id: "u2-q1",
        priority: "HIGH",
        marks: 8,
        years: ["2025", "2024 Spring", "2022"],
        question: "Write a complete program in C/C++ to demonstrate push and pop operation in a Stack using Linked list.",
        answer: {
          code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

Node* top = NULL;

void push(int val) {
    Node* newNode = new Node();
    newNode->data = val;
    newNode->next = top;
    top = newNode;
    cout << "Pushed: " << val << endl;
}

void pop() {
    if (top == NULL) {
        cout << "Stack Underflow" << endl;
        return;
    }
    Node* temp = top;
    top = top->next;
    cout << "Popped: " << temp->data << endl;
    delete temp;
}

int main() {
    push(10); push(20);
    pop();
    return 0;
}`,
          examTip: "In Linked List implementation, 'Stack Overflow' is rare unless memory is full. Always check for 'Stack Underflow' in pop()."
        }
      },
      {
        id: "u2-q2",
        priority: "VERY LIKELY",
        marks: 7,
        years: ["2025", "2024 Spring", "2022"],
        question: "Why do you need an expression in postfix? Convert the following expression into postfix: ((A + B) - C * (D / E)) + F",
        answer: {
          explanation: "Postfix notation (Reverse Polish Notation) is needed because it eliminates the need for parentheses and operator precedence rules during evaluation, making it easier for computers to process using a stack.",
          example: "Expression: ((A + B) - C * (D / E)) + F\n1. (A + B) -> AB+\n2. (D / E) -> DE/\n3. C * (DE/) -> CDE/*\n4. (AB+) - (CDE/*) -> AB+CDE/*-\n5. (AB+CDE/*-) + F -> AB+CDE/*-F+",
          examTip: "Show the step-by-step stack status table for full marks in conversion questions."
        }
      },
      {
        id: "u2-q3",
        priority: "HIGH",
        marks: 8,
        years: ["2025", "2024 Fall", "2023"],
        question: "What is a circular queue? Explain with algorithm how insertion and deletion are performed in circular queue using array.",
        answer: {
          definition: "A circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle and the last position is connected back to the first position to make a circle.",
          algorithm: [
            "Enqueue: If (rear+1)%size == front, Queue is Full. Else, rear = (rear+1)%size; arr[rear] = val;",
            "Dequeue: If front == -1, Queue is Empty. Else, val = arr[front]; if (front == rear) front = rear = -1; else front = (front+1)%size;"
          ],
          examTip: "Mention that circular queues solve the problem of unused space in simple array-based queues."
        }
      }
    ]
  },
  {
    id: "unit3",
    title: "Unit 3: Linked List",
    hours: 8,
    summary: "Dynamic memory allocation using nodes. Covers Singly, Doubly, and Circular Linked Lists.",
    questions: [
      {
        id: "u3-q1",
        priority: "MUST PREPARE",
        marks: 8,
        years: ["2025", "2023"],
        question: "Define singly LinkedList. Write a function in C or Java to delete a node at the beginning and at the end of singly linked list.",
        answer: {
          definition: "A singly linked list is a collection of nodes where each node contains data and a pointer to the next node in the sequence.",
          code: `void deleteAtBeginning() {
    if (head == NULL) return;
    Node* temp = head;
    head = head->next;
    free(temp);
}

void deleteAtEnd() {
    if (head == NULL) return;
    if (head->next == NULL) {
        free(head); head = NULL; return;
    }
    Node* temp = head;
    while (temp->next->next != NULL) temp = temp->next;
    free(temp->next);
    temp->next = NULL;
}`,
          examTip: "Don't forget to handle the 'Empty List' and 'Single Node List' cases."
        }
      },
      {
        id: "u3-q2",
        priority: "HIGH",
        marks: 8,
        years: ["2024 Fall"],
        question: "Define Doubly Linked-list. Write a complete function in C or Java to insert a node at the beginning of singly linked list.",
        answer: {
          definition: "A doubly linked list is a complex type of linked list in which a node contains a pointer to the previous as well as the next node in the sequence.",
          explanation: "Each node consists of three parts: data, a pointer to the next node, and a pointer to the previous node.",
          code: `struct Node {
    int data;
    Node* next;
    Node* prev;
};

void insertAtBeginning(int val) {
    Node* newNode = new Node();
    newNode->data = val;
    newNode->next = head;
    newNode->prev = NULL;
    if (head != NULL) head->prev = newNode;
    head = newNode;
}`,
          examTip: "In Doubly Linked List, always update both 'next' and 'prev' pointers to maintain consistency."
        }
      }
    ]
  },
  {
    id: "unit4",
    title: "Unit 4: Trees",
    hours: 8,
    summary: "Non-linear data structures. Binary Trees, BST, AVL, and Huffman coding.",
    questions: [
      {
        id: "u4-q1",
        priority: "HIGH",
        marks: 7,
        years: ["2025", "2024 Spring", "2023"],
        question: "How does an AVL tree solve the issues of Binary Search Tree? Construct an AVL Tree from the following Data: 22, 27, 31, 10, 5, 16, 29, 19, 11, 3, 4, 8.",
        answer: {
          explanation: "A standard BST can become skewed (like a linked list) in the worst case, leading to O(n) search time. AVL trees solve this by maintaining a balance factor (height difference between left and right subtrees) of -1, 0, or 1 for every node, ensuring O(log n) performance.",
          algorithm: [
            "Perform standard BST insertion.",
            "Update heights and check balance factor.",
            "If unbalanced, perform rotations: LL, RR, LR, or RL."
          ],
          examTip: "In the construction process, show the tree after each insertion that causes an imbalance and label the rotation used."
        }
      },
      {
        id: "u4-q2",
        priority: "VERY LIKELY",
        marks: 8,
        years: ["2025", "2024 Fall", "2022"],
        question: "How do you traverse a Binary tree? Perform In-order, Pre-order and Post-order traversal of a given tree.",
        answer: {
          algorithm: [
            "Pre-order: Root -> Left -> Right",
            "In-order: Left -> Root -> Right",
            "Post-order: Left -> Right -> Root"
          ],
          example: "For a tree with Root(F), Left(B), Right(G):\nPre: F, B, G\nIn: B, F, G\nPost: B, G, F",
          examTip: "In-order traversal of a BST always gives sorted output. Use this to verify your answer."
        }
      },
      {
        id: "u4-q3",
        priority: "BEST BET",
        marks: 8,
        years: ["2025", "2024 Fall"],
        question: "How do you construct a Huffman tree? Explain with an example.",
        answer: {
          explanation: "Huffman coding is a lossless data compression algorithm. The idea is to assign variable-length codes to input characters, lengths of the assigned codes are based on the frequencies of corresponding characters.",
          algorithm: [
            "Create a leaf node for each unique character and build a min heap of all leaf nodes.",
            "Extract two nodes with the minimum frequency from the min heap.",
            "Create a new internal node with a frequency equal to the sum of the two nodes frequencies.",
            "Add this node to the min heap.",
            "Repeat until only one node remains (the root)."
          ],
          example: "Chars: A(5), B(9), C(12), D(13), E(16), F(45)\n1. Combine A, B -> Node(14)\n2. Combine C, D -> Node(25)\n3. Combine Node(14), Node(25) -> Node(39)\n4. Combine E, Node(39) -> Node(55)\n5. Combine F, Node(55) -> Root(100)",
          examTip: "Assign '0' to left branches and '1' to right branches to generate the final binary codes."
        }
      }
    ]
  },
  {
    id: "unit5",
    title: "Unit 5: Sorting",
    hours: 6,
    summary: "Techniques to arrange data in specific order. Includes Quick, Merge, and Heap sort.",
    questions: [
      {
        id: "u5-q1",
        priority: "HIGH",
        marks: 8,
        years: ["2025", "2024 Fall", "2022"],
        question: "Define external and internal sorting. Perform a quicksort algorithm on the following array of numbers: 68, 34, 21, 43, 7, 18, 8, 56, 28, 17.",
        answer: {
          definition: "Internal sorting happens when all data is in RAM. External sorting is used when data is too large for RAM and resides on disk (e.g., Merge Sort).",
          algorithm: [
            "Pick a pivot element (usually last or first).",
            "Partition the array such that elements < pivot are on left, and > pivot are on right.",
            "Recursively apply to sub-arrays."
          ],
          complexity: "Best/Avg: O(n log n), Worst: O(n²)",
          examTip: "Always show the partitioning steps clearly. Quicksort is the most repeated sorting algorithm."
        }
      },
      {
        id: "u5-q2",
        priority: "MEDIUM",
        marks: 8,
        years: ["2022"],
        question: "Explain divide and conquer strategy is used to sort a list of data using Merge sort.",
        answer: {
          explanation: "Merge sort is a divide-and-conquer algorithm that was invented by John von Neumann in 1945. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
          algorithm: [
            "Divide: Find the middle point to divide the array into two halves.",
            "Conquer: Recursively call mergeSort for both halves.",
            "Combine: Merge the two halves sorted in step 2."
          ],
          complexity: "Time: O(n log n) in all cases. Space: O(n).",
          examTip: "Merge sort is stable and preferred for sorting linked lists."
        }
      }
    ]
  },
  {
    id: "unit6",
    title: "Unit 6: Searching Algorithm and Hashing",
    hours: 4,
    summary: "Efficient data retrieval. Hash tables and collision resolution techniques.",
    questions: [
      {
        id: "u6-q1",
        priority: "MUST PREPARE",
        marks: 8,
        years: ["2025", "2024 Fall", "2023", "2022"],
        question: "What is a collision in hashing? Describe any three techniques to resolve the collision.",
        answer: {
          definition: "Collision occurs when two different keys result in the same hash index.",
          explanation: "Techniques:\n1. Separate Chaining: Uses linked lists at each index.\n2. Linear Probing: Searches for the next empty slot sequentially (h(k, i) = (h'(k) + i) % m).\n3. Quadratic Probing: Searches for empty slot using quadratic function (h(k, i) = (h'(k) + c1*i + c2*i²) % m).",
          examTip: "Mention 'Load Factor' (λ = n/m) as it determines when to resize the hash table."
        }
      },
      {
        id: "u6-q2",
        priority: "HIGH",
        marks: 10,
        years: ["2023"],
        question: "Define Hash Table and Load factor. Construct a hash table T of size 11 and Inset the keys of array S = {5, 40, 18, 22, 16, 30, 27} with the hash function: h(k) = k % 11 using: i) Separate Chaining ii) Quadratic Probing.",
        answer: {
          explanation: "Load Factor (α) is the ratio of number of elements to the size of the hash table. α = n/m.",
          example: "S = {5, 40, 18, 22, 16, 30, 27}, m = 11\n1. 5%11 = 5\n2. 40%11 = 7\n3. 18%11 = 7 (Collision!)\n- Chaining: 7 -> 40 -> 18\n- Quadratic: (7 + 1^2)%11 = 8\n4. 22%11 = 0\n5. 16%11 = 5 (Collision!)\n- Chaining: 5 -> 5 -> 16\n- Quadratic: (5 + 1^2)%11 = 6",
          examTip: "Show the final table for both methods to get full marks."
        }
      }
    ]
  },
  {
    id: "unit7",
    title: "Unit 7: Graphs",
    hours: 4,
    summary: "Complex relationships. Traversals, Spanning Trees, and Shortest Paths.",
    questions: [
      {
        id: "u7-q1",
        priority: "HIGH",
        marks: 7,
        years: ["2024 Spring", "2023", "2022"],
        question: "What do you mean by minimum spanning tree? Find out the minimum spanning tree of the given graph using Prim's or Kruskal's algorithm.",
        answer: {
          definition: "A Minimum Spanning Tree (MST) of a connected, undirected graph is a subgraph that is a tree and connects all vertices with the minimum possible total edge weight.",
          algorithm: [
            "Kruskal's: Sort all edges by weight. Add edges one by one if they don't form a cycle (use Union-Find).",
            "Prim's: Start with a vertex. Grow the tree by adding the cheapest edge from the tree to a new vertex."
          ],
          examTip: "Prim's is better for dense graphs, Kruskal's is better for sparse graphs."
        }
      },
      {
        id: "u7-q2",
        priority: "VERY LIKELY",
        marks: 8,
        years: ["2025", "2022"],
        question: "Define Shortest path. Find shortest path algorithm Using Dijkstra's algorithm for the following graph starting point A and destination F.",
        answer: {
          definition: "The shortest path problem is the problem of finding a path between two vertices in a graph such that the sum of the weights of its constituent edges is minimized.",
          algorithm: [
            "Assign to every node a tentative distance value: set it to zero for initial node and to infinity for all other nodes.",
            "Set the initial node as current.",
            "For the current node, consider all of its unvisited neighbors and calculate their tentative distances.",
            "When we are done considering all of the neighbors of the current node, mark the current node as visited.",
            "If the destination node has been marked visited, stop. Otherwise, select the unvisited node with the smallest tentative distance and set it as the new current node."
          ],
          examTip: "Dijkstra's doesn't work with negative edge weights. Mention this as a limitation."
        }
      }
    ]
  }
];

const ANALYSIS_DATA = {
  pattern: "Pokhara University BCA DSA papers usually consist of 7 questions, each with two parts (a and b). Full marks is 100, pass marks 45. Time is 3 hours.",
  recurringTopics: [
    { topic: "ADT & Complexity", frequency: "Every Year", priority: "HIGH" },
    { topic: "Stack/Queue (Linked List)", frequency: "Very High", priority: "HIGH" },
    { topic: "AVL Tree Construction", frequency: "High", priority: "HIGH" },
    { topic: "Hashing (Linear/Chaining)", frequency: "Every Year", priority: "HIGH" },
    { topic: "MST (Prim/Kruskal)", frequency: "High", priority: "HIGH" },
    { topic: "Sorting (Quick/Merge)", frequency: "High", priority: "MEDIUM" }
  ],
  verdict: "The exam heavily focuses on implementation (C/C++ code) and numerical/construction problems (AVL, Hashing, MST). Theory is usually 30%, while 70% is logic/algorithm based.",
  mustPrepare: ["ADT & Asymptotic Notation", "Stack using Linked List", "Infix to Postfix", "AVL Tree Construction", "Hashing Techniques", "MST Algorithms"],
  highChance: ["Dijkstra's Algorithm", "Huffman Coding", "Circular Queue", "Quicksort steps"],
  shortNotes: ["B-tree", "Priority Queue", "Divide & Conquer", "Dynamic Programming", "Recursion vs Iteration"]
};

// --- Components ---

const Badge = ({ children, type }: { children: React.ReactNode, type: string }) => {
  const colors: Record<string, string> = {
    HIGH: "bg-red-100 text-red-700 border-red-200",
    MEDIUM: "bg-orange-100 text-orange-700 border-orange-200",
    LOW: "bg-blue-100 text-blue-700 border-blue-200",
    "MUST PREPARE": "bg-purple-100 text-purple-700 border-purple-200",
    "VERY LIKELY": "bg-green-100 text-green-700 border-green-200",
    "BEST BET": "bg-indigo-100 text-indigo-700 border-indigo-200",
    marks: "bg-gray-100 text-gray-600 border-gray-200",
    year: "bg-indigo-50 text-indigo-600 border-indigo-100"
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${colors[type] || colors.marks}`}>
      {children}
    </span>
  );
};

const QuestionCard = ({ q }: { q: Question }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="p-4 cursor-pointer flex items-start justify-between gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge type={q.priority}>{q.priority}</Badge>
            <Badge type="marks">{q.marks} Marks</Badge>
            {q.years.map(y => <Badge key={y} type="year">{y}</Badge>)}
          </div>
          <h3 className="text-gray-800 font-semibold leading-tight">{q.question}</h3>
        </div>
        <div className="mt-1 text-gray-400">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-4 text-indigo-600 font-bold text-sm uppercase tracking-widest">
                <FileText size={16} />
                Model Answer
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
                {q.answer.definition && (
                  <p><span className="font-bold text-gray-900">Definition:</span> {q.answer.definition}</p>
                )}
                
                {q.answer.explanation && (
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Explanation:</p>
                    <p>{q.answer.explanation}</p>
                  </div>
                )}

                {q.answer.algorithm && (
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Algorithm Steps:</p>
                    <ul className="list-decimal list-inside space-y-1 ml-2">
                      {q.answer.algorithm.map((step, i) => <li key={i}>{step}</li>)}
                    </ul>
                  </div>
                )}

                {q.answer.code && (
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Implementation (C/C++):</p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs font-mono leading-normal">
                      <code>{q.answer.code}</code>
                    </pre>
                  </div>
                )}

                {q.answer.diagram && (
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Visual Representation:</p>
                    <pre className="bg-white border border-gray-200 p-4 rounded-lg text-xs font-mono text-gray-600 leading-tight">
                      {q.answer.diagram}
                    </pre>
                  </div>
                )}

                {q.answer.complexity && (
                  <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded">
                    <p className="text-indigo-900 font-bold text-sm">Complexity Analysis:</p>
                    <p className="text-indigo-800 text-sm">{q.answer.complexity}</p>
                  </div>
                )}

                {q.answer.examTip && (
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex gap-3 items-start">
                    <Zap size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">Exam Tip</p>
                      <p className="text-amber-800 text-sm italic">{q.answer.examTip}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("analysis");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 pt-8 pb-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4 border border-indigo-100">
            Pokhara University • BCA • 3rd Semester • CMP 227
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Data Structures and Algorithms
          </h1>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Deep Analysis: 2022–2025 Papers + Full Syllabus • Perfect 7 & 8 Mark Answers • All Units
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 border-t border-gray-100 pt-6">
            <div className="text-center">
              <div className="text-indigo-600 font-black text-xl">07</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Units</div>
            </div>
            <div className="text-center">
              <div className="text-indigo-600 font-black text-xl">48</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Hrs</div>
            </div>
            <div className="text-center">
              <div className="text-indigo-600 font-black text-xl">04</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Years Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-indigo-600 font-black text-xl">Full</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Algorithms</div>
            </div>
            <div className="text-center">
              <div className="text-indigo-600 font-black text-xl">Exam</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Ready Answers</div>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Nav */}
      <nav className={`sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all ${isScrolled ? "py-2 shadow-sm" : "py-4"}`}>
        <div className="max-w-4xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            <button 
              onClick={() => scrollTo("analysis")}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "analysis" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-gray-500 hover:bg-gray-100"}`}
            >
              Analysis
            </button>
            {UNITS.map((u, i) => (
              <button 
                key={u.id}
                onClick={() => scrollTo(u.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === u.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-gray-500 hover:bg-gray-100"}`}
              >
                U{i+1}: {u.id === "unit1" ? "Intro" : u.id === "unit2" ? "Stack/Queue" : u.id === "unit3" ? "Lists" : u.id === "unit4" ? "Trees" : u.id === "unit5" ? "Sorting" : u.id === "unit6" ? "Hashing" : "Graphs"}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-16">
        {/* Analysis Section */}
        <section id="analysis" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-600 text-white rounded-lg">
              <BarChart3 size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Deep Pattern Analysis</h2>
              <p className="text-gray-500 text-sm font-medium">Exam Trends: 2022–2025 Papers</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column: Pattern & Table */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                  <Info size={16} />
                  Paper Pattern Summary
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">{ANALYSIS_DATA.pattern}</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="pb-3 font-bold text-gray-900">Recurring Topic</th>
                        <th className="pb-3 font-bold text-gray-900">Frequency</th>
                        <th className="pb-3 font-bold text-gray-900">Priority</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {ANALYSIS_DATA.recurringTopics.map((t, i) => (
                        <tr key={i}>
                          <td className="py-3 text-gray-700 font-medium">{t.topic}</td>
                          <td className="py-3 text-gray-500">{t.frequency}</td>
                          <td className="py-3"><Badge type={t.priority}>{t.priority}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2">The Verdict</h3>
                  <p className="text-lg font-medium leading-relaxed italic">"{ANALYSIS_DATA.verdict}"</p>
                </div>
                <TrendingUp className="absolute -bottom-4 -right-4 w-32 h-32 text-indigo-800 opacity-50" />
              </div>
            </div>

            {/* Right Column: Predictions */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Must Prepare
                </h3>
                <ul className="space-y-3">
                  {ANALYSIS_DATA.mustPrepare.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                      <CheckCircle2 size={16} className="text-red-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-green-600 mb-4 flex items-center gap-2">
                  <TrendingUp size={16} />
                  High Chance
                </h3>
                <ul className="space-y-3">
                  {ANALYSIS_DATA.highChance.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                      <ArrowRight size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                  <FileText size={16} />
                  Q7 Short Notes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ANALYSIS_DATA.shortNotes.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-[11px] font-bold text-gray-600">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unit Sections */}
        {UNITS.map((unit, idx) => (
          <section key={unit.id} id={unit.id} className="scroll-mt-32">
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                  0{idx + 1}
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">{unit.title}</h2>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{unit.hours} Teaching Hours</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl mb-8 text-indigo-900 text-sm leading-relaxed">
              <span className="font-bold uppercase text-[10px] tracking-widest text-indigo-500 block mb-1">Unit Summary</span>
              {unit.summary}
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Important Long Questions</h3>
              {unit.questions.map(q => (
                <QuestionCard key={q.id} q={q} />
              ))}
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="pt-20 pb-10 border-t border-gray-200 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen size={14} />
            Study Hard. Score High.
          </div>
          <p className="text-gray-400 text-sm font-medium">
            Designed for BCA Students of Pokhara University.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-gray-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Syllabus</a>
            <span className="text-gray-200">•</span>
            <a href="#" className="hover:text-indigo-600 transition-colors">Past Papers</a>
            <span className="text-gray-200">•</span>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
        </footer>
      </main>

      {/* Mobile Nav Overlay (Optional if needed, but sticky nav handles it) */}
    </div>
  );
}
