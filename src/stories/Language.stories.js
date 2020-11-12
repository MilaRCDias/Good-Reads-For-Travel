import React from "react";
import LanguadeSelection from "../components/LanguageSelection/index";

export default {
  title: "Components/Language Selection",
  component: LanguadeSelection,
};

export const template = () => {
  return <LanguadeSelection />;
};

template.story = {
  name: "Default",
};
