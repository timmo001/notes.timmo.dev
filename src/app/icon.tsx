import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 248,
  height: 248,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 248,
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="280">
          <path
            d="M3,7V5H5V4C5,2.89 5.9,2 7,2H13V9L15.5,7.5L18,9V2H19C20.05,2 21,2.95 21,4V20C21,21.05 20.05,22 19,22H7C5.95,22 5,21.05 5,20V19H3V17H5V13H3V11H5V7H3M7,11H5V13H7V11M7,7V5H5V7H7M7,19V17H5V19H7Z"
            fill="#3730a3"
          />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    },
  );
}
