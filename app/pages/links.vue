<script setup lang="ts">
const array = [
  {
    title: "Bluesky",
    text: "My Bluesky account.",
    link: "https://bsky.app/profile/hthompson.dev",
    icon: "mdi-account",
    color: "#4f9bd9",
  },
  {
    title: "Twitter (X)",
    text: "My Twitter (X) account.",
    link: "https://x.com/_Hunter_T_",
    icon: "mdi-twitter",
    color: "#1DA1F2",
  },
  {
    title: "GitHub",
    text: "My GitHub account.",
    link: "https://github.com/StrangeRanger",
    icon: "mdi-github",
    color: "#ffffff",
  },
  {
    title: "SoundCloud",
    text: "My SoundCloud account.",
    link: "https://soundcloud.com/SubDubZero",
    icon: "mdi-soundcloud",
    color: "#FF5500",
  },
];
</script>

<template>
  <div>
    <h1 class="text-h4">My Links</h1>
    <br />
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
