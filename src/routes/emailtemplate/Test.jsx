import React, { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { TbBlocks } from "react-icons/tb";
import { Si9Gag } from "react-icons/si";
import { RxButton } from "react-icons/rx";
import { RxDividerHorizontal } from "react-icons/rx";
import { CgFormatText } from "react-icons/cg";
import { FaHeading } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
const types = [
    {
        name: "Content",
        icon: <BiCategory />,
    },
    {
        name: "Blocks",
        icon: <TbBlocks />,
    },
    {
        name: "Body",
        icon: <Si9Gag />,
    },
];

const typeOptions = {
    Content: [
        {
            name: "Button",
            icon: <RxButton />,
        },
        {
            name: "Divider",
            icon: <RxDividerHorizontal />,
        },
        {
            name: "Heading",
            icon: <FaHeading />,
        },
        {
            name: "Text",
            icon: <CgFormatText />,
        },
        {
            name: "Image",
            icon: <FaImage />,
        },
        {
            name: "HTML",
            icon: <FaCode />,
        },
    ],
    Blocks: [
        {
            blocks: 1,
            per: ["100%"],
        },
        {
            blocks: 2,
            per: ["50%", "50%"],
        },
        {
            blocks: 3,
            per: ["33%", "33%", "33%"],
        },
        {
            blocks: 4,
            per: ["25%", "25%", "25%", "25%"],
        },
        {
            blocks: 2,
            per: ["33%", "67%"],
        },
        {
            blocks: 2,
            per: ["67%", "33%"],
        },
    ],
    Body: [],
};
const TemplateBuilder = () => {
    const [selectedType, setSelectedType] = useState("Content");
    return (
        <section className="flex h-full">
            {/* //types */}
            <div className="min-h-full min-w-20 border border-r-gray-400 bg-white">
                {types.map((el, ind) => {
                    return (
                        <div
                            key={ind}
                            className="relative flex cursor-pointer flex-col items-center justify-center gap-2 py-2 selection-"
                            onClick={() => setSelectedType(el.name)}
                        >
                            {el.icon}
                            <p>{el.name}</p>
                            {selectedType == el.name && (
                                <div className="absolute -right-[0.4rem] h-3 w-3 rotate-45 border border-b-0 border-l-0 border-r-gray-400 border-t-gray-400 bg-white" />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* typeoptions */}
            <div className="h-full w-[300px] bg-white">
                <div className="container mx-auto h-full border border-r-gray-400">
                    {/* content */}
                    {selectedType == "Content" && (
                        <div className="flex flex-wrap gap-4 px-3 py-2 ">
                            {typeOptions[selectedType].map((el, ind) => (
                                <div
                                    key={ind}
                                    className="flex w-20 cursor-pointer flex-col items-center justify-center gap-2 rounded border border-gray-300 px-1 py-2 shadow-sm select-none"
                                >
                                    {el.icon}
                                    <p>{el.name}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* blocks */}

                    {
                        selectedType=="Blocks"&& (
                            <div className="flex flex-col gap-3 py-3  h-full">
                                {
                                    typeOptions[selectedType].map((el,ind)=>(
                                        <div key={ind} className="flex w-full px-2 cursor-move">
                                            {
                                                el.per.map((p,ind)=>(
                                                    <div key={ind} style={{ width: p }} className={`h-10  bg-gray-100 border border-dotted border-collapse border-gray-500`}>
                                                        <p className="text-center font-weight-[100] pt-2 select-none">{p}</p>
                                                    </div>
                                                ))
                                            }
                                            </div>
                                    ))
                                }
                                </div>
                        )
                    }

                    {/* body */}
                    {
                        selectedType=="Body"&& (
                            <div>
                                </div>
                        )
                    }
                </div>
            </div>

            {/* canva */}
            <div className="flex-1  h-full p-3">
                <div className="bg-blue-200 h-full overflow-auto">

                </div>

            </div>
        </section>
    );
};

export default TemplateBuilder;
