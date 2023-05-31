import React from "react";

import { Slide } from "./Slide";

interface SlideConfig {
  label: string;
}

interface Config {
  slides: SlideConfig[];
}

interface Props {
  config: Config;
}

export const Swiper: React.FC<Props> = ({ config }) => {
  return (
    <div className="swiper-wrapper">
      {config.slides.map((v) => (
        <Slide key={v.label} label={v.label} />
      ))}
    </div>
  );
};
