import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppState";
import { default as Auth, default as authService } from "../lib/auth";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { ModeToggle } from "./ui/theme-toggle";

function Navbar() {
  const [appState] = useAppContext()

  return (
    <div className=" border-b">
      <div className="container flex justify-between items-center">
        <Link to={'/'}>
          <h1 className="text-xl sm:text-3xl font-bold">Design Depo</h1>
        </Link>
        <nav aria-labelledby="primary-navigation-label" className="my-1">
          <span id="primary-navigation-label" className="sr-only">Primary Navigation</span>
          <ul className="flex justify-center items-center gap-1 [&_li]:flex [&_li]:justify-center [&_li]:items-center">
            <li className="flex md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex md:hidden" variant="link">Tools</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Button className='justify-start' variant="link" asChild>
                      <Link to="/color-picker">Color Picker</Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button className="justify-start" variant="link" asChild>
                      <Link to="/gradient-generator">Gradient Generator</Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button className="justify-start" variant="link" asChild>
                      <Link to="/palette-generator">Palette Generator</Link>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li className="hidden  md:flex">
              <Button className="hidden md:flex" variant="link" asChild>
                <Link to="/color-picker">Color Picker</Link>
              </Button>
            </li>
            <li className="hidden md:flex">
              <Button className="hidden md:flex" variant="link" asChild>
                <Link to="/gradient-generator">Gradient Generator</Link>
              </Button>
            </li>
            <li className="hidden md:flex">
              <Button className="hidden md:flex" variant="link" asChild>
                <Link to="/palette-generator">Palette Generator</Link>
              </Button>
            </li>
            {!appState.logged_in ? (
              <li>
                <Button className='px-1' variant="primary" asChild>
                  <Link to="/auth">Login</Link>
                </Button>
              </li>
            ) : (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded-full">
                    <Avatar className={cn('ring-0 ring-white hover:ring-2 border-none transition-all duration-150 ')}>
                      <AvatarImage src="" />
                      <AvatarFallback>{Auth.getProfile().data.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Button className='justify-start cursor-pointer' variant="ghost" asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Button className='justify-start cursor-pointer' variant="ghost" asChild>
                        <Link to="/profile">Profile</Link>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Button
                        className='justify-start cursor-pointer w-full font-bold'
                        variant="destructive"
                        onClick={() => {
                          authService.logout();
                        }}>
                        Logout
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )}
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar