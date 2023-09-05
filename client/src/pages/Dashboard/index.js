import { Navigate } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip';
import { DASHBOARD_TABS } from '../../config/constants';
import { useAppContext } from '../../context/AppState';
import { SET_TAB } from '../../context/AppState/actions';
import authService from '../../lib/auth';
import { cn, properCase } from '../../lib/utils';
import ColorsTab from './Tabs/ColorsTab';
import FontsTab from './Tabs/FontsTab';
import GradientsTab from './Tabs/GradientsTab';
import PalettesTab from './Tabs/PalettesTab';
import ProjectsTab from './Tabs/ProjectTab';

function Dashboard() {
  const [appState, appDispatch] = useAppContext();

  return authService.isTokenExpired(authService.getToken()) ||
    !authService.loggedIn() ? (
    <Navigate to="/auth?tab=login" replace />
  ) : (
    <div className="flex-1 flex items-stretch justify-stretch">
      <Tabs
        className="w-full flex"
        defaultValue={appState.activeDashboardTab}
        onValueChange={(value) => {
          appDispatch({ type: SET_TAB, payload: value });
          localStorage.setItem('activeDashboardTab', value);
        }}
      >
        <TabsList className="flex flex-row fixed z-50 bottom-0 left-0 right-0 h-fit gap-2 m-2 bg-foreground text-background items-center justify-between sm:relative sm:flex-col sm:w-[220px] sm:bg-transparent sm:text-foreground sm:justify-start sm:items-start">
          {DASHBOARD_TABS.map((tab) => (
            <TooltipProvider key={tab.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    className={cn(
                      `hover:bg-background/30 flex sm:justify-start text-lg items-center gap-2  hover:text-foreground sm:hover:bg-foreground/30 sm:hover:text-background focus-visible:bg-foreground/70 w-full`,
                      appState.activeDashboardTab === tab.name
                        ? 'text-blue-300 bg-muted-foreground sm:bg-muted-foreground/70 '
                        : ''
                    )}
                    value={tab.name}
                  >
                    {tab.icon}{' '}
                    <p className="sr-only sm:not-sr-only">
                      {properCase(tab.name)}
                    </p>
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
          <TabsContent className="flex-1" value="palettes">
            <PalettesTab />
          </TabsContent>

          <TabsContent className="flex-1" value="colors">
            <ColorsTab />
          </TabsContent>

          <TabsContent className="flex-1" value="gradients">
            <GradientsTab />
          </TabsContent>

          <TabsContent className="flex-1" value="fonts">
            <FontsTab />
          </TabsContent>

          <TabsContent className="flex-1" value="projects">
            <ProjectsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default Dashboard;
