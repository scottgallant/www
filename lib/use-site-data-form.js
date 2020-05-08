import { useCMS } from "tinacms";
import { useGithubJsonForm } from "react-tinacms-github";

export function useSiteDataForm(file) {
  const cms = useCMS();
  return useGithubJsonForm(file, {
    label: " ",
    fields: [
      {
        name: "founders",
        label: "Founders",
        component: "group-list",
        itemProps: (founder) => ({
          label: founder.name,
        }),
        defaultItem: {
          name: "New Founder",
          picture: "",
          message: "",
          year: 2020,
          link: "",
          audio: "",
          flags: [],
        },
        fields: [
          {
            name: "name",
            component: "text",
            label: "Name",
          },
          {
            name: "picture",
            component: "image",
            label: "Photo",
            parse: (filename) => `/static/avatars/${filename}`,
            uploadDir: () => "/static/avatars/",
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
            name: "audio",
            component: "audio",
            label: "Audio",
            parse: (filename) => `/static/audios/${filename}`,
            uploadDir: () => "/static/audios/",
          },
          {
            name: "flags",
            component: "text",
            label: "Flags",
          },
          // "flags": ["/static/flags/us.svg", "/static/flags/ca.svg"]
        ],
      },
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
}
