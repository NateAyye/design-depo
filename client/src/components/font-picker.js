// Component Had Dependency Problems (made 3 years ago) Had to copy it over and modify it to work with the current project
import {
  FONT_FAMILY_DEFAULT,
  FontManager,
  OPTIONS_DEFAULTS,
} from "@samuelmeuli/font-manager";
import React, { PureComponent } from "react";
import { cn } from "../lib/utils";


/**
 * Return the fontId based on the provided font family
 */
function getFontId(fontFamily) {
  return fontFamily.replace(/\s+/g, "-").toLowerCase();
}

/***
 * FontPicker component
 * Displays a button with the currently selected font and a dropdown menu with all available fonts
 * 
 *  Component Had Dependency Problems (made 3 years ago) Had to copy it over and modify it to work with the current project
 * 
 * @repository https://github.com/samuelmeuli/font-picker-react
 * @package https://www.npmjs.com/package/font-picker-react
 * @demo https://font-picker.samuelmeuli.com/
 */
export default class FontPicker extends PureComponent {
  // Instance of the FontManager class used for managing, downloading and applying fonts
  fontManager;

  static defaultProps = {
    activeFontFamily: FONT_FAMILY_DEFAULT,
    onChange: () => { }, // eslint-disable-line @typescript-eslint/no-empty-function
    pickerId: OPTIONS_DEFAULTS.pickerId,
    families: OPTIONS_DEFAULTS.families,
    categories: OPTIONS_DEFAULTS.categories,
    scripts: OPTIONS_DEFAULTS.scripts,
    variants: OPTIONS_DEFAULTS.variants,
    filter: OPTIONS_DEFAULTS.filter,
    limit: OPTIONS_DEFAULTS.limit,
    sort: OPTIONS_DEFAULTS.sort,
  };

  state = {
    expanded: false,
    loadingStatus: "loading",
  };

  constructor(props) {
    super(props);

    const {
      apiKey = 'AIzaSyC6zgSrt_c3HKNqkUqqITZ0zgWTpPzfzdY',
      activeFontFamily,
      pickerId,
      families,
      categories,
      scripts,
      variants,
      filter,
      limit,
      sort,
      onChange,
    } = this.props;

    const options = {
      pickerId,
      families,
      categories,
      scripts,
      variants,
      filter,
      limit,
      sort,
    };

    // Initialize FontManager object
    this.fontManager = new FontManager(apiKey, activeFontFamily, options, onChange);
  }

  componentDidMount = () => {
    // Generate font list
    this.fontManager
      .init()
      .then(() => {
        this.setState({
          loadingStatus: "finished",
        });
      })
      .catch((err) => {
        // On error: Log error message
        this.setState({
          loadingStatus: "error",
        });
        console.error("Error trying to fetch the list of available fonts");
        console.error(err);
      });
  };

  /**
   * After every component update, check whether the activeFontFamily prop has changed. If so,
   * call this.setActiveFontFamily with the new font
   */
  componentDidUpdate = (prevProps) => {
    const { activeFontFamily, onChange } = this.props;

    // If active font prop has changed: Update font family in font manager and component state
    if (activeFontFamily !== prevProps.activeFontFamily) {
      this.setActiveFontFamily(activeFontFamily);
    }

    // If onChange prop has changed: Update onChange function in font manager
    if (onChange !== prevProps.onChange) {
      this.fontManager.setOnChange(onChange);
    }
  };

  /**
   * EventListener for closing the font picker when clicking anywhere outside it
   */
  onClose = (e) => {
    let targetEl = e.target; // Clicked element
    const fontPickerEl = document.getElementById(`font-picker${ this.fontManager.selectorSuffix }`);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (targetEl === fontPickerEl) {
        // Click inside font picker: Exit
        return;
      }
      if (targetEl.parentNode) {
        // Click outside font picker: Move up the DOM
        targetEl = targetEl.parentNode;
      } else {
        // DOM root is reached: Toggle picker, exit
        this.toggleExpanded();
        return;
      }
    }
  };

  /**
   * Update the active font on font button click
   */
  onSelection = (e) => {
    const target = e.target;
    const activeFontFamily = target.textContent;
    if (!activeFontFamily) {
      throw Error(`Missing font family in clicked font button`);
    }
    this.setActiveFontFamily(activeFontFamily);
    this.toggleExpanded();
  };

  /**
   * Set the specified font as the active font in the fontManager and update activeFontFamily in the
   * state
   */
  setActiveFontFamily = (activeFontFamily) => {
    this.fontManager.setActiveFont(activeFontFamily);
  };

  /**
   * Generate <ul> with all font families
   */
  generateFontList = (fonts) => {
    const { activeFontFamily } = this.props;
    const { loadingStatus } = this.state;

    if (loadingStatus !== "finished") {
      return <div />;
    }
    return (
      <ul className="font-list">
        {fonts.map(
          (font) => {
            const isActive = font.family === activeFontFamily;
            const fontId = getFontId(font.family);
            return (
              <li key={fontId} className="z-50 font-list-item">
                <button
                  type="button"
                  id={`font-button-${ fontId }${ this.fontManager.selectorSuffix }`}
                  className={` font-button ${ isActive ? "active-font" : "" }`}
                  onClick={this.onSelection}
                  onKeyPress={this.onSelection}
                >
                  {font.family}
                </button>
              </li>
            );
          },
        )}
      </ul>
    );
  };

  /**
   * Expand/collapse the picker's font list
   */
  toggleExpanded = () => {
    const { expanded } = this.state;

    if (expanded) {
      this.setState({
        expanded: false,
      });
      document.removeEventListener("click", this.onClose);
    } else {
      this.setState({
        expanded: true,
      });
      document.addEventListener("click", this.onClose);
    }
  };

  render = () => {
    const { activeFontFamily, sort, className } = this.props;
    const { expanded, loadingStatus } = this.state;

    // Extract and sort font list
    const fonts = Array.from(this.fontManager.getFonts().values());
    if (sort === "alphabet") {
      fonts.sort((font1, font2) => font1.family.localeCompare(font2.family));
    }

    // Render font picker button and attach font list to it
    return (
      <div
        id={`font-picker${ this.fontManager.selectorSuffix }`}
        className={cn(expanded ? "expanded" : "", "text-black", className)}
      >
        <button
          type="button"
          className="dropdown-button"
          onClick={this.toggleExpanded}
          onKeyPress={this.toggleExpanded}
        >
          <p className="dropdown-font-family">{activeFontFamily}</p>
          <p className={`dropdown-icon ${ loadingStatus }`} />
        </button>
        {loadingStatus === "finished" && this.generateFontList(fonts)}
      </div>
    );
  };
}