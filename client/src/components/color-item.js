import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppState";
import { REMOVE_COLOR } from "../context/AppState/actions";
import { formatColor, getTextColor } from "../lib/colors";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

function ColorItem({ color }) {
  const [appState, appDispatch] = useAppContext()
  const navigate = useNavigate()
  const { toast } = useToast()

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
    <div role="button" tabIndex={0} onKeyDown={(e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        CopyAndAlert(color.color);
      }
    }} onClick={(e) => {
      CopyAndAlert(color.color);
    }} key={color.name} className="group flex-1 flex justify-center w-full items-center sm:min-w-[200px] sm:max-w-[400px] min-h-[100px] rounded-lg shadow-md relative" style={{ backgroundColor: color.color }}>
      <span className="font-bold not-sr-only group-hover:sr-only" style={{ color: getTextColor(color.color) }}>{color.name}</span>
      <span className="font-bold sr-only group-hover:not-sr-only" style={{ color: getTextColor(color.color) }}>{formatColor(color.color, appState.colorFormat)}</span>
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute bottom-3 right-4 w-6 h-6 bg-muted shadow flex justify-center items-center rounded-sm">
          <DotsHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
          <DropdownMenuItem asChild className={'hover:bg-transparent'}>
            <Button onClick={(e) => {
              e.stopPropagation()
              // TODO: Add remove color functionality
              appDispatch({ type: REMOVE_COLOR, payload: color.id })
            }} variant={'destructive'} className='w-full flex justify-center items-center gap-1'>
              <TrashIcon />Remove
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ColorItem