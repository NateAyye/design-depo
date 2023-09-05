import {
  CopyIcon,
  HeartIcon,
  Share1Icon,
  UpdateIcon,
} from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { default as GradientPicker } from 'react-best-gradient-color-picker';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import AddGradientDialog from '../components/dialogs/add-gradient-dialog';
import ItemContainer from '../components/item-container';
import { Button } from '../components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import { useToast } from '../components/ui/use-toast';
import { useCopy } from '../hooks/useCopy';
import { generateRandomColor, generateRandomGradient } from '../lib/colors';

function GradientGenerator() {
  const [searchParams] = useSearchParams();
  const randomGradient = generateRandomGradient(generateRandomColor());
  const gradient = searchParams.get('gradient') || randomGradient;
  const [gradientState, setGradientState] = useState(gradient);
  const [openModal, setOpenModal] = useState(false);
  const { toast } = useToast();
  const { CopyAndAlert } = useCopy();

  useEffect(() => {
    function onKeyDown(e) {
      if (e.ctrlKey && e.key === ' ') {
        setGradientState(generateRandomGradient(generateRandomColor()));
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col mb-10">
      <div className="flex flex-col mx-5 sm:items-center mb-5 gap-2">
        <h2 className="text-5xl self-start font-bold font-segoe ">
          Gradient Generator
        </h2>
        <small className="text-foreground/80 self-start">
          ShortCut: (press{' '}
          <kbd className="bg-muted p-0.5 shadow-sm border-r-2 border-b-2 rounded-sm">
            CTRL
          </kbd>{' '}
          +{' '}
          <kbd className="bg-muted p-0.5 shadow-sm border-r-2 border-b-2 rounded-sm">
            Spacebar
          </kbd>{' '}
          to generate a random gradient)
        </small>
        <section className="container px-10 my-5 flex justify-end items-center ">
          <div className="flex flex-row-reverse p-1 gap-3 border rounded-sm flex-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      const path = '/gradient-generator';
                      const serarchParams = createSearchParams({
                        gradient: gradientState,
                      }).toString();
                      const url =
                        window.location.origin + path + '?' + serarchParams;
                      navigator.clipboard.writeText(url);
                      // Alert the copied text
                      toast({
                        title: `Copied ${url} to clipboard.`,
                        description: 'Copied URL to clipboard.',
                        variant: 'success',
                      });
                    }}
                    variant="ghost"
                  >
                    <Share1Icon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={(e) => {
                      setGradientState(
                        generateRandomGradient(generateRandomColor())
                      );
                    }}
                    variant="ghost"
                  >
                    <UpdateIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Random Gradient</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <AddGradientDialog
                  toastAction
                  open={openModal}
                  setOpen={setOpenModal}
                  gradient={{ gradientName: '', color: gradientState }}
                />
                <TooltipContent>
                  <p>Save Gradient</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>
      </div>
      <ItemContainer
        dropDownMenu={false}
        className="flex-1"
        containerClass={
          'flex shadow-none flex-col items-center container sm:flex-row-reverse  h-full'
        }
      >
        <div className="p-0 sm:p-4">
          <GradientPicker
            hideColorTypeBtns
            hidePresets
            height={250}
            width={300}
            value={gradientState}
            onChange={setGradientState}
          />
        </div>
        <div
          key={gradient}
          style={{ background: gradientState }}
          role="button"
          tabIndex={0}
          className="group/palette self-stretch rounded-md shadow-lg  flex h-full justify-end items-center sm:justify-center sm:items-end min-h-[200px] flex-1 hover:flex-[1.5] focus-visible:flex-[1.5]"
        >
          <section className="flex flex-row focus-within:not-sr-only sm:flex-col sr-only group-hover/palette:not-sr-only group-focus-visible/palette:not-sr-only">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => CopyAndAlert({ content: gradient })}
                    variant="ghost"
                  >
                    <CopyIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault();
                      setGradientState(
                        generateRandomGradient(generateRandomColor())
                      );
                    }}
                  >
                    <UpdateIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Random Color</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AddGradientDialog
                    toastAction
                    gradient={{ gradientName: '', color: gradientState }}
                    triggerElement={() => {
                      return (
                        <Button variant="ghost">
                          <HeartIcon />
                        </Button>
                      );
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save Gradient</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </section>
        </div>
      </ItemContainer>
    </div>
  );
}

export default GradientGenerator;
