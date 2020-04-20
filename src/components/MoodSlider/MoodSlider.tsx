import React, { useState } from "react";


const MoodSlider: React.FC = () => {

    const [value, setValue] = useState("500");

    const [previousValue, setPreviousValue] = useState("500");

    const gripReleased = () => {
        if (previousValue !== value) {
            console.log(previousValue, value);

            // dispatch here
        }
        setPreviousValue(value);
    };


    return (
        <>
            <input
                type="range"
                min="0"
                max="1000"
                value={value}
                className="slider"
                // id="myRange"
                onChange={(e) => setValue(e.target.value)}
                onMouseUp={() => gripReleased()}
                onMouseDown={() => setPreviousValue(value)}
                onTouchEnd={() => gripReleased()}
                onTouchStart={() => setPreviousValue(value)}
            />
            {value}
        </>
    );
};

export default MoodSlider;