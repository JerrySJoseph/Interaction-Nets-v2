import { getArrow } from 'curved-arrows'
import React from 'react'
import { IWire } from '../../../data/models/wire'

interface WireProps {
    wire: IWire
}

const Wire = ({ wire }: WireProps) => {
    
    const arrowHeadSize = 5
    const color = 'white'
    const [sx, sy, c1x, c1y, c2x, c2y, ex, ey, ae] = getArrow(wire.from.posX, wire.from.posY, wire.to.posX, wire.to.posY, {
        padEnd: arrowHeadSize,
    })

    return (
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d={`M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`}
                stroke={color}
                strokeWidth={arrowHeadSize / 2}
                fill="none"
            />
            <polygon
                points={`0,${-arrowHeadSize} ${arrowHeadSize *
                    2},0, 0,${arrowHeadSize}`}
                transform={`translate(${ex}, ${ey}) rotate(${ae})`}
                fill={color}
            />
        </svg>
    )
}

export default Wire