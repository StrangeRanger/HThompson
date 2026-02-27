export default function AboutPage() {
  return (
    <div>
      <section className="section-card">
        <h1>About Me and This Website</h1>
        <p>Learn more about my background, interests, and the story behind this website.</p>
      </section>

      <section className="section-card details-block">
        <details open>
          <summary>Who am I?</summary>
          <p>
            My name is Hunter, a Computer Science major specializing in Cyber Security at Eastern Washington University.
            My passion for computers and technology, particularly software security, drives my academic and professional
            goals.
          </p>
          <p>
            Beyond my core studies, I have a deep fascination with the infinite wonders of space, which once inspired me
            to consider a career in Astrophysics. I&apos;m also an avid music enthusiast and enjoy immersing myself in the
            diverse worlds of anime.
          </p>
          <p className="info-note">
            <em>This information is outdated and will be updated in the future.</em>
          </p>
        </details>

        <details>
          <summary>What is this website and what is its purpose?</summary>
          <p>
            My journey with hthompson.dev, formerly known as randomserver.xyz, began as a simple project aimed at
            honing my skills in HTML and CSS. It was more than just about building a website; it was about mastering the
            intricacies of web server administration.
          </p>
          <p>
            The year 2023 marked a pivotal moment for the site. Faced with circumstances that necessitated a complete
            overhaul of my web server, I seized this challenge as an opportunity for reinvention.
          </p>
        </details>
      </section>
    </div>
  );
}
