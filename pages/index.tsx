import type { NextPage } from 'next'
import Canvas from '../ui/components/canvas/Canvas'
import { Card, Grid } from '@mantine/core'
import ControlPanel from '../ui/components/controlpanel/ControlPanel'

const Home: NextPage = () => {
  return (
    <Grid style={{height:'100%'}}>
      <Grid.Col span={8}>
        <Canvas />
      </Grid.Col>
      <Grid.Col span={4} style={{height:'100%'}}>
        <ControlPanel/>
      </Grid.Col>
    </Grid>
  )
}

export default Home
