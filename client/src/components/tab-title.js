import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

function TabTitle({ title, onFormSubmit }) {
  return (
    <div className="flex flex-col mx-5 sm:items-center mb-5 gap-2">
      <h2 className="text-5xl self-start font-bold font-segoe ">{title}</h2>
      <div className="flex self-end">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onFormSubmit) onFormSubmit(e);
            // TODO: Add search functionality
          }}
          className="flex justify-center items-center gap-2"
        >
          <input
            disabled={true}
            type="search"
            placeholder="Currently disabled"
            name="search"
            className="bg-transparent border border-foreground/20 rounded-md px-3 py-1.5 text-foreground/80 focus:outline-none focus:ring-1 focus:ring-foreground/50 focus:border-foreground/50 disabled:pointer-events-none  "
          />
          <Button
            disabled
            className="disabled:cursor-not-allowed"
            type="submit"
          >
            <MagnifyingGlassIcon />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default TabTitle;
