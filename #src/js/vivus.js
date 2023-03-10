import Vivus from "vivus";

let svg = new Vivus(
    'my-svg',
    {
        type: 'delayed',
        duration: 300,
        animTimingFunction: Vivus.EASE
    },
);
export default svg;

