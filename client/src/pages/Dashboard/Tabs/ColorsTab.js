import { PlusIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import AddColorDialog from "../../../components/dialogs/add-color-dialog"
import ItemContainer from "../../../components/item-container"
import ItemGrid from "../../../components/item-grid"
import TabTitle from "../../../components/tab-title"
import { Button } from "../../../components/ui/button"
import { DropdownMenuItem } from "../../../components/ui/dropdown-menu"
import { useToast } from "../../../components/ui/use-toast"
import { useAppContext } from "../../../context/AppState"
import { ADD_COLOR, REMOVE_COLOR } from "../../../context/AppState/actions"
import { formatColor, getTextColor } from "../../../lib/colors"

function ColorsTab() {
  const [appState, appDispatch] = useAppContext()
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [name, setName] = useState("Black");
  const dialogProps = { hex, setHex, rgb, setRgb, name, setName }
  const { toast } = useToast()
  const navigate = useNavigate()

  function CopyAndAlert(color) {
    const formatedColor = formatColor(color)
    navigator.clipboard.writeText(formatedColor);
    // Alert the copied text
    toast({
      title: `Copied ${ formatedColor } to clipboard.`,
      description: 'Copied color to clipboard.',
      variant: 'success'
    })
  }

  return (
    <div>
      <TabTitle title={'Colors'} />
      <ItemGrid>
        <AddColorDialog
          {...dialogProps}
          onSubmit={(values) => {
            appDispatch({ type: ADD_COLOR, payload: values })
          }}
          triggerElement={() => {
            return (
              <Button className="p-0 m-0 flex-1 flex flex-col justify-center items-center w-full max-w-full h-24 rounded-md shadow relative bg-foreground">
                <PlusIcon className="w-10 h-10 text-background font-bold" scale={3} />
                Add Color
              </Button>
            )
          }}
        />

        {appState.colors.map((color) => (
          <ItemContainer
            key={color.id}
            title={color.name}
            onSelect={() => CopyAndAlert(color.color)}
            onRemove={(e) => {
              e.stopPropagation()
              // TODO: Add remove color functionality
              appDispatch({ type: REMOVE_COLOR, payload: color.id })
            }}
            containerStyle={{ background: color.color }}
            menuContent={
              <>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation()
                  navigate({
                    pathname: `/color-picker`, search: createSearchParams({
                      color: color.color,
                    }).toString()
                  })
                }}>Open in Color Picker
                </DropdownMenuItem>
              </>
            }
          >
            <span
              className="font-bold not-sr-only group-hover:sr-only"
              style={{ color: getTextColor(color.color) }}
            >
              {color.name}
            </span>

            <span
              className="font-bold sr-only group-hover:not-sr-only"
              style={{ color: getTextColor(color.color) }}
            >
              {formatColor(color.color, appState.colorFormat)}
            </span>
          </ItemContainer>
        ))}
      </ItemGrid>
    </div>
  )
}

export default ColorsTab