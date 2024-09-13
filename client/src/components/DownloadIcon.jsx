import React from "react";
import { IconButton, useTheme } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const DownloadIcon = ({ fileName }) => {
  const theme = useTheme();

  const downloadHandler = async (fileName) => {
    let res = await fetch(
      process.env.REACT_APP_BASE_URL + "/download/pdfDownload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: fileName,
        }),
      }
    );
    let blob = await res.blob();
    const data = window.URL.createObjectURL(new Blob([blob]));

    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <IconButton onClick={() => downloadHandler(fileName)}>
      <DescriptionOutlinedIcon
        sx={{
          color: theme.palette.primary[500],
          width: 28,
          height: 24,
        }}
      />
    </IconButton>
  );
};

export default DownloadIcon;
