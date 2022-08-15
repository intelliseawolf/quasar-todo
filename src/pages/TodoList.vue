<template>
  <div>
    <q-btn
      round
      color="secondary"
      icon="add"
      class="float-right q-ma-sm"
      to="/todo/add"
    />
    <div class="q-pa-md">
      <q-option-group
        v-model="filter"
        inline
        class="q-mb-md"
        :options="[
          { label: 'All', value: 'all' },
          { label: 'Completed', value: 'completed' },
          { label: 'Uncompleted', value: 'uncompleted' },
        ]"
      />

      <q-table
        title="Todo List"
        :rows="filteredTodoList"
        :columns="columns"
        row-key="name"
        separator="vertical"
      >
        <template v-slot:body-cell-completed="props">
          <q-td :props="props">
            <q-checkbox
              :modelValue="props.value"
              @update:model-value="completeTodo(props.row)"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              round
              color="red-14"
              icon="delete"
              size="sm"
              class="q-mr-sm"
              @click="deleteItem(props.row)"
            />
            <q-btn
              round
              color="teal-5"
              icon="edit"
              size="sm"
              :to="`/todo/${props.row.id}/edit`"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { QTableProps } from 'quasar';
import type { Todo } from 'src/models/todo.model';
import { useTodoStore } from 'stores/todo.store';

const columns: QTableProps['columns'] = [
  {
    name: 'title',
    align: 'center',
    label: 'Title',
    field: 'title',
    sortable: false,
  },
  {
    name: 'description',
    align: 'center',
    label: 'Description',
    field: 'description',
    sortable: false,
  },
  {
    name: 'completed',
    align: 'center',
    label: 'Completed',
    field: 'completed',
    sortable: true,
  },
  {
    name: 'action',
    align: 'center',
    label: '',
    field: 'action',
    sortable: false,
  },
];

export default defineComponent({
  name: 'TodoList',
  setup() {
    const todoList = ref<Todo[]>([]);
    const filter = ref<'all' | 'completed' | 'uncompleted'>('all');
    const todoState = useTodoStore();
    const filteredTodoList = computed(() => {
      switch (filter.value) {
        case 'all':
          return todoState.items;

        case 'completed':
          return todoState.items.filter((i: Todo) => i.completed === true);

        case 'uncompleted':
          return todoState.items.filter((i: Todo) => i.completed === false);

        default:
          return todoState.items;
      }
    });

    todoList.value = todoState.items;

    return {
      filter,
      columns,
      todoList,
      filteredTodoList,
      completeTodo(todo: Todo) {
        todoState.completeTodo(todo);
      },
      deleteItem(todo: Todo) {
        todoState.deleteTodo(todo);
      },
    };
  },
});
</script>
