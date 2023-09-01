import { useMutation, useQuery } from "@apollo/client"
import { PlusIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import AddColorDialog from "../../../components/dialogs/add-color-dialog"
import AddToProjectDialog from "../../../components/dialogs/add-to-project-dialog"
import ItemContainer from "../../../components/item-container"
import ItemGrid from "../../../components/item-grid"
import ItemSkeletonList from "../../../components/item-skeleton-list"
import TabTitle from "../../../components/tab-title"
import { Button } from "../../../components/ui/button"
import { DropdownMenuItem } from "../../../components/ui/dropdown-menu"
import { useToast } from "../../../components/ui/use-toast"
import { useAppContext } from "../../../context/AppState"
import { REMOVE_COLOR, SET_COLORS } from "../../../context/AppState/actions"
import { useCopy } from "../../../hooks/useCopy"
import authService from "../../../lib/auth"
import { formatColor, getTextColor } from "../../../lib/colors"
import { DELETE_COLOR } from "../../../lib/mutations"
import { QUERY_ALL_COLORS } from "../../../lib/queries"

function ColorsTab() {
  const [{ colors, colorFormat }, appDispatch] = useAppContext()
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [name, setName] = useState("Black");
  const { loading, error, data, refetch } = useQuery(QUERY_ALL_COLORS);
  const [deleteColor] = useMutation(DELETE_COLOR);
  const dialogProps = { hex, setHex, rgb, setRgb, name, setName }
  const { toast } = useToast()
  const { CopyAndAlert } = useCopy()
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [editColorModalOpen, setEditColorModalOpen] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    if (loading) return;
    if (!data) return;
    appDispatch({
      type: SET_COLORS, payload: data.Colors.filter(color => color.userId === authService.getProfile().data._id)
    })
  }, [data, loading, appDispatch])

  useEffect(() => {
    refetch()
  })

  if (error) return <p>Error :(</p>;

  return (
    <div>
      <TabTitle title={'Colors'} />
      <ItemGrid>
        <AddColorDialog
          {...dialogProps}
          open={editColorModalOpen}
          setOpen={setEditColorModalOpen}
          editing={!!selectedColor}
          color={selectedColor || { hexCode: hex, name }}
          triggerElement={() => {
            return (
              <Button onClick={() => {
                setSelectedColor(null)
                setEditColorModalOpen(true)
              }} className="p-0 m-0 flex-1 flex flex-col justify-center items-center w-full max-w-full h-24 rounded-md shadow relative bg-foreground">
                <PlusIcon className="w-10 h-10 text-background font-bold" scale={3} />
                Add Color
              </Button>
            )
          }}
        />

        {loading ? (<ItemSkeletonList />) :
          colors.map((color) => {
            return (
              <ItemContainer
                key={color._id}
                title={color.name ?? color.hexCode}
                onSelect={() => CopyAndAlert({ content: formatColor(color.hexCode, colorFormat) })}
                onRemove={async (e) => {
                  e.stopPropagation()
                  // TODO: Add remove color functionality
                  deleteColor({ variables: { deleteColorId: color._id } }).then((res) => {
                    appDispatch({ type: REMOVE_COLOR, payload: color._id })
                    toast({
                      title: `Removed ${ color.name ?? color.hexCode } from colors.`,
                      description: 'Removed color from colors.',
                      variant: 'destructive'
                    })
                  })
                }}
                containerStyle={{ background: color.hexCode }}
                menuContent={
                  <>
                    <DropdownMenuItem asChild>
                      <AddToProjectDialog item={color} type={'colors'} />
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        const url = window.location.origin + '/color-picker?' + createSearchParams({
                          color: color.hexCode
                        }).toString()
                        CopyAndAlert({ content: url, title: `Copied ${ url } to clipboard.`, description: '' })
                      }}
                    >
                      Share Color
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Button className="w-full justify-start" variant='ghost' onClick={() => {
                        setSelectedColor(color)
                        setEditColorModalOpen(true)
                      }}>
                        Edit Button
                      </Button>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation()
                      navigate({
                        pathname: `/color-picker`, search: createSearchParams({
                          color: color.hexCode,
                        }).toString()
                      })
                    }}>Open in Color Picker
                    </DropdownMenuItem>
                  </>
                }
              >
                <span
                  className="font-bold not-sr-only group-hover:sr-only"
                  style={{ color: getTextColor(color.hexCode) }}
                >
                  {color.name ?? color.hexCode}
                </span>

                <span
                  className="font-bold sr-only group-hover:not-sr-only"
                  style={{ color: getTextColor(color.hexCode) }}
                >
                  {formatColor(color.hexCode, colorFormat)}
                </span>
              </ItemContainer>
            )
          })}
      </ItemGrid>
    </div>
  )
}

export default ColorsTab