import { AppShell, Text, useMantineTheme } from '@mantine/core'
import React, { useState } from 'react'
import Header from '../../components/header/Header'
import NavbarLeft from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface AppLayoutProps{    
    children?:React.ReactNode
    [key:string]:any
}

// const AppLayout = ({header,navbarLeft,children}:AppLayoutProps) => {

//   return (
//     <AppShell
//       padding="md"
//       navbarOffsetBreakpoint="lg"
//       navbar={<NavbarLeft/>}
//       header={header}
//     >
//       {children}
//     </AppShell>
//   )
// }

const AppLayout2=({children}:AppLayoutProps)=>{
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      
      navbarOffsetBreakpoint="lg"
      navbar={
        <NavbarLeft pl="xs" hiddenBreakpoint="lg" hidden={!opened} width={{ sm: 200, lg: 300 }}/>
      }
      footer={
       <Footer height={60} p="md"/>
      }
      header={
        <Header height={{ base: 70, md: 70 }} p="md" open={opened} toggleOpen={()=>setOpened(!opened)}/>
      }
    >
      {children}
    </AppShell>
    </DndProvider>
    
  );
}

export default AppLayout2