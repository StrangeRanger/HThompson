<template>
  <v-app>
    <span class="bg"></span>
    <v-app-bar class="py-1 px-6 toolbar" :elevation="3" color="#141414">
      <v-toolbar-title class="a-href-link">
        <RouterLink to="/">
          <!--<v-icon icon="mdi-book-open-page-variant" />-->
          HThompson
        </RouterLink>
      </v-toolbar-title>

      <v-spacer />

      <!--<ToggleTheme />-->
      <v-app-bar-nav-icon @click="menu = !menu"></v-app-bar-nav-icon>
    </v-app-bar>

    <MenuDrawer v-model="menu" />

    <v-main>
      <v-sheet
        class="align-center justify-center flex-wrap text-center mx-auto pa-10"
        elevation="3"
        height="100%"
        width="100%"
        max-width="980px"
        rounded
      >
        <RouterView />
      </v-sheet>
    </v-main>

    <v-footer :elevation="3" color="#141414" class="text-center">
      <span class="text-center">Hunter T. &copy; 2019-2023</span>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
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
