import styled from 'styled-components'

export const RangeSlider = styled.input`
    &[type=range] {
        -webkit-appearance: none;
        width: 100%;
        margin: 5.6px 0;
        background: transparent;
        
        &:focus {
            outline: none;
        }
    }

    &[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 4.8px;
        cursor: pointer;
        box-shadow: 0.5px 0.5px 2.6px rgba(0, 0, 0, 0.32), 0px 0px 0.5px rgba(13, 13, 13, 0.32);
        background: rgba(255, 255, 255, 0.5);
        border-radius: 2.1px;
        border: 0px solid #180001;
    }

    &[type=range]::-webkit-slider-thumb {
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
        border: 0.5px solid rgba(0, 0, 0, 0.13);
        height: 12px;
        width: 12px;
        border-radius: 50px;
        background: #ffffff;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -5.6px;
    }

    &[type=range]:focus::-webkit-slider-runnable-track {
        background: rgba(255, 255, 255, 0.6);
    }

    &[type=range]::-moz-range-track {
        width: 100%;
        height: 4.8px;
        cursor: pointer;
        box-shadow: 0.5px 0.5px 2.6px rgba(0, 0, 0, 0.32), 0px 0px 0.5px rgba(13, 13, 13, 0.32);
        background: rgba(255, 255, 255, 0.5);
        border-radius: 2.1px;
        border: 0px solid #180001;
    }

    &[type=range]::-moz-range-thumb {
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
        border: 0.5px solid rgba(0, 0, 0, 0.13);
        height: 12px;
        width: 12px;
        border-radius: 50px;
        background: #ffffff;
        cursor: pointer;
    }

    &[type=range]::-ms-track {
        width: 100%;
        height: 4.8px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }

    &[type=range]::-ms-fill-lower {
        background: rgba(156, 156, 156, 0.5);
        border: 0px solid #180001;
        border-radius: 4.2px;
        box-shadow: 0.5px 0.5px 2.6px rgba(0, 0, 0, 0.32), 0px 0px 0.5px rgba(13, 13, 13, 0.32);
    }

    &[type=range]::-ms-fill-upper {
        background: rgba(255, 255, 255, 0.5);
        border: 0px solid #180001;
        border-radius: 4.2px;
        box-shadow: 0.5px 0.5px 2.6px rgba(0, 0, 0, 0.32), 0px 0px 0.5px rgba(13, 13, 13, 0.32);
    }

    &[type=range]::-ms-thumb {
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
        border: 0.5px solid rgba(0, 0, 0, 0.13);
        height: 12px;
        width: 12px;
        border-radius: 50px;
        background: #ffffff;
        cursor: pointer;
        height: 4.8px;
    }

    &[type=range]:focus::-ms-fill-lower {
        background: rgba(255, 255, 255, 0.5);
    }

    &[type=range]:focus::-ms-fill-upper {
        background: rgba(255, 255, 255, 0.5);
    }
`;