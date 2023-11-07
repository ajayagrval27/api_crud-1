import React, { useState } from "react"

let menuArr = [
    {
        menuName: "Home",
        contentName: "Home Content",
        content:
            "Home Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae cupiditate consequuntur repellendus facere incidunt. Reprehenderit voluptatum eligendi numquam? Enim odit similique fuga sequi eaque! Doloribus at aspernatur totam alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae cupiditate consequuntur repellendus facere incidunt. Reprehenderit voluptatum eligendi numquam? Enim odit similique fuga sequi eaque! Doloribus at aspernatur totam alias.",
    },
    {
        menuName: "About",
        contentName: "About Content",
        content:
            "About Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae cupiditate consequuntur repellendus facere incidunt. Reprehenderit voluptatum eligendi numquam? Enim odit similique fuga sequi eaque! Doloribus at aspernatur totam alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae cupiditate consequuntur repellendus facere incidunt. Reprehenderit voluptatum eligendi numquam? Enim odit similique fuga sequi eaque! Doloribus at aspernatur totam alias.",
    },
    {
        menuName: "Contact",
        contentName: "Contact Content",
        content:
            "Contact Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae cupiditate consequuntur repellendus facere incidunt. Reprehenderit voluptatum eligendi numquam? Enim odit similique fuga sequi eaque! Doloribus at aspernatur totam alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae cupiditate consequuntur repellendus facere incidunt. Reprehenderit voluptatum eligendi numquam? Enim odit similique fuga sequi eaque! Doloribus at aspernatur totam alias.",
    },
    {
        menuName: "Service",
        contentName: "Service Content",
        content:
            "Service Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae cupiditate consequuntur repellendus facere incidunt. Reprehenderit voluptatum eligendi numquam? Enim odit similique fuga sequi eaque! Doloribus at aspernatur totam alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae cupiditate consequuntur repellendus facere incidunt. Reprehenderit voluptatum eligendi numquam? Enim odit similique fuga sequi eaque! Doloribus at aspernatur totam alias.",
    },
]

const TabView = () => {
    let [value, setvalue] = useState(menuArr[0])

    return (
        <>
            <div className="container border border-2 mt-5 p-2">
                <div className="allMenu">
                    {menuArr.map((menuObj, index) => {
                        return (
                            <div
                                key={index}
                                className={`menu ${
                                    menuObj.menuName === value.menuName
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() => {
                                    setvalue(menuObj)
                                }}>
                                {menuObj.menuName}
                            </div>
                        )
                    })}
                </div>
                <div>
                    {menuArr.map((menuObj, index) => {
                        return (
                            <div
                                key={index}
                                className={`content p-1 px-2 ${
                                    menuObj.menuName === value.menuName
                                        ? "d-block"
                                        : "d-none"
                                }`}>
                                <h5 className="border-bottom">{menuObj.contentName}</h5>
                                <p>{menuObj.content}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default TabView
