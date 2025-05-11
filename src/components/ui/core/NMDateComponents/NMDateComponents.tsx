import { FaCalendarAlt } from "react-icons/fa";
import { Button } from "../../button";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { Card } from "../../card";

const NMDateComponents = () => {
  return (
    <div>
      <Card className="mx-auto rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-white/40 w-full max-w-4xl">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-6 p-6">
          {/* Location */}
          <div className="flex items-center gap-2 min-w-[150px] flex-1">
            <div className="border border-[#1E93A6] rounded-xl p-3 flex items-center justify-center">
              <FaLocationDot className="text-[#1E93A6] h-5 w-5" />
            </div>
            <div className="flex flex-col text-base">
              <span className="text-muted-foreground">Страна</span>
              <span className="font-medium text-[#FF8926]">Sen martin</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 min-w-[150px] flex-1">
            <div className="border border-[#1E93A6] rounded-xl p-3 flex items-center justify-center">
              <BsCurrencyDollar className="text-[#1E93A6] h-5 w-5" />
            </div>
            <div className="flex flex-col text-base">
              <span className="text-muted-foreground">Цена</span>
              <span className="font-medium text-[#FF8926]">$800 - $1000</span>
            </div>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-2 min-w-[160px] flex-1">
            <div className="border border-[#1E93A6] rounded-xl p-3 flex items-center justify-center">
              <FaCalendarAlt className="text-[#1E93A6] h-5 w-5" />
            </div>
            <div className="flex flex-col text-base">
              <span className="text-muted-foreground">Дата</span>
              <span className="font-medium text-[#FF8926]">$800 - $1000</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-gradient-to-r from-[#FF700B] to-[#FDC90C] text-white px-6 py-4 rounded-xl shadow-md hover:opacity-90 transition font-semibold text-base">
              Найти учителя
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NMDateComponents;
