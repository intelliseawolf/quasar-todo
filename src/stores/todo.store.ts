import { defineStore } from 'pinia';
import type { Todo } from '../models/todo.model';

export type todoStateType = {
  items: Todo[];
};

export const useTodoStore = defineStore({
  id: 'todoStore',
  state: () =>
    ({
      items: [],
    } as todoStateType),

  actions: {
    createNewItem(todo: Todo) {
      if (!todo.title || !todo.description) return;
      this.items.push(todo);
    },
    updateTodo(todo: Todo) {
      if (!todo.title || !todo.description) return;
      const index: number = this.items.findIndex((i) => i.id === todo.id);
      this.items.splice(index, 1, {
        ...this.items[index],
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
      });
    },
    completeTodo(todo: Todo) {
      const index: number = this.items.findIndex((i) => i.id === todo.id);
      this.items.splice(index, 1, {
        ...this.items[index],
        completed: !this.items[index].completed,
      });
    },
    deleteTodo(todo: Todo) {
      const index: number = this.items.findIndex((i) => i.id === todo.id);
      this.items.splice(index, 1);
    },
    getTodo(id: string) {
      const index: number = this.items.findIndex((i) => i.id === id);
      return this.items[index];
    },
  },
});
