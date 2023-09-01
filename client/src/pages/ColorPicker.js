import { CopyIcon, SizeIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useCallback, useState } from "react";
import { ChromePicker } from "react-color";
import tinycolor from "tinycolor2";
import ColorVariantButton from "../components/color-variant-btn";
import AddColorDialog from "../components/dialogs/add-color-dialog";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { COLOR_HARMONIES } from "../config/constants";
import { useAppContext } from "../context/AppState";
import { useColorPickerContext } from "../context/ColorPicker";
import { SET_COLOR_NAME, SET_HEX, SET_RGB } from "../context/ColorPicker/actions";
import { useCopy } from "../hooks/useCopy";
import { generateRandomColor, getColorName, getTextColor, hexToRgb } from "../lib/colors";
import { properCase } from "../lib/utils";

function ColorPicker() {
  const [state, dispatch] = useColorPickerContext();
  const [appState] = useAppContext();
  const [opacityBg, setOpacityBg] = useState("1");
  const { CopyAndAlert } = useCopy()
  const [modalOpen, setModalOpen] = useState(false)
  const [background, setBackground] = useState({
    h: 250,
    s: 0,
    l: 0.2,
    a: 1
  });
  const color = tinycolor(state.hexValue);

  const resetColor = useCallback(async (colorVal) => {
    dispatch({ type: SET_HEX, payload: colorVal })
    dispatch({ type: SET_RGB, payload: hexToRgb(colorVal) })
    dispatch({ type: SET_COLOR_NAME, payload: await getColorName(colorVal) })
  }, [dispatch])

  const handleChangeComplete = async data => {
    if (data.hsl !== background) {
      dispatch({ type: SET_HEX, payload: data.hex })
      dispatch({ type: SET_RGB, payload: data.rgb })
      dispatch({ type: SET_COLOR_NAME, payload: await getColorName(data.hex) })
      setBackground(data.hsl);
      setOpacityBg(data.hsl.a);
    }
  };

  return (
    <div id="main" className="w-full pb-10">
      <section className="container mx-auto my-10 flex flex-col gap-2 justify-center items-center">
        <h1 className="text-3xl font-bold">Color Picker</h1>
        <p className="text-xl font-bold max-w-lg text-center">Get useful color information like conversion, combinations, blindness simulation and more.</p>
        <small className="text-foreground/80">ShortCut: (press <kbd className="bg-muted p-0.5 shadow-sm border-r-2 border-b-2 rounded-sm">CTRL</kbd> + <kbd className="bg-muted p-0.5 shadow-sm border-r-2 border-b-2 rounded-sm">Spacebar</kbd> to generate a random color)</small>
      </section>
      <section className="container px-10 my-5 flex justify-end items-center ">
        <div className="flex flex-row-reverse p-1 gap-3 border rounded-sm flex-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => {
                  CopyAndAlert({ content: state.hexValue });
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
                  e.preventDefault();
                  const randomColor = generateRandomColor();
                  resetColor(randomColor);
                }} variant='ghost'>
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
      <section className="h-fit flex flex-col sm:flex-row gap-5 px-5 items-stretch justify-center">
        <div className="relative w-full rounded-lg shadow-xl flex justify-center min-h-[200px] sm:min-h-0 text-2xl font-bold items-center sm:max-w-[600px]" style={{
          backgroundColor: state.hexValue,
          color: getTextColor(state.hexValue),
          opacity: opacityBg
        }}>
          {state.colorName}
          <div className="absolute top-3 right-4 flex justify-center items-center gap-3">
            <AddColorDialog
              toastAction
              open={modalOpen}
              setOpen={setModalOpen}
              color={{ hexCode: state.hexValue, name: state.colorName }}
              defaults={{ name: state.colorName, color: state.hexValue }}
            />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={'ghost'} className={'h-9 w-9 p-0'}>
                  <SizeIcon className="w-6 h-6" scale={2} />
                </Button>
              </SheetTrigger>
              <SheetContent side={'bottom'} className="h-screen" style={{ backgroundColor: state.hexValue, color: getTextColor(state.hexValue) }}>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <ChromePicker
            disableAlpha={false}
            className="min-w-full"
            color={state.rgbValue}
            onChange={(color) => {
              dispatch({ type: SET_HEX, payload: color.hex })
              dispatch({ type: SET_RGB, payload: color.rgb })
            }}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      </section>
      <section className="container space-y-10 my-10">
        <div>
          <div className="flex justify-between items-start mx-5 sm:items-center flex-col sm:flex-row">
            <h3 className="text-3xl font-bold font-segoe mb-5">Lighten</h3>
          </div>
          <div className="min-h-[100px] shadow-md rounded-lg overflow-hidden flex ">
            {new Array(10).fill(0).map((_, i) => (
              <ColorVariantButton
                key={i}
                color={color}
                currentColor={tinycolor(state.hexValue).lighten((i) * 5).toString(appState.colorFormat)}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-start mx-5 sm:items-center flex-col sm:flex-row">
            <h3 className="text-3xl font-bold font-segoe mb-5">Darken</h3>
          </div>
          <div className=" shadow-md rounded-lg overflow-hidden flex items-center justify-stretch ">
            {new Array(11).fill(0).map((_, i) => (
              <ColorVariantButton
                key={i}
                color={color}
                currentColor={tinycolor(state.hexValue).darken((i) * 5).toString()}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-start mx-5 sm:items-center flex-col sm:flex-row">
            <h3 className="text-3xl font-bold font-segoe mb-5">Hue Shift</h3>
          </div>
          <div className="min-h-[100px] shadow-md rounded-lg overflow-hidden flex ">
            {new Array(11).fill(0).map((_, i) => (
              <ColorVariantButton
                key={i}
                color={color}
                currentColor={tinycolor(state.hexValue).spin((i - 5) * 5).toString(appState.colorFormat)}
              />
            )
            )}
          </div>
        </div>
      </section>
      <section className='container'>
        <div className="flex justify-between items-start mx-5 sm:items-center flex-col sm:flex-row">
          <h3 className="text-4xl font-bold font-segoe mb-5">Harmonies</h3>
        </div>
        <div className="grid gap-10 mx-10 grid-flow-row grid-cols-1 sm:grid-cols-2">
          {COLOR_HARMONIES.map((harmony, i) => (
            <div key={harmony.label}>
              <div className="flex justify-between items-start mx-5 sm:items-center flex-col sm:flex-row">
                <h3 className="text-3xl font-bold font-segoe mb-5">{properCase(harmony.label)}</h3>
              </div>
              <div className="min-h-[100px] rounded-lg overflow-hidden flex shadow-md">
                {harmony.buildColors(color.toHex()).map((variant, i) => (
                  <ColorVariantButton
                    key={i}
                    color={color}
                    currentColor={variant.toString(appState.colorFormat)}
                  />
                )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ColorPicker