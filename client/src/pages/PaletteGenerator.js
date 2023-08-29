import { CopyIcon, HeartIcon, Share1Icon, UpdateIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import tinycolor from "tinycolor2";
import ItemContainer from "../components/item-container";
import { Button } from "../components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { useToast } from "../components/ui/use-toast";
import { useAppContext } from "../context/AppState";
import { ADD_COLOR, ADD_PALETTE } from "../context/AppState/actions";
import { formatColor, generateRandomColor } from "../lib/colors";

function formatPalette(paletteStr) {
  if (!paletteStr) return null;
  return paletteStr.split('-').map((color) => `#${ color }`)
}

function generateRandomPalette(color) {
  const tinyColor = tinycolor(color);
  return tinyColor.analogous(5, 8).map((color, i) => color.spin(i).toHexString());
}

function PaletteGenerator() {
  const [searchParams] = useSearchParams();
  const randomPalette = generateRandomPalette(generateRandomColor());
  const [, appDispatch] = useAppContext()
  const palette = formatPalette(searchParams.get('palette')) || randomPalette;
  const [paletteState, setPaletteState] = useState(palette);
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
                  <Button onClick={(e) => {
                    appDispatch({ type: ADD_PALETTE, payload: { name: 'Random Palette', colors: paletteState } })
                    toast({
                      title: `Added Random Palette to your palettes.`,
                      variant: 'success'
                    })
                    // setPaletteState(generateRandomPalette(generateRandomColor()))
                  }} variant='ghost'>
                    <HeartIcon />
                  </Button>
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
            className="group/palette flex h-full justify-end items-center sm:justify-center sm:items-end min-h-[200px] flex-1 hover:flex-[1.5] focus-visible:flex-[2]"
          >
            <section className="flex flex-row sm:flex-col sr-only group-hover/palette:not-sr-only">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => {
                      CopyAndAlert(color)
                    }} variant='ghost'>
                      <CopyIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={(e) => {
                      const colorIndex = paletteState.findIndex(c => c === color)
                      const newColor = generateRandomColor()
                      setPaletteState(prev => {
                        const newPalette = [...prev]
                        newPalette[colorIndex] = newColor
                        return newPalette
                      })
                    }} variant='ghost'>
                      <UpdateIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Random Color</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={(e) => {
                      appDispatch({ type: ADD_COLOR, payload: { name: 'Random Color', color: color } })
                      toast({
                        title: `Added Random Color to your colors.`,
                        variant: 'success'
                      })
                    }} variant='ghost'>
                      <HeartIcon />
                    </Button>
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