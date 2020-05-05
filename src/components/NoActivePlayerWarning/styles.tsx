import styled from 'styled-components'

export const WarningContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0,0,0,0.7);
    z-index: 999;
    color: white;
    border-radius: 8px;
    padding: 20px;
    font-weight: normal;
`;

export const WarningTitle = styled.h1`
    font-size: 16px;
    color: #1DB954;
`;

export const WarningText = styled.p`
    font-size: 14px;
`;

export const WarningButton = styled.button`
	color: white;
	background-color: transparent;
	border: 1px solid white;
	border-radius: 5px;
	text-transform: uppercase;
	font-weight: bold;
	padding: 7px 15px;
	margin-left: auto;
	display: block;

    :hover{
        background-color: rgba(255,255,255,0.2);
    }
    :active{
        background-color: rgba(255,255,255,0.4);
    }
`;

