import { Separator } from '@radix-ui/react-dropdown-menu';
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

function Footer() {
  return (
    <footer className="footer border-t pt-3 relative z-50">
      <div className="container">
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-4 place-items-center">
          <div className="text-center">
            <p className="text-foreground font-bold text-2xl font-segoe">
              Design Depo
            </p>
            <small>
              Your one stop shop for all you color and design needs. No pay
              Walls Free EVERYTHING!!
            </small>
          </div>
          <div>
            <p className="text-foreground font-bold text-lg">Links</p>
            <ul className="flex flex-col justify-center">
              <li className="text-foreground">
                <Button asChild variant="link" className="px-0">
                  <Link to={'/'}>Home</Link>
                </Button>
              </li>
              <li className="text-foreground">
                <Button asChild variant="link" className="px-0">
                  <Link to={'/dashboard'}>Dashboard</Link>
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-foreground font-bold text-lg">Tools</p>
            <ul className="flex flex-col justify-center">
              <li className="text-foreground">
                <Button asChild variant="link" className="px-0">
                  <Link to={'/color-picker'}>Color Picker</Link>
                </Button>
              </li>
              <li className="text-foreground">
                <Button asChild variant="link" className="px-0">
                  <Link to={'/gradient-generator'}>Gradient Generator</Link>
                </Button>
              </li>
              <li className="text-foreground">
                <Button asChild variant="link" className="px-0">
                  <Link to={'/palette-generator'}>Palette Generator</Link>
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-foreground font-bold text-lg">Contact</p>
            <ul className="flex flex-col justify-center">
              <li className="text-foreground">
                <Button asChild variant="link" className="px-0">
                  <Link
                    to={'https://github.com/NateAyye/design-depo/issues/new'}
                  >
                    Report Bug
                  </Link>
                </Button>
              </li>
              <li className="text-foreground">
                <Button asChild variant="link" className="px-0">
                  <a href={'mailto:nathanacuevas97@gmail.com'}>Email</a>
                </Button>
              </li>
              <li className="text-foreground">
                <Button asChild variant="link" className="px-0">
                  <Link to={'/contact'}>Support</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="h-[1px] bg-foreground/20 mx-2" />
        <div className="flex justify-between">
          <span className="text-foreground">
            &copy; {new Date().getFullYear()}
          </span>
          <div className="flex gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="link" className="px-0">
                    <Link to={'https://github.com/NateAyye/design-depo'}>
                      <GitHubLogoIcon />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Github Repository</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="link" className="px-0">
                    <Link to={'/not-found'}>
                      <InstagramLogoIcon />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Instagram Page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="link" className="px-0">
                    <Link to={'https://www.linkedin.com/in/nathan-cuevas/'}>
                      <LinkedInLogoIcon />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Linked In Page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
