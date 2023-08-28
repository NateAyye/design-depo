import { default as ReactFontPicker } from "font-picker-react";
import React from "react";

export const FontPicker = () => {
  const [activeFontFamily, setActiveFontFamily] = React.useState('Open Sans')

  return (
    <div className="text-black">
      <ReactFontPicker
        apiKey="AIzaSyC6zgSrt_c3HKNqkUqqITZ0zgWTpPzfzdY"
        activeFontFamily={activeFontFamily}
        onChange={(nextFont) =>
          setActiveFontFamily(nextFont.family)
        }
      />
    </div>
  );
};