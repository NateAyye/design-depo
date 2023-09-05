import { useMutation, useQuery } from "@apollo/client";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppState";
import { ADD_PROJECT, SET_PROJECTS, SET_TAB, UPDATE_PROJECT } from "../../context/AppState/actions";
import authService from "../../lib/auth";
import { ADD_ITEM_TO_PROJECT, ADD_Project } from "../../lib/mutations";
import { QUERY_USERS_ITEMS } from "../../lib/queries";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useToast } from "../ui/use-toast";

function AddToProjectDialog({ item, type, open, setOpen }) {
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDialog, setNewProjectDialog] = useState(false);
  const [appState, appDispatch] = useAppContext()
  const [addItemToProject] = useMutation(ADD_ITEM_TO_PROJECT)
  const { loading, error, data } = useQuery(QUERY_USERS_ITEMS, {
    variables: { userId: authService.getProfile().data._id }
  })
  const [createProject] = useMutation(ADD_Project);
  const { toast } = useToast()

  useEffect(() => {
    if (data?.GetUserItems) {
      appDispatch({ type: SET_PROJECTS, payload: data?.GetUserItems.projects })
    }
  }, [data?.GetUserItems, appDispatch])

  if (error) return <p>Error :(</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add To Project</DialogTitle>
            <DialogDescription>
              Save {type} to your dashboard for later use.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className={'h-[300px]'}>
            <ul className="max-w-[300px] m-auto space-y-3">
              <li>
                <Button variant='secondary' onClick={() => setNewProjectDialog(true)} className='w-full shadow'>
                  + New Project
                </Button>
              </li>
              {appState.projects?.map((project) => (
                <li
                  key={project._id}
                >
                  <Button
                    className='w-full shadow'
                    onClick={() => {
                      setOpen(false)
                      addItemToProject({ variables: { id: project._id, itemId: item._id, type } }).then(res => {
                        appDispatch({ type: UPDATE_PROJECT, payload: res.data.addItemToProject })
                        toast({
                          title: `${ type } Added to project: ${ project.projectName }`,
                          action: <ToastAction
                            onClick={() => {
                              appDispatch({ type: SET_TAB, payload: 'projects' })
                              localStorage.setItem('activeDashboardTab', 'projects')
                              window.location.assign('/dashboard')
                            }}
                            altText={`Go to ${ type } Tab`}
                          >
                            View
                          </ToastAction>,
                          variant: 'success'
                        })
                      })
                    }}
                  >
                    {project.projectName}
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <Dialog open={newProjectDialog} onOpenChange={setNewProjectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>
          <Input type='text' placeholder='New Project' value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />
          <Button onClick={() => {
            createProject({ variables: { projectName: newProjectName, userName: authService.getProfile().data._id } }).then((res) => {
              setNewProjectDialog(false)
              setNewProjectName('')
              console.log(res);
              appDispatch({ type: ADD_PROJECT, payload: res.data.createProject })
            })
          }}>
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddToProjectDialog