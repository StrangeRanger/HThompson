<template>
  <v-navigation-drawer location="right" temporary :style="{ zIndex: 1004 }">
    <v-card rounded="lg" class="mt-6 button-links" elevation="0">
      <v-card-title id="card-title" elevation="6">
        <v-icon icon="mdi-menu" />
        Menu
      </v-card-title>

      <v-list density="compact">
        <br />
        <v-list-item>
          <v-btn to="/" variant="outlined" elevation="3">Home</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn to="/project-tracker" variant="outlined" elevation="3"
            >Project Tracker</v-btn
          >
        </v-list-item>
        <v-list-item>
          <v-btn to="/about" variant="outlined" elevation="3">About</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn to="/links" variant="outlined" elevation="3">My Links</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn to="/policies" variant="outlined" elevation="3">
            Web Policy
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            href="https://status.hthompson.dev/status/hthompson"
            target="_blank"
            variant="outlined"
            elevation="3"
          >
            Status
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>
