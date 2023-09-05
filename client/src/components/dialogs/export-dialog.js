import { useEffect, useState } from 'react';
import { useCopy } from '../../hooks/useCopy';
import { getColorName } from '../../lib/colors';
import { generateRandomId } from '../../lib/utils';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Textarea } from '../ui/text-area';

const formatCss = async (palette) => {
  const colors = palette.colors;
  const css = [];
  for (const color of colors) {
    const colorName = await getColorName(color);
    const varriable = `--${colorName.toLowerCase().replaceAll(' ', '-')}`;
    css.push(`${varriable}: ${color};`);
  }
  return `
  :root {
    ${css.join('\n    ')}
  }`;
};

export function ExportDialog({ triggerElement, description, palette }) {
  const [cssFile, setCssFile] = useState('');
  const { CopyAndAlert } = useCopy();

  useEffect(() => {
    async function setCss() {
      setCssFile(await formatCss(palette));
    }
    setCss();
  }, [palette]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerElement ? (
          triggerElement()
        ) : (
          <Button className="w-full justify-start px-2" variant="ghost">
            Export
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
          <DialogDescription>
            {description ?? 'Export your palette to a variety of formats.'}
          </DialogDescription>
        </DialogHeader>
        <Textarea
          rows={10}
          cols={20}
          className="resize-none"
          onChange={(e) => setCssFile(e.target.value)}
          value={cssFile}
        ></Textarea>
        <DialogFooter>
          <Button
            onClick={() => {
              const element = document.createElement('a');
              const file = new Blob([cssFile], { type: 'text/plain' });
              element.href = URL.createObjectURL(file);
              element.download = `designDepo${generateRandomId()}.css`;
              document.body.appendChild(element); // Required for this to work in FireFox
              element.click();
              element.remove();
            }}
          >
            Download CSS File
          </Button>
          <Button
            onClick={() => {
              CopyAndAlert({ content: cssFile });
            }}
          >
            Copy CSS
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
