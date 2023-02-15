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
  name: 'RssCell',
  data() {
    return {};
  },
  methods: {
    edit() {
      this.$emitter.emit('openModal', {
        url: `/rss/${this.params.data.id}`,
        method: 'PUT',
        header: 'Редактировать',
        eventName: 'edit-rss',
        fields: [
        {
            key: 'url',
            label: 'Rss Url',
            type: 'textarea',
            value: this.params.data.url,
          },
          {
            key: 'state',
            label: 'Статус',
            type: 'select',
            value: this.params.data.state,
            options: [
              {
                value: 'on',
                title: 'On',
              },
              {
                value: 'off',
                title: 'Off',
              },
            ],
          },
        ],
      });
    },
  },
};
</script>
