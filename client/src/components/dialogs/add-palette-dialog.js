import { zodResolver } from "@hookform/resolvers/zod";
import { DotFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { SketchPicker } from "react-color";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { generateRandomColor, hexToRgb } from "../../lib/colors";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string(),
  color: z.string()
})

const defaultPalette = {
  name: 'Tester',
  colors: Array(5).fill(1).map((v, i) => generateRandomColor())
}

function AddPaletteDialog({ onSubmit, triggerElement, palette = defaultPalette }) {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(palette.name);
  const [colors, setColors] = useState(palette.colors);
  const [activeColor, setActiveColor] = useState(palette.colors[0]);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [rgbValue, setRgbValue] = useState(hexToRgb(activeColor));
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
      name: name,
      color: activeColor,
    },
    defaultValues: {
      name: '',
      color: '',
    }
  })

  function onFormSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const paletteValues = {
      name: values.name,
      colors: colors
    }
    if (onSubmit) onSubmit(paletteValues);
    try {
      // TODO: Add color to database
      // const res = await api.post('/login', data);
      // navigate('/')
      toast({
        title: `Success: ${ values.name }`,
        description: 'Color saved successfully.',
        variant: 'success'
      })
      setOpen(false);
    } catch (error) {
      setError(error?.response?.data?.message || 'Something went wrong.');
      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  }


  const onError = async (data) => {
    const message = data?.name?.message || data?.color?.message || 'Something went wrong.';
    toast({
      title: `Error: ${ message }`,
      description: 'Failed to save color. Please check all form fields or try again later. \n Thank you.',
      variant: 'destructive'
    })
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerElement ? triggerElement() :
          <Button className='h-9 w-9 p-0' variant="ghost">
            <HeartIcon />
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Palette</DialogTitle>
          <DialogDescription>
            Save palette to your dashboard for later use.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit, onError)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                delete field.value
                delete field.onChange
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      The Custom Name for you Color.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="text" {...field} />
                      <div
                        className="p-1 bg-white rounded-[1px] shadow-sm inline-block cursor-pointer absolute right-1 top-1/2 -translate-y-1/2"
                        onClick={() => {
                          setDisplayColorPicker(!displayColorPicker)
                        }}
                      >
                        <div className="w-9 h-4 rounded-[2px]" style={{
                          background: `rgba(${ rgbValue.r }, ${ rgbValue.g }, ${ rgbValue.b }, ${ rgbValue.a })`,
                        }} />
                      </div>
                      {displayColorPicker ? <div className="absolute z-10">
                        <div className="fixed inset-0" onClick={() => {
                          setDisplayColorPicker(false)
                        }} />
                        <SketchPicker color={rgbValue} onChange={(color) => {

                          const colorIndex = colors.findIndex((c) => c === activeColor)
                          const newColors = [...colors]
                          newColors[colorIndex] = color.hex
                          setColors(newColors)
                          setActiveColor(color.hex)
                          setRgbValue(color.rgb)
                        }} />
                      </div> : null}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Color Value
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="min-h-[70px] rounded-lg overflow-hidden flex items-stretch">
              {colors?.map((color) => (
                <div key={color} style={{ backgroundColor: color }} onClick={() => {
                  setRgbValue(hexToRgb(color))
                  setActiveColor(color)
                }} onKeyDownCapture={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setRgbValue(hexToRgb(color))
                    setActiveColor(color)
                  }
                }} role="button" tabIndex={0} className="group/palette flex justify-center items-center flex-1 hover:flex-[2]" onKeyDown={(e) => { }} >
                  <span style={{ color: activeColor === color ? 'black' : 'white' }} className={`font-bold font-segoe ${ activeColor === color ? '' : 'sr-only' } group-hover/palette:not-sr-only`} >
                    <DotFilledIcon className={`w-6 h-6 ${ activeColor === color ? '' : '' }`} />
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <Button variant={'outline'} onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant={'outline'} type="submit">Submit</Button>
            </div>
          </form>
          {error && (
            <div className="bg-red-500 mt-2 text-white w-fit text-sm py-1 px-3 rounded">
              {error}
            </div>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddPaletteDialog