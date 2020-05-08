import { useCMS, ActionButton } from "tinacms";
import { useGithubJsonForm } from "react-tinacms-github";
import { exitEditMode } from "./edit-mode";

/**
 * Defines the form for editing the site.
 */
export function useSiteDataForm(file) {
  const cms = useCMS();

  const [values, form] = useGithubJsonForm(file, {
    label: " ",

    fields: [
      /**
       * Founder Array
       *
       * Founders can be added, removed, and reordered
       */
      {
        name: "founders",
        label: "Founders",
        component: "group-list",
        itemProps: (founder) => ({
          // This let's us set the label for the listed items
          label: founder.name,
        }),
        // This is the default data structure for new items
        defaultItem: {
          name: "New Founder",
          picture: "",
          message: "",
          year: 2020,
          link: "",
          audio: "",
          flags: [],
        },
        // Here's the fields each Founder has
        fields: [
          {
            name: "name",
            component: "text",
            label: "Name",
          },
          {
            // Images will be committed to Git via the GitHub API.
            name: "picture",
            component: "image",
            label: "Photo",
            // This is the value that gets stored in the json file
            parse: (filename) => `/static/avatars/${filename}`,
            // This is the path to the directory that holds the images
            uploadDir: () => "/static/avatars/",
            // New images aren't on the server production server, so we need
            // to be able to generate a preview URL when editing the site
            previewSrc: (formValues, props) => {
              const repo = cms.api.github.workingRepoFullName;
              const branch = cms.api.github.branchName;
              const file = props.input.value;
              return `https://raw.githubusercontent.com/${repo}/${branch}/${file}`;
            },
          },
          {
            name: "message",
            component: "textarea",
            label: "Quote",
          },
          {
            name: "year",
            description: 'For "Partnered in YYYY"',
            component: "number",
            label: "Year",
          },
          {
            name: "link",
            component: "text",
            label: "Link",
            validate(value) {
              if (!value.startsWith("https://")) {
                return "Must begin with `https://`";
              }
            },
          },
          {
            // tinacms doesn't actually have an audio field
            // This is actually a custom field plugin I made for this site.
            // checkout the source in lib/audio-field-plugin.js
            name: "audio",
            component: "audio",
            label: "Audio",
            // It works similar to image, but I removed the need for the previewSrc
            parse: (filename) => `/static/audios/${filename}`,
            uploadDir: () => "/static/audios/",
          },
          {
            name: "flags",
            component: "flag-select",
            label: "Flags",
          },
          // "flags": ["/static/flags/us.svg", "/static/flags/ca.svg"]
        ],
      },
      /**
       * Links Array
       */
      {
        name: "links",
        label: "Links",
        component: "group-list",
        itemProps: (links) => ({
          label: links.text,
        }),
        defaultItem: {
          text: "Fund X",
          url: "",
        },
        fields: [
          {
            name: "text",
            component: "text",
            label: "Text",
          },
          {
            name: "url",
            component: "text",
            label: "URL",
            validate(value) {
              if (!value.startsWith("https://")) {
                return "Must begin with `https://`";
              }
            },
          },
        ],
      },
    ],
  });

  /**
   * This is a hack around bug.
   *
   * The actions array should be passed into the above call, but
   * it's not being handled properly
   *
   * https://github.com/tinacms/tinacms/pull/1114
   */
  React.useEffect(() => {
    form.actions = [
      () => <ActionButton onClick={exitEditMode}>Stop Editing</ActionButton>,
    ];
  }, [form]);

  return [values, form];
}
