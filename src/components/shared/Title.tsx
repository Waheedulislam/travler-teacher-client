type TTitle = {
  title: string;
};
const Title = ({ title }: TTitle) => {
  return (
    <div>
      <div className="text-center px-4">
        <h2 className="text-3xl md:text-5xl lg:mb-4 uppercase font-semibold bg-gradient-to-r from-[#FF700B] to-[#FDC90C] bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Title;
