import { PlusIcon } from "@radix-ui/react-icons"
import AddPaletteDialog from "../../../components/dialogs/add-palette-dialog"
import PaletteItem from "../../../components/palette-item"
import TabTitle from "../../../components/tab-title"
import { Button } from "../../../components/ui/button"
import { useAppContext } from "../../../context/AppState"
import { ADD_PALETTE } from "../../../context/AppState/actions"

function PalettesTab() {
  const [appState, appDispatch] = useAppContext()

  return (
    <div>
      <TabTitle title={'Palettes'} />
      <div className="flex-1 flex mx-5 flex-col sm:flex-row sm:flex-wrap gap-8 justify-start items-start">
        <AddPaletteDialog
          onSubmit={(values) => {
            appDispatch({ type: ADD_PALETTE, payload: values })
          }}
          triggerElement={() => (
            <Button className="p-0 m-0 flex-1 flex flex-col justify-center items-center w-full max-w-full  sm:min-w-[200px] sm:max-w-[400px] min-h-[100px] rounded-lg shadow relative bg-foreground">
              <PlusIcon className="w-10 h-10 text-background font-bold" scale={3} />
              Add Palette
            </Button>
          )}
        />
        {appState.palettes.map((palette) => (
          <PaletteItem key={palette.id} palette={palette} />
        ))}
      </div>
    </div>
  )
}

export default PalettesTab