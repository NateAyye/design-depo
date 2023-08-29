import { PlusIcon } from "@radix-ui/react-icons"
import { createSearchParams, useNavigate } from "react-router-dom"
import AddPaletteDialog from "../../../components/dialogs/add-palette-dialog"
import ItemContainer from "../../../components/item-container"
import ItemGrid from "../../../components/item-grid"
import TabTitle from "../../../components/tab-title"
import { Button } from "../../../components/ui/button"
import { DropdownMenuItem } from "../../../components/ui/dropdown-menu"
import { useToast } from "../../../components/ui/use-toast"
import { useAppContext } from "../../../context/AppState"
import { ADD_PALETTE } from "../../../context/AppState/actions"
import { getTextColor } from "../../../lib/colors"

function PalettesTab() {
  const [appState, appDispatch] = useAppContext()
  const navigate = useNavigate()
  const { toast } = useToast()

  function CopyAndAlert(gradient) {
    navigator.clipboard.writeText(gradient);
    // Alert the copied text
    toast({
      title: `Copied ${ gradient } to clipboard.`,
      description: 'Copied color to clipboard.',
      variant: 'success'
    })
  }

  return (
    <div>
      <TabTitle title={'Palettes'} />
      <ItemGrid>

        <AddPaletteDialog
          onSubmit={(values) => {
            appDispatch({ type: ADD_PALETTE, payload: values })
          }}
          triggerElement={() => (
            <Button className="p-0 m-0 flex-1 flex flex-col justify-center items-center w-full max-w-full focus-visible:ring-foreground focus-visible:border-2 flex-center rounded-md h-24 bg-foreground">
              <PlusIcon className="w-10 h-10 text-background font-bold" scale={3} />
              Add Palette
            </Button>
          )}
        />
        {appState.palettes.map((palette) => (
          <ItemContainer
            key={palette.id}
            title={palette.name}
            menuContent={
              <>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    const path = '/palette-generator'
                    const serarchParams = createSearchParams({
                      palette: palette.colors.map((color) => color.replace('#', '')).join('-'),
                    }).toString()
                    const url = window.location.origin + path + '?' + serarchParams
                    navigator.clipboard.writeText(url);
                    // Alert the copied text
                    toast({
                      title: `Copied ${ url } to clipboard.`,
                      description: 'Copied URL to clipboard.',
                      variant: 'success'
                    })
                  }}
                >
                  Copy URL
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate({
                      pathname: `/palette-generator`, search: createSearchParams({
                        palette: palette.colors.map((color) => color.replace('#', '')).join('-'),
                      }).toString()
                    })
                  }}
                >
                  Open in Palette Generator
                </DropdownMenuItem>
              </>
            }
          >
            <div className="flex h-full overflow-hidden flex-1 rounded-lg shadow-md relative" >
              {palette.colors.map((color) => (
                <div
                  key={color}
                  style={{ backgroundColor: color }}
                  role="button"
                  tabIndex={0}
                  className="group/palette flex justify-center items-center flex-1 hover:flex-[2] focus-visible:flex-[2]"
                  onKeyDown={(e) => CopyAndAlert(color)}
                  onClick={(e) => CopyAndAlert(color)}
                >
                  <span style={{ color: getTextColor(color) }} className="font-bold font-segoe sr-only group-hover/palette:not-sr-only" >{color}</span>
                </div>
              ))}
            </div>
          </ItemContainer>
        ))}
      </ItemGrid>
    </div>
  )
}

export default PalettesTab