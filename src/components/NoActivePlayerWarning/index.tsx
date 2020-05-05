import React, { useState } from "react";
import {
    WarningContainer,
    WarningTitle,
    WarningText,
    WarningButton
} from "./styles";

type Props = {
    onClick: () => void;
};

const NoActivePlayerWarning: React.FC<Props> = props => {

    const { onClick } = props;

    return (
        <WarningContainer>
            <WarningTitle>
                Active player not found
            </WarningTitle>
            <WarningText>
                Moodify can't find any active player. Try open spotify player and press "Play" button.
            </WarningText>
            <WarningButton onClick={onClick}>
                Refresh
            </WarningButton>
        </WarningContainer>

    );
};

export default NoActivePlayerWarning;