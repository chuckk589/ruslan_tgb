<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <div class="d-flex  align-center ">
        <v-btn to="/settings">Настройки</v-btn>
      </div> -->
      <!-- <v-toolbar-title>Application</v-toolbar-title> -->
      <template v-slot:append>
        <v-btn icon="mdi-power" @click="reboot"></v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer permanent v-model="drawer">
      <v-list>
        <v-list-item to="/users" value="1" active-color="#1867C0">
          <template v-slot:prepend>
            <v-icon class="mr-5" icon="mdi-account"></v-icon>
          </template>

          <v-list-item-title>Пользователи</v-list-item-title>
        </v-list-item>

        <v-list-item to="/tickets" value="2" active-color="#1867C0">
          <template v-slot:prepend>
            <v-icon class="mr-5" icon="mdi-email"></v-icon>
          </template>

          <v-list-item-title>Поддержка</v-list-item-title>
        </v-list-item>
        <v-list-item to="/rss" value="3" active-color="#1867C0">
          <template v-slot:prepend>
            <v-icon class="mr-5" icon="mdi-rss-box"></v-icon>
          </template>

          <v-list-item-title>RSS</v-list-item-title>
        </v-list-item>
        <v-list-item to="/locales" value="4" active-color="#1867C0">
          <template v-slot:prepend>
            <v-icon class="mr-5" icon="mdi-web"></v-icon>
          </template>

          <v-list-item-title>Локали</v-list-item-title>
        </v-list-item>
        <v-list-item to="/settings" value="5" active-color="#1867C0">
          <template v-slot:prepend>
            <v-icon class="mr-5" icon="mdi-cog-outline"></v-icon>
          </template>

          <v-list-item-title>Конфиги</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="logout" block> Выйти </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid style="display: flex; flex-direction: column; height: 100%">
        <router-view />
      </v-container>
    </v-main>
    <edit-component />
  </v-app>
</template>

<script>
import EditComponent from './EditComponent.vue';
export default {
  name: 'ContainerView',
  components: {
    EditComponent,
  },
  data() {
    return {
      drawer: false,
    };
  },
  mounted() {
    this.$emitter.on('reboot', (evt) => {
      this.$http({ method: 'GET', url: `/v1/status/reboot` })
      this.$router.go()
    });
  },
  beforeUnmount() {
    this.$emitter.off('reboot');
  },
  methods: {
    reboot() {
      this.$emitter.emit('openDialog', {
        header : 'Перезагрузка',
        message: 'Вы уверены, что хотите перезагрузить сервер?',
        eventName: 'reboot',
      });
    },
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
