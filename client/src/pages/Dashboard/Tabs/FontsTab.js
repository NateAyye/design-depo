import { useMutation, useQuery } from "@apollo/client"
import { PlusIcon } from "@radix-ui/react-icons"
import { useEffect, useRef, useState } from "react"
import AddFontDialog from "../../../components/dialogs/add-font-dialog"
import AddToProjectDialog from "../../../components/dialogs/add-to-project-dialog"
import ItemContainer from "../../../components/item-container"
import ItemGrid from "../../../components/item-grid"
import ItemSkeletonList from "../../../components/item-skeleton-list"
import TabTitle from "../../../components/tab-title"
import { Button } from "../../../components/ui/button"
import { DropdownMenuItem } from "../../../components/ui/dropdown-menu"
import { useToast } from "../../../components/ui/use-toast"
import { useAppContext } from "../../../context/AppState"
import { REMOVE_FONT, SET_FONTS } from "../../../context/AppState/actions"
import { useCopy } from "../../../hooks/useCopy"
import authService from "../../../lib/auth"
import { DELETE_FONT } from "../../../lib/mutations"
import { QUERY_ALL_FONTS } from "../../../lib/queries"

const apiKey = 'AIzaSyC6zgSrt_c3HKNqkUqqITZ0zgWTpPzfzdY'


function FontsTab({ style }) {
  const [appState, appDispatch] = useAppContext()
  const [deleteFont] = useMutation(DELETE_FONT);
  const { toast } = useToast()
  const { CopyAndAlert } = useCopy()
  const fonts = useRef()
  const { loading, error, data, refetch } = useQuery(QUERY_ALL_FONTS);
  const [googleFonts, setGoogleFonts] = useState([])
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [currentFont, setCurrentFont] = useState(null)

  useEffect(() => {
    async function fetchFonts() {
      if (fonts.current) return
      const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${ apiKey }`)
      const data = await res.json()
      setGoogleFonts(data.items)
    }
    fetchFonts()
  }, [])

  useEffect(() => {
    if (loading) return;
    if (!data) return;
    appDispatch({
      type: SET_FONTS, payload: data.Fonts.filter(font => font.userId === authService.getProfile().data._id)
    })
  }, [data, loading, appDispatch])

  useEffect(() => {
    refetch()
  })



  if (error) return <p>Error :(</p>;


  return (
    <div>
      <TabTitle title={'Fonts'} />
      <ItemGrid>
        <AddFontDialog
          triggerElement={() => (
            <Button className="p-0 m-0 flex-1 flex flex-col justify-center items-center w-full max-w-full focus-visible:ring-foreground focus-visible:border-2 flex-center rounded-md h-24 bg-foreground">
              <PlusIcon className="w-10 h-10 text-background font-bold" scale={3} />
              Add Font
            </Button>
          )}
        />
        {loading ? (<ItemSkeletonList />) : appState.fonts.map((font) => (
          <div key={font._id}>
            <style>
              @import url('https://fonts.googleapis.com/css2?family={font.activeFontFamily}&display=swap');
            </style>
            <ItemContainer
              key={font._id}
              containerClass={'bg-foreground text-background'}
              containerStyle={{ fontFamily: font.activeFontFamily }}
              onRemove={async (e) => {
                e.stopPropagation()
                // TODO: Add remove color functionality
                deleteFont({ variables: { id: font._id } }).then((res) => {
                  appDispatch({ type: REMOVE_FONT, payload: font._id })
                  toast({
                    title: `Removed ${ font.fontName } from fonts.`,
                    description: 'Removed font from fonts.',
                    variant: 'destructive'
                  })
                })
              }}
              title={font.fontName}
              menuContent={
                <>
                  <DropdownMenuItem asChild>
                    <Button
                      variant={'ghost'}
                      className='w-full flex justify-center items-center gap-1'
                      onClick={() => {
                        setCurrentFont(font)
                        setProjectModalOpen(true)
                      }}
                    >
                      Add To Project
                    </Button>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild className={'hover:bg-transparent'}>
                    <Button
                      variant={'ghost'}
                      className='w-full flex justify-center items-center gap-1'
                      asChild
                    // onClick={() => CopyAndAlert({ content: font.activeFontFamily })}
                    >
                      <a href={googleFonts.find(fontItem => fontItem.family === font.activeFontFamily)?.files.regular} download={`${ font.activeFontFamily }.ttf`} >
                        Download Font (.ttf)
                      </a>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className={'hover:bg-transparent'}>
                    <Button
                      variant={'ghost'}
                      className='w-full flex justify-center items-center gap-1'
                      onClick={() => CopyAndAlert({ content: `@import url('https://fonts.googleapis.com/css2?family=${ font.activeFontFamily }&display=swap');` })}
                    >
                      Copy CSS Import
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className={'hover:bg-transparent'}>
                    <Button
                      variant={'ghost'}
                      className='w-full flex justify-center items-center gap-1'
                      onClick={() => CopyAndAlert({ content: font.activeFontFamily })}
                    >
                      Copy Font Family
                    </Button>
                  </DropdownMenuItem>
                </>
              }
            >
              {font.activeFontFamily}
            </ItemContainer>
          </div>
        )
        )}
      </ItemGrid>
      <AddToProjectDialog item={currentFont} type={'fonts'} open={projectModalOpen} setOpen={setProjectModalOpen} />
    </div>
  )
}

export default FontsTab