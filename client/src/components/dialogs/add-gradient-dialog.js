import { zodResolver } from "@hookform/resolvers/zod";
import { HeartIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import ColorPicker from 'react-best-gradient-color-picker';
import { useColorPicker } from "react-best-gradient-color-picker/lib/hooks/useColorPicker";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string(),
  color: z.string()
})

function AddGradientDialog({ onSubmit, triggerElement, name, setName, color, setColor }) {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const { setGradient } = useColorPicker(color, setColor);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
      name: name,
      color: color,
    },
    defaultValues: {
      name: '',
      color: '',
    }
  })

  useEffect(() => {
    setGradient('linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(0, 0, 0) 100%)')
  }, []) // eslint-disable-line 
  // ^^^^ Leave Empty to run once on mount
  // TODO: Fix this warning



  function onFormSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const gradientValues = {
      name: values.name,
      color: color
    }
    if (onSubmit) onSubmit(gradientValues);
    try {
      // TODO: Add color to database
      // const res = await api.post('/login', data);
      // navigate('/')
      toast({
        title: `Success: ${ values.name }`,
        description: 'Gradient saved successfully.',
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
      description: 'Failed to save gradient. Please check all form fields or try again later. \n Thank you.',
      variant: 'destructive'
    })
  }


  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (open) {
        setGradient(color)
      }
      if (displayColorPicker) return
      setOpen(open)
    }}>
      <DialogTrigger asChild>
        {triggerElement ? triggerElement() :
          <Button className='h-9 w-9 p-0' variant="ghost">
            <HeartIcon />
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Gradient</DialogTitle>
          <DialogDescription>
            Save Gradient to your dashboard for later use.
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
                      The Custom Name for you Gradient.
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
                  <FormLabel>Gradient</FormLabel>
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
                          background: `${ color }`,
                        }} />
                      </div>
                      {displayColorPicker ? <div className="absolute left-[110%] bottom-0 translate-y-1/2 bg-white p-2 z-10">
                        <div className="fixed inset-0" onClick={() => {
                          // setDisplayColorPicker(false)
                        }} />
                        <ColorPicker value={color} onChange={setColor} />
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
            <div className="min-h-[70px] rounded-lg overflow-hidden flex items-stretch" style={{ background: color }} />
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

export default AddGradientDialog