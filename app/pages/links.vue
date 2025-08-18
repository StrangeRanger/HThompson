<script setup lang="ts">
interface SocialLink {
  title: string;
  text: string;
  link: string;
  icon: string;
  color: string;
}

const array: SocialLink[] = [
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
  <v-container class="button-links">
    <v-sheet class="rounded pb-6">
      <h1 class="text-h4 mb-5 text-center">My Links</h1>
      <p class="text-body-1 text-center mb-6">
        Connect with me on various social media platforms and explore my work.
      </p>
    </v-sheet>

    <v-sheet class="rounded pb-6 mt-6">
      <v-row>
        <v-col v-for="item in array" :key="item.title" cols="12" sm="6" md="4">
          <v-card
            class="card-button"
            :href="item.link"
            rel="noopener noreferrer"
            target="_blank"
            elevation="6"
            variant="outlined"
            :color="item.color"
          >
            <v-card-title
              class="text-center d-flex align-center justify-center ga-2"
            >
              <v-icon :icon="item.icon" />
              {{ item.title }}
            </v-card-title>
            <v-card-item>
              <v-card-text class="text-body-1 text-center">
                {{ item.text }}
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.card-button {
  transition: transform 0.2s ease-in-out;
}

.card-button:hover {
  transform: translateY(-2px);
}
</style>
