import React, { useEffect, useState } from 'react';
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

// const features = [
//   {
//     title: 'Development at warp speed',
//     subtitle: 'Accelerate development of TinyML apps with Rune',
//     imageUrl: 'img/dev_speed.svg',
//     description: (
//       <>
//         Rune is a tiny container specifically designed to help you containerize TinyML applications across several platforms and devices. It is like docker but tinier.
//         <br/><br/><code>$ touch ./Runefile.yml</code>
//         <br/><code>$ rune build ./Runefile.yml</code>
//         <br/><code>$ rune run my.rune</code>
//       </>
//     ),
//   },
//   {
//     title: 'Automated repeatable deployments',
//     subtitle: 'Reliably deploy TinyML models in your apps',
//     imageUrl: 'img/reliable_dev.svg',
//     description: (
//       <>
//         Reliable and repeatable builds are the hallmark of production grade systems. Hammer lets you deploy and manage your containers across devices and platforms. 
//         <br/><br/><code>$ rune-serve my.rune</code>
//       </>
//     ),
//   },
//   {
//     title: 'Device native orchestration',
//     subtitle: 'Tools and protocols for the Tinyverse',
//     imageUrl: 'img/orchestrate.svg',
//     description: (
//       <>
//         We are working on building the orchestration platform for the TinyML universe, we call it <a target="_new" href="https://Tinyverse.substack.com/p/hello-Tinyverse?utm_campaign=post&utm_medium=web&utm_source=hotg-dev">Tinyverse</a>.
//         <br/>You can read more about our ideas on <a target="_new" href="https://Tinyverse.substack.com/p/device-native-orchestration-the-future?utm_campaign=post&utm_medium=web&utm_source=hotg-dev">The Future of Orchestration on the Edge</a> blog.
//         <br/><br/><code>Rune - Build TinyML apps</code>
//         <br/><code>Hammer - Deploy production TinyML apps</code>
//         <br/><code>Anvil - Target multiple devices</code>
//         <br/><code>Saga - Run and scale production TinyML apps</code>
//       </>
//     ),
//   },
// ];

// function Feature({imageUrl, title, subtitle, description}) {
//   const imgUrl = useBaseUrl(imageUrl);
//   return (
//     <div className={clsx('col col--4', styles.feature)}>
//       {imgUrl && (
//         <div className="text--center">
//           <img className={styles.featureImage} src={imgUrl} alt={title} />
//         </div>
//       )}
//       <h3>{title}</h3>
//       <h4><i>{subtitle}</i></h4>
//       <p>{description}</p>
//     </div>
//   );
// }

function Badges({}) {
  const [starCount, setStarCount] = useState()

  return (
    <div style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
      <a href="https://github.com/hotg-ai/rune">
        <img style={{marginLeft:"5px", height:"40px"}} alt="GitHub Repo stars" src="https://img.shields.io/github/stars/hotg-ai/rune?style=social" />
      </a>
      <a href="https://discord.gg/gPCNNvRnF4">
      <img style={{marginLeft:"5px", height:"40px"}}  alt="Discord" src={"https://img.shields.io/discord/843552361212805180?logo=discord&style=social"} />
      </a>
      <a href="https://crates.io/crates/hotg-rune-core">
      <img style={{marginLeft:"5px", height:"40px"}}  alt="Crates.io" src={"https://img.shields.io/crates/d/hotg-rune-core?label=crates.io&style=social"} />
      </a>
    </div>
  )
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Rust based containers for ${siteConfig.title}`}
      description="Making every Edge smarter">
      <header className={clsx('hero ', styles.heroBanner)}>
        <div className="container">
        <div className="col col-4 text--center" >
          <div style={{alignItems: "center", justifyContent:"center", flexDirection:"row", display:"flex"}}>
            <div style={{width:"256px", height:"256px", backgroundColor:"#EEE", padding:"20px", borderRadius:"50%"}}>
            <img  src="img/reliable_dev.svg" width="256" style={{ }} />
            </div>
          </div>
        </div>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Badges />
          </div>
        
          {/* <div className={styles.buttons}>
            
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
          </div> */}
        </div>
      </header>
      {/* <main>
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
      </main> */}
    </Layout>
  );
}
