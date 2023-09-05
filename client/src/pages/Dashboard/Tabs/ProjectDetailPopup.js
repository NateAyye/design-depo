import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import ColorVariantButton from '../../../components/color-variant-btn';
import AddColorDialog from '../../../components/dialogs/add-color-dialog';
import AddGradientDialog from '../../../components/dialogs/add-gradient-dialog';
import AddToProjectDialog from '../../../components/dialogs/add-to-project-dialog';
import ItemContainer from '../../../components/item-container';
import ItemGrid from '../../../components/item-grid';
import { Button } from '../../../components/ui/button';
import { DropdownMenuItem } from '../../../components/ui/dropdown-menu';
import { useToast } from '../../../components/ui/use-toast';
import { useAppContext } from '../../../context/AppState';
import {
  REMOVE_COLOR,
  REMOVE_FONT,
  REMOVE_GRADIENT,
  REMOVE_PALETTE,
} from '../../../context/AppState/actions';
import { useCopy } from '../../../hooks/useCopy';
import { formatColor, getTextColor } from '../../../lib/colors';
import { REMOVE_ITEM_FROM_PROJECT } from '../../../lib/mutations';
import '../../../styles/ProjectDetailPopup.css';

const apiKey = 'AIzaSyC6zgSrt_c3HKNqkUqqITZ0zgWTpPzfzdY';

function ProjectDetailPopup({ project, onClose }) {
  const [deleteItem] = useMutation(REMOVE_ITEM_FROM_PROJECT);
  const [{ colorFormat }, appDispatch] = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { CopyAndAlert } = useCopy();
  const [googleFonts, setGoogleFonts] = useState([]);
  const [activeGrid, setActiveGrid] = useState('palettes');
  const isButtonActive = (gridName) => activeGrid === gridName;
  const activeButtonStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
  };

  useEffect(() => {
    async function fetchFonts() {
      const res = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`
      );
      const data = await res.json();
      setGoogleFonts(data.items);
    }
    fetchFonts();
  }, []);

  return (
    <div>
      <div className="header_container" style={{ height: '200px' }}>
        <h1 className="content_h1">
          The Content of Project: {project.projectName}
        </h1>
        <nav>
          <ItemGrid>
            <Button
              onClick={() => setActiveGrid('palettes')}
              style={isButtonActive('palettes') ? activeButtonStyle : {}}
            >
              Pallets
            </Button>

            <Button
              onClick={() => setActiveGrid('colors')}
              style={isButtonActive('colors') ? activeButtonStyle : {}}
            >
              Colors
            </Button>

            <Button
              onClick={() => setActiveGrid('fonts')}
              style={isButtonActive('fonts') ? activeButtonStyle : {}}
            >
              Fonts
            </Button>

            <Button
              onClick={() => setActiveGrid('gradients')}
              style={isButtonActive('gradients') ? activeButtonStyle : {}}
            >
              Gradients
            </Button>
          </ItemGrid>
        </nav>
      </div>

      <div>
        <hr></hr>
        <div className="content_body">
          {activeGrid === 'palettes' && (
            <div id="pallets_container">
              <ItemGrid>
                {project.palettes.length > 0 ? (
                  project.palettes.map((palette) => (
                    <div>
                      <p>{palette.paletteName}</p>
                      <ItemContainer
                        key={palette._id}
                        //title={palette.paletteName}
                        onRemove={async (e) => {
                          e.stopPropagation();
                          console.log(project._id);
                          console.log(palette._id);
                          // console.log(project._id);
                          deleteItem({
                            variables: {
                              id: project._id,
                              itemId: palette._id,
                              type: 'palettes',
                            },
                          }).then((res) => {
                            appDispatch({
                              type: REMOVE_PALETTE,
                              payload: palette._id,
                            });
                            toast({
                              title: `Removed ${palette.paletteName} from palettes.`,
                              description: 'Removed color from palettes.',
                              variant: 'destructive',
                            });
                          });
                        }}
                        menuContent={
                          <>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                const url =
                                  window.location.origin +
                                  '/palette-generator?' +
                                  createSearchParams({
                                    palette: palette.colors
                                      .map((color) => color.replace('#', ''))
                                      .join('-'),
                                  }).toString();
                                CopyAndAlert({
                                  content: url,
                                  title: `Copied ${url} to clipboard.`,
                                  description: '',
                                });
                              }}
                            >
                              Copy URL
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Palette</DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate({
                                  pathname: `/palette-generator`,
                                  search: createSearchParams({
                                    palette: palette.colors
                                      .map((color) => color.replace('#', ''))
                                      .join('-'),
                                  }).toString(),
                                });
                              }}
                            >
                              Open in Palette Generator
                            </DropdownMenuItem>
                          </>
                        }
                      >
                        <div className="flex h-full overflow-hidden flex-1 rounded-lg shadow-md relative">
                          {palette.colors.map((color) => (
                            <ColorVariantButton
                              key={color}
                              currentColor={color}
                            />
                          ))}
                        </div>
                      </ItemContainer>
                    </div>
                  ))
                ) : (
                  <p>No Pallets are assigned to this project.</p>
                )}
              </ItemGrid>
            </div>
          )}
          {activeGrid === 'colors' && (
            <div id="colors_container">
              <ItemGrid>
                {project.colors.length > 0 ? (
                  project.colors.map((color) => (
                    <div>
                      <ItemContainer
                        key={color._id}
                        title={color.name ?? color.hexCode}
                        onSelect={() =>
                          CopyAndAlert({
                            content: formatColor(color.hexCode, colorFormat),
                          })
                        }
                        onRemove={async (e) => {
                          e.stopPropagation();
                          // TODO: Add remove color functionality

                          deleteItem({
                            variables: {
                              id: project._id,
                              itemId: color._id,
                              type: 'colors',
                            },
                          }).then((res) => {
                            appDispatch({
                              type: REMOVE_COLOR,
                              payload: color._id,
                            });
                            toast({
                              title: `Removed ${
                                color.name ?? color.hexCode
                              } from colors.`,
                              description: 'Removed color from colors.',
                              variant: 'destructive',
                            });
                          });
                        }}
                        containerStyle={{ background: color.hexCode }}
                        menuContent={
                          <>
                            <DropdownMenuItem asChild>
                              <AddToProjectDialog
                                item={color}
                                type={'colors'}
                              />
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                const url =
                                  window.location.origin +
                                  '/color-picker?' +
                                  createSearchParams({
                                    color: color.hexCode,
                                  }).toString();
                                CopyAndAlert({
                                  content: url,
                                  title: `Copied ${url} to clipboard.`,
                                  description: '',
                                });
                              }}
                            >
                              Share Color
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <AddColorDialog
                                editing
                                color={color}
                                triggerElement={() => (
                                  <Button
                                    className="w-full justify-start px-2"
                                    variant="ghost"
                                  >
                                    Edit Color
                                  </Button>
                                )}
                              />
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate({
                                  pathname: `/color-picker`,
                                  search: createSearchParams({
                                    color: color.hexCode,
                                  }).toString(),
                                });
                              }}
                            >
                              Open in Color Picker
                            </DropdownMenuItem>
                          </>
                        }
                      >
                        <span
                          className="font-bold not-sr-only group-hover:sr-only"
                          style={{ color: getTextColor(color.hexCode) }}
                        >
                          {color.name ?? color.hexCode}
                        </span>

                        <span
                          className="font-bold sr-only group-hover:not-sr-only"
                          style={{ color: getTextColor(color.hexCode) }}
                        >
                          {formatColor(color.hexCode, colorFormat)}
                        </span>
                      </ItemContainer>
                    </div>
                  ))
                ) : (
                  <p>No Colors are assigned to this project.</p>
                )}
              </ItemGrid>
            </div>
          )}
          {activeGrid === 'fonts' && (
            <div id="font_container">
              <ItemGrid>
                {project.fonts.length > 0 ? (
                  project.fonts.map((font) => (
                    <div>
                      <style>
                        @import url('https://fonts.googleapis.com/css2?family=
                        {font.activeFontFamily}&display=swap');
                      </style>
                      <ItemContainer
                        key={font._id}
                        containerClass={'bg-foreground text-background'}
                        containerStyle={{ fontFamily: font.activeFontFamily }}
                        onRemove={async (e) => {
                          e.stopPropagation();
                          // TODO: Add remove color functionality
                          deleteItem({
                            variables: {
                              id: project._id,
                              itemId: font._id,
                              type: 'fonts',
                            },
                          }).then((res) => {
                            appDispatch({
                              type: REMOVE_FONT,
                              payload: font._id,
                            });
                            toast({
                              title: `Removed ${font.fontName} from colors.`,
                              description: 'Removed color from colors.',
                              variant: 'destructive',
                            });
                          });
                        }}
                        title={font.fontName}
                        menuContent={
                          <>
                            <DropdownMenuItem asChild>
                              <AddToProjectDialog item={font} type={'fonts'} />
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              asChild
                              className={'hover:bg-transparent'}
                            >
                              <Button
                                variant={'ghost'}
                                className="w-full flex justify-center items-center gap-1"
                                asChild
                                // onClick={() => CopyAndAlert({ content: font.activeFontFamily })}
                              >
                                <a
                                  href={
                                    googleFonts.find(
                                      (fontItem) =>
                                        fontItem.family ===
                                        font.activeFontFamily
                                    )?.files.regular
                                  }
                                  download={`${font.activeFontFamily}.ttf`}
                                >
                                  Download Font (.ttf)
                                </a>
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              asChild
                              className={'hover:bg-transparent'}
                            >
                              <Button
                                variant={'ghost'}
                                className="w-full flex justify-center items-center gap-1"
                                onClick={() =>
                                  CopyAndAlert({
                                    content: `@import url('https://fonts.googleapis.com/css2?family=${font.activeFontFamily}&display=swap');`,
                                  })
                                }
                              >
                                Copy CSS Import
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              asChild
                              className={'hover:bg-transparent'}
                            >
                              <Button
                                variant={'ghost'}
                                className="w-full flex justify-center items-center gap-1"
                                onClick={() =>
                                  CopyAndAlert({
                                    content: font.activeFontFamily,
                                  })
                                }
                              >
                                Copy Font Family
                              </Button>
                            </DropdownMenuItem>
                          </>
                        }
                      >
                        {font.activeFontFamily}
                      </ItemContainer>
                    </div>
                  ))
                ) : (
                  <p>No Pallets are assigned to this project.</p>
                )}
              </ItemGrid>
            </div>
          )}
          {activeGrid === 'gradients' && (
            <div id="gradients_container">
              <ItemGrid>
                {project.gradients.length > 0 ? (
                  project.gradients.map((gradient) => (
                    <div>
                      <ItemContainer
                        key={gradient._id}
                        title={gradient.gradientName || gradient.name}
                        onRemove={async (e) => {
                          e.stopPropagation();
                          deleteItem({
                            variables: {
                              id: project._id,
                              itemId: gradient._id,
                              type: 'gradients',
                            },
                          }).then((res) => {
                            appDispatch({
                              type: REMOVE_GRADIENT,
                              payload: gradient._id,
                            });
                            toast({
                              title: `Removed ${gradient.gradientName} from gradients.`,
                              description: 'Removed color from gradients.',
                              variant: 'destructive',
                            });
                          });
                        }}
                        onSelect={() => {
                          CopyAndAlert({ content: gradient.color });
                        }}
                        menuContent={
                          <>
                            <DropdownMenuItem asChild>
                              <AddToProjectDialog
                                item={gradient}
                                type={'gradients'}
                              />
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <AddGradientDialog
                                editing
                                gradient={gradient}
                                triggerElement={() => (
                                  <Button
                                    className="w-full justify-start px-2"
                                    variant="ghost"
                                  >
                                    Edit Gradient
                                  </Button>
                                )}
                              />
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
                    </div>
                  ))
                ) : (
                  <p>No Pallets are assigned to this project.</p>
                )}
              </ItemGrid>
            </div>
          )}
        </div>
        <hr></hr>
        <Button onClick={onClose} className="content_Button">
          Go Back to projects list
        </Button>
      </div>
    </div>
  );
}

export default ProjectDetailPopup;

/*
0
: 
{__typename: 'Font', _id: '64f221e6bb2a0a9dceecc810', activeFontFamily: 'Abril Fatface'}
*/
