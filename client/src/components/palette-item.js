import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons"
import { createSearchParams, useNavigate } from "react-router-dom"
import { getTextColor } from "../lib/colors"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useToast } from "./ui/use-toast"

function PaletteItem({ palette }) {
  const { toast } = useToast()
  const navigate = useNavigate()
  return (
    <div key={palette.name} className="group flex-1 flex flex-col w-full min-w-0 sm:min-w-[300px] max-w-[450px] min-h-[100px]">
      <div className="flex overflow-hidden flex-1 rounded-lg shadow-md relative" >
        {palette.colors.map((color) => (
          <div key={color} style={{ backgroundColor: color }} role="button" tabIndex={0} className="group/palette flex justify-center items-center flex-1 hover:flex-[2] focus:flex-[2]" onKeyDown={(e) => { }} >
            <span style={{ color: getTextColor(color) }} className="font-bold font-segoe sr-only group-hover/palette:not-sr-only" >{color}</span>
          </div>
        ))}
      </div>
      <div className="px-3 py-0.5 flex justify-between items-center">
        <p>{palette.name}</p>
        <small>{palette.description}</small>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-6 h-6 bg-transparent hover:bg-foreground/20 shadow flex justify-center items-center rounded-sm">
            <DotsHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => {
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
            }}>Copy URL</DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation()
              navigate({
                pathname: `/palette-generator`, search: createSearchParams({
                  palette: palette.colors.map((color) => color.replace('#', '')).join('-'),
                }).toString()
              })
            }}>Open in Palette Generator
            </DropdownMenuItem>
            <DropdownMenuItem asChild className={'hover:bg-transparent'}>
              <Button onClick={(e) => {
                e.stopPropagation()
                // TODO: Add remove palette functionality
              }} variant={'destructive'} className='w-full flex justify-center items-center gap-1'>
                <TrashIcon />Remove
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default PaletteItem