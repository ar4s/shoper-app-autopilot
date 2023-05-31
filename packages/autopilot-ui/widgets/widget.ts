import Swiper, { Autoplay } from "swiper";
import "swiper/scss";

export const create = (id, widget) => {
  console.log(atob(widget));

  const target = document.getElementById(id);

  if (!target) {
    throw new Error("not found id");
  }

  target.innerHTML = atob(widget);

  new Swiper(`#${id}`, {
    modules: [Autoplay],
    effect: "cards",
    autoplay: {
      delay: 3000,
    },
  });
};
