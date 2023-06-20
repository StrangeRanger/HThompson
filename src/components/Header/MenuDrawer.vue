<template>
  <v-navigation-drawer location="right" temporary="">
    <v-card rounded="lg" class="mt-6" elevation="0">
      <v-card-title id="card-title" elevation="6"> <v-icon>mdi-menu</v-icon> Menu </v-card-title>

      <v-list density="compact">
        <br />
        <v-list-item>
          <v-btn to="/" variant="outlined" elevation="3">Home</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn to="/website-policies" variant="outlined" elevation="3">Web Policy</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn to="/about" variant="outlined" elevation="3">About</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn to="/links" variant="outlined" elevation="3">My Links</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            href="https://status.randomserver.xyz/status/"
            target="_blank"
            variant="outlined"
            elevation="3"
            >Status</v-btn
          >
        </v-list-item>
        <v-list-item>
          <v-btn
            href="https://wiki.randomserver.xyz/en/about/changelog"
            target="_blank"
            variant="outlined"
            elevation="3"
            >Changelog</v-btn
          >
        </v-list-item>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>
