<script setup lang="ts">
const array = [
  {
    title: 'Twitter',
    text: 'My Twitter account.',
    link: 'https://twitter.com/_Hunter_T_',
    icon: 'mdi-twitter',
    color: '#1DA1F2'
  },
  {
    title: 'SoundCloud',
    text: 'My SoundCloud account.',
    link: 'https://soundcloud.com/SubDubZero',
    icon: 'mdi-soundcloud',
    color: '#FF5500'
  },
  {
    title: 'GitHub',
    text: 'My GitHub account.',
    link: 'https://github.com/StrangeRanger',
    icon: 'mdi-github',
    color: '#ffffff'
  }
]
</script>

<template>
  <div>
    <h1 class="text-h4">My Links</h1>
    <br />
    <!--<v-img src="/src/assets/avatar.png" alt="avatar.png" width="auto" height="125" />-->
    <v-container class="button-links">
      <v-row>
        <v-col v-for="item in array" :key="item.title" cols="12" sm="6" md="4">
          <v-card
            class="card-button"
            :href="item.link"
            target="_blank"
            elevation="6"
            variant="outlined"
            :color="item.color"
          >
            <v-card-title class="text-center">
              <v-icon :icon="item.icon" />
              {{ item.title }}
            </v-card-title>
            <v-card-item>
              <v-card-text class="text-body-1 text-left">
                {{ item.text }}
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
v-img {
  text-align: center;
}
</style>
