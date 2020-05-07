import { createRef } from 'react';
import cookies from 'next-cookies';
import Head from 'next/head';
import Link from 'next/link';
import DarkToggle from '../components/dark-toggle';
import Quote from '../components/Quote';
import Play from '../components/icons/play';
import Pause from '../components/icons/pause';
import FOUNDERS from '../lib/founders';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';

const themes = {
  light: {
    bodyBg: 'white',
    main: 'black',
  },
  dark: {
    bodyBg: 'black',
    main: 'white',
  },
};

const TRANSITION_DURATION = 400;
const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default class Index extends React.Component {
  // TODO: Doesn't work with getStaticProps
  // static async getInitialProps(ctx) {
  //   return cookies(ctx);
  // }

  state = {
    // TODO: Dark Theme is clashing with Tina right now
    activeTheme: this.props.theme || 'light',
    activeFounder: FOUNDERS['Max Mullen'],
    audioPlaying: false,
  };

  setTheme = (activeTheme) => {
    this.setState({ activeTheme });
    document.cookie = `theme=${activeTheme}`;
  };

  changeFounder = (activeFounder) => {
    if (activeFounder.person === this.state.activeFounder.person) {
      if (this.state.audioPlaying) {
        this.audio.pause();
        this.setState({ audioPlaying: false });
      } else {
        this.audio.play();
        this.setState({ audioPlaying: true });
      }
    } else {
      this.setState({ transitioning: true }, async () => {
        await sleep(TRANSITION_DURATION);

        this.setState({ activeFounder, audioPlaying: true }, () => {
          this.audio.play();

          setTimeout(
            () => this.setState({ transitioning: false }),
            TRANSITION_DURATION / 2
          );
        });
      });
    }
  };

  onAudioEnd = () => {
    const { activeFounder } = this.state;
    const nextFounderIndex =
      Object.keys(FOUNDERS).indexOf(activeFounder.person) + 1;
    const nextFounder =
      Object.values(FOUNDERS)[nextFounderIndex] || Object.values(FOUNDERS)[0];

    this.setState(
      {
        activeFounder: nextFounder,
        audioPlaying: true,
      },
      () => {
        this.audio.play();
      }
    );
  };

  audioRef = (ref) => {
    this.audio = ref.audioEl;
  };

  render() {
    const { activeTheme } = this.state;
    const theme = themes[activeTheme];

    return (
      <div>
        <Head>
          <title>Background VC</title>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <link rel='shortcut icon' href='/static/favicon.png' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
          />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@RafaelCorrales' />
          <meta name='twitter:creator' content='@RafaelCorrales' />
          <meta name='twitter:title' content='Rafael Corrales' />
          <meta name='twitter:description' content='' />
          <meta
            name='twitter:image'
            content='https://raw.githubusercontent.com/backgroundvc/art/master/twitter-card.png'
          />
          <meta property='og:title' content='Rafael Corrales' />
          <meta property='og:type' content='website' />
          <meta property='og:description' content='' />
          <meta property='og:url' content='https://background.vc' />
          <meta
            property='og:image'
            content='https://raw.githubusercontent.com/backgroundvc/art/master/twitter-card.png'
          />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='white' />
        </Head>
        <div className='wrapper'>
          <DarkToggle
            onClick={() =>
              activeTheme === 'light'
                ? this.setTheme('dark')
                : this.setTheme('light')
            }
            activeTheme={activeTheme}
          />
          <div className='intro'>
            <div className='logotype'>
              <svg fill='none' viewBox='0 0 340 106'>
                <path
                  opacity='.9'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1 1h338v98H233v1h107V0H0v100h110v-1H1V1zm132 104.7a5.4 5.4 0 0 1-5.6-5.5c0-3.3 2.4-5.5 5.6-5.5 2.1 0 3.5 1 4.3 2.3l-1.6.9a3.2 3.2 0 0 0-2.7-1.6c-2.1 0-3.7 1.6-3.7 3.9 0 2.2 1.6 3.8 3.7 3.8 1.1 0 2.2-.6 2.7-1.5l1.6.8a4.9 4.9 0 0 1-4.3 2.4zm19.3-.2h-2.1l-.8-2h-4.9l-.8 2h-2.1l4.2-10.7h2.3l4.2 10.7zm-3.4-3.7l-2-5.1-1.9 5h3.9zm10.4 3.7h-1.8V94.8h4.7c2.2 0 3.4 1.5 3.4 3.4 0 1.8-1.2 3.3-3.4 3.3h-2.9v4zm2.6-5.6c1 0 1.8-.7 1.8-1.7s-.7-1.7-1.8-1.7h-2.6v3.4h2.6zm11.2 5.6h-1.9V94.8h1.9v10.7zm10.7 0h-1.9v-9h-3.2v-1.7h8.3v1.7h-3.2v9zm17.4 0H199l-.8-2h-4.8l-.8 2h-2.2l4.2-10.7h2.4l4.2 10.7zm-3.5-3.7l-1.9-5.1-2 5h4zm15 3.7h-6.5V94.8h1.9v9h4.7v1.7zm-174-40.3l-2.7.6v.7h12.8c4.8 0 8.2-.7 10.4-2.2a7 7 0 0 0 3.2-6.2 6 6 0 0 0-1.6-4.2c-1-1.1-2.4-2-4-2.5s-3.5-.9-5.6-1v-.2c1.7 0 3.3-.3 4.8-.8a8.2 8.2 0 0 0 3.5-2.2c1-1 1.4-2.2 1.4-3.8 0-2.3-1-4.1-3.2-5.6a17.8 17.8 0 0 0-9.8-2.1H36v.7l2.6.6v28.2zM50.5 49c-.9.5-1.8.8-2.7.8h-2v-13h2c1 0 1.9.3 2.7.8a6 6 0 0 1 2 2.4c.5 1 .8 2.1.8 3.4a7 7 0 0 1-.8 3.3 6 6 0 0 1-2 2.3zm2.6 14.5a5.7 5.7 0 0 1-4.4 1.9h-2.9V50.9h2.9c1.8 0 3.3.6 4.4 2 1.1 1.2 1.7 3 1.7 5.2 0 2.3-.6 4-1.7 5.4zm15.3 2a9.5 9.5 0 0 0 6 1.7c2 0 3.7-.7 5-2l1.4-2 1 1.7c1 1 2.3 1.6 4.1 1.6h4v-.7l-2.7-.6V53.3c0-1.8-.4-3.5-1.3-5a8.8 8.8 0 0 0-3.8-3.3c-1.6-.8-3.6-1.2-5.9-1.2-2.7 0-4.7.5-6 1.4-1.4 1-2.1 2.1-2.1 3.5 0 1 .3 1.8.9 2.4.6.6 1.4.9 2.4.9l1.2-.1.5-.1v-6.6l.7-.3a5 5 0 0 1 1.5-.2c1.7 0 2.9.6 3.7 1.9.8 1.2 1.2 3.4 1.2 6.7v1.3A73.3 73.3 0 0 0 68 56.4c-.4.4-.6.9-.8 1.4a8.2 8.2 0 0 0-.8 3.4c0 1.8.7 3.2 2.1 4.3zm10.8-1.6c-1 1.1-1.9 1.7-3 1.7-.7 0-1.4-.4-1.9-1.2a7 7 0 0 1-.7-3.6 13 13 0 0 1 .9-4.6l1.8-.3 3.9-.2v6.4l-1 1.8zm17 .2c2 2 5 3 8.7 3 1.6 0 3-.3 4.3-.9a7.5 7.5 0 0 0 3-2.5 6 6 0 0 0 1-3.4h-1a5 5 0 0 1-1 2.8c-.5.9-1.3 1.6-2.3 2.1-1 .6-2 .9-3.1.9-1.7 0-3-.8-4-2.4-.9-1.6-1.3-4.3-1.3-8.2 0-4 .4-6.8 1.4-8.4.9-1.6 2.2-2.4 3.9-2.4a5 5 0 0 1 1.5.2l.7.3v6.6h.5c.4.2.8.2 1.2.2 1 0 1.8-.3 2.4-1 .6-.5 1-1.3 1-2.3 0-1.4-.8-2.5-2.1-3.5-1.4-.9-3.4-1.4-6.1-1.4-3.8 0-6.7 1-8.8 3.1-2 2.1-3.1 5-3.1 8.6 0 3.6 1 6.5 3.1 8.6zm23.3 1l-2.7.7v.7h12.3v-.7l-2.6-.6v-8.4l3.7 6a9.6 9.6 0 0 0 2.5 2.8c1 .6 2 .9 3.5.9h5.7v-.7l-2.2-.6-8.6-13.4 5-5.3 3.6-1.3v-.7h-8.4v.7l3.3 1.3-8.1 8.6V39.7c0-2.7-1.3-4-4-4H117v.7l2.7.6v28.2zm28.2 10.2c1.6.4 3.7.7 6.4.7 3.8 0 6.7-.8 8.7-2.2 2-1.5 3-3.4 3-5.8 0-2.2-.7-4-2-5.3-1.2-1.3-3-2-5.1-2h-8.4c-1.3 0-2.2 0-2.7-.3s-.8-.7-.8-1.2c0-.2 0-.4.2-.6l.7-.5.9-.4c1.7.7 3.6 1.1 5.7 1.1 3.1 0 5.6-.7 7.2-2 1.6-1.3 2.5-3 2.5-5.3 0-2-.8-3.7-2.2-5 .2-.5.4-.9.7-1.1.6-.8 1.4-1.1 2.1-1.1v5.3h.5c.4.2.7.2 1 .2.8 0 1.3-.3 1.8-.8a3 3 0 0 0 .7-2c0-1.2-.4-2.1-1-2.8-.7-.7-1.5-1-2.5-1-1.3 0-2.4.4-3.3 1.3l-1 1.3c-.6-.4-1.6-.8-2.7-1.1-1.2-.3-2.4-.4-3.8-.4-3.2 0-5.6.6-7.2 2a6.4 6.4 0 0 0-2.5 5.2 7 7 0 0 0 .7 3.4c.5.9 1.3 1.7 2.4 2.4-.9.3-1.6.6-2.1 1-1.4 1.1-2.1 2.4-2.1 3.8s.6 2.6 1.8 3.5c1.1.9 2.8 1.3 5 1.3h8.4c3.5 0 5.3 1 5.3 2.9 0 1.5-.9 2.8-2.5 3.8-1.7 1-4.3 1.5-7.9 1.5a18 18 0 0 1-5.5-.9V68h-.5l-1.2-.2c-1 0-1.8.3-2.4 1-.6.5-1 1.3-1 2.3 0 .8.4 1.6 1.1 2.4a8 8 0 0 0 3.6 1.8zm8.8-18.8c-.5 1-1.3 1.4-2.2 1.4-1 0-1.7-.4-2.3-1.4-.5-1-.8-2.6-.8-5 0-2.3.3-4 .8-5 .6-.9 1.3-1.3 2.3-1.3 1 0 1.7.4 2.2 1.4.6 1 .9 2.6.9 5 0 2.3-.3 4-.9 5zm17 8.7l-2.7.6v.7h12.4v-.7l-2.7-.6V48.9c.4-.6.8-1.2 1.4-1.8a5.8 5.8 0 0 1 4.1-1.7v6.1l.5.2h1.3c1 0 1.8-.2 2.4-.8.6-.6.9-1.4.9-2.4 0-1.4-.4-2.4-1.2-3.1-.8-.8-2-1.1-3.5-1.1-1.8 0-3.4.6-5 1.7l-1.5 1.8c-.3-.6-.6-1.2-1-1.6a5.2 5.2 0 0 0-4.1-1.7h-4v.7l2.7.6v19.4zm23.2-1.1c2 2 4.9 3 8.5 3 3.7 0 6.5-1 8.6-3 2-2.1 3-5 3-8.6 0-3.6-1-6.5-3-8.6-2-2-5-3-8.6-3-3.6 0-6.5 1-8.5 3-2.1 2.1-3.1 5-3.1 8.6 0 3.6 1 6.5 3 8.6zm11.5-.3c-.8 1.7-1.8 2.5-3 2.5s-2.1-.8-3-2.5c-.8-1.6-1.2-4.4-1.2-8.3 0-3.9.4-6.7 1.3-8.3.8-1.7 1.7-2.5 3-2.5 1 0 2 .8 2.9 2.5.8 1.6 1.2 4.4 1.2 8.3 0 3.9-.4 6.7-1.2 8.3zm18.8 2.3c1.3.7 2.8 1 4.5 1 2 0 3.6-.6 4.9-2 .5-.5 1-1.2 1.4-1.9.2.6.6 1.2 1.1 1.8 1.1 1.1 2.7 1.7 4.9 1.7h.4V45.8l2.7-.6v-.7h-12.4v.7l2.7.6v16.3l-1 1.8c-1 1.1-1.9 1.7-3 1.7-.9 0-1.6-.5-2.3-1.5-.7-1-1-2.4-1-4.2V48.5c0-2.7-1.3-4-4-4h-5.7v.7l2.7.6V60c0 1.2.3 2.4 1 3.5a8 8 0 0 0 3.1 2.7zm25.6-1l-2.6.7v.7h12.3v-.7l-2.6-.6V48.9c.2-.7.6-1.3 1-1.8.8-1.1 1.8-1.7 3-1.7.8 0 1.6.5 2.3 1.5.6 1 1 2.4 1 4.2v11.4c0 2.7 1.3 4 3.9 4h5.7v-.7l-2.6-.6V51c0-1.2-.4-2.4-1.1-3.5a8 8 0 0 0-3-2.7c-1.4-.7-2.9-1-4.5-1-2 0-3.6.6-5 2-.5.5-1 1.1-1.4 1.9a5.2 5.2 0 0 0-5-3.3h-4v.7l2.6.6v19.4zm31.6.7c1.3 1 2.8 1.4 4.6 1.4 2 0 3.6-.7 5-2a8 8 0 0 0 1.4-2c.2.7.5 1.2 1 1.7.9 1 2.3 1.6 4 1.6h4v-.7l-2.7-.6V39.7c0-2.7-1.3-4-4-4H292v.7l2.6.6v8.6l-1.4-.9c-1-.6-2.3-.9-3.7-.9-3 0-5.3 1-7 3-1.8 2-2.6 5-2.6 8.7 0 2.5.4 4.6 1.1 6.4.8 1.7 2 3 3.3 4zm9.3-2c-.9 1.2-1.9 1.8-3 1.8-.9 0-1.7-.7-2.3-2.2-.6-1.5-1-4.1-1-7.9 0-4 .4-6.7 1-8.1.8-1.5 1.7-2.2 3-2.2.7 0 1.5.3 2.3.8l1 1V62l-1 1.8z'
                  fill='#000'
                />
              </svg>
            </div>
          </div>
          <div className='messages'>
            <h3>Founders</h3>
            <div className='line'></div>
            <div className='audios'>
              {Object.keys(FOUNDERS).map((key) => (
                <button
                  className='audio'
                  style={{
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `100% 100%`,
                    backgroundImage: `url('${FOUNDERS[key].picture}')`,
                  }}
                  key={key}
                  onClick={() => this.changeFounder(FOUNDERS[key])}
                >
                  {this.state.activeFounder.person === key &&
                  this.state.audioPlaying ? (
                    <Pause color={theme.main} />
                  ) : (
                    <div className='play-icon'>
                      <Play color={theme.main} />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <Quote
              transitioning={this.state.transitioning}
              transitionDuration={TRANSITION_DURATION}
              audioRef={this.audioRef}
              onAudioEnd={this.onAudioEnd}
              {...this.state.activeFounder}
            />
          </div>
          <div className='contact'>
            <h3>About Me</h3>
            <div className='line'></div>
            <div className='name'>
              <a
                href='https://www.linkedin.com/in/rafaelcorrales/'
                target='_blank'
              >
                Rafael Corrales
                <svg
                  width='36'
                  height='36'
                  viewBox='0 0 36 36'
                  fill='none'
                  style={{ marginTop: 4 }}
                >
                  <path
                    d='M18 0C8.0595 0 0 8.0595 0 18C0 27.9405 8.0595 36 18 36C27.9405 36 36 27.9405 36 18C36 8.0595 27.9405 0 18 0ZM15 24H12V15H15V24ZM13.5 13.6635C12.5895 13.6635 11.85 12.9195 11.85 12C11.85 11.082 12.588 10.3365 13.5 10.3365C14.412 10.3365 15.15 11.082 15.15 12C15.15 12.9195 14.4105 13.6635 13.5 13.6635ZM25.5 24H22.503V19.7085C22.503 16.887 19.5 17.1255 19.5 19.7085V24H16.5V15H19.5V16.6395C20.808 14.2155 25.5 14.0355 25.5 18.9615V24Z'
                    fill='black'
                  />
                </svg>
              </a>
            </div>
            <div className='funds'>
              <a
                href='https://www.linkedin.com/pulse/introducing-background-capital-rafael-corrales/'
                target='_blank'
              >
                Fund 1
              </a>
              /
              <a
                href='https://www.linkedin.com/pulse/background-capital-fund-2-rafael-corrales/'
                target='_blank'
              >
                Fund 2
              </a>
            </div>
          </div>
          <style jsx>{`
            @keyframes fadein {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            .audios {
              display: flex;
              margin-bottom: 100px;
            }
            .audio {
              box-sizing: border-box;
              border: 0px solid ${theme.main};
              border-radius: 100px;
              height: 60px;
              width: 60px;
              margin-right: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              padding-left: 4px;
              padding-right: 0;
              cursor: pointer;
              transition: border 0.2s ease;
              outline: 0;
              background-color: ${theme.bodyBg};
            }
            .audio .play-icon {
              opacity: 0;
              transition: opacity 0.2s ease;
            }
            .audio path {
              fill: ${theme.main};
              transition: fill 0.2s ease;
            }
            .audio:hover {
              border: 6px solid ${theme.main};
            }

            .audio:hover > .play-icon {
              opacity: 1;
            }
            .audio:last-child {
              margin-right: 0;
            }
            .contact {
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              max-width: 100vw;
              flex-direction: column;
            }
            .funds {
              display: flex;
              justify-content: center;
            }
            .funds a {
              margin-right: 10px;
              margin-left: 10px;
            }
            .handle {
              font-size: 16px;
            }
            .intro {
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              max-width: 100vw;
              flex-direction: column;
            }
            .line {
              border-left: 1px solid ${theme.main};
              height: 100px;
              margin-bottom: 20px;
            }
            .logotype {
              margin-bottom: 50px;
            }
            .logotype path {
              fill: ${theme.main};
            }
            .logotype svg {
              width: 340px;
              height: auto;
            }
            .messages {
              display: flex;
              justify-content: center;
              align-items: center;
              max-width: 100vw;
              flex-direction: column;
            }
            .name {
              font-size: 44px;
              font-weight: 600;
              text-align: center;
              line-height: 45px;
              margin-bottom: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .name a {
              display: flex;
              align-items: center;
            }

            .name a svg {
              margin-left: 10px;
            }

            .name a path {
              fill: ${theme.main};
            }
            .wrapper {
              display: flex;
              justify-content: center;
              align-items: center;
              max-width: 100vw;
              padding: 30px;
              flex-direction: column;
              animation: fadein 2s;
            }
            @media (max-width: 768px) {
              .wrapper {
                padding: 0;
              }
              .audios {
                margin-bottom: 30px;
                flex-wrap: wrap;
                width: 350px;
                justify-content: space-between;
              }
              .audio {
                margin-right: 0;
                margin-bottom: 10px;
              }
              .intro {
                height: 100vh;
              }
              .logotype svg {
                max-width: 100%;
                height: auto;
              }
              .messages {
                height: auto;
                margin-bottom: 100px;
              }
              .name {
                font-size: 34px;
              }
            }
            @media (max-width: 375px) {
              .audios {
                width: 140px;
              }
            }
          `}</style>
          <style global jsx>{`
            a {
              text-decoration: none;
              color: ${theme.main};
              transition: all 0.2s ease;
              border-bottom: 1px solid transparent;
            }
            a:hover {
              border-bottom: 1px solid ${theme.main};
            }
            body {
              background-color: ${theme.bodyBg};
              color: ${theme.main};
              font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue',
                'Helvetica', 'Arial', sans-serif;
              font-size: 1em;
              font-style: normal;
              font-weight: 400;
              line-height: 1.47059;
              letter-spacing: -0.022em;
              margin: 0;
              transition: background-color 0.2s ease, color 0.2s ease;
            }
          `}</style>
        </div>
      </div>
    );
  }
}

export const getStaticProps = async function ({ preview, previewData }) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'lib/founders.json',
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'lib/founders.json',
        data: (await import('../lib/founders.json')).default,
      },
    },
  };
};
