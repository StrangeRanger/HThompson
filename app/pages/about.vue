<template>
  <v-container>
    <v-sheet class="rounded pb-4">
      <h1 class="text-h4 mb-5">About Me and This Website</h1>
      <p class="text-body-1 text-center mb-6">
        Learn more about my background, interests, and the story behind this
        website.
      </p>
    </v-sheet>
    <v-sheet class="rounded pb-6 mt-4">
      <v-expansion-panels>
        <v-expansion-panel title="Who am I?" elevation="2" class="text-left">
          <v-expansion-panel-text class="text-body-1">
            <p class="mb-4">
              My name is Hunter, a Computer Science major specializing in Cyber
              Security at Eastern Washington University. My passion for
              computers and technology, particularly software security, drives
              my academic and professional goals.
            </p>
            <p class="mb-4">
              Beyond my core studies, I have a deep fascination with the
              infinite wonders of space, which once inspired me to consider a
              career in Astrophysics. I'm also an avid music enthusiast and
              enjoy immersing myself in the diverse worlds of anime.
            </p>
            <v-alert type="info" variant="tonal" class="mt-4">
              <em
                >This information is outdated and will be updated in the
                future.</em
              >
            </v-alert>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel
          title="What is this website and what is its purpose?"
          elevation="2"
          class="text-left"
        >
          <v-expansion-panel-text class="text-body-1">
            <p class="mb-4">
              My journey with hthompson.dev, formerly known as randomserver.xyz,
              began as a simple project aimed at honing my skills in HTML and
              CSS. It was more than just about building a website; it was about
              mastering the intricacies of web server administration. In 2019,
              the site quickly transcended its initial purpose. It morphed into
              a dynamic repository where I could curate and showcase my
              creations, discoveries, and favorites.
            </p>
            <p class="mb-4">
              The year 2023 marked a pivotal moment for the site. Faced with
              circumstances that necessitated a complete overhaul of my web
              server, I seized this challenge as an opportunity for reinvention.
              This led to a significant rebranding: transitioning from
              randomserver.xyz to hthompson.dev. Embracing this change, I
              redeveloped the main webpage with Vue.js, aligning the site's
              aesthetic with a more professional outlook.
            </p>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>
  </v-container>
</template>
