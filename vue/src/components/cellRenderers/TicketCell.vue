<template>
  <div>
    <v-btn density="compact" class="ma-2" variant="text" icon="mdi-pencil" @click="edit" :disabled="params.data.status=='Обработан'"></v-btn>
  </div>
</template>

<script>
export default {
  name: 'TicketCell',
  data() {
    return {};
  },
  methods: {
    edit() {
      this.$emitter.emit('openModal', {
        url: `/ticket/${this.params.data.id}`,
        method: 'PUT',
        header: 'Модерация обращения',
        eventName: 'edit-ticket',
        fields: [
          {
            key: 'object',
            label: 'Текст обращения',
            type: 'textarea',
            value: this.params.data.object,
          },
          {
            key: 'response',
            label: 'Ответ',
            type: 'textarea',
            value: this.params.data.response,
          },
        ],
      });
    },
  },
};
</script>
