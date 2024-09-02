import { Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import PageConfigs from "../../pages/configs/Page";
import PageRelatorios from "../../pages/relatorios/Page";
import PageJogos from "../../pages/jogos/Page";

export default function AppLayout() {
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    return localStorage.getItem('selectedTab') || 'configs';
  });

  useEffect(() => {
    localStorage.setItem('selectedTab', selectedTab);
  }, [selectedTab]);

  const handleTabChange = (value: string | null) => {
    if (value !== null) {
      setSelectedTab(value);
    }
  };

  return (
    <Tabs value={selectedTab} onChange={handleTabChange} style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>



      <Tabs.List w='100vw' justify="center" pos='fixed' style={{ backgroundColor: '#242424', zIndex: '1'}}>
        <Tabs.Tab p={20} fw={700} value="configs">Configurações</Tabs.Tab>
        <Tabs.Tab p={20} fw={700} value="relatorios">Relatórios</Tabs.Tab>
        <Tabs.Tab p={20} fw={700} value="jogos">Jogos</Tabs.Tab>
      </Tabs.List>



      <Tabs.Panel value="configs" flex={1}>
        <PageConfigs />
      </Tabs.Panel>
      <Tabs.Panel value="relatorios" flex={1}><PageRelatorios /></Tabs.Panel>
      <Tabs.Panel value="jogos" flex={1}><PageJogos /></Tabs.Panel>

    </Tabs>
  );
}
