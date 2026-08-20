import React from "react";

import Cisco from "../assets/partners/cs.png";
import Microsoft from "../assets/partners/ms.jpg";
import Dell from "../assets/partners/dell.jpg";
import HP from "../assets/partners/hp.jpg";
import Intel from "../assets/partners/intel.jpg";
import Lenovo from "../assets/partners/lenovo.png";

const partners = [
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

          {[...partners, ...partners].map((logo, index) => (
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