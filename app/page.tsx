"use client";

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, ListChecks, Sun, Moon } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { useFilteredTodos, useTodoStore } from './store/todoStore';
import clsx from 'clsx';

export default function Page() {
  const [draft, setDraft] = useState('');
  const [prefersDark, setPrefersDark] = useState(true);
  const addTodo = useTodoStore(s => s.addTodo);
  const filter = useTodoStore(s => s.filter);
  const setFilter = useTodoStore(s => s.setFilter);
  const todos = useFilteredTodos();
  const allTodos = useTodoStore(s => s.todos);
  const clearCompleted = useTodoStore(s => s.clearCompleted);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', prefersDark);
  }, [prefersDark]);

  const remaining = useMemo(() => allTodos.filter(t => !t.completed).length, [allTodos]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const title = draft.trim();
    if (!title) return;
    addTodo(title);
    setDraft('');
  }

  return (
    <main>
      <header className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-brand-400" /> Insane Mode
            </div>
            <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-[0_0_12px_rgba(47,108,255,0.35)]">
              Your Day, Supercharged
            </h1>
            <p className="mt-2 text-white/70 text-sm sm:text-base">Add tasks, swipe, tap, and glow through your todos. Built for phones.</p>
          </div>
          <button
            aria-label="Toggle theme"
            onClick={() => setPrefersDark(v => !v)}
            className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:text-white flex items-center justify-center"
          >
            {prefersDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <section className="card p-4 sm:p-5">
        <form onSubmit={onSubmit} className="flex gap-3">
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="Add an epic task..."
            className="input"
            aria-label="New todo"
            autoFocus
          />
          <button type="submit" className="btn-primary w-12 sm:w-auto sm:px-4">
            <Plus className="h-6 w-6 sm:mr-2" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-white/70">
          <div className="flex gap-2">
            {(['all','active','completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx('px-3 py-1 rounded-full border border-white/10',
                  filter === f ? 'bg-white/15 text-white' : 'bg-white/5 hover:bg-white/10')}
              >{f[0].toUpperCase() + f.slice(1)}</button>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-brand-400" /> {remaining} left
          </div>
        </div>
      </section>

      <section className="mt-4 space-y-3">
        <AnimatePresence initial={false}>
          {todos.map((t, i) => (
            <TodoItem key={t.id} todo={t} index={i} />
          ))}
        </AnimatePresence>
        {allTodos.some(t => t.completed) && (
          <div className="flex justify-center">
            <button onClick={clearCompleted} className="mt-1 text-xs text-white/60 hover:text-white underline">Clear completed</button>
          </div>
        )}
      </section>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[30dvh] bg-hero-gradient"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 16, repeat: Infinity }}
      />
    </main>
  );
}
