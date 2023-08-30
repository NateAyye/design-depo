import { CopyIcon, Share1Icon, UpdateIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import AddColorDialog from "../components/dialogs/add-color-dialog";
import AddPaletteDialog from "../components/dialogs/add-palette-dialog";
import ItemContainer from "../components/item-container";
import { Button } from "../components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { useToast } from "../components/ui/use-toast";
import { useCopy } from "../hooks/useCopy";
import { formatPalette, generateRandomColor, generateRandomPalette } from "../lib/colors";

function PaletteGenerator() {
  const [searchParams] = useSearchParams();
  const randomPalette = generateRandomPalette(generateRandomColor());
  const palette = formatPalette(searchParams.get('palette')) || randomPalette;
  const [paletteState, setPaletteState] = useState(palette);
  const { toast } = useToast()
  const { CopyAndAlert } = useCopy()

  useEffect(() => {
    function onKeyDown(e) {
      if (e.ctrlKey && e.key === ' ') {
        setPaletteState(generateRandomPalette(generateRandomColor()))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col mx-5 sm:items-center mb-5 gap-2">
        <h2 className="text-5xl self-start font-bold font-segoe ">Palette Generator</h2>
        <small className="text-foreground/80 self-start">ShortCut: (press <kbd className="bg-muted p-0.5 shadow-sm border-r-2 border-b-2 rounded-sm">CTRL</kbd> + <kbd className="bg-muted p-0.5 shadow-sm border-r-2 border-b-2 rounded-sm">Spacebar</kbd> to generate a random palette)</small>
        <section className="container px-10 my-5 flex justify-end items-center ">
          <div className="flex flex-row-reverse p-1 gap-3 border rounded-sm flex-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={(e) => {
                    e.stopPropagation()
                    const path = '/palette-generator'
                    const serarchParams = createSearchParams({
                      palette: paletteState.map((color) => color.replace('#', '')).join('-'),
                    }).toString()
                    const url = window.location.origin + path + '?' + serarchParams
                    navigator.clipboard.writeText(url);
                    // Alert the copied text
                    toast({
                      title: `Copied ${ url } to clipboard.`,
                      description: 'Copied URL to clipboard.',
                      variant: 'success'
                    })
                  }} variant='ghost'>
                    <Share1Icon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={(e) => {
                    setPaletteState(generateRandomPalette(generateRandomColor()))
                  }} variant='ghost'>
                    <UpdateIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Random Palette</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AddPaletteDialog toastAction palette={{ name: '', colors: paletteState }} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save Palette</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>
      </div>
      <ItemContainer
        dropDownMenu={false}
        className="flex-1"
        containerClass={'flex flex-col sm:flex-row items-stretch h-full'}
      >
        {paletteState.map((color) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            role="button"
            tabIndex={0}
            className="group/palette flex h-full justify-end items-center sm:justify-center sm:items-end min-h-[200px] flex-1 hover:flex-[1.5] focus-visible:flex-[1.5]"
          >
            <section className="flex flex-row focus-within:not-sr-only sm:flex-col sr-only group-hover/palette:not-sr-only group-focus-visible/palette:not-sr-only">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full flex justify-center">
                    <Button  className='h-9 w-9 p-0' onClick={() => CopyAndAlert({ content: color })} variant='ghost'>
                      <CopyIcon />
                    </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full flex justify-center">
                      <Button
                        variant='ghost'
                        className='h-9 w-9 p-0'
                        onClick={(e) => {
                          e.preventDefault()
                          setPaletteState(prev => {
                            const newPalette = [...prev]
                            newPalette[paletteState.findIndex(c => c === color)] = generateRandomColor()
                            return newPalette
                          })

                        }}
                      >
                        <UpdateIcon />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Random Color</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full flex justify-center">
                      <AddColorDialog
                        toastAction
                        color={{ hexCode: color, name: '' }}
                        defaults={{ name: '', color: color }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save Color</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </section>
          </div>
        ))}
      </ItemContainer>
    </div>
  )
}

export default PaletteGenerator