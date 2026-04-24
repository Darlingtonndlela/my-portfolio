type HeroProps = {
  name: string;
  focusTitle: string;
  summary: string;
};

export const Hero = ({ name, focusTitle, summary }: HeroProps) => {
  return (
    <div className="relative flex flex-col h-full w-full">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      <div className="relative z-20 px-6 md:px-16 pt-40 pb-12">
        <div className="max-w-4xl rounded-xl border border-[#2A0E61] bg-[#03001499] p-6 md:p-10">
          <p className="text-sm md:text-base text-purple-300">Academic Portfolio</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-3">{name}</h1>
          <h2 className="text-xl md:text-2xl text-cyan-300 mt-4">{focusTitle}</h2>
          <p className="text-gray-300 mt-5 leading-7">{summary}</p>
        </div>
      </div>
    </div>
  );
};
