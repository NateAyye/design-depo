import React, { useEffect, useState } from 'react';
import TabTitle from '../../../components/tab-title';
import ItemGrid from '../../../components/item-grid';
import ItemContainer from '../../../components/item-container';
import { Button } from '../../../components/ui/button';
import { useAppContext } from '../../../context/AppState'; // Import useAppContext
import { ADD_PROJECT,REMOVE_PROJECT,SET_PROJECTS } from '../../../context/AppState/actions';
//import { Modal, ModalOverlay, ModalContent } from 'Shadcn'; // Make sure to replace '@your-ui-library' with the actual library import
//import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,DialogFooter } from "@/components/ui/dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,DialogFooter } from "../../../components/ui/dialog";
import { useToast } from "../../../components/ui/use-toast"
import { QUERY_ALL_PROJECTS } from "../../../lib/queries"
import { useMutation, useQuery } from "@apollo/client"
import authService from "../../../lib/auth"
import { DELETE_PROJECT,ADD_Project } from "../../../lib/mutations"

function ProjectsTab() {
  const { toast } = useToast()
  const { loading, error, data, refetch } = useQuery(QUERY_ALL_PROJECTS);
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const [addProject] = useMutation(ADD_Project);
  const [appState, appDispatch] = useAppContext();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!data) return;
    appDispatch({
      type: SET_PROJECTS, payload: data.Projects.filter(project => project.userName._id === authService.getProfile().data._id)
    })
  }, [data, loading, appDispatch]);
  useEffect(() => {
    refetch()
  });
  const openCreateProjectModal = () => {
    setIsCreateProjectModalOpen(true);
  };

  const closeCreateProjectModal = () => {
    setIsCreateProjectModalOpen(false);
    setProjectName(""); // Clear the project name input
  };

  const createProject = async() => {
    if (projectName.trim() === "") {
      return; // Don't create if the project name is empty
    }
    await addProject({ variables: { userName: authService.getProfile().data._id,projectName:projectName } })
    appDispatch({ type: ADD_PROJECT, payload: { projectName } });
    closeCreateProjectModal();
  };

 
  return (
    <div>
      <TabTitle title={'Projects'} />
      <Button
          className="p-0 m-0 flex-1 flex flex-col justify-center items-center w-full max-w-full focus-visible:ring-foreground focus-visible:border-2 flex-center rounded-md h-12 bg-foreground"
          onClick={openCreateProjectModal}
        >
          Create Project
        </Button>
      <ItemGrid>
        {appState.projects && appState.projects.length > 0 ? (
        appState.projects.map((project,key) => (
          <ItemContainer
           key={project._id}
           onRemove={async (e) => {
            e.stopPropagation()
            try {
                await deleteProject({variables:{deleteProjectId: project._id}});
                // Dispatch an action to remove the project from state 
                appDispatch({ type: DELETE_PROJECT, payload: project.id });
                
                // Show a toast or notification for successful deletion
                toast({
                    title: `The project ${project.projectName} has been successfully removed.`,
                    description: 'Remove project from projects',
                    variant: 'destructive'
                  })
              } catch (error) {
                // Handle any errors that may occur during deletion
                console.error('Error deleting project:', error);
                
              }
            
          }}
           >
            {/* Render the project content here */}
            <span className="font-bold not-sr-only">
                  {project.projectName}
            </span>
          </ItemContainer>
        ))):(<p>No projects found.</p>)}
      </ItemGrid>
      {/* Create Project Modal */}
      <Dialog open={isCreateProjectModalOpen} onClose={closeCreateProjectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              <input
                type="text"
                placeholder="Enter project name"
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="mr-2" onClick={closeCreateProjectModal}>Cancel</Button>
            <Button onClick={createProject} disabled={projectName.trim() === ""}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
  
}

export default ProjectsTab;
