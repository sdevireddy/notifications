import { TrendingUp } from "lucide-react";
import React from "react";
import CountUp from "react-countup";

export const CountCard = ({stat}) => {
    return (
        <div
            className="rounded bg-white p-4 shadow-md"
        >
            <div className="flex justify-between text-sm text-gray-600">
                <span>{stat.label}</span>
                {stat.icon}
            </div>
            <div className="mt-2 text-2xl font-bold">
                <CountUp
                    end={stat.value}
                    duration={2}
                    separator=","
                    prefix={stat.isCurrency ? "₹" : ""}
                />
            </div>
            <p className="mt-1 flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                {stat.growth}
            </p>
        </div>
    );
};

export default CountCard;
