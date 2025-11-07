"use client";

import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { Todo, useTodoStore } from "../store/todoStore";
import clsx from 'clsx';

export function TodoItem({ todo, index }: { todo: Todo; index: number }) {
  const toggleTodo = useTodoStore(s => s.toggleTodo);
  const removeTodo = useTodoStore(s => s.removeTodo);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24, delay: index * 0.03 }}
      className={clsx(
        'card group relative overflow-hidden p-4 sm:p-5',
        todo.completed && 'opacity-90'
      )}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12" />

      <div className="flex items-center gap-4">
        <button
          aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
          onClick={() => toggleTodo(todo.id)}
          className={clsx('h-10 w-10 shrink-0 rounded-xl border border-white/10 flex items-center justify-center transition-all',
            todo.completed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-white/70 hover:text-white')}
        >
          <Check className={clsx('h-6 w-6 transition-transform', todo.completed ? 'scale-100' : 'scale-90')} />
        </button>

        <div className={clsx('flex-1 text-base sm:text-lg', todo.completed && 'line-through text-white/50')}>{todo.title}</div>

        <button
          aria-label="Delete todo"
          onClick={() => removeTodo(todo.id)}
          className="h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-white/5 text-white/60 hover:text-white"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
}
