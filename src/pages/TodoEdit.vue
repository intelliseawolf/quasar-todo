<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="todo.title"
        label="Title *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="textarea"
        v-model="todo.description"
        label="Description *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type something',
        ]"
      />

      <q-toggle v-model="todo.completed" label="Completed" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { useTodoStore } from 'stores/todo.store';

import type { Todo } from 'src/models/todo.model';

export default defineComponent({
  name: 'TodoEdit',
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const $route = useRoute();
    const todoStore = useTodoStore();

    const todo = ref<Todo>({
      id: '',
      title: '',
      description: '',
      completed: false,
    });

    onMounted(() => {
      if (typeof $route.params.id == 'string') {
        todo.value = { ...todoStore.getTodo($route.params.id) };
      }
    });

    return {
      todo,
      onSubmit() {
        todoStore.updateTodo(todo.value);
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted',
        });
        $router.push('/todo');
      },

      onReset() {
        todo.value.title = '';
        todo.value.description = '';
        todo.value.completed = false;
      },
    };
  },
});
</script>
