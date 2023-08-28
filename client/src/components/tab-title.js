import { Button } from "./ui/button"

function TabTitle({ title, onFormSubmit }) {
  return (
    <div className="flex justify-between items-start mx-5 sm:items-center flex-col sm:flex-row">
      <h2 className="text-5xl font-bold font-segoe mb-5">{title}</h2>
      <div className="flex">
        <form onSubmit={(e) => {
          e.preventDefault()
          if (onFormSubmit) onFormSubmit(e)
          // TODO: Add search functionality
        }} className="flex justify-center items-center gap-2">
          <input type="search" placeholder="Search" name="search" className="bg-transparent border border-foreground/20 rounded-md px-3 py-1.5 text-foreground/80 focus:outline-none focus:ring-1 focus:ring-foreground/50 focus:border-foreground/50" />
          <Button type='submit'>Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default TabTitle