"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

type Filter = 'all' | 'active' | 'completed';

interface TodoState {
  todos: Todo[];
  filter: Filter;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: Filter) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',
      addTodo: (title) => set((state) => ({
        todos: [
          { id: crypto.randomUUID(), title: title.trim(), completed: false, createdAt: Date.now() },
          ...state.todos,
        ],
      })),
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      })),
      removeTodo: (id) => set((state) => ({
        todos: state.todos.filter(t => t.id !== id)
      })),
      clearCompleted: () => set((state) => ({
        todos: state.todos.filter(t => !t.completed)
      })),
      setFilter: (filter) => set({ filter })
    }),
    { name: 'insane-todo-store' }
  )
);

export function useFilteredTodos(): Todo[] {
  const { todos, filter } = useTodoStore();
  if (filter === 'active') return todos.filter(t => !t.completed);
  if (filter === 'completed') return todos.filter(t => t.completed);
  return todos;
}
