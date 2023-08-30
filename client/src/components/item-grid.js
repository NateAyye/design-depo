import { ScrollArea } from './ui/scroll-area'

function ItemGrid({ children }) {
  return (
    <ScrollArea className="h-[70vh] rounded-md border">
      <div className="py-5 px-8 grid gap-5 grid-cols-1  lg:grid-cols-2  2xl:grid-cols-3 3xl:grid-cols-4">
        {children}
      </div>
    </ScrollArea>
  )
}

export default ItemGrid