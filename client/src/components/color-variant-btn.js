import { DotFilledIcon } from "@radix-ui/react-icons"
import { useCopy } from "../hooks/useCopy"
import { getTextColor } from "../lib/colors"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"

function ColorVariantButton({ color, currentColor }) {
  const { CopyAndAlert } = useCopy()

  return (
    <Button
      className="flex-1 p-0 min-h-[100px] flex group/btn hover:flex-[2] focus-visible:flex-[2] rounded-none"
      style={{ backgroundColor: currentColor }}
      onClick={() => CopyAndAlert({ content: currentColor })}
    >
      {color && (
        <DotFilledIcon
          className={cn('w-8 h-8 group-hover/btn:hidden', currentColor === color.toString('hex') ? 'visible' : 'invisible')}
          style={{ color: getTextColor(currentColor) }}
        />
      )}
      <span
        className="hidden group-hover/btn:flex group-focus-visible/btn:flex"
        style={{ color: getTextColor(currentColor) }}
      >
        {currentColor}
      </span>
    </Button>
  )
}

export default ColorVariantButton