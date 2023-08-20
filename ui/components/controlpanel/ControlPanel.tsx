import { Button, Card, Divider, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import React from 'react'
import { useAppContext } from '../../../data/context/app-context'
import { AgentTypes, IAgent } from '../../../data/models/agent';
import { IconCircle, IconFilterExclamation, IconPlayerEject, IconPlus, IconX } from '@tabler/icons-react';

const ControlPanel = () => {

    const { agents } = useAppContext();

    return (
        <Card p='md' radius='sm' style={{ height: '100%' }}>
            <Group position='apart'>
                <Text fz='md' fw={500}>Layout Editor</Text>
                <Button size='xs' px='xs' leftIcon={<IconPlus size={16} />}>New Agent</Button>
            </Group>
            <Divider my='sm' />
            {Object.keys(agents).map(ak => (
                <AgentCard key={ak} agent={agents[ak]} />
            ))}
        </Card>
    )
}

interface AgentCardProps {
    agent: IAgent
}

const AgentCard = ({ agent }: AgentCardProps) => {


    const Icon=({agentType}:{agentType:AgentTypes})=>{
        if(agentType==='ADD'){
            return <IconPlus/>
        }
        else if(agentType==='MUL'){
            return <IconX/>
        }
        else if(agentType==='ZERO'){
            return <IconCircle/>
        }
        else if(agentType==='SUCC'){
            return <IconPlayerEject/>
        }
        else 
            return <IconFilterExclamation/>
    }

    return (
        <Card p='xs' withBorder radius='sm' my='sm'>
            <Group>
                <ThemeIcon radius='sm' size='xl'>
                    <Icon agentType={agent.type}/>
                </ThemeIcon>
                <Stack spacing={0}>
                    <Text size='md' p={0} fw={500}>{agent.label}</Text>
                    <Text size='xs' p={0} >{agent.label}</Text>
                    <Group mt='xs'>
                        <Button size='xs' px='xs' variant='light'>Connect</Button>
                    </Group>
                </Stack>
            </Group>
        </Card>
    )
}

export default ControlPanel