<script setup lang="ts">
import { useScriptTag } from "@vueuse/core";

const subprocessorsTable = [
  {
    row: 1,
    subprocessor: "DigitalOcean",
    location: "California, USA",
    service: "File and cloud hosting provider.",
  },
  {
    row: 2,
    subprocessor: "Cloudflare",
    location:
      "Cloudflare, as a subprocessor, processes and stores user data across its global network of data centers, which means the data may be held in multiple locations worldwide.",
    service: "Web performance and security service.",
  },
];

if (process.env.NODE_ENV !== "development") {
  useScriptTag(
    "https://analytics.hthompson.dev/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=auto&showIntro=1",
  );
}
</script>

<template>
  <v-container class="text-left">
    <v-sheet class="rounded pb-6">
      <h1 class="text-h4 text-center mb-5">Privacy Policies</h1>
      <p class="text-body-1">
        This Policy describes the information I collect from you, how I use that
        information and my legal basis for doing so. It also covers whether and
        how that information may be shared and your rights and choices regarding
        the information you provide to me. This Privacy Policy applies to the
        information that I obtain through your use of HThompson websites
        including all of its subdomains.
      </p>
    </v-sheet>

    <v-sheet class="rounded pb-6 mt-6">
      <h2 class="text-h5 mb-4">What I collect and Receive</h2>
      <p class="text-body-1 mb-4">
        In order to provide you the best possible experience on my websites, I
        need to collect and process certain information. Depending on your use
        of the Services, that may include:
      </p>

      <v-list class="bg-transparent">
        <v-list-item class="px-0">
          <ul>
            <li>
              <strong>Contact me via email</strong> — for example, when you ask
              for support, send me questions or comments, or report a problem, I
              will collect your name, email address, message, etc. I use this
              data solely in connection with answering the queries I receive.
            </li>
            <li>
              <strong>Usage data</strong> — when you visit my site, I will
              store: the website from which you visited me from, the parts of my
              site you visit, the date and duration of your visit, your
              anonymized IP address, information from the device (device type,
              operating system, screen resolution, language, country you are
              located in, and web browser type) you used during your visit, and
              more. I process this usage data in Matomo Analytics for
              statistical purposes, to improve my site and to recognize and stop
              any misuse.
            </li>
            <li>
              <strong>Cookies</strong> — I use cookies (small data files
              transferred onto computers or devices by sites) for record-keeping
              purposes and to enhance functionality on my site. You may
              deactivate or restrict the transmission of cookies by changing the
              settings of your web browser. Cookies that are already stored may
              be deleted at any time.
            </li>
          </ul>
        </v-list-item>
      </v-list>
    </v-sheet>

    <v-sheet class="rounded pb-6 mt-6">
      <h2 class="text-h5 mb-4">Opt Out</h2>
      <v-alert type="info" variant="tonal" class="mb-4">
        If you don't see the opt out box below, please refresh the page.
      </v-alert>
      <div id="matomo-opt-out" />
    </v-sheet>

    <v-sheet class="rounded pb-6 mt-6">
      <h2 class="text-h5 mb-4">Your Rights</h2>
      <p class="text-body-1 mb-4">
        You have the right to be informed of Personal Data processed by
        HThompson, a right to rectification/correction, erasure and restriction
        of processing. You also have the right to ask from me a structured,
        common and machine-readable format of Personal Data you provided to me.
        I can only identify you via your email address and I can only adhere to
        your request and provide information if I have Personal Data about you
        through you having made contact with me directly and/or you using my
        site and/or service. I cannot provide, rectify or delete any data that I
        store on behalf of my users or customers. To exercise any of the rights
        mentioned in this Privacy Policy and/or in the event of questions or
        comments relating to the use of Personal Data you may contact me:
        <a href="mailto:privacy@hthompson.dev">privacy@hthompson.dev</a>. In
        addition, you have the right to lodge a complaint with the data
        protection authority in your jurisdiction.
      </p>
    </v-sheet>

    <v-sheet class="rounded pb-6 mt-6">
      <h2 class="text-h5 mb-4">Subprocessors</h2>
      <p class="text-body-1 mb-4">
        I use a select number of trusted external service providers for certain
        technical data processing and/or service offerings. These service
        providers are carefully selected and meet high data protection and
        security standards. I only share information with them that is required
        for the services offered. HThompson uses the following subprocessors to
        process the data collected by our websites:
      </p>
      <v-table class="table-border" striped="even">
        <thead>
          <tr>
            <th class="text-left" scope="col">Subprocessor</th>
            <th class="text-left" scope="col">Data location and security</th>
            <th class="text-left" scope="col">Service</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in subprocessorsTable" :key="item.row">
            <td>{{ item.subprocessor }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.service }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-sheet>

    <v-sheet class="rounded pb-6 mt-6">
      <h2 class="text-h5 mb-4">Data Retention</h2>
      <p class="text-body-1 mb-4">
        I will retain your information as long as your account is active, as
        necessary to provide you with the services or as otherwise set forth in
        this Policy. I will also retain and use this information as necessary
        for the purposes set out in this Policy and to the extent necessary to
        comply with my legal obligations, resolve disputes, enforce my
        agreements and protect HThompson's legal rights. I also collect and
        maintain aggregated, anonymized or pseudonymized information which I may
        retain indefinitely to protect the safety and security of my Site,
        improve my Services or comply with legal obligations.
      </p>
    </v-sheet>

    <v-sheet class="rounded pb-6 mt-6">
      <h2 class="text-h5 mb-4">Contact Me</h2>
      <p class="text-body-1 mb-4">
        If you have questions or comments about this notice, you may email me at
        <a href="mailto:privacy@hthompson.dev">privacy@hthompson.dev</a>
        . I will <strong>never</strong> sell your personal data to anyone.
      </p>
    </v-sheet>

    <v-sheet class="rounded pb-6 mt-6">
      <h2 class="text-h5 mb-4">Reusing this Privacy Policy</h2>
      <p class="text-body-1 mb-4">
        Before reading further, please, note that I am not a lawyer and do not
        provide legal or business advice. You are welcome to reuse and be
        inspired by this Privacy Policy (published under license CC BY) after
        making sure it complies with the way your website tracks, uses and
        discloses users information. The accuracy, completeness, adequacy of
        this privacy policy cannot be warranted or guaranteed.
      </p>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.table-border {
  border: 1px solid #666464;
}
</style>
