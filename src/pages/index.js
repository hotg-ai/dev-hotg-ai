import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const logEvent = (msg) => {
  try {
    firebase.analytics().logEvent(msg)
  } catch (e) {
    console.warn("Can't find firebase analytics", msg, e)
  }
}

const features = [
  {
    title: 'Development at warp speed',
    subtitle: 'Accelerate development of TinyML apps with Rune',
    imageUrl: 'img/dev_speed.svg',
    description: (
      <>
        Rune is a tiny container specifically designed to help you containerize TinyML applications across several platforms and devices. It is like docker but tinier.
        <br/><br/><code>$ touch ./Runefile.yml</code>
        <br/><code>$ rune build ./Runefile.yml</code>
        <br/><code>$ rune run my.rune</code>
      </>
    ),
  },
  {
    title: 'Automated repeatable deployments',
    subtitle: 'Reliably deploy TinyML models in your apps',
    imageUrl: 'img/reliable_dev.svg',
    description: (
      <>
        Reliable and repeatable builds are the hallmark of production grade systems. Hammer lets you deploy and manage your containers across devices and platforms. 
        <br/><br/><code>$ rune-serve my.rune</code>
      </>
    ),
  },
  {
    title: 'Device native orchestration',
    subtitle: 'Tools and protocols for the Tinyverse',
    imageUrl: 'img/orchestrate.svg',
    description: (
      <>
        We are working on building the orchestration platform for the TinyML universe, we call it <a target="_new" href="https://Tinyverse.substack.com/p/hello-Tinyverse?utm_campaign=post&utm_medium=web&utm_source=hotg-dev">Tinyverse</a>.
        <br/>You can read more about our ideas on <a target="_new" href="https://Tinyverse.substack.com/p/device-native-orchestration-the-future?utm_campaign=post&utm_medium=web&utm_source=hotg-dev">The Future of Orchestration on the Edge</a> blog.
        <br/><br/><code>Rune - Build TinyML apps</code>
        <br/><code>Hammer - Deploy production TinyML apps</code>
        <br/><code>Anvil - Target multiple devices</code>
        <br/><code>Saga - Run and scale production TinyML apps</code>
      </>
    ),
  },
];

function Feature({imageUrl, title, subtitle, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <h4><i>{subtitle}</i></h4>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`TinyML tools from ${siteConfig.title}`}
      description="Making every edge smarter">
      <header className={clsx('hero hero--dark', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            
            <Link
              className={clsx(
                'button button--primary button--lg',
                styles.getStarted,
              )}

              onClick={()=> logEvent('cta-pwa')}
              to="https://runicjs.web.app/?utm_source=hotg.dev&utm_medium=web&utm_campaign=CTA">
              PWA
            </Link>
            <Link
              className={clsx(
                'button button--primary button--lg',
                styles.getStarted,
              )}

              onClick={()=> logEvent('cta-ios')}
              to="https://apps.apple.com/us/app/runic-by-hotg-ai/id1550831458">
              iOS
            </Link>
            <Link
              className={clsx(
                'button button--primary button--lg',
                styles.getStarted,
              )}

              onClick={()=> logEvent('cta-android')}
              to="https://play.google.com/store/apps/details?id=ai.hotg.runicapp&hl=en_US&gl=US">
              Android
            </Link>
            <Link
              className={clsx(
                'button button--primary button--lg',
                styles.getStarted,
              )}

              onClick={()=> logEvent('cta-more')}
              to="https://github.com/hotg-ai/rune/releases">
              More
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
