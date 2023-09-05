import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import ItemContainer from '../../../components/item-container';
import ItemGrid from '../../../components/item-grid';
import TabTitle from '../../../components/tab-title';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { DropdownMenuItem } from '../../../components/ui/dropdown-menu';
import { useToast } from '../../../components/ui/use-toast';
import { useAppContext } from '../../../context/AppState'; // Import useAppContext
import { ADD_PROJECT, SET_PROJECTS } from '../../../context/AppState/actions';
import authService from '../../../lib/auth';
import {
  ADD_Project,
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from '../../../lib/mutations';
import { QUERY_ALL_PROJECTS } from '../../../lib/queries';
import ProjectDetailPopup from './ProjectDetailPopup'; // Import your popup component

function ProjectsTab() {
  const { toast } = useToast();
  const { loading, error, data, refetch } = useQuery(QUERY_ALL_PROJECTS);
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const [addProject] = useMutation(ADD_Project);
  const [updateProjectName] = useMutation(UPDATE_PROJECT);
  const [appState, appDispatch] = useAppContext();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [projectName, setProjectName] = useState('');
  const [updatedProjectName, setUpdatedProjectName] = useState(''); //state to hold the updated project name
  const [selectedProjectId, setSelectedProjectId] = useState(null); //state to keep track of the project ID that you want to update
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false); // state variables to keep track of whether the update popup is open
  const [selectedProject, setSelectedProject] = useState(null); //state variable to keep track of the selected project
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!data) return;
    appDispatch({
      type: SET_PROJECTS,
      payload: data.Projects.filter(
        (project) => project.userName._id === authService.getProfile().data._id
      ),
    });
  }, [data, loading, appDispatch]);
  useEffect(() => {
    refetch();
  });
  const openCreateProjectModal = () => {
    setIsCreateProjectModalOpen(true);
  };

  useEffect(() => {
    // Get the selected project ID from localStorage
    const storedSelectedProjectId = localStorage.getItem('selectedProjectId');

    // If a project ID is stored, find the project and set the state
    if (storedSelectedProjectId && appState.projects) {
      const selectedProject = appState.projects.find(
        (project) => project._id === storedSelectedProjectId
      );
      if (selectedProject) {
        setSelectedProject(selectedProject);
        setIsPopupOpen(true);
      }
    }
  }, [appState.projects]);

  const closeCreateProjectModal = () => {
    setIsCreateProjectModalOpen(false);
    setProjectName(''); // Clear the project name input
  };

  const createProject = async () => {
    if (projectName.trim() === '') {
      return; // Don't create if the project name is empty
    }
    await addProject({
      variables: {
        userName: authService.getProfile().data._id,
        projectName: projectName,
      },
    });
    appDispatch({ type: ADD_PROJECT, payload: { projectName } });
    closeCreateProjectModal();
  };

  const updateProject = async () => {
    if (updatedProjectName.trim() === '') {
      return; // Don't update if the new project name is empty
    }
    await updateProjectName({
      variables: {
        updateProjectNameId: selectedProjectId,
        newProjectName: updatedProjectName,
      },
    });

    // After the update, reset the selectedProjectId and updatedProjectName states
    setSelectedProjectId(null);
    setUpdatedProjectName('');
    setIsUpdatePopupOpen(false); // Close the update popup
    refetch();
  };

  const updateProjectData = async () => {
    // Perform a re-fetch of the project data here
    refetch();
  };

  if (error) return <p>Error :(</p>;

  return (
    <div>
      {selectedProject ? (
        <div>
          {isPopupOpen && (
            <ProjectDetailPopup
              project={selectedProject}
              onClose={() => {
                setIsPopupOpen(false);
                localStorage.removeItem('selectedProjectId');
                setSelectedProject(null);
                updateProjectData();
                //refetch();
              }}
            />
          )}
        </div>
      ) : (
        <div>
          <dic>
            <TabTitle title={'Projects'} />
            <Button
              className="p-0 m-0 flex-1 flex flex-col justify-center items-center w-full max-w-full focus-visible:ring-foreground focus-visible:border-2 flex-center rounded-md h-12 bg-foreground"
              onClick={openCreateProjectModal}
            >
              Create Project
            </Button>
          </dic>
          <ItemGrid>
            {appState.projects && appState.projects.length > 0 ? (
              appState.projects.map((project) => (
                <ItemContainer
                  className={'hover:cursor-pointer'}
                  key={project._id}
                  onSelect={() => {
                    setSelectedProject(project);
                    setIsPopupOpen(true);
                    localStorage.setItem('selectedProjectId', project._id);
                  }}
                  onRemove={async (e) => {
                    e.stopPropagation();
                    try {
                      await deleteProject({
                        variables: { deleteProjectId: project._id },
                      });
                      // Dispatch an action to remove the project from state
                      appDispatch({
                        type: DELETE_PROJECT,
                        payload: project.id,
                      });

                      // Show a toast or notification for successful deletion
                      toast({
                        title: `The project ${project.projectName} has been successfully removed.`,
                        description: 'Remove project from projects',
                        variant: 'destructive',
                      });
                    } catch (error) {
                      // Handle any errors that may occur during deletion
                      console.error('Error deleting project:', error);
                    }
                  }}
                  menuContent={
                    <DropdownMenuItem
                      asChild
                      className={'hover:bg-transparent hover:text-destructive'}
                    >
                      <Button
                        onClick={() => {
                          setSelectedProjectId(project._id);
                          setUpdatedProjectName(project.projectName);
                          setIsUpdatePopupOpen(true);
                        }}
                        variant={'Default '}
                        className="w-full flex justify-center items-center gap-1"
                      >
                        Update
                      </Button>
                    </DropdownMenuItem>
                  }
                >
                  <span className="font-bold not-sr-only">
                    {project.projectName}
                  </span>
                </ItemContainer>
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </ItemGrid>
          <Dialog
            open={isCreateProjectModalOpen}
            onClose={closeCreateProjectModal}
          >
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
                <Button className="mr-2" onClick={closeCreateProjectModal}>
                  Cancel
                </Button>
                <Button
                  onClick={createProject}
                  disabled={projectName.trim() === ''}
                >
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isUpdatePopupOpen}
            onClose={() => setIsUpdatePopupOpen(false)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Project Name</DialogTitle>
                <DialogDescription>
                  <input
                    type="text"
                    placeholder="Enter updated project name"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                    value={updatedProjectName}
                    onChange={(e) => setUpdatedProjectName(e.target.value)}
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  className="mr-2"
                  onClick={() => setIsUpdatePopupOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={updateProject}
                  disabled={updatedProjectName.trim() === ''}
                >
                  Update
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}

export default ProjectsTab;
