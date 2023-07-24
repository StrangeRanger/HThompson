<template>
  <h1 class="text-h4">Privacy Policies</h1>
  <v-list lines="three" class="text-left">
    <v-list-item class="text-body-1">
      This Policy describes the information we collect from you, how we use that information and our
      legal basis for doing so. It also covers whether and how that information may be shared and
      your rights and choices regarding the information you provide to us. This Privacy Policy
      applies to the information that we obtain through your use of Random Server websites including
      all of its
    </v-list-item>

    <v-list-item class="text-body-1">
      <v-list-item-title class="text-h5">What We Collect and Receive</v-list-item-title>
      <br />
      In order for us to provide you the best possible experience on our websites, we need to
      collect and process certain information. Depending on your use of the Services, that may
      include:
      <v-list-item>
        <!--<ul>-->
        <li>
          Contact us via email — for example, when you ask for support, send us questions or
          comments, or report a problem, we will collect your name, email address, message, etc. We
          use this data solely in connection with answering the queries we receive.
        </li>
        <li>
          Usage data — when you visit our site, we will store: the website from which you visited us
          from, the parts of our site you visit, the date and duration of your visit, your
          anonymised IP address, information from the device (device type, operating system, screen
          resolution, language, country you are located in, and web browser type) you used during
          your visit, and more. We process this usage data in Matomo Analytics for statistical
          purposes, to improve our site and to recognize and stop any misuse.
        </li>
        <li>
          Cookies — we use cookies (small data files transferred onto computers or devices by sites)
          for record-keeping purposes and to enhance functionality on our site. You may deactivate
          or restrict the transmission of cookies by changing the settings of your web browser.
          Cookies that are already stored may be deleted at any time.
        </li>
        <!--</ul>-->
      </v-list-item>
    </v-list-item>

    <v-list-item class="text-body-1">
      <v-list-item-title class="text-h5">Opting Out</v-list-item-title>
      <br />
      <div id="matomo-opt-out"></div>
    </v-list-item>

    <v-list-item class="text-body-1">
      <v-list-item-title class="text-h5">Your Rights</v-list-item-title>
      <br />
      You have the right to be informed of Personal Data processed by Random Server, a right to
      rectification/correction, erasure and restriction of processing. You also have the right to
      ask from us a structured, common and machine-readable format of Personal Data you provided to
      us. We can only identify you via your email address and we can only adhere to your request and
      provide information if we have Personal Data about you through you having made contact with us
      directly and/or you using our site and/or service. We cannot provide, rectify or delete any
      data that we store on behalf of our users or customers. To exercise any of the rights
      mentioned in this Privacy Policy and/or in the event of questions or comments relating to the
      use of Personal Data you may contact us:
      <a href="mailto:privacy@hthompson.dev">privacy@hthompson.dev</a>. In addition, you have the
      right to lodge a complaint with the data protection authority in your jurisdiction.
    </v-list-item>

    <v-list-item class="text-body-1">
      <v-list-item-title class="text-h5">Subprocessors</v-list-item-title>
      <br />
      We use a select number of trusted external service providers for certain technical data
      processing and/or service offerings. These service providers are carefully selected and meet
      high data protection and security standards. We only share information with them that is
      required for the services offered. Random Server uses the following subprocessors to process
      the data collected by our websites:
      <br /><br />
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Subprocessor</th>
            <th class="text-left">Data location and security</th>
            <th class="text-left">Service</th>
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
      <v-list-item-title class="text-h5">Data Retention</v-list-item-title>
      <br />
      We will retain your information as long as your account is active, as necessary to provide you
      with the services or as otherwise set forth in this Policy. We will also retain and use this
      information as necessary for the purposes set out in this Policy and to the extent necessary
      to comply with our legal obligations, resolve disputes, enforce our agreements and protect
      Random Server’s legal rights. We also collect and maintain aggregated, anonymized or
      pseudonymized information which we may retain indefinitely to protect the safety and security
      of our Site, improve our Services or comply with legal obligations.
    </v-list-item>

    <v-list-item class="text-body-1">
      <v-list-item-title class="text-h5">Contact Us</v-list-item-title>
      <br />
      If you have questions or comments about this notice, you may email us at
      <a href="mailto:privacy@hthompson.dev">privacy@hthompson.dev</a>. We will never sell your
      personal data to anyone.
    </v-list-item>

    <v-list-item class="text-body-1">
      <v-list-item-title class="text-h5">Reusing this Privacy Policy</v-list-item-title>
      <br />
      Before reading further, please, note that none of our team members are lawyers and do not
      provide legal or business advice. You are welcome to reuse and be inspired by this Privacy
      Policy (published under license CC BY) after making sure it complies with the way your website
      tracks, uses and discloses users information. The accuracy, completeness, adequacy of this
      privacy policy cannot be warranted or guaranteed.
    </v-list-item>
  </v-list>
</template>

<script setup lang="js">
// import { useScriptTag } from '@vueuse/core'

const subprocessorsTable = [
  {
    row: 1,
    subprocessor: 'DigitalOcean',
    location: 'California, USA',
    service: 'File and cloud hosting provider.'
  },
  {
    row: 2,
    subprocessor: 'DigitalOcean',
    location: 'California, USA',
    service: 'File and cloud hosting provider.'
  },
  {
    row: 3,
    subprocessor: 'DigitalOcean',
    location: 'California, USA',
    service: 'File and cloud hosting provider.'
  }
]

// useScriptTag(
//   'https://analytics.randomserver.xyz/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=auto&showIntro=1'
// )

/* ****** Matomo opt-out script. ****** */

var settings = {"showIntro":true,"divId":"matomo-opt-out","useSecureCookies":true,"cookiePath":null,"cookieDomain":null,"cookieSameSite":"Lax","OptOutComplete":"Opt-out complete; your visits to this website will not be recorded by the Web Analytics tool.","OptOutCompleteBis":"Note that if you clear your cookies, delete the opt-out cookie, or if you change computers or Web browsers, you will need to perform the opt-out procedure again.","YouMayOptOut2":"You may choose to prevent this website from aggregating and analyzing the actions you take here.","YouMayOptOut3":"Doing so will protect your privacy, but will also prevent the owner from learning from your actions and creating a better experience for you and other users.","OptOutErrorNoCookies":"The tracking opt-out feature requires cookies to be enabled.","OptOutErrorNotHttps":"The tracking opt-out feature may not work because this site was not loaded over HTTPS. Please reload the page to check if your opt out status changed.","YouAreNotOptedOut":"You are not opted out.","UncheckToOptOut":"Uncheck this box to opt-out.","YouAreOptedOut":"You are currently opted out.","CheckToOptIn":"Check this box to opt-in."};
document.addEventListener('DOMContentLoaded', function() {
  window.MatomoConsent.init(settings.useSecureCookies, settings.cookiePath, settings.cookieDomain, settings.cookieSameSite);
  showContent(window.MatomoConsent.hasConsent());
});

function showContent(consent, errorMessage = null, useTracker = false) {

  var errorBlock = '<p style="color: red; font-weight: bold;">';

  var div = document.getElementById(settings.divId);
  if (!div) {
    const warningDiv = document.createElement("div");
    var msg = 'Unable to find opt-out content div: "'+settings.divId+'"';
    warningDiv.id = settings.divId+'-warning';
    warningDiv.innerHTML = errorBlock+msg+'</p>';
    document.body.insertBefore(warningDiv, document.body.firstChild);
    console.log(msg);
    return;
  }

  if (!navigator || !navigator.cookieEnabled) {
    div.innerHTML = errorBlock+settings.OptOutErrorNoCookies+'</p>';
    return;
  }
  if (location.protocol !== 'https:') {
    div.innerHTML = errorBlock+settings.OptOutErrorNotHttps+'</p>';
    return;
  }
  if (errorMessage !== null) {
    div.innerHTML = errorBlock+errorMessage+'</p>';
    return;
  }
  var content = '';
  if (consent) {
    if (settings.showIntro) {
      content += '<p>'+settings.YouMayOptOut2+' '+settings.YouMayOptOut3+'</p>';
    }
    if (useTracker) {
      content += '<input onclick="_paq.push([\'optUserOut\']);showContent(false, null, true);" id="trackVisits" type="checkbox" checked="checked" />';
    } else {
      content += '<input onclick="window.MatomoConsent.consentRevoked();showContent(false);" id="trackVisits" type="checkbox" checked="checked" />';
    }
    content += '<label for="trackVisits"><strong><span>'+settings.YouAreNotOptedOut+' '+settings.UncheckToOptOut+'</span></strong></label>';
  } else {
    if (settings.showIntro) {
      content += '<p>'+settings.OptOutComplete+' '+settings.OptOutCompleteBis+'</p>';
    }
    if (useTracker) {
      content += '<input onclick="_paq.push([\'forgetUserOptOut\']);showContent(true, null, true);" id="trackVisits" type="checkbox" />';
    } else {
      content += '<input onclick="window.MatomoConsent.consentGiven();showContent(true);" id="trackVisits" type="checkbox" />';
    }
    content += '<label for="trackVisits"><strong><span>'+settings.YouAreOptedOut+' '+settings.CheckToOptIn+'</span></strong></label>';
  }
  div.innerHTML = content;
};

window.MatomoConsent = {
  cookiesDisabled: (!navigator || !navigator.cookieEnabled),
  CONSENT_COOKIE_NAME: 'mtm_consent', CONSENT_REMOVED_COOKIE_NAME: 'mtm_consent_removed',
  cookieIsSecure: false, useSecureCookies: true, cookiePath: '', cookieDomain: '', cookieSameSite: 'Lax',
  init: function(useSecureCookies, cookiePath, cookieDomain, cookieSameSite) {
    this.useSecureCookies = useSecureCookies; this.cookiePath = cookiePath;
    this.cookieDomain = cookieDomain; this.cookieSameSite = cookieSameSite;
    if(useSecureCookies && location.protocol !== 'https:') {
      console.log('Error with setting useSecureCookies: You cannot use this option on http.');
    } else {
      this.cookieIsSecure = useSecureCookies;
    }
  },
  hasConsent: function() {
    var consentCookie = this.getCookie(this.CONSENT_COOKIE_NAME);
    var removedCookie = this.getCookie(this.CONSENT_REMOVED_COOKIE_NAME);
    if (!consentCookie && !removedCookie) {
      return true; // No cookies set, so opted in
    }
    if (removedCookie && consentCookie) {
      this.setCookie(this.CONSENT_COOKIE_NAME, '', -129600000);
      return false;
    }
    return (consentCookie || consentCookie !== 0);
  },
  consentGiven: function() {
    this.setCookie(this.CONSENT_REMOVED_COOKIE_NAME, '', -129600000);
    this.setCookie(this.CONSENT_COOKIE_NAME, new Date().getTime(), 946080000000);
  },
  consentRevoked: function() {
    this.setCookie(this.CONSENT_COOKIE_NAME, '', -129600000);
    this.setCookie(this.CONSENT_REMOVED_COOKIE_NAME, new Date().getTime(), 946080000000);
  },
  getCookie: function(cookieName) {
    var cookiePattern = new RegExp('(^|;)[ ]*' + cookieName + '=([^;]*)'), cookieMatch = cookiePattern.exec(document.cookie);
    return cookieMatch ? window.decodeURIComponent(cookieMatch[2]) : 0;
  },
  setCookie: function(cookieName, value, msToExpire) {
    var expiryDate = new Date();
    expiryDate.setTime((new Date().getTime()) + msToExpire);
    document.cookie = cookieName + '=' + window.encodeURIComponent(value) +
      (msToExpire ? ';expires=' + expiryDate.toGMTString() : '') +
      ';path=' + (this.cookiePath || '/') +
      (this.cookieDomain ? ';domain=' + this.cookieDomain : '') +
      (this.cookieIsSecure ? ';secure' : '') +
      ';SameSite=' + this.cookieSameSite;
    if ((!msToExpire || msToExpire >= 0) && this.getCookie(cookieName) !== String(value)) {
      console.log('There was an error setting cookie `' + cookieName + '`. Please check domain and path.');
    }
  }
};
</script>

<style>
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
