<script setup lang="ts">
import { useScriptTag } from '@vueuse/core'

const subprocessorsTable = [
  {
    row: 1,
    subprocessor: 'DigitalOcean',
    location: 'California, USA',
    service: 'File and cloud hosting provider.'
  },
  {
    row: 2,
    subprocessor: 'Cloudflare',
    location:
      'Cloudflare, as a subprocessor, processes and stores user data across its global network of data centers, which means the data may be held in multiple locations worldwide.',
    service: 'Web performance and security service.'
  }
]

useScriptTag(
  'https://analytics.hthompson.dev/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=auto&showIntro=1'
)
</script>

<template>
  <div>
    <h1 class="text-h4">Privacy Policies</h1>
    <v-list lines="three" class="text-left">
      <v-list-item class="text-body-1">
        This Policy describes the information I collect from you, how I use that information and my
        legal basis for doing so. It also covers whether and how that information may be shared and
        your rights and choices regarding the information you provide to me. This Privacy Policy
        applies to the information that I obtain through your use of HThompson websites including
        all of its subdomains.
      </v-list-item>

      <v-list-item class="text-body-1">
        <v-list-item-title class="text-h5"> What I Collect and Receive </v-list-item-title>
        <br >
        In order to provide you the best possible experience on my websites, I need to collect and
        process certain information. Depending on your use of the Services, that may include:
        <v-list-item>
          <ul>
            <li>
              Contact me via email — for example, when you ask for support, send me questions or
              comments, or report a problem, I will collect your name, email address, message, etc.
              I use this data solely in connection with answering the queries I receive.
            </li>
          </ul>
          <ul>
            <li>
              Usage data — when you visit my site, I will store: the website from which you visited
              me from, the parts of my site you visit, the date and duration of your visit, your
              anonymized IP address, information from the device (device type, operating system,
              screen resolution, language, country you are located in, and web browser type) you
              used during your visit, and more. I process this usage data in Matomo Analytics for
              statistical purposes, to improve my site and to recognize and stop any misuse.
            </li>
          </ul>
          <ul>
            <li>
              Cookies — I use cookies (small data files transferred onto computers or devices by
              sites) for record-keeping purposes and to enhance functionality on my site. You may
              deactivate or restrict the transmission of cookies by changing the settings of your
              web browser. Cookies that are already stored may be deleted at any time.
            </li>
          </ul>
        </v-list-item>
      </v-list-item>

      <v-list-item class="text-body-1">
        <v-list-item-title class="text-h5"> Opting Out </v-list-item-title>
        <br >
        <p class="font-italic">If you don't see the opt out box below, please refresh the page.</p>
        <br >
        <div id="matomo-opt-out" />
      </v-list-item>

      <v-list-item class="text-body-1">
        <v-list-item-title class="text-h5"> Your Rights </v-list-item-title>
        <br >
        You have the right to be informed of Personal Data processed by HThompson, a right to
        rectification/correction, erasure and restriction of processing. You also have the right to
        ask from me a structured, common and machine-readable format of Personal Data you provided
        to me. I can only identify you via your email address and I can only adhere to your request
        and provide information if I have Personal Data about you through you having made contact
        with me directly and/or you using my site and/or service. I cannot provide, rectify or
        delete any data that I store on behalf of my users or customers. To exercise any of the
        rights mentioned in this Privacy Policy and/or in the event of questions or comments
        relating to the use of Personal Data you may contact me:
        <a href="mailto:privacy@hthompson.dev">privacy@hthompson.dev</a>. In addition, you have the
        right to lodge a complaint with the data protection authority in your jurisdiction.
      </v-list-item>

      <v-list-item class="text-body-1">
        <v-list-item-title class="text-h5"> Subprocessors </v-list-item-title>
        <br >
        I use a select number of trusted external service providers for certain technical data
        processing and/or service offerings. These service providers are carefully selected and meet
        high data protection and security standards. I only share information with them that is
        required for the services offered. HThompson uses the following subprocessors to process the
        data collected by our websites:
        <br ><br >
        <v-table>
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
      </v-list-item>

      <v-list-item class="text-body-1">
        <v-list-item-title class="text-h5"> Data Retention </v-list-item-title>
        <br >
        I will retain your information as long as your account is active, as necessary to provide
        you with the services or as otherwise set forth in this Policy. I will also retain and use
        this information as necessary for the purposes set out in this Policy and to the extent
        necessary to comply with my legal obligations, resolve disputes, enforce my agreements and
        protect HThompson's legal rights. I also collect and maintain aggregated, anonymized or
        pseudonymized information which I may retain indefinitely to protect the safety and security
        of my Site, improve my Services or comply with legal obligations.
      </v-list-item>

      <v-list-item class="text-body-1">
        <v-list-item-title class="text-h5"> Contact Me </v-list-item-title>
        <br >
        If you have questions or comments about this notice, you may email me at
        <a href="mailto:privacy@hthompson.dev">privacy@hthompson.dev</a>. I will never sell your
        personal data to anyone.
      </v-list-item>

      <v-list-item class="text-body-1">
        <v-list-item-title class="text-h5"> Reusing this Privacy Policy </v-list-item-title>
        <br >
        Before reading further, please, note that I am not a lawyer and do not provide legal or
        business advice. You are welcome to reuse and be inspired by this Privacy Policy (published
        under license CC BY) after making sure it complies with the way your website tracks, uses
        and discloses users information. The accuracy, completeness, adequacy of this privacy policy
        cannot be warranted or guaranteed.
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped>
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #43494b;
}
</style>
