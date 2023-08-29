import { CopyIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "react-router-dom";
import tinycolor from "tinycolor2";
import ItemContainer from "../components/item-container";
import { Button } from "../components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { generateRandomColor, getTextColor } from "../lib/colors";

function formatPalette(paletteStr) {
  if (!paletteStr) return null;
  return paletteStr.split('-').map((color) => `#${ color }`)
}

function generateRandomPalette(color) {
  const tinyColor = tinycolor(color);
  return tinyColor.analogous(5, 8).map((color) => color.toHexString());
}

function PaletteGenerator() {
  const [searchParams] = useSearchParams();
  const randomPalette = generateRandomPalette(generateRandomColor());
  const palette = formatPalette(searchParams.get('palette')) || randomPalette;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col mx-5 sm:items-center mb-5 gap-2">
        <h2 className="text-5xl self-start font-bold font-segoe ">Palette Generator</h2>
        <section className="container px-10 my-5 flex justify-end items-center ">
          <div className="flex flex-row-reverse p-1 gap-3 border rounded-sm flex-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => { }} variant='ghost'>
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
                  <Button onClick={(e) => { }} variant='ghost'>
                    <UpdateIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Random Color</p>
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
        {palette.map((color) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            role="button"
            tabIndex={0}
            className="group/palette flex h-full justify-center items-center min-h-[200px] flex-1 hover:flex-[1.5] focus-visible:flex-[2]"
          // onKeyDown={(e) => CopyAndAlert(color)}
          // onClick={(e) => CopyAndAlert(color)}
          >
            <span style={{ color: getTextColor(color) }} className="font-bold font-segoe sr-only group-hover/palette:not-sr-only" >{color}</span>
          </div>
        ))}
      </ItemContainer>
    </div>
  )
}

export default PaletteGenerator