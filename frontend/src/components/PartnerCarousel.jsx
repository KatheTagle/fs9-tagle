
import React from "react";

import Cisco from "../assets/Partners/cs.png";
import Microsoft from "../assets/Partners/ms.jpg";
import Dell from "../assets/Partners/dell.jpg";
import HP from "../assets/Partners/hp.jpg";
import Intel from "../assets/Partners/intel.jpg";
import Lenovo from "../assets/Partners/lenovo.png";

const Partners = [
  Cisco,
  Microsoft,
  Dell,
  HP,
  Intel,
  Lenovo,
];

const PartnerCarousel = () => {
  return (
    <section className="bg-slate-100 py-14 overflow-hidden">
      <h2 className="mb-10 text-center text-4xl font-bold">
        OUR PARTNERS
      </h2>

      <div className="overflow-hidden">
        <div className="flex w-max animate-[marquee_20s_linear_infinite]">
          {[...Partners, ...Partners].map((logo, index) => (
            <div
              key={index}
              className="mx-6 flex h-36 w-60 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-lg"
            >
              <img
                src={logo}
                alt="Partner"
                className="max-h-20 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerCarousel;
