<script setup lang="ts">
interface ServiceCard {
  title: string;
  text: string;
  link: string;
  icon: string;
}

const array: ServiceCard[] = [
  {
    title: "Wiki",
    text: "My wiki, containing information about me, my website, and an abundance of other things.",
    link: "https://wiki.hthompson.dev/",
    icon: "mdi-wikipedia",
  },
  {
    title: "Image Gallery",
    text: "Publicly hosts an assortment of images, videos, gifs, and so on.",
    link: "https://images.hthompson.dev/",
    icon: "mdi-view-gallery-outline",
  },
  {
    title: "Private Bin",
    text: "A minimalist, open source online pastebin where the server has zero knowledge of pasted data.",
    link: "https://privatebin.hthompson.dev/",
    icon: "mdi-content-paste",
  },
  {
    title: "File Server",
    text: "Files that aren't located anywhere else on my website.",
    link: "https://files.hthompson.dev/",
    icon: "mdi-file",
  },
  {
    title: "RSS Bridge",
    text: "The RSS feed for websites missing it.",
    link: "https://rss-bridge.hthompson.dev/",
    icon: "mdi-rss",
  },
  {
    title: "Project Tracker",
    text: "A comprehensive list of projects I'm working on, have completed, or have abandoned.",
    link: "/project-tracker",
    icon: "mdi-source-branch",
  },
  {
    title: "Custom Unix Terminal",
    text: "Configurations that went in to custumizing the look, feel, and functionality of my terminal.",
    link: "https://cut.hthompson.dev/",
    icon: "mdi-console",
  },
  {
    title: "Bash Style Guide",
    text: "A style guide for writing safe, predictable, and maintainable bash scripts.",
    link: "https://bsg.hthompson.dev/",
    icon: "mdi-bash",
  },
];
</script>

<template>
  <v-container>
    <v-sheet class="rounded pb-6">
      <h1 class="text-h4 mb-5">Welcome to HThompson</h1>
      <p class="text-left text-body-1">
        I'm Hunter, and this is the central hub of my online presence. Here, you
        can explore my projects, view my professional portfolio, use the
        services I host, and discover more about who I am and what I do. Feel
        free to browse around and enjoy your visit!
      </p>
    </v-sheet>
    <v-sheet class="button-links rounded pb-6 mt-6">
      <v-row>
        <v-col v-for="item in array" :key="item.title" cols="12" sm="6" md="4">
          <v-card
            class="card-button"
            :href="item.link"
            :target="item.link.startsWith('http') ? '_blank' : '_self'"
            :rel="
              item.link.startsWith('http') ? 'noopener noreferrer' : undefined
            "
            elevation="4"
            variant="outlined"
          >
            <v-card-title
              class="text-center d-flex align-center justify-center ga-2"
            >
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
