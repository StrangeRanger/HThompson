<template>
  <h1 class="text-h4">Welcome to my website</h1>
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
        >
          <v-card-title class="text-center">
            <v-icon :icon="item.icon"></v-icon>
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
</template>

<script setup lang="ts">
let array = [
  {
    title: 'Wiki',
    text: 'My wiki, containing information about me, my website, and an abundance of other things.',
    link: 'https://wiki.hthompson.dev/',
    icon: 'mdi-wikipedia'
  },
  {
    title: 'Image Gallery',
    text: 'Publicly hosts an assortment of images, videos, gifs, and so on.',
    link: 'https://images.hthompson.dev/',
    icon: 'mdi-view-gallery-outline'
  },
  {
    title: 'Private Bin',
    text: 'A minimalist, open source online pastebin where the server has zero knowledge of pasted data.',
    link: 'https://privatebin.hthompson.dev/',
    icon: 'mdi-content-paste'
  },
  {
    title: 'File Server',
    text: "Files that aren't located at the link above.",
    link: 'https://files.hthompson.dev/',
    icon: 'mdi-file'
  },
  {
    title: 'PDF Gallery',
    text: 'My wiki, containing information about me, my website, and an abundance of other things.',
    link: 'https://pdfs.hthompson.dev/',
    icon: 'mdi-file-pdf-box'
  },
  {
    title: 'RSS Bridge',
    text: 'The RSS feed for websites missing it.',
    link: 'https://rss-bridge.hthompson.dev/',
    icon: 'mdi-rss'
  }
]
</script>
