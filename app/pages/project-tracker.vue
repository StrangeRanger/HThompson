<script setup lang="ts">
const username = "StrangeRanger";
const repoProjects: any[] = await fetchAllPublicRepos(username);
const gists: any[] = await fetchAllPublicGists(username);
const githubProjects: any[] = [...repoProjects, ...gists];

const headers = [
  { title: "Project Name", key: "name", sortable: true },
  { title: "Type", key: "type", sortable: true },
  { title: "Status", key: "status", sortable: true },
  { title: "Last Commit", key: "lastCommitRelative", sortable: true },
  { title: "Description", key: "description", sortable: true },
];

const badgeDescriptions = [
  {
    row: 1,
    statusBadge: "personal",
    description:
      "Indicates that the project or document is tailored to my personal needs and will be updated as required. Typically, it reflects my current setup, usage, or preferences.",
  },
  {
    row: 2,
    statusBadge: "active",
    description:
      "The project is stable and fully functional, with ongoing development and regular updates. New features and improvements are continuously being added.",
  },
  {
    row: 3,
    statusBadge: "maintained",
    description:
      "The project is stable and functional, receiving updates primarily for bug fixes and minor improvements. Active development is minimal but ongoing as needed.",
  },
  {
    row: 4,
    statusBadge: "inactive",
    description:
      "Development on the project has paused, but it remains in a stable and usable state. Future work may resume, but there are currently no active updates or enhancements.",
  },
  {
    row: 5,
    statusBadge: "finished",
    description:
      "The project is complete and fully functional. While no active development is planned, updates may occur if essential fixes or changes are necessary. Combines aspects of both Maintained and Unsupported statuses.",
  },
  {
    row: 6,
    statusBadge: "unsupported",
    description:
      "The project is stable and usable, but active development has ceased. No further updates are planned, and users may need to seek alternative maintainers or solutions if issues arise.",
  },
  // {  // Disabled for now, though it may be reintroduced later.
  //   row: 7,
  //   statusBadge: "continuous",
  //   description: "The project is under ongoing development with a focus on gradual improvements and enhancements. The development pace is steady but less rapid than that of active projects, blending elements of active and maintained statuses.",
  // },
  {
    row: 7,
    statusBadge: "concept",
    description:
      "Represents an early-stage project or proof-of-concept with minimal implementation. Intended for demonstration, experimentation, or initial exploration without full functionality.",
  },
  {
    row: 8,
    statusBadge: "wip",
    description:
      "Development is actively underway, but the project has yet to reach a stable or publicly usable state. Ongoing work is focused on achieving initial functionality and stability.",
  },
  {
    row: 9,
    statusBadge: "suspended",
    description:
      "Development has been temporarily halted after initial progress. The project remains in a usable state, with intentions to resume work in the future, pending circumstances.",
  },
  {
    row: 10,
    statusBadge: "abandoned",
    description:
      "The project has been discontinued and will no longer receive updates or support. Users are encouraged to seek alternatives or fork the project if continued development is desired. Assume the project has been archived.",
  },
  {
    row: 11,
    statusBadge: "archived",
    description:
      "The project has been officially archived, meaning it is no longer maintained or supported. It serves as a historical reference, and no further changes will be made unless specified otherwise.",
  },
  {
    row: 12,
    statusBadge: "moved",
    description:
      "The project has been relocated to a new repository or platform. The new location is the authoritative source, and all future updates and maintenance will occur there. Assume the project has been archived.",
  },
  {
    row: 13,
    statusBadge: "unspecified",
    description:
      "The project status is not explicitly defined or documented. This status is usually reserved for projects that don't need a specific status. For example, a <a href='https://github.com/StrangeRanger/StrangeRanger' target='_blank'>GitHub user's public profile page</a> will have this status, as it's not a traditional software project.",
  },
  {
    row: 14,
    statusBadge: "unknown",
    description:
      "The project status is not known or has not been determined. This status is typically used when the project is new, lacks documentation, is a fork, or has not been categorized yet.",
  },
];

// For debugging purposes, you can log the fetched repositories and gists.
// console.log(repoProjects);
// console.log(gists);
</script>

<template>
  <v-container>
    <v-sheet class="rounded">
      <h2 class="text-h4 mb-5">Project Tracker</h2>
      <p class="text-body-1 text-left mb-4">
        This page offers a comprehensive list of all the projects I am working
        on, plan to work on, and have completed. Next to each project, you will
        find details specifying the type of project, its current status, and the
        date of the last commit. For explanations of the badges used here,
        please refer to the
        <NuxtLink to="#badge-descriptions">
          <span>Badge Descriptions</span>
        </NuxtLink>
        section at the bottom of this page.
      </p>
    </v-sheet>

    <v-sheet class="rounded">
      <v-data-table-virtual
        :headers="headers"
        :items="githubProjects"
        :sort-by="[{ key: 'type', order: 'desc' }]"
        :items-per-page="-1"
        :loading="!githubProjects.length"
        :loading-text="'Loading projects...'"
        class="table-border text-left"
        striped="even"
        hide-default-footer
      >
        <template v-slot:item.name="{ item }">
          <a :href="item.url" target="_blank">{{ item.name }}</a>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColors(item.status)" variant="outlined">{{
            item.status
          }}</v-chip>
        </template>
        <template v-slot:item.lastCommitRelative="{ item }">
          <v-chip color="white" variant="outlined">{{
            item.lastCommitRelative
          }}</v-chip>
        </template>
      </v-data-table-virtual>
    </v-sheet>

    <v-divider class="mb-12 mt-12"></v-divider>

    <v-sheet class="rounded">
      <h2 class="text-h4 mb-5" id="badge-descriptions">Badge Descriptions</h2>
      <v-table class="text-left elevation-3 table-border" striped="even">
        <thead>
          <tr>
            <th scope="col">Repo Status</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in badgeDescriptions" :key="item.row">
            <td>
              <v-chip
                :color="getStatusColors(item.statusBadge)"
                variant="outlined"
              >
                {{ item.statusBadge }}
              </v-chip>
            </td>
            <td v-html="item.description"></td>
          </tr>
        </tbody>
      </v-table>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.table-border {
  border: 1px solid #666464;
}
</style>
