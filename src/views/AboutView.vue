<template>
  <h1 class="text-h4">About Me and This Website</h1>
  <v-container class="text-body-1 text-left">
    <v-expansion-panels>
      <v-expansion-panel title="Who am I?">
        <v-expansion-panel-text>
          First off, hello, and welcome to my website. My name is Hunter T., and I am currently a
          student at Eastern Washington University, majoring in Computer Science with a focus on
          Cyber Security. I am passionate about anything related to computers and technology,
          especially when it comes to software security. I love to make music, observe the
          ever-expanding vastness of space, and watch anime. Before deciding to major in Computer
          Science, I had previously wanted to go into Astrophysics due to my love of space and
          physics.
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-spacer />
      <v-expansion-panel title="What is this website? What is its purpose?">
        <v-expansion-panel-text>
          My website, hthompson.dev, previously randomserver.xyz, initially started as a small
          project to help me learn HTML and CSS, create a website, and set up and administrate a web
          server. Around 2019, I decided I wanted it to be more than that. It would become a
          repository of sorts where I could archive and share different things I've created, found,
          and liked. As time went on, HThompson (at the time being Random Server) evolved to host
          several public and private services such as
          <a href="https://privatebin.hthompson.dev/">PrivateBin</a>.
          <br />
          In mid-2023, a few things happened that resulted in me rebuilding not just my website, but
          my web server from the ground up. It was then that I realized it'd be a perfect
          opportunity to rebrand my website and make it appear more professional. So I changed the
          website's domain from randomserver.xyz to hthompson.dev, and rebuilt the main webpage
          using Vue.js.
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<style>
h1 {
  text-align: center;
  font-size: 3rem;
  margin: 0;
  padding: 0;
}
</style>
