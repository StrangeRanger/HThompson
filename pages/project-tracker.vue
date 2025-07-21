<script setup lang="ts">
import { fetchAllPublicRepos, getStatusColors } from "~/composables/useGithub";

const username = "StrangeRanger";
const repoProjects = await fetchAllPublicRepos(username);

const headers = [
  { title: "Project Name", key: "name", sortable: true },
  { title: "Type", key: "type", sortable: true },
  { title: "Status", key: "status", sortable: true },
  { title: "Last Commit", key: "lastCommitRelative", sortable: true },
  { title: "Description", key: "description", sortable: true },
];

// For debugging purposes, you can log the fetched repositories.
// console.log(repoProjects);
</script>

<template>
  <div>
    <h1 class="text-h4">Project Tracker</h1>
    <br />
    <p class="text-left">
      This page offers a comprehensive list of all the projects I am working on,
      plan to work on, and have completed. Next to each project, you will find
      details specifying the type of project, its current status, and the date
      of the last commit. For explanations of the badges used here, please refer
      to the Badge Descriptions section at the bottom of this page.
    </p>
    <br />
    <div class="text-left">
      <v-data-table
        :headers="headers"
        :items="repoProjects"
        :sort-by="[{ key: 'type', order: 'asc' }]"
        :items-per-page="-1"
        class="elevation-3 table-border"
      >
        <template v-slot:item.name="{ item }">
          <a :href="item.url" target="_blank">{{ item.name }}</a>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColors(item.status)" variant="outlined">{{
            item.statusa
          }}</v-chip>
        </template>
        <template v-slot:item.lastCommitRelative="{ item }">
          <v-chip color="white" variant="outlined">{{
            item.lastCommitRelative
          }}</v-chip>
        </template>
      </v-data-table>
    </div>
    <br />
    <div>
      <p>
        <strong>NOTE:</strong> The list above does not currently track any Gists
        or Contributions. These will be added at a later date.
      </p>
    </div>
  </div>
</template>

<style scoped>
.table-border {
  border: 1px solid #666464;
}
</style>
