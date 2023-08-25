import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { ModeToggle } from "./ui/theme-toggle";

function Navbar() {
  return (
    <div className=" border-b">
      <div className="container flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold">Design Depo</h1>
        <nav aria-labelledby="primary-navigation-label" className="my-1">
          <span id="primary-navigation-label" className="sr-only">Primary Navigation</span>
          <ul className="flex justify-center items-center gap-3 [&_li]:flex [&_li]:justify-center [&_li]:items-center">
            <li>
              <Button variant="link" asChild>
                <Link to="/user/colors">Colors</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link to="/user/palettes">Palettes</Link>
              </Button>
            </li>
            <li>
              <ModeToggle />
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://github.com/NateAyye.png" />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar