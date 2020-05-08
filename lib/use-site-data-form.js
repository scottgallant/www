export function useSiteDataForm(file) {
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
            component: "text",
            label: "Photo",
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
            component: "text",
            label: "Audio",
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
