import React from "react";

export default function AboutCard({ card }) {
  return (
    <div className="relative text-center h-[409px] w-full">
      <img
        src={card.bg}
        alt="Background"
        className="absolute object-cover lg:object-fill z-0 w-full h-full"
      />
      <img
        src={card.img}
        alt="Image"
        className="absolute right-0 bottom-0 object-cover z-10"
      />
      {card.logo && (
        <img
          src={card.logo}
          alt="Logo"
          className="relative top-[25px] lg:scale-150 left-[21px] lg:top-[35px] lg:left-[50px] z-20"
        />
      )}
      <div className="relative z-20 px-[21px] text-left">
        <h3 className="w-[218px] pt-[50px] text-xl lg:text-4xl lg:w-full font-Cabin lg:leading-[45px] italic text-white font-semibold leading-[25px] lg:tracking-wider tracking-tight">
          {card.title}
        </h3>
        <p className="w-[250px] pt-[16px] lg:text-xl font-SFPro lg:w-1/2 lg:leading-9 lg:tracking-wider text-white text-sm font-normal leading-normal tracking-tight">
          {card.description}
        </p>
        {card.text && (
          <p className="w-[232px] lg:mt-3 pt-[15px] pb-[22px] font-SFPro text-white text-sm leading-normal tracking-tight  italic [text-shadow:0px_4px_4px_#0000004c] lg:w-1/2 lg:text-base lg:leading-5 lg:tracking-wider">
            {card.text}
          </p>
        )}
        {card.button && (
          <button className="bg-white hover:shadow-lg text-[#c2a353] py-2.5 px-5 rounded-[10px] lg:mt-3 text-xs font-normal leading-tight tracking-tight lg:px-8 lg:py-3 lg:tracking-wide lg:text-base">
            {card.button}
          </button>
        )}
        {/* Benefits Icons */}
        {card.bene1 && (
          <div className="flex items-center gap-[16px] mt-4">
            <img src={card.iconBene1} alt="Icon 1" className="w-6 h-6" />
            <p className="text-white text-sm w-[101px]">{card.bene1}</p>
          </div>
        )}
        {card.bene2 && (
          <div className="flex items-center gap-[16px] mt-2">
            <img src={card.iconBene2} alt="Icon 2" className="w-6 h-6" />
            <p className="text-white text-sm w-[108px]">{card.bene2}</p>
          </div>
        )}
        {card.bene3 && (
          <div className="flex items-center gap-[16px] mt-2 pb-[18px">
            <img src={card.iconBene3} alt="Icon 3" className="w-6 h-6" />
            <p className="text-white text-sm w-[108px]">{card.bene3}</p>
          </div>
        )}
        {card.button2 && (
          <button className="bg-white text-[#c2a353] py-2.5 px-5 rounded-[10px] text-xs font-normal leading-tight tracking-tight">
            {card.button2}
          </button>
        )}
      </div>
    </div>
  );
}
