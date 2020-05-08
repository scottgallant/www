import * as React from "react";
import Select from "react-select";
import { wrapFieldsWithMeta } from "@tinacms/fields";

const options = [
  { value: "/static/flags/ba.svg", label: "ba" },
  { value: "/static/flags/be.svg", label: "be" },
  { value: "/static/flags/ca.svg", label: "ca" },
  { value: "/static/flags/cu.svg", label: "cu" },
  { value: "/static/flags/do.svg", label: "do" },
  { value: "/static/flags/en.svg", label: "en" },
  { value: "/static/flags/ir.svg", label: "ir" },
  { value: "/static/flags/ru.svg", label: "ru" },
  { value: "/static/flags/us.svg", label: "us" },
];

export const MultiSelect = wrapFieldsWithMeta((props) => {
  const selectedOption = options.filter((o) =>
    props.input.value.includes(o.value)
  );

  return (
    <Select
      isMulti
      options={options}
      value={selectedOption}
      onChange={(options) => {
        props.input.onChange(options.map(({ value }) => value));
      }}
    />
  );
});

export const FlagSelectFieldPlugin = {
  __type: "field",
  name: "flag-select",
  Component: MultiSelect,
  parse: (value) => value || [],
};
