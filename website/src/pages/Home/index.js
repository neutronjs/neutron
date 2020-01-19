import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

import api from '../../services/api';
import NeutronTerminal from '../../components/Terminal';

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const [version, setVersion] = useState('v.X.Y.Z');

  useEffect(() => {
    api.get('/repos/neutronjs/neutron-cli/tags').then((response) => {
      if (response.status === 200 && response.data.length > 0) {
        const [{ name }] = response.data;
        setVersion(name);
      }
    });
  }, []);

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Neutron JS was born to help developers create new react projects with Redux + Redux Saga."
      keywords={[
        'neutron',
        'js',
        'cli',
        'javascript',
        'react',
        'native',
        'redux',
        'saga',
        'duck',
        'styled',
        'components',
      ]}
      image="img/neutron-banner.png"
    >
      <header className={classnames('hero', styles.heroBanner)}>
        <div className="container">
          <h1 className={classnames('hero__title', styles.title)}>
            {
              'Neutron JS was born to help developers create new react projects with '
            }
            <a
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux
            </a>
            {' + '}
            <a
              href="https://redux-saga.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux Saga
            </a>
            .
          </h1>
          <p className={classnames('hero__subtitle', styles.subTitle)}>
            {siteConfig.tagline}
          </p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/introduction/getting-started')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.content}>
          <div className="container">
            <div className="row">
              <div className={classnames('col col--4')}>
                <section className={styles.content}>
                  <div className="container">
                    <div className="row">
                      <div className={classnames('col col--12')}>
                        <div
                          className={classnames(
                            'text--center',
                            styles.neutronInfo,
                          )}
                        >
                          <img
                            className={styles.neutronLogoWhite}
                            alt="Neutron JS"
                            src="/img/logo-white.svg"
                          />
                          <img
                            className={styles.neutronLogoBlack}
                            alt="Neutron JS"
                            src="/img/logo-black.svg"
                          />
                          <p className={styles.neutronInstallInformation}>
                            Install the Neutron JS CLI using Yarn or NPM:
                          </p>
                          <code className={styles.neutronInstallCommand}>
                            {'$ '}
                            <b>yarn</b>
                            {' global add '}
                            <b>@neutronjs/cli</b>
                          </code>
                          <code className={styles.neutronInstallCommand}>
                            {'$ '}
                            <b>npm</b>
                            {' install -g '}
                            <b>@neutronjs/cli</b>
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className={classnames('col col--8')}>
                <NeutronTerminal version={version} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
