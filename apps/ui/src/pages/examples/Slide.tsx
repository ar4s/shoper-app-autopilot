import React from "react";

interface SlideProps {
  label: string;
}

export const Slide: React.FC<SlideProps> = ({ label }) => {
  return <div className="swiper-slide">{label}</div>;
};
