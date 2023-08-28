import { PlusIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import ColorItem from "../../../components/color-item"
import AddColorDialog from "../../../components/dialogs/add-color-dialog"
import TabTitle from "../../../components/tab-title"
import { Button } from "../../../components/ui/button"
import { useAppContext } from "../../../context/AppState"
import { ADD_COLOR } from "../../../context/AppState/actions"

function ColorsTab() {
  const [appState, appDispatch] = useAppContext()
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [name, setName] = useState("Black");
  const dialogProps = { hex, setHex, rgb, setRgb, name, setName }
  return (
    <div>
      <TabTitle title={'Colors'} />
      <div className="flex-1 flex mx-5 flex-col sm:flex-row sm:flex-wrap gap-8 justify-start items-start">
        <AddColorDialog
          {...dialogProps}
          onSubmit={(values) => {
            appDispatch({ type: ADD_COLOR, payload: values })
          }}
          triggerElement={() => {
            return (
              <Button className="p-0 m-0 flex-1 flex flex-col justify-center items-center w-full max-w-full  sm:min-w-[200px] sm:max-w-[400px] min-h-[100px] rounded-lg shadow relative bg-foreground">
                <PlusIcon className="w-10 h-10 text-background font-bold" scale={3} />
                Add Color
              </Button>
            )
          }}
        />

        {appState.colors.map((color) => (
          <ColorItem key={color.id} color={color} />
        ))}
      </div>
    </div>
  )
}

export default ColorsTab