<template>
  <h1>Welcome to my Random Website</h1>
  <v-container>
    <v-row>
      <v-col v-for="item in array" :key="item.title" cols="12" md="6" lg="4">
        <v-card
          class="card-button"
          :href="item.link"
          target="_blank"
          elevation="6"
          variant="outlined"
        >
          <v-card-title class="justify-center">{{ item.title }}</v-card-title>
          <v-card-item>
            <v-card-text>
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
    link: 'https://wiki.randomserver.xyz/',
    icon: 'mdi-wikipedia'
  },
  {
    title: 'Image Gallery',
    text: 'Publicly hosts an assortment of images, videos, gifs, and so on.',
    // link: 'https://img.randomserver.xyz/',
    link: 'https://images.randomserver.xyz/',
    icon: 'mdi-image'
  },
  {
    title: 'Personal Blog',
    text: "My blog... I don't know what else to say.",
    link: 'https://blog.randomserver.xyz/',
    icon: 'mdi-blogger'
  },
  {
    title: 'Private Bin',
    text: 'A minimalist, open source online pastebin where the server has zero knowledge of pasted data.',
    // link: 'https://paste.randomserver.xyz/',
    link: 'https://privatebin.randomserver.xyz/',
    icon: 'mdi-content-paste'
  },
  {
    title: 'File Server',
    text: "Files that aren't located at the link above.",
    // link: 'https://files.randomserver.xyz/',
    link: 'https://ftp.randomserver.xyz/',
    icon: 'mdi-file'
  },
  {
    title: 'PDF Gallery',
    text: 'My wiki, containing information about me, my website, and an abundance of other things.',
    // link: 'https://pdf.randomserver.xyz/',
    link: 'https://calibre.randomserver.xyz/',
    icon: 'mdi-file-pdf'
  },
  {
    title: 'RSS Bridge',
    text: 'The RSS feed for websites missing it.',
    // link: 'https://rss.randomserver.xyz/',
    link: 'https://rss-bridge.randomserver.xyz/',
    icon: 'mdi-rss'
  }
]
</script>
