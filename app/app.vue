<script setup lang="ts">
const menu: Ref<boolean> = ref(false);
</script>

<template>
  <NuxtLayout>
    <v-app>
      <span class="bg" />
      <v-app-bar class="py-1 px-6 toolbar" :elevation="3" color="#141414">
        <v-toolbar-title>
          <NuxtLink to="/" class="text-decoration-none text-white">
            <span class="text-h5 font-weight-bold">HThompson</span>
          </NuxtLink>
        </v-toolbar-title>

        <v-spacer />

        <v-app-bar-nav-icon @click="menu = !menu" />
      </v-app-bar>

      <AppMenuDrawer v-model="menu" />

      <v-main>
        <v-sheet
          class="align-center justify-center flex-wrap text-center mx-auto pa-10"
          elevation="3"
          height="100%"
          width="100%"
          max-width="980px"
          rounded
        >
          <NuxtPage />
        </v-sheet>
      </v-main>

      <v-footer :elevation="3" color="#141414" class="justify-center">
        <small>
          Site made by
          <a
            href="https://github.com/StrangeRanger"
            target="_blank"
            rel="noopener noreferrer"
            class="text-decoration-none"
          >
            Hunter T.
          </a>
        </small>
      </v-footer>
    </v-app>
  </NuxtLayout>
</template>

<style scoped>
.v-main {
  background-image: url("assets/images/3996769.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  padding-top: 73px;
}

.toolbar {
  font-size: 26px;
  font-weight: bold;
  border-bottom: 1px solid #656464;
  min-height: 65px;
}

.v-footer {
  border-top: 1px solid #656464;
  max-height: 65px;
}
</style>
