import {HoverButtonPosition} from "../../common/settings/enums";
import {Area} from "./area";

type Calculator = (areaSize: number, selfSize: number) => number;

const MIN: Calculator = (_: number, self: number) => 0 - self;
const NEG: Calculator = () => 0;
const CENTER: Calculator = (area: number, self: number) => (area - self) / 2;
const POS: Calculator = (area: number, self: number) => area - self;
const MAX: Calculator = (area: number) => area;

const RELATIVE_DISTANCES: Record<HoverButtonPosition, [Calculator, Calculator]> = {
    [HoverButtonPosition.topLeftSW]: [MIN, NEG],
    [HoverButtonPosition.westWest]: [MIN, CENTER],
    [HoverButtonPosition.bottomLeftNW]: [MIN, POS],

    [HoverButtonPosition.topLeftNE]: [NEG, MIN],
    [HoverButtonPosition.topLeftSE]: [NEG, NEG],
    [HoverButtonPosition.west]: [NEG, NEG],
    [HoverButtonPosition.bottomleftNE]: [NEG, POS],
    [HoverButtonPosition.bottomLeftSE]: [NEG, MAX],

    [HoverButtonPosition.northNorth]: [CENTER, MIN],
    [HoverButtonPosition.north]: [CENTER, NEG],
    [HoverButtonPosition.center]: [CENTER, CENTER],
    [HoverButtonPosition.south]: [CENTER, POS],
    [HoverButtonPosition.southSouth]: [CENTER, MAX],

    [HoverButtonPosition.topRightNW]: [POS, MIN],
    [HoverButtonPosition.topRightSW]: [POS, NEG],
    [HoverButtonPosition.east]: [POS, CENTER],
    [HoverButtonPosition.bottomRightNW]: [POS, POS],
    [HoverButtonPosition.bottomRightSW]: [POS, MAX],

    [HoverButtonPosition.topRightSE]: [MAX, NEG],
    [HoverButtonPosition.eastEast]: [MAX, CENTER],
    [HoverButtonPosition.bottomRightNE]: [MAX, POS]
};

interface Offset {
    x: number;
    y: number;
}

export function topLeftOf(element: Element): Offset {
    const {left, top} = element.getBoundingClientRect();
    return {x: left, y: top};
}

export function relativeTo(area: Area, position: HoverButtonPosition, buttonSize: number): Offset {
    const distances = RELATIVE_DISTANCES[position];

    const x = distances[0](area.width, buttonSize);
    const y = distances[1](area.height, buttonSize);

    return {x, y};
}

export function add(offsetA: Offset, offsetB: Offset): Offset {
    return {x: offsetA.x + offsetB.x, y: offsetA.y + offsetB.y};
}

export function constrainTo(offset: Offset, area: Area): Offset {
    const x = Math.max(0, Math.min(area.width, offset.x));
    const y = Math.max(0, Math.min(area.height, offset.y));

    return {x, y};
}
