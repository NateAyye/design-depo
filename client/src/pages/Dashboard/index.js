import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { DASHBOARD_TABS } from "../../config/constants";
import { useAppContext } from "../../context/AppState";
import { SET_TAB } from "../../context/AppState/actions";
import { properCase } from "../../lib/utils";
import ColorsTab from "./Tabs/ColorsTab";
import PalettesTab from "./Tabs/PalettesTab";

function Dashboard() {
  const [appState, appDispatch] = useAppContext();

  return (
    <div className="flex-1 flex items-stretch justify-stretch">
      <Tabs defaultValue={appState.activeDashboardTab} onValueChange={(value) => {
        appDispatch({ type: SET_TAB, payload: value })
        localStorage.setItem('activeDashboardTab', value);
      }} className="w-full flex">
        <TabsList className='flex fixed z-50 bottom-0 left-0 right-0 sm:relative flex-row sm:flex-col h-fit gap-2 m-2 bg-foreground sm:bg-transparent text-background sm:text-foreground justify-between  sm:justify-start items-center sm:items-start'>
          {DASHBOARD_TABS.map((tab) => (
            <TooltipProvider key={tab.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger className='hover:bg-background/30 flex sm:justify-start text-lg items-center gap-2  hover:text-foreground sm:hover:bg-foreground/30 sm:hover:text-background focus:bg-background/70 w-full' value={tab.name}>
                    {tab.icon} <p className="sr-only sm:not-sr-only">{properCase(tab.name)}</p>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{properCase(tab.name)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          ))}
        </TabsList>
        <div className="flex-1 flex border-l">
          <TabsContent className='flex-1' value="palettes">
            <PalettesTab />
          </TabsContent>

          <TabsContent className='flex-1' value="colors">
            <ColorsTab />
          </TabsContent>

          <TabsContent className='flex-1' value="gradients">
            <div>
              Gradients Tab
            </div>
          </TabsContent>

          <TabsContent className='flex-1' value="fonts">
            <div>
              Fonts Tab
            </div>
          </TabsContent>

          <TabsContent className='flex-1' value="projects">
            <div>
              Projects Tab
            </div>
          </TabsContent>
        </div>
      </Tabs >
    </div >
  )
}

export default Dashboard