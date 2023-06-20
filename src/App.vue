<template>
  <v-app>
    <!--<span class="bg"></span>-->
    <v-app-bar class="py-1 px-6 toolbar" :elevation="3">
      <v-toolbar-title>
        <RouterLink to="/">
          <v-icon icon="mdi-book-open-page-variant" />
          Random Server
        </RouterLink>
      </v-toolbar-title>

      <v-spacer />

      <ToggleTheme />
      <v-app-bar-nav-icon @click="menu = !menu"></v-app-bar-nav-icon>
    </v-app-bar>

    <MenuDrawer v-model="menu" />

    <v-main>
      <v-sheet
        class="d-flex align-center justify-center flex-wrap text-center mx-auto pa-10"
        elevation="3"
        height="100%"
        max-width="980px"
        rounded
      >
        <RouterView />
      </v-sheet>
    </v-main>

    <v-footer :elevation="3">
      <span>&copy; 2021</span>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import ToggleTheme from '@/components/Header/ToggleTheme.vue'
import MenuDrawer from '@/components/Header/MenuDrawer.vue'
import { ref } from 'vue'

let menu = ref(false)
</script>

<style scoped>
.toolbar {
  font-size: 26px;
  font-weight: bold;
  border-bottom: 1px solid #656464;
  min-height: 65px;
}

.v-main {
  padding-top: 73px;
}

.v-footer {
  border-top: 1px solid #656464;
  max-height: 65px;
}
</style>
