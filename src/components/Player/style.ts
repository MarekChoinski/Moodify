import styled from 'styled-components'

export const PlayerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    box-sizing: border-box;
`;

export const AlbumCover = styled.img`
    width: 100%;
    height: auto;

    @media (max-height: 760px) {
        max-height: 40vh;
        width: auto;
        max-width: 100%;
        align-self: center;
    }
`;

export const Title = styled.h2`
    font-size: 20px;
    color: white;
    opacity: 0.7;
    margin: 1.5rem 0 1rem 0;
`;

export const Author = styled.h2`
    font-size: 16px;
    color: white;
    opacity: 0.5;
    margin: 0 0 1.5rem 0;
`;
