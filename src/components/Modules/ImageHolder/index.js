import imageHolder from "../../../Asserts/Images/imageholder.jpg";
import React from "react";

export default function ImageHolder(props){
    return(
        <div>
            <img
                className="d-block w-100"
                src={imageHolder}
                alt="First slide"
            />
        </div>
    )
}