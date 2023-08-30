import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { SketchPicker } from "react-color";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useAppContext } from "../../context/AppState";
import { ADD_COLOR, SET_MODAL_OPEN, SET_TAB } from "../../context/AppState/actions";
import authService from "../../lib/auth";
import { getColorName } from "../../lib/colors";
import { CREATE_COLOR } from "../../lib/mutations";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string(),
  color: z.string()
})

function AddColorDialog({ toastAction = false, triggerElement, hex, rgb, name, setName, setHex, setRgb  }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [createColor] = useMutation(CREATE_COLOR);
  const navigate = useNavigate();
  const [, appDispatch] = useAppContext()
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    values: {
      name: name,
      color: hex,
    },
    defaultValues: {
      name: '',
      color: '',
    }
  })

  async function onFormSubmit(values) {
    try {
      // TODO: Add color to database
      const mutationResponse = await createColor({ variables: { hexCode: values.color, name: values.name, userId: authService.getProfile().data._id } })
      const color = mutationResponse.data;
      appDispatch({ type: ADD_COLOR, payload: color.createColor })
      toast({
        title: `Success: ${ values.name }`,
        description: 'Color saved successfully.',
        action: !toastAction ? null : (
          <ToastAction
            onClick={() => {
              appDispatch({ type: SET_TAB, payload: 'colors' })
              localStorage.setItem('activeDashboardTab', 'colors')
              navigate('/dashboard')
            }}
            altText="Go to Colors Tab"
          >
            View
          </ToastAction>
        ),
        variant: 'success'
      })
      setOpen(false);
    } catch (error) {
      setError(error?.response?.data?.message || error?.message || 'Something went wrong.');
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
    <Dialog open={open} onOpenChange={(open) => {
      appDispatch({ type: SET_MODAL_OPEN, payload: open })
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
          <DialogTitle>Add Color</DialogTitle>
          <DialogDescription>
            Save color to your dashboard for later use.
          </DialogDescription>
        </DialogHeader>
        {!authService.loggedIn() || authService.isTokenExpired(authService.getToken()) ? (
          <div>
            <p className="text-center">Please login to save colors.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit, onError)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      The Custom Name for you Color.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
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
                          <div
                            className="w-9 h-4 rounded-[2px]"
                            style={{
                              background: `rgba(${ rgb.r }, ${ rgb.g }, ${ rgb.b }, ${ rgb.a })`,
                            }}
                          />
                        </div>
                        {displayColorPicker ? (
                          <div className="absolute z-10">
                            <div className="fixed inset-0" onClick={() => {
                              setDisplayColorPicker(false)
                            }} />
                            <SketchPicker
                              color={rgb}
                              onChangeComplete={async (color) => setName(await getColorName(color.hex))}
                              onChange={(color) => {
                                setHex(color.hex)
                                setRgb(color.rgb)
                              }}
                            />
                          </div>
                        ) : null}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Color Value
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row-reverse justify-start gap-4">
                <Button variant={'outline'} type="submit">Submit</Button>
                <Button
                  variant={'outline'}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
            {error && (
              <div className="bg-red-500 mt-2 text-white w-fit text-sm py-1 px-3 rounded">
                {error}
              </div>
            )}
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddColorDialog