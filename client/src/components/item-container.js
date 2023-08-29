import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

function ItemContainer({ containerStyle, children, onRemove, menuContent, title, onSelect, className, containerClass, dropDownMenu = true }) {
  const Container = onSelect ? Button : 'div'
  return (
    <div className={cn("group", className)}>
      <Container
        onClick={onSelect}
        style={containerStyle}
        className={cn("flex-center shadow rounded-md w-full h-24", containerClass)}
      >
        {children}
      </Container>
      {dropDownMenu ? (
        <div className="flex justify-between items-center px-1 pt-1">
          <p>{title}</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-6 h-6 bg-muted shadow flex justify-center items-center rounded-sm">
              <DotsHorizontalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='space-y-2'>
              {menuContent ? menuContent : null}
              <DropdownMenuItem asChild className={'hover:bg-transparent hover:text-destructive'}>
                <Button
                  onClick={onRemove}
                  variant={'destructive'}
                  className='w-full flex justify-center items-center gap-1'
                >
                  <TrashIcon />Remove
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : null}
    </div>
  )
}

export default ItemContainer