import React, { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { CheckCircle2, Circle, Upload, Link as LinkIcon, Type } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  type: 'text' | 'link' | 'file';
}

interface TaskItemProps {
  task: Task;
  isCompleted: boolean;
  onComplete: (taskId: string, data: string | File) => void;
}

function TaskItem({ task, isCompleted, onComplete }: TaskItemProps) {
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.type === 'file' && file) {
      onComplete(task.id, file);
    } else if (inputValue.trim()) {
      onComplete(task.id, inputValue);
    }
  };

  return (
    <div className={cn("p-4 rounded-xl border transition-colors", isCompleted ? "bg-primary-50 border-primary-200" : "bg-white border-slate-200")}>
      <div className="flex items-start gap-3 mb-3">
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
        ) : (
          <Circle className="w-5 h-5 text-slate-300 mt-0.5 shrink-0" />
        )}
        <div>
          <h4 className={cn("font-medium", isCompleted ? "text-primary-900" : "text-slate-900")}>{task.title}</h4>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            {task.type === 'text' && <><Type className="w-3 h-3" /> Text Response</>}
            {task.type === 'link' && <><LinkIcon className="w-3 h-3" /> URL Required</>}
            {task.type === 'file' && <><Upload className="w-3 h-3" /> File Upload</>}
          </p>
        </div>
      </div>

      {!isCompleted && (
        <form onSubmit={handleSubmit} className="ml-8 mt-2 flex gap-2">
          {task.type === 'text' && (
            <input 
              type="text" 
              placeholder="Your answer..." 
              className="flex-1 text-sm rounded-lg border-slate-200 border px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
          )}
          {task.type === 'link' && (
            <input 
              type="url" 
              placeholder="https://..." 
              className="flex-1 text-sm rounded-lg border-slate-200 border px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
          )}
          {task.type === 'file' && (
            <input 
              type="file" 
              className="flex-1 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          )}
          <button 
            type="submit"
            className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

interface TaskListProps {
  tasks: Task[];
  onAllCompleted?: (submissions: Record<string, string | File>) => void;
}

export function TaskList({ tasks, onAllCompleted }: TaskListProps) {
  const [submissions, setSubmissions] = useState<Record<string, string | File>>({});

  const handleComplete = (taskId: string, data: string | File) => {
    const newSubmissions = { ...submissions, [taskId]: data };
    setSubmissions(newSubmissions);
    
    if (Object.keys(newSubmissions).length === tasks.length && onAllCompleted) {
      onAllCompleted(newSubmissions);
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          isCompleted={!!submissions[task.id]} 
          onComplete={handleComplete} 
        />
      ))}
    </div>
  );
}
