import { SizeIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { ChromePicker } from "react-color";
import AddColorDialog from "../components/dialogs/add-color-dialog";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { useAppContext } from "../context/AppState";
import { ADD_COLOR, SET_MODAL_OPEN } from "../context/AppState/actions";
import { useColorPickerContext } from "../context/ColorPicker";
import { SET_COLOR_NAME, SET_HEX, SET_RGB } from "../context/ColorPicker/actions";
import { getColorName, getTextColor } from "../lib/colors";

function ColorPicker() {
  const [state, dispatch] = useColorPickerContext();
  const [, appDispatch] = useAppContext();
  const [opacityBg, setOpacityBg] = useState("1");
  const [background, setBackground] = useState({
    h: 250,
    s: 0,
    l: 0.2,
    a: 1
  });

  const handleChangeComplete = async data => {
    if (data.hsl !== background) {
      dispatch({ type: SET_HEX, payload: data.hex })
      dispatch({ type: SET_RGB, payload: data.rgb })
      dispatch({ type: SET_COLOR_NAME, payload: await getColorName(data.hex) })
      setBackground(data.hsl);
      setOpacityBg(data.hsl.a);
    }
  };

  const dialogProps = { hex: state.hexValue, rgb: state.rgbValue, name: state.colorName, setHex: (hex) => dispatch({ type: SET_HEX, payload: hex }), setRgb: (rgb) => dispatch({ type: SET_RGB, payload: rgb }), setName: (name) => dispatch({ type: SET_COLOR_NAME, payload: name }) }


  return (
    <div id="main" className="w-full">
      <section className="container mx-auto my-10 flex flex-col gap-2 justify-center items-center">
        <h1 className="text-3xl font-bold">Color Picker</h1>
        <p className="text-xl font-bold max-w-lg text-center">Get useful color information like conversion, combinations, blindness simulation and more.</p>
        <small className="text-foreground/80">ShortCut: (press the Spacebar to generate a random color)</small>
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
              {...dialogProps}
              onSubmit={(values) => {
                appDispatch({ type: ADD_COLOR, payload: values })
              }}
              setModalOpen={(open) => appDispatch({ type: SET_MODAL_OPEN, payload: open })}
              defaults={{ name: state.colorName, color: state.hexValue }}
            />
            <Sheet>
              <SheetTrigger asChild>
                <Button onClick={() => {

                }} variant={'ghost'} className={'h-9 w-9 p-0'}>
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
    </div>
  )
}

export default ColorPicker