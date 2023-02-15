<template>
  <div>
    <v-btn
      density="compact"
      class="ma-2"
      variant="text"
      icon="mdi-pencil"
      @click="edit"
    ></v-btn>
  </div>
</template>

<script>
export default {
  name: 'UserCell',
  data() {
    return {};
  },
  methods: {
    edit() {
      this.$emitter.emit('openModal', {
        url: `/user/${this.params.data.id}`,
        method: 'PUT',
        header: 'Редактировать',
        eventName: 'edit-user',
        fields: [
          {
            key: 'locale',
            label: 'Язык',
            type: 'select',
            value: this.params.data.locale,
            options: this.$ctable.locales,
          },
          {
            key: 'role',
            label: 'Роль',
            type: 'select',
            value: this.params.data.role,
            options: this.$ctable.roles,
          },
        ],
      });
    },
  },
};
</script>
