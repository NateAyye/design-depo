import { PlusIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import AddGradientDialog from "../../../components/dialogs/add-gradient-dialog"
import GradientItem from "../../../components/gradient-item"
import TabTitle from "../../../components/tab-title"
import { Button } from "../../../components/ui/button"
import { useAppContext } from "../../../context/AppState"
import { ADD_GRADIENT } from "../../../context/AppState/actions"

function GradientsTab() {
  const [appState, appDispatch] = useAppContext()
  const [color, setColor] = useState('rgba(255, 255, 255, 1)')
  const [name, setName] = useState("Black");
  const dialogProps = { color, setColor, name, setName }

  return (
    <div>
      <TabTitle title={'Gradients'} />
      <div className="flex-1 flex mx-5 flex-col sm:flex-row sm:flex-wrap gap-8 justify-start items-start">
        <AddGradientDialog
          {...dialogProps}
          onSubmit={(values) => {
            appDispatch({ type: ADD_GRADIENT, payload: values })
          }}
          triggerElement={() => {
            return (
              <Button className="p-0 m-0 flex-1 flex flex-col justify-center items-center w-full max-w-full focus-visible:ring-foreground focus-visible:border-2  sm:min-w-[200px] sm:max-w-[400px] min-h-[100px] rounded-lg shadow relative bg-foreground">
                <PlusIcon className="w-10 h-10 text-background font-bold" scale={3} />
                Add Gradient
              </Button>
            )
          }}
        />

        {appState.gradients.map((gradient) => (
          <GradientItem key={gradient.id} gradient={gradient} />
        ))}
      </div>
    </div>
  )
}

export default GradientsTab