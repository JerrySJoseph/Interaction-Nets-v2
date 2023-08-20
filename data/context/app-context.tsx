import { LoadingOverlay } from "@mantine/core";
import { createContext, useContext, useEffect, useState } from "react";
import AppLayout from "../../ui/layouts/applayout/AppLayout";
import { IAgent } from "../models/agent";
import { IWire } from "../models/wire";

interface AgentMap {
    [key: string]: IAgent
}

interface WireMap {
    [key: string]: IWire
}

interface AppContextProps {
    agents: AgentMap,
    wires: WireMap,
    updateAgent: (newAgent: IAgent) => any,
    onAgentDragged: (newPosX: number, newPosY: number, id: string) => any
}

const defaultAppContext: AppContextProps = {
    agents: {},
    wires: {},
    updateAgent: function (newAgent:IAgent) {
        throw new Error("Function not implemented.");
    },
    onAgentDragged: function (newPosX: number, newPosY: number, id: string) {
        throw new Error("Function not implemented.");
    }
}

export const AppContext = createContext<AppContextProps>(defaultAppContext)

export const useAppContext = () => useContext(AppContext)

interface AppContextProviderProps {
    children?: React.ReactNode
}



export const AppContextProvider = ({ children }: AppContextProviderProps) => {


    const [loading, setLoading] = useState<boolean>(false);
    const [agents, setAgents] = useState<AgentMap>(defaultAppContext.agents)
    const [wires, setwires] = useState<WireMap>(defaultAppContext.wires);

    useEffect(() => {
        setAgents({
            '1': {
                id: '1',
                label: 'First Addition',
                type: 'ADD',
                posX: 0,
                posY: 0,
                auxilaryPorts: []

            },
            '2': {
                id: '2',
                label: 'Successor',
                type: 'SUCC',
                posX: 0,
                posY: 0,
                auxilaryPorts: []

            },
            '3': {
                id: '3',
                label: 'Zero',
                type: 'ZERO',
                posX: 0,
                posY: 0,
                auxilaryPorts: []

            },
            '4': {
                id: '4',
                label: 'Multiplication',
                type: 'MUL',
                posX: 0,
                posY: 0,
                auxilaryPorts: []

            }
        });

        setwires({
            '1':{
                id: '1',
                from: {
                    id: '1',
                    label: '1',
                    type: 'ADD',
                    posX: 10,
                    posY: 50,
                    auxilaryPorts: []

                },
                to: {
                    id: '2',
                    label: '1',
                    type: 'SUCC',
                    posX: 100,
                    posY: 500,
                    auxilaryPorts: []

                }
            }
    })
    }, [])


    function onAgentDragged(newPosX: number, newPosY: number, id: string) {
        setAgents({
            ...agents,
            [id]:{
                ...agents[id],
                posX:newPosX,
                posY:newPosY
            }
        });

        Object.keys(wires).forEach((wk)=>{
            
            if(wires[wk].from.id===id){
                setwires({
                    ...wires,
                    [wk]:{
                        ...wires[wk],
                        from:{
                            ...wires[wk].from,
                            posX:newPosX,
                            posY:newPosY
                        }
                    }
                })
            }
            if(wires[wk].to.id===id){
                setwires({
                    ...wires,
                    [wk]:{
                        ...wires[wk],
                        to:{
                            ...wires[wk].from,
                            posX:newPosX,
                            posY:newPosY
                        }
                    }
                })
            }
        })

        
    }


    const value: AppContextProps = {
        agents,
        wires,
        updateAgent: (newAgent)=>setAgents({...agents,[newAgent.id]:{...newAgent}}),
        onAgentDragged
    };



    return <AppContext.Provider value={value}>
        {loading ? <LoadingOverlay visible /> :
            <AppLayout>
                {children}
            </AppLayout>}
    </AppContext.Provider>
}
