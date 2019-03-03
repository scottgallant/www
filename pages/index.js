import { createRef } from 'react'
import cookies from 'next-cookies'
import DarkToggle from '../components/dark-toggle'
import Head from 'next/head'
import Link from "next/link";

const themes = {
  light: {
    bodyBg: 'white',
    main: 'black'
  },
  dark: {
    bodyBg: 'black',
    main: 'white'
  }
}

export default class Index extends React.Component {
  static async getInitialProps(ctx) {
    return cookies(ctx)
  }

  state = {
    activeTheme: this.props.theme || 'dark'
  }

  setTheme = (activeTheme) => {
    this.setState({ activeTheme })
    document.cookie = `theme=${activeTheme}`
  }

  render() {
    const { activeTheme } = this.state
    const theme = themes[activeTheme]

    return (
    <div>
    <Head>
      <title>Background VC</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/static/favicon.png"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    </Head>
    <div className="wrapper">
      <DarkToggle
        onClick={() => activeTheme === 'light' ? this.setTheme('dark') : this.setTheme('light')}
        activeTheme={activeTheme}
      />
      <div className="intro">
        <div className="logotype">
          <svg
            fill="none"
            viewBox="0 0 340 106"
          >
          <path
            opacity=".9"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 1h338v98H233v1h107V0H0v100h110v-1H1V1zm132 104.7a5.4 5.4 0 0 1-5.6-5.5c0-3.3 2.4-5.5 5.6-5.5 2.1 0 3.5 1 4.3 2.3l-1.6.9a3.2 3.2 0 0 0-2.7-1.6c-2.1 0-3.7 1.6-3.7 3.9 0 2.2 1.6 3.8 3.7 3.8 1.1 0 2.2-.6 2.7-1.5l1.6.8a4.9 4.9 0 0 1-4.3 2.4zm19.3-.2h-2.1l-.8-2h-4.9l-.8 2h-2.1l4.2-10.7h2.3l4.2 10.7zm-3.4-3.7l-2-5.1-1.9 5h3.9zm10.4 3.7h-1.8V94.8h4.7c2.2 0 3.4 1.5 3.4 3.4 0 1.8-1.2 3.3-3.4 3.3h-2.9v4zm2.6-5.6c1 0 1.8-.7 1.8-1.7s-.7-1.7-1.8-1.7h-2.6v3.4h2.6zm11.2 5.6h-1.9V94.8h1.9v10.7zm10.7 0h-1.9v-9h-3.2v-1.7h8.3v1.7h-3.2v9zm17.4 0H199l-.8-2h-4.8l-.8 2h-2.2l4.2-10.7h2.4l4.2 10.7zm-3.5-3.7l-1.9-5.1-2 5h4zm15 3.7h-6.5V94.8h1.9v9h4.7v1.7zm-174-40.3l-2.7.6v.7h12.8c4.8 0 8.2-.7 10.4-2.2a7 7 0 0 0 3.2-6.2 6 6 0 0 0-1.6-4.2c-1-1.1-2.4-2-4-2.5s-3.5-.9-5.6-1v-.2c1.7 0 3.3-.3 4.8-.8a8.2 8.2 0 0 0 3.5-2.2c1-1 1.4-2.2 1.4-3.8 0-2.3-1-4.1-3.2-5.6a17.8 17.8 0 0 0-9.8-2.1H36v.7l2.6.6v28.2zM50.5 49c-.9.5-1.8.8-2.7.8h-2v-13h2c1 0 1.9.3 2.7.8a6 6 0 0 1 2 2.4c.5 1 .8 2.1.8 3.4a7 7 0 0 1-.8 3.3 6 6 0 0 1-2 2.3zm2.6 14.5a5.7 5.7 0 0 1-4.4 1.9h-2.9V50.9h2.9c1.8 0 3.3.6 4.4 2 1.1 1.2 1.7 3 1.7 5.2 0 2.3-.6 4-1.7 5.4zm15.3 2a9.5 9.5 0 0 0 6 1.7c2 0 3.7-.7 5-2l1.4-2 1 1.7c1 1 2.3 1.6 4.1 1.6h4v-.7l-2.7-.6V53.3c0-1.8-.4-3.5-1.3-5a8.8 8.8 0 0 0-3.8-3.3c-1.6-.8-3.6-1.2-5.9-1.2-2.7 0-4.7.5-6 1.4-1.4 1-2.1 2.1-2.1 3.5 0 1 .3 1.8.9 2.4.6.6 1.4.9 2.4.9l1.2-.1.5-.1v-6.6l.7-.3a5 5 0 0 1 1.5-.2c1.7 0 2.9.6 3.7 1.9.8 1.2 1.2 3.4 1.2 6.7v1.3A73.3 73.3 0 0 0 68 56.4c-.4.4-.6.9-.8 1.4a8.2 8.2 0 0 0-.8 3.4c0 1.8.7 3.2 2.1 4.3zm10.8-1.6c-1 1.1-1.9 1.7-3 1.7-.7 0-1.4-.4-1.9-1.2a7 7 0 0 1-.7-3.6 13 13 0 0 1 .9-4.6l1.8-.3 3.9-.2v6.4l-1 1.8zm17 .2c2 2 5 3 8.7 3 1.6 0 3-.3 4.3-.9a7.5 7.5 0 0 0 3-2.5 6 6 0 0 0 1-3.4h-1a5 5 0 0 1-1 2.8c-.5.9-1.3 1.6-2.3 2.1-1 .6-2 .9-3.1.9-1.7 0-3-.8-4-2.4-.9-1.6-1.3-4.3-1.3-8.2 0-4 .4-6.8 1.4-8.4.9-1.6 2.2-2.4 3.9-2.4a5 5 0 0 1 1.5.2l.7.3v6.6h.5c.4.2.8.2 1.2.2 1 0 1.8-.3 2.4-1 .6-.5 1-1.3 1-2.3 0-1.4-.8-2.5-2.1-3.5-1.4-.9-3.4-1.4-6.1-1.4-3.8 0-6.7 1-8.8 3.1-2 2.1-3.1 5-3.1 8.6 0 3.6 1 6.5 3.1 8.6zm23.3 1l-2.7.7v.7h12.3v-.7l-2.6-.6v-8.4l3.7 6a9.6 9.6 0 0 0 2.5 2.8c1 .6 2 .9 3.5.9h5.7v-.7l-2.2-.6-8.6-13.4 5-5.3 3.6-1.3v-.7h-8.4v.7l3.3 1.3-8.1 8.6V39.7c0-2.7-1.3-4-4-4H117v.7l2.7.6v28.2zm28.2 10.2c1.6.4 3.7.7 6.4.7 3.8 0 6.7-.8 8.7-2.2 2-1.5 3-3.4 3-5.8 0-2.2-.7-4-2-5.3-1.2-1.3-3-2-5.1-2h-8.4c-1.3 0-2.2 0-2.7-.3s-.8-.7-.8-1.2c0-.2 0-.4.2-.6l.7-.5.9-.4c1.7.7 3.6 1.1 5.7 1.1 3.1 0 5.6-.7 7.2-2 1.6-1.3 2.5-3 2.5-5.3 0-2-.8-3.7-2.2-5 .2-.5.4-.9.7-1.1.6-.8 1.4-1.1 2.1-1.1v5.3h.5c.4.2.7.2 1 .2.8 0 1.3-.3 1.8-.8a3 3 0 0 0 .7-2c0-1.2-.4-2.1-1-2.8-.7-.7-1.5-1-2.5-1-1.3 0-2.4.4-3.3 1.3l-1 1.3c-.6-.4-1.6-.8-2.7-1.1-1.2-.3-2.4-.4-3.8-.4-3.2 0-5.6.6-7.2 2a6.4 6.4 0 0 0-2.5 5.2 7 7 0 0 0 .7 3.4c.5.9 1.3 1.7 2.4 2.4-.9.3-1.6.6-2.1 1-1.4 1.1-2.1 2.4-2.1 3.8s.6 2.6 1.8 3.5c1.1.9 2.8 1.3 5 1.3h8.4c3.5 0 5.3 1 5.3 2.9 0 1.5-.9 2.8-2.5 3.8-1.7 1-4.3 1.5-7.9 1.5a18 18 0 0 1-5.5-.9V68h-.5l-1.2-.2c-1 0-1.8.3-2.4 1-.6.5-1 1.3-1 2.3 0 .8.4 1.6 1.1 2.4a8 8 0 0 0 3.6 1.8zm8.8-18.8c-.5 1-1.3 1.4-2.2 1.4-1 0-1.7-.4-2.3-1.4-.5-1-.8-2.6-.8-5 0-2.3.3-4 .8-5 .6-.9 1.3-1.3 2.3-1.3 1 0 1.7.4 2.2 1.4.6 1 .9 2.6.9 5 0 2.3-.3 4-.9 5zm17 8.7l-2.7.6v.7h12.4v-.7l-2.7-.6V48.9c.4-.6.8-1.2 1.4-1.8a5.8 5.8 0 0 1 4.1-1.7v6.1l.5.2h1.3c1 0 1.8-.2 2.4-.8.6-.6.9-1.4.9-2.4 0-1.4-.4-2.4-1.2-3.1-.8-.8-2-1.1-3.5-1.1-1.8 0-3.4.6-5 1.7l-1.5 1.8c-.3-.6-.6-1.2-1-1.6a5.2 5.2 0 0 0-4.1-1.7h-4v.7l2.7.6v19.4zm23.2-1.1c2 2 4.9 3 8.5 3 3.7 0 6.5-1 8.6-3 2-2.1 3-5 3-8.6 0-3.6-1-6.5-3-8.6-2-2-5-3-8.6-3-3.6 0-6.5 1-8.5 3-2.1 2.1-3.1 5-3.1 8.6 0 3.6 1 6.5 3 8.6zm11.5-.3c-.8 1.7-1.8 2.5-3 2.5s-2.1-.8-3-2.5c-.8-1.6-1.2-4.4-1.2-8.3 0-3.9.4-6.7 1.3-8.3.8-1.7 1.7-2.5 3-2.5 1 0 2 .8 2.9 2.5.8 1.6 1.2 4.4 1.2 8.3 0 3.9-.4 6.7-1.2 8.3zm18.8 2.3c1.3.7 2.8 1 4.5 1 2 0 3.6-.6 4.9-2 .5-.5 1-1.2 1.4-1.9.2.6.6 1.2 1.1 1.8 1.1 1.1 2.7 1.7 4.9 1.7h.4V45.8l2.7-.6v-.7h-12.4v.7l2.7.6v16.3l-1 1.8c-1 1.1-1.9 1.7-3 1.7-.9 0-1.6-.5-2.3-1.5-.7-1-1-2.4-1-4.2V48.5c0-2.7-1.3-4-4-4h-5.7v.7l2.7.6V60c0 1.2.3 2.4 1 3.5a8 8 0 0 0 3.1 2.7zm25.6-1l-2.6.7v.7h12.3v-.7l-2.6-.6V48.9c.2-.7.6-1.3 1-1.8.8-1.1 1.8-1.7 3-1.7.8 0 1.6.5 2.3 1.5.6 1 1 2.4 1 4.2v11.4c0 2.7 1.3 4 3.9 4h5.7v-.7l-2.6-.6V51c0-1.2-.4-2.4-1.1-3.5a8 8 0 0 0-3-2.7c-1.4-.7-2.9-1-4.5-1-2 0-3.6.6-5 2-.5.5-1 1.1-1.4 1.9a5.2 5.2 0 0 0-5-3.3h-4v.7l2.6.6v19.4zm31.6.7c1.3 1 2.8 1.4 4.6 1.4 2 0 3.6-.7 5-2a8 8 0 0 0 1.4-2c.2.7.5 1.2 1 1.7.9 1 2.3 1.6 4 1.6h4v-.7l-2.7-.6V39.7c0-2.7-1.3-4-4-4H292v.7l2.6.6v8.6l-1.4-.9c-1-.6-2.3-.9-3.7-.9-3 0-5.3 1-7 3-1.8 2-2.6 5-2.6 8.7 0 2.5.4 4.6 1.1 6.4.8 1.7 2 3 3.3 4zm9.3-2c-.9 1.2-1.9 1.8-3 1.8-.9 0-1.7-.7-2.3-2.2-.6-1.5-1-4.1-1-7.9 0-4 .4-6.7 1-8.1.8-1.5 1.7-2.2 3-2.2.7 0 1.5.3 2.3.8l1 1V62l-1 1.8z"
            fill="#000"/>
          </svg>
        </div>
      </div>
      <div className="messages">
        <h3>Founders</h3>
        <div className="line"></div>
        <div className="audios">
          <div className="audio"></div>
          <div className="audio"></div>
          <div className="audio"></div>
          <div className="audio">
            <svg width="18" height="23" viewBox="0 0 18 23" fill="none">
              <path d="M18 11.5L-1.01958e-06 22.3253L-7.32027e-08 0.674682L18 11.5Z" fill="#000"/>
            </svg>
          </div>
          <div className="audio"></div>
          <div className="audio"></div>
          <div className="audio"></div>
        </div>
        <div className="message">
        “Rafael has been a friend to me, and to Instacart, since the beginning.
        He helped us find key employees and tell our story to investors. And
        most importantly, Rafael is extremely easy to work with and always
        willing to help - even on short notice.”
        </div>
        <div className="person">— Max Mullen</div>
        <div className="company">Instacart</div>
        <div className="year">(Partnered in 2012)
          <div className="flag">
            <svg viewBox="0 0 64 64" enableBackground="new 0 0 64 64"><path fill="#ed4c5c" d="M47.971,6.609C43.346,3.693,37.871,2,32,2v4.61H47.971z"/><path fill="#fff" d="M32,11.219h21.625c-1.688-1.755-3.584-3.305-5.654-4.61H32V11.219z"/><path fill="#ed4c5c" d="M32,15.829h25.262c-1.061-1.655-2.279-3.198-3.637-4.61H32V15.829z"/><path fill="#fff" d="m32 20.439h27.688c-.674-1.614-1.49-3.153-2.426-4.61h-25.26v4.61"/><path fill="#ed4c5c" d="m32 25.05h29.18c-.377-1.588-.875-3.13-1.494-4.61h-27.688v4.61"/><path fill="#fff" d="m32 29.659h29.9c-.121-1.574-.363-3.113-.719-4.61h-29.18v4.61"/><path fill="#ed4c5c" d="m61.9 29.659h-29.9v2.341h-30c0 .764.037 1.519.094 2.27h59.813c.054-.751.093-1.506.093-2.27 0-.789-.041-1.568-.1-2.341"/><path fill="#fff" d="m2.801 38.879h58.4c.352-1.496.59-3.037.709-4.609h-59.812c.117 1.572.355 3.113.707 4.609"/><path fill="#ed4c5c" d="m4.283 43.488h55.43c.613-1.48 1.107-3.02 1.48-4.609h-58.4c.373 1.588.867 3.129 1.482 4.609"/><path fill="#fff" d="m6.691 48.1h50.617c.928-1.457 1.738-2.996 2.408-4.609h-55.43c.67 1.613 1.479 3.152 2.408 4.609"/><path fill="#ed4c5c" d="m10.305 52.709h43.39c1.35-1.414 2.561-2.957 3.615-4.611h-50.618c1.055 1.654 2.266 3.197 3.614 4.611"/><path fill="#fff" d="m15.916 57.32h32.17c2.053-1.309 3.936-2.857 5.609-4.609h-43.39c1.674 1.752 3.556 3.301 5.611 4.609"/><path fill="#ed4c5c" d="M32,62c5.92,0,11.434-1.723,16.084-4.682H15.916C20.564,60.277,26.08,62,32,62z"/><path fill="#428bc1" d="m16.03 6.609c-2.068 1.305-3.967 2.854-5.654 4.61-1.355 1.412-2.574 2.955-3.637 4.61-.934 1.457-1.75 2.996-2.426 4.61-.617 1.479-1.115 3.02-1.492 4.61-.355 1.497-.598 3.036-.719 4.61-.06.773-.099 1.552-.099 2.341h30v-2.341-4.61-4.61-4.61-4.61-4.61-4.609c-5.873 0-11.346 1.693-15.973 4.609"/><g fill="#fff"><path d="m25 3l.473 1.481h1.527l-1.236.98.476 1.515-1.24-.9-1.236.924.476-1.542-1.24-.977h1.527z"/><path d="m29 9l.473 1.481h1.527l-1.236.98.476 1.515-1.24-.896-1.236.92.476-1.542-1.24-.977h1.527z"/><path d="m21 9l.473 1.481h1.527l-1.236.98.476 1.515-1.24-.896-1.236.92.472-1.542-1.236-.977h1.527z"/><path d="m25 15l.473 1.481h1.527l-1.236.98.476 1.515-1.24-.896-1.236.92.476-1.542-1.24-.977h1.527z"/><path d="m17 15l.473 1.481h1.527l-1.236.98.472 1.515-1.236-.896-1.236.92.472-1.542-1.236-.977h1.527z"/><path d="m9 15l.473 1.481h1.527l-1.236.98.472 1.515-1.236-.896-1.236.92.472-1.542-1.236-.977h1.527z"/><path d="m29 21l.473 1.481h1.527l-1.236.98.476 1.515-1.24-.896-1.236.92.476-1.542-1.24-.977h1.527z"/><path d="m21 21l.473 1.481h1.527l-1.236.98.476 1.515-1.24-.896-1.236.92.472-1.542-1.236-.977h1.527z"/><path d="m13 21l.473 1.481h1.527l-1.236.98.472 1.515-1.236-.896-1.236.92.472-1.542-1.236-.977h1.527z"/><path d="m25 27l.473 1.482h1.527l-1.236.979.476 1.515-1.24-.896-1.236.92.476-1.542-1.24-.976h1.527z"/><path d="m17 27l.473 1.482h1.527l-1.236.979.472 1.515-1.236-.896-1.236.92.472-1.542-1.236-.976h1.527z"/><path d="m9 27l.473 1.482h1.527l-1.236.979.472 1.515-1.236-.896-1.236.92.472-1.542-1.236-.976h1.527z"/><path d="m11.764 13l1.236-.924 1.236.899-.473-1.514 1.237-.98h-1.527l-.473-1.481-.473 1.482h-1.422c-.016.016-.031.03-.047.046l1.178.931-.472 1.541"/><path d="m3.764 25l1.236-.924 1.236.899-.473-1.514 1.237-.98h-1.527l-.473-1.481-.473 1.482h-.976c-.039.115-.08.228-.117.343l.803.633-.473 1.542"/></g></svg>
          </div>
        </div>
      </div>
      <div className="contact">
        <h3>About Me</h3>
        <div className="line"></div>
        <div className="name">Rafael Corrales</div>
      </div>
      <style jsx>{`
        a {
          text-decoration: none;
          color: ${theme.main};
          transition: all .2s ease;
          border-bottom: 1px solid transparent;
        }

        a:hover {
          border-bottom: 1px solid ${theme.main};
        }
        .audios {
          display: flex;
          margin-bottom: 100px;
        }
        .audio {
          box-sizing: border-box;
          border: 1px solid ${theme.main};
          border-radius: 100%;
          height: 60px;
          width: 60px;
          margin-right: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 4px;
          cursor: pointer;
          transition: border .2s ease;
        }
        .audio path {
          fill: ${theme.main};
          transition: fill .2s ease;
        }
        .audio:hover {
          border: 6px solid;
        }
        .audio:nth-child(4n) {
          border: 8px solid;
        }
        .audio:last-child {
          margin-right: 0;
        }
        .company{
          font-size: 24px;
          font-weight: 900;
          text-align: center;
          text-transform: uppercase;
        }
        .contact {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 100vw;
          flex-direction: column;
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
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 100vw;
          flex-direction: column;
        }
        .message {
          max-width: 980px;
          font-size: 44px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 40px;
          letter-spacing: -1px;
          line-height: 64px;
        }
        .name {
          font-size: 44px;
          font-weight: 600;
          text-align: center;
          line-height: 45px;
          margin-bottom: 10px;
        }
        .person {
          font-size: 44px;
          font-weight: 400;
          text-align: center;
        }
        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 100vw;
          padding: 30px;
          flex-direction: column;
        }
        .year {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .year .flag {
          width: 30px;
          height: auto;
          margin-left: 20px;
        }
        @media (max-width: 375px) {
          .audios {
            margin-bottom: 30px;
          }
          .intro{
            height: 90vh;
          }
          .logotype svg {
            max-width: 100%;
            height: auto;
          }
          .messages {
            height: auto;
            margin-bottom: 100px;
          }
          .message {
            font-size: 44px;
            line-height: 44px;
            text-align: left;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background-color: ${theme.bodyBg};
          color: ${theme.main};
          font-family: "SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
          font-size: 1em;
          font-style: normal;
          font-weight: 400;
          line-height: 1.47059;
          letter-spacing: -.022em;
          margin: 0;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
      `}</style>
      </div>
    </div>
    )
  }
}
