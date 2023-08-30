import { useMutation } from "@apollo/client";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppState";
import { ADD_FONT, SET_TAB } from "../../context/AppState/actions";
import authService from "../../lib/auth";
import { CREATE_FONT } from "../../lib/mutations";
import { cn } from "../../lib/utils";
import FontPicker from "../font-picker";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";

function AddFontDialog({ toastAction = false, triggerElement, name, setName, fontFamily, setFontFamily }) {
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [, appDispatch] = useAppContext()
  const [createFont] = useMutation(CREATE_FONT)
  const [exampleText, setExampleText] = useState('The quick brown fox jumps over the lazy dog.')
  const dialogRef = useRef(null)
  const [fontName, setFontName] = useState(name || 'Open Sans')
  const [activeFontFamily, setActiveFontFamily] = useState(fontFamily || 'Open Sans')
  const { toast } = useToast();


  async function onFormSubmit(values) {
    try {
      // TODO: Add color to database
      const mutationResponse = await createFont({ variables: { ...values, userId: values.userId } })
      const font = mutationResponse.data;
      appDispatch({ type: ADD_FONT, payload: font.createFont })
      toast({
        title: `Success: ${ values.fontName }`,
        description: 'Font saved successfully.',
        action: !toastAction ? null : (
          <ToastAction
            onClick={() => {
              appDispatch({ type: SET_TAB, payload: 'fonts' })
              localStorage.setItem('activeDashboardTab', 'fonts')
              navigate('/dashboard')
            }}
            altText="Go to Fonts Tab"
          >
            View
          </ToastAction>
        ),
        variant: 'success'
      })
      setIsModalOpen(false)
      dialogRef.current.close()
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Something went wrong.');
      onError(error);
      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  }


  const onError = async (data) => {
    const message = data?.name?.message || data?.color?.message || 'Something went wrong.';
    toast({
      title: `Error: ${ message }`,
      description: 'Failed to save font. Please check all form fields or try again later. \n Thank you.',
      variant: 'destructive'
    })
  }


  return (
    <>
      <Button onClick={(e) => {
        e.preventDefault();
        setIsModalOpen(true)
        dialogRef.current.showModal()
      }} className="p-0 m-0 flex-1 flex  flex-col justify-center items-center w-full max-w-full focus-visible:ring-foreground focus-visible:border-2 flex-center rounded-md h-24 bg-foreground">
        <PlusIcon className="w-10 h-10 text-background font-bold" scale={3} />
        Add Font
      </Button>
      <dialog
        ref={dialogRef}
        className={cn("relative pb-10 py-2 rounded-md px-4 w-full flex justify-center space-y-11 items-center min-h-[400px] flex-col sm:max-w-[400px] bg-background text-foreground", isModalOpen ? 'opacity-100' : 'opacity-0 hidden pointer-events-none')}
        onClose={(e) => {
          e.preventDefault();
          dialogRef.current.close()
          setIsModalOpen(false)
        }}
      >
        <Button className={'absolute top-2 rounded-full p-0 h-6 w-6 right-3 text-destructive'} variant='ghost' onClick={() => {
          dialogRef.current.close()
          setIsModalOpen(false)
        }}>
          <Cross1Icon className='h-4 w-4' />
        </Button>
        <div className={cn("flex flex-col self-stretch space-y-1.5 text-center sm:text-left",)}>
          <h2 className="text-lg font-semibold leading-none tracking-tight">Add Font</h2>
          <p className="text-sm text-muted-foreground">Add a Font to your dashboard.</p>
        </div>
        <div className="self-stretch">
          <Label htmlFor='fontName' >Name</Label>
          <Input type='text' id='fontName' className='' placeholder={activeFontFamily} value={fontName} onChange={(e) => setFontName(e.target.value)} />
        </div>
        <div className="flex flex-col z-50 justify-center items-center relative">
          <Label htmlFor='font-picker'>Font Family</Label>
          <FontPicker
            limit={300}
            activeFontFamily={activeFontFamily}
            onChange={(nextFont) => {
              setActiveFontFamily(nextFont.family)
            }}
          />
          <p className="apply-font">{exampleText}</p>
        </div>
        <div className="self-stretch">
          <Label htmlFor='example' >Example</Label>
          <Input type='text' id='example' className='apply-font' placeholder={activeFontFamily} value={exampleText} onChange={(e) => setExampleText(e.target.value)} />
        </div>
        <div className="flex self-stretch flex-row-reverse justify-start gap-4">
          <Button
            type="submit"
            variant={'outline'}
            onClick={() => {
              const fontValues = {
                fontName,
                activeFontFamily,
                userId: authService.getProfile().data._id
              }
              onFormSubmit(fontValues)
            }}
          >
            Submit
          </Button>
          <Button
            variant={'outline'}
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(false)
              dialogRef.current.close()
            }}
          >
            Cancel
          </Button>
        </div>
        {error && (
          <div className="bg-red-500 mt-2 text-white w-fit text-sm py-1 px-3 rounded">
            {error}
          </div>
        )}
      </dialog>
    </>
  )
}

export default AddFontDialog