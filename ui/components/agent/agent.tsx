// Agent.tsx
import { Card, useMantineTheme } from '@mantine/core';
import React from 'react';
import Draggable from '../draggable/Draggable';
import { IAgent } from '../../../data/models/agent';
import { useDrag } from 'react-dnd';
import { useAppContext } from '../../../data/context/app-context';

interface AgentProps {
    agent: IAgent;
    onDrag?: (posX: number, posY: number, id: string) => any
}

const Agent: React.FC<AgentProps> = ({ agent, onDrag = () => { } }) => {


    const {updateAgent,agents}=useAppContext()

    const [{ isDragging }, drag] = useDrag(() => ({
        type: agent.type,
        item:agent,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        end(draggedItem, monitor) {
            //alert(JSON.stringify(draggedItem))
            updateAgent(draggedItem)
        },
    }));



    const agentMap: Record<string, React.ReactNode> = {
        ADD: <Triangle width={100} height={70} text='+' />,
        SUCC: <Triangle width={100} height={70} text='S' inverted />,
        ZERO: <Circle radius={30} text='0' />
    }

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                display:'flex',
                width:'contain'
            }}
        >
            {agentMap[agent.type]}
        </div>
    );
}

interface TriangleProps {
    width: number;
    height: number;
    text?: string;
    inverted?: boolean
}

const Triangle: React.FC<TriangleProps> = ({ width, height, text = '+', inverted = false }) => {

    const theme = useMantineTheme();
    // Access the primary color
    const color = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors[theme.primaryColor][6];


    const points = inverted ? `0,0 ${width / 2},${height} ${width},0` : `0,${height} ${width / 2},0 ${width},${height}`;

    console.log('Triangle Points', points)

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <polygon points={points} fill="transparent" stroke={color} strokeWidth="2" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={color} fontSize='40px'>
                {text}
            </text>
        </svg>
    );
};


interface CircleProps {
    radius: number;
    borderWidth?: number;
    text?: string;
    fontSize?: number;
}

const Circle: React.FC<CircleProps> = ({ radius, borderWidth = 2, text = '0', fontSize = 32 }) => {
    const circleCenter = radius + borderWidth; // Adjusting for border width
    const theme = useMantineTheme();
    const color = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors[theme.primaryColor][6];

    return (
        <svg width={circleCenter * 2} height={circleCenter * 2}>
            <circle
                cx={circleCenter}
                cy={circleCenter}
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth={borderWidth}
            />
            <text
                x="50%"
                y="50%"
                dy=".3em" // Adjust for vertical alignment
                textAnchor="middle" // Center align text
                fontSize={fontSize}
                fill={color}
            >
                {text}
            </text>
        </svg>
    );
}

export default Agent;
