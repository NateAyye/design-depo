import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppState";
import { REMOVE_GRADIENT } from "../context/AppState/actions";
import { getTextColor } from "../lib/colors";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

function GradientItem({ gradient }) {
  const [, appDispatch] = useAppContext()
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
    <div role="button" tabIndex={0} onKeyDown={(e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        CopyAndAlert(gradient.color);
      }
    }} onClick={(e) => {
      CopyAndAlert(gradient.color);
    }} key={gradient.name} className="group flex-1 flex justify-center w-full items-center sm:min-w-[200px] sm:max-w-[400px] min-h-[100px] rounded-lg shadow-md relative" style={{ background: gradient.color }}>
      <span className="font-bold not-sr-only group-hover:sr-only" style={{ color: getTextColor(gradient.color) }}>{gradient.name}</span>
      <span className="font-bold sr-only group-hover:not-sr-only text-center text-ellipsis max-w-full max-h-full" style={{ color: getTextColor(gradient.color) }}>{gradient.color}</span>
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute bottom-3 right-4 w-6 h-6 bg-muted shadow flex justify-center items-center rounded-sm">
          <DotsHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation()
            navigate({
              pathname: `/gradient-picker`, search: createSearchParams({
                color: gradient.color,
              }).toString()
            })
          }}>Open in Gradient Picker
          </DropdownMenuItem>
          <DropdownMenuItem asChild className={'hover:bg-transparent'}>
            <Button onClick={(e) => {
              e.stopPropagation()
              // TODO: Add remove color functionality
              appDispatch({ type: REMOVE_GRADIENT, payload: gradient.id })
            }} variant={'destructive'} className='w-full flex justify-center items-center gap-1'>
              <TrashIcon />Remove
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default GradientItem