import { useMutation, useQuery } from "@apollo/client"
import { PlusIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import ColorVariantButton from "../../../components/color-variant-btn"
import AddPaletteDialog from "../../../components/dialogs/add-palette-dialog"
import AddToProjectDialog from "../../../components/dialogs/add-to-project-dialog"
import { ExportDialog } from "../../../components/dialogs/export-dialog"
import ItemContainer from "../../../components/item-container"
import ItemGrid from "../../../components/item-grid"
import ItemSkeletonList from "../../../components/item-skeleton-list"
import TabTitle from "../../../components/tab-title"
import { Button } from "../../../components/ui/button"
import { DropdownMenuItem } from "../../../components/ui/dropdown-menu"
import { useToast } from "../../../components/ui/use-toast"
import { useAppContext } from "../../../context/AppState"
import { REMOVE_PALETTE, SET_PALETTES } from "../../../context/AppState/actions"
import { useCopy } from "../../../hooks/useCopy"
import authService from "../../../lib/auth"
import { generateRandomColor } from "../../../lib/colors"
import { DELETE_PALETTE } from "../../../lib/mutations"
import { QUERY_ALL_PALETTES } from "../../../lib/queries"

function PalettesTab() {
  const [appState, appDispatch] = useAppContext()
  const { loading, error, data, refetch } = useQuery(QUERY_ALL_PALETTES);
  const [deletePalette] = useMutation(DELETE_PALETTE);
  const navigate = useNavigate()
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [open, setOpen] = useState(false);
  const [currentPalette, setCurrentPalette] = useState(null)
  const { toast } = useToast()
  const { CopyAndAlert } = useCopy()

  useEffect(() => {
    if (loading) return;
    if (!data) return;
    appDispatch({
      type: SET_PALETTES, payload: data.Palettes.filter(palette => palette.userId === authService.getProfile().data._id)
    })
  }, [data, loading, appDispatch])

  useEffect(() => {
    refetch()
  })

  if (error) return <p>Error :(</p>;

  return (
    <div>
      <TabTitle title={'Palettes'} />
      <ItemGrid>
        <AddPaletteDialog
          open={open}
          editing={!!currentPalette}
          setOpen={setOpen}
          palette={currentPalette || { paletteName: '', colors: [generateRandomColor(), generateRandomColor(), generateRandomColor(), generateRandomColor(), generateRandomColor()] }}
          triggerElement={() => (
            <Button onClick={() => {
              setCurrentPalette(null)
            }} className="p-0 m-0 flex-1 flex flex-col justify-center items-center w-full max-w-full focus-visible:ring-foreground focus-visible:border-2 flex-center rounded-md h-24 bg-foreground">
              <PlusIcon className="w-10 h-10 text-background font-bold" scale={3} />
              Add Palette
            </Button>
          )}
        />

        {loading ? (<ItemSkeletonList />) : appState.palettes.map((palette) => (
          <ItemContainer
            key={palette._id}
            title={palette.paletteName}
            onRemove={async (e) => {
              e.stopPropagation()
              deletePalette({ variables: { paletteId: palette._id } }).then(res => {
                appDispatch({ type: REMOVE_PALETTE, payload: palette._id })
                toast({
                  title: `Removed ${ palette.paletteName } from palettes.`,
                  description: 'Removed color from palettes.',
                  variant: 'destructive'
                })
              })
            }}
            menuContent={
              <>
                <DropdownMenuItem asChild>
                  <Button onClick={() => {
                    setCurrentPalette(palette)
                    setProjectModalOpen(true)
                  }} className='w-full justify-start' variant='ghost'>
                    Add To Project
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <ExportDialog
                    palette={palette}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    const url = window.location.origin + '/palette-generator?' + createSearchParams({
                      palette: palette.colors.map((color) => color.replace('#', '')).join('-'),
                    }).toString()
                    CopyAndAlert({ content: url, title: `Copied ${ url } to clipboard.`, description: '' })
                  }}
                >
                  Share Palette
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button onClick={() => {
                    setCurrentPalette(palette)
                    setOpen(true)
                  }} className='w-full justify-start ' variant='ghost'>
                    Edit Palette
                  </Button>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate({
                      pathname: `/palette-generator`, search: createSearchParams({
                        palette: palette.colors.map((color) => color.replace('#', '')).join('-'),
                      }).toString()
                    })
                  }}
                >
                  Open in Palette Generator
                </DropdownMenuItem>
              </>
            }
          >
            <div className="flex h-full overflow-hidden flex-1 rounded-lg shadow-md relative" >
              {palette.colors.map((color) => <ColorVariantButton key={color} currentColor={color} />)}
            </div>
          </ItemContainer>
        ))}
      </ItemGrid>
      <AddToProjectDialog item={currentPalette} open={projectModalOpen} setOpen={setProjectModalOpen} type={'palettes'} />
    </div>
  )
}

export default PalettesTab