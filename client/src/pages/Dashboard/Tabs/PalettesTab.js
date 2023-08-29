import { PlusIcon } from "@radix-ui/react-icons"
import { createSearchParams, useNavigate } from "react-router-dom"
import ColorVariantButton from "../../../components/color-variant-btn"
import AddPaletteDialog from "../../../components/dialogs/add-palette-dialog"
import ItemContainer from "../../../components/item-container"
import ItemGrid from "../../../components/item-grid"
import TabTitle from "../../../components/tab-title"
import { Button } from "../../../components/ui/button"
import { DropdownMenuItem } from "../../../components/ui/dropdown-menu"
import { useAppContext } from "../../../context/AppState"
import { ADD_PALETTE } from "../../../context/AppState/actions"
import { useCopy } from "../../../hooks/useCopy"

function PalettesTab() {
  const [appState, appDispatch] = useAppContext()
  const navigate = useNavigate()
  const { CopyAndAlert } = useCopy()

  return (
    <div>
      <TabTitle title={'Palettes'} />
      <ItemGrid>

        <AddPaletteDialog
          onSubmit={(values) => appDispatch({ type: ADD_PALETTE, payload: values })}
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
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    const url = window.location.origin + '/palette-generator?' + createSearchParams({
                      palette: palette.colors.map((color) => color.replace('#', '')).join('-'),
                    }).toString()
                    CopyAndAlert({ content: url, title: `Copied ${ url } to clipboard.`, description: '' })
                  }}
                >
                  Copy URL
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Edit Palette
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
              {palette.colors.map((color) => <ColorVariantButton key={color} currentColor={color} />)}
            </div>
          </ItemContainer>
        ))}
      </ItemGrid>
    </div>
  )
}

export default PalettesTab