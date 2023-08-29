import { useState } from "react"
import tinycolor from "tinycolor2"
import ItemContainer from "../../../components/item-container"
import ItemGrid from "../../../components/item-grid"
import TabTitle from "../../../components/tab-title"
import { Button } from "../../../components/ui/button"
import { DropdownMenuItem } from "../../../components/ui/dropdown-menu"
import { getTextColor } from "../../../lib/colors"

function FontsTab({ style }) {
  const [test, setTest] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const color = tinycolor('#0000ff')
  return (
    <div>
      <TabTitle title={'Fonts'} />
      <ItemGrid>
        {test.map((_, i) => {
          const test1 = color.spin(i * 8).toHexString()
          return (
            <ItemContainer
              onSelect={(e) => {
                console.log(e.target)
              }}
              key={_}
              containerStyle={{ color: getTextColor(test1), backgroundColor: test1 }}
              onRemove={() => {
                setTest((prev) => prev.filter((_, index) => index !== i))
              }}
              title={test1}
              menuContent={
                <>
                  <DropdownMenuItem asChild className={'hover:bg-transparent'}>
                    <Button
                      variant={'ghost'}
                      className='w-full flex justify-center items-center gap-1'
                    >
                      Open in editor
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className={'hover:bg-transparent'}>
                    <Button
                      variant={'ghost'}
                      className='w-full flex justify-center items-center gap-1'
                    >
                      Open in editor
                    </Button>
                  </DropdownMenuItem>
                </>
              }
            >
              {_}
            </ItemContainer>
          )
        })}
      </ItemGrid>
    </div>
  )
}

export default FontsTab