import App from "next/app";
import { TinaCMS, TinaProvider } from "tinacms";
import {
  useGithubEditing,
  GithubClient,
  TinacmsGithubProvider,
  GithubMediaStore,
} from "react-tinacms-github";
import { AudioFieldPlugin } from "../lib/audio-field-plugin";
import { FlagSelectFieldPlugin } from "../lib/flag-select-plugin";
import { enterEditMode, exitEditMode } from "../lib/edit-mode";

export default class Site extends App {
  constructor(props) {
    super(props);
    /**
     * 1. Create the TinaCMS instance
     */
    this.cms = new TinaCMS({
      plugins: [AudioFieldPlugin, FlagSelectFieldPlugin],
      apis: {
        /**
         * 2. Register the GithubClient
         */
        github: new GithubClient({
          proxy: "/api/proxy-github",
          authCallbackRoute: "/api/create-github-access-token",
          clientId: process.env.GITHUB_CLIENT_ID,
          baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
        }),
      },
      /**
       * 3. Hide the Sidebar & Toolbar
       *    unless we're in Preview/Edit Mode
       */
      sidebar: {
        hidden: !props.pageProps.preview,
      },
      toolbar: {
        hidden: !props.pageProps.preview,
      },
    });
    this.cms.media.store = new GithubMediaStore(this.cms.api.github);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      /**
       * 4. Wrap the page Component with the Tina and Github providers
       */
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider
          editMode={pageProps.preview}
          enterEditMode={enterEditMode}
          exitEditMode={exitEditMode}
          error={pageProps.error}
        >
          {/**
           * 5. Add a button for entering Preview/Edit Mode
           */}
          <Component {...pageProps} />
          <EditLink editMode={pageProps.preview} />
        </TinacmsGithubProvider>
      </TinaProvider>
    );
  }
}

export const EditLink = ({ editMode }) => {
  const github = useGithubEditing();
  const [pending, setPending] = React.useState(false);

  const style = {
    margin: "2.5rem 0 2.5rem 0",
    width: "100%",
    border: "none",
    background: "transparent",
  };

  return (
    <button
      style={style}
      onClick={() => {
        setPending(true);
        if (editMode) {
          github.exitEditMode();
        } else {
          github.enterEditMode();
        }
      }}
    >
      {pending && "One Moment..."}
      {!pending && (editMode ? "Click to Stop Editing" : "Click to Edit")}
    </button>
  );
};
