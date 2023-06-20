<template>
  <v-btn icon="mdi-brightness-7" @click="toggleTheme" />
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  if (localStorage.getItem('theme') === 'light') {
    toggleDarkMode()
  } else {
    toggleLightMode()
  }
}

function toggleDarkMode() {
  theme.global.name.value = 'dark'
  localStorage.setItem('theme', 'dark')
}

function toggleLightMode() {
  theme.global.name.value = 'light'
  localStorage.setItem('theme', 'light')
}
</script>
