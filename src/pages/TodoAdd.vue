<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="title"
        label="Title *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="textarea"
        v-model="description"
        label="Description *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type something',
        ]"
      />

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
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useTodoStore } from 'stores/todo.store';

export default defineComponent({
  name: 'TodoAdd',
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const title = ref<string>('');
    const description = ref<string>('');

    const todoStore = useTodoStore();

    return {
      title,
      description,

      onSubmit() {
        todoStore.createNewItem({
          id: uuidv4(),
          title: title.value,
          description: description.value,
          completed: false,
        });
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted',
        });
        $router.push('/todo');
      },

      onReset() {
        title.value = '';
        description.value = '';
      },
    };
  },
});
</script>
