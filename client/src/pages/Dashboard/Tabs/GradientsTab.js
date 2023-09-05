import { useMutation, useQuery } from '@apollo/client';
import { PlusIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import AddGradientDialog from '../../../components/dialogs/add-gradient-dialog';
import AddToProjectDialog from '../../../components/dialogs/add-to-project-dialog';
import ItemContainer from '../../../components/item-container';
import ItemGrid from '../../../components/item-grid';
import ItemSkeletonList from '../../../components/item-skeleton-list';
import TabTitle from '../../../components/tab-title';
import { Button } from '../../../components/ui/button';
import { DropdownMenuItem } from '../../../components/ui/dropdown-menu';
import { useToast } from '../../../components/ui/use-toast';
import { useAppContext } from '../../../context/AppState';
import {
  REMOVE_GRADIENT,
  SET_GRADIENTS,
} from '../../../context/AppState/actions';
import { useCopy } from '../../../hooks/useCopy';
import authService from '../../../lib/auth';
import { getTextColor } from '../../../lib/colors';
import { DELETE_GRADIENT } from '../../../lib/mutations';
import { QUERY_ALL_GRADIENTS } from '../../../lib/queries';

function GradientsTab() {
  const [appState, appDispatch] = useAppContext();
  const [color, setColor] = useState('rgba(255, 255, 255, 1)');
  const { loading, error, data, refetch } = useQuery(QUERY_ALL_GRADIENTS);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [deleteGradient] = useMutation(DELETE_GRADIENT);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('Black');
  const [currentGradient, setCurrentGradient] = useState(null);
  const navigate = useNavigate();
  const { CopyAndAlert } = useCopy();
  const { toast } = useToast();
  const dialogProps = { color, setColor, name, setName };

  useEffect(() => {
    if (loading) return;
    if (!data) return;

    appDispatch({
      type: SET_GRADIENTS,
      payload: data.Gradients.filter(
        (gradient) => gradient.userId === authService.getProfile().data._id
      ),
    });
  }, [data, loading, appDispatch]);

  useEffect(() => {
    refetch();
  });

  if (error) return <p>Error :(</p>;

  return (
    <div>
      <TabTitle title={'Gradients'} />
      <ItemGrid>
        <AddGradientDialog
          {...dialogProps}
          open={modalOpen}
          setOpen={setModalOpen}
          editing={!!currentGradient}
          gradient={currentGradient || ''}
          triggerElement={() => {
            return (
              <Button
                onClick={() => {
                  setCurrentGradient(null);
                  setModalOpen(true);
                }}
                className="p-0 m-0 flex-1 flex flex-col justify-center items-center w-full max-w-full focus-visible:ring-foreground focus-visible:border-2 flex-center rounded-md h-24 bg-foreground"
              >
                <PlusIcon
                  className="w-10 h-10 text-background font-bold"
                  scale={3}
                />
                Add Gradient
              </Button>
            );
          }}
        />
        {loading ? (
          <ItemSkeletonList />
        ) : (
          appState.gradients.map((gradient) => (
            <ItemContainer
              key={gradient._id}
              title={gradient.gradientName || gradient.name}
              onRemove={async (e) => {
                e.stopPropagation();
                deleteGradient({ variables: { id: gradient._id } }).then(
                  (res) => {
                    appDispatch({
                      type: REMOVE_GRADIENT,
                      payload: gradient._id,
                    });
                    toast({
                      title: `Removed ${gradient.gradientName} from gradients.`,
                      description: 'Removed color from gradients.',
                      variant: 'destructive',
                    });
                  }
                );
              }}
              onSelect={() => {
                CopyAndAlert({ content: gradient.color });
              }}
              menuContent={
                <>
                  <DropdownMenuItem asChild>
                    <Button
                      onClick={() => {
                        setCurrentGradient(gradient);
                        setProjectModalOpen(true);
                      }}
                      className="w-full justify-start"
                      variant="ghost"
                    >
                      Add To Project
                    </Button>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Button
                      onClick={() => {
                        setCurrentGradient(gradient);
                        setModalOpen(true);
                      }}
                      className="w-full justify-start"
                      variant="ghost"
                    >
                      Edit Gradient
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      const url =
                        window.location.origin +
                        '/gradient-generator?' +
                        createSearchParams({
                          gradient: gradient.color,
                        }).toString();
                      CopyAndAlert({
                        content: url,
                        title: `Copied ${url} to clipboard.`,
                        description: '',
                      });
                    }}
                  >
                    Share Gradient
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate({
                        pathname: `/gradient-generator`,
                        search: createSearchParams({
                          gradient: gradient.color,
                        }).toString(),
                      });
                    }}
                  >
                    Open in Gradient Picker
                  </DropdownMenuItem>
                </>
              }
              containerStyle={{ background: gradient.color }}
            >
              <span
                className="font-bold not-sr-only group-hover:sr-only"
                style={{ color: getTextColor(gradient.color) }}
              >
                {gradient.name || gradient.gradientName}
              </span>

              <span
                className="font-bold sr-only group-hover:not-sr-only text-center text-ellipsis max-w-full max-h-full"
                style={{ color: getTextColor(gradient.color) }}
              >
                {gradient.color}
              </span>
            </ItemContainer>
          ))
        )}
      </ItemGrid>
      <AddToProjectDialog
        item={currentGradient}
        open={projectModalOpen}
        setOpen={setProjectModalOpen}
        type={'gradients'}
      />
    </div>
  );
}

export default GradientsTab;
