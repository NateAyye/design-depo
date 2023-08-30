import { useQuery } from "@apollo/client"
import { PlusIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import AddGradientDialog from "../../../components/dialogs/add-gradient-dialog"
import ItemContainer from "../../../components/item-container"
import ItemGrid from "../../../components/item-grid"
import TabTitle from "../../../components/tab-title"
import { Button } from "../../../components/ui/button"
import { DropdownMenuItem } from "../../../components/ui/dropdown-menu"
import { useAppContext } from "../../../context/AppState"
import { SET_GRADIENTS } from "../../../context/AppState/actions"
import { useCopy } from "../../../hooks/useCopy"
import authService from "../../../lib/auth"
import { getTextColor } from "../../../lib/colors"
import { QUERY_ALL_GRADIENTS } from "../../../lib/queries"

function GradientsTab() {
  const [appState, appDispatch] = useAppContext()
  const [color, setColor] = useState('rgba(255, 255, 255, 1)')
  const { loading, error, data, refetch } = useQuery(QUERY_ALL_GRADIENTS);
  const [name, setName] = useState("Black");
  const navigate = useNavigate()
  const { CopyAndAlert } = useCopy()
  const dialogProps = { color, setColor, name, setName }

  useEffect(() => {
    if (loading) return;
    if (!data) return;

    console.log(data);
    appDispatch({
      type: SET_GRADIENTS, payload: data.Gradients.filter(gradient => gradient.userId === authService.getProfile().data._id)
    })
  }, [data, loading, appDispatch])

  useEffect(() => {
    refetch()
  })

  if (error) return <p>Error :(</p>;

  return (
    <div>
      <TabTitle title={'Gradients'} />
      <ItemGrid>
        <AddGradientDialog
          {...dialogProps}
          triggerElement={() => {
            return (
              <Button className="p-0 m-0 flex-1 flex flex-col justify-center items-center w-full max-w-full focus-visible:ring-foreground focus-visible:border-2 flex-center rounded-md h-24 bg-foreground">
                <PlusIcon className="w-10 h-10 text-background font-bold" scale={3} />
                Add Gradient
              </Button>
            )
          }}
        />
        {appState.gradients.map((gradient) => (
          <ItemContainer
            key={gradient._id}
            title={gradient.gradientName || gradient.name}
            onSelect={() => {
              CopyAndAlert({ content: gradient.color })
            }}
            menuContent={
              <>
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
              </>
            }
            containerStyle={{ background: gradient.color }}
          >
            <span
              className="font-bold not-sr-only group-hover:sr-only"
              style={{ color: getTextColor(gradient.color) }}>
              {gradient.name || gradient.gradientName}
            </span>

            <span
              className="font-bold sr-only group-hover:not-sr-only text-center text-ellipsis max-w-full max-h-full"
              style={{ color: getTextColor(gradient.color) }}>
              {gradient.color}
            </span>
          </ItemContainer>
        ))}
      </ItemGrid>
    </div>
  )
}

export default GradientsTab