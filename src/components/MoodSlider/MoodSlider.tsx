import React, { useState } from "react";


type Props = {
    onReleased: (v: number) => void;
};

const MoodSlider: React.FC<Props> = props => {

    const { onReleased } = props;

    const [value, setValue] = useState("500");

    const [previousValue, setPreviousValue] = useState("500");

    const gripReleased = () => {
        if (previousValue !== value) {
            let float = Number(value) * 0.001;
            onReleased(float);
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