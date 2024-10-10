// MUI for App
import { Box, ListItemButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// Styles
import "./Header.scss";
import { Link } from "react-router-dom";

interface IHeader {
  children?: React.ReactNode;
  activeBackButton?: boolean;
  className?: string;
}

export default function Header({
  children,
  activeBackButton = true,
  className = "",
}: IHeader) {
  return (
    <div
      className={`header-notes ${className}`}
      style={{
        display: "flex",
        boxSizing: "border-box",
        justifyContent: "space-between",
        minHeight: "67px",
      }}
    >
      {activeBackButton && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ListItemButton
            sx={{
              borderRadius: "8px",
              display: "flex",
              width: "41px",
              height: "41px",
              boxSizing: "border-box",
              justifyContent: "center",
            }}
          >
            <Link
              to={"/"}
              onClick={() => speechSynthesis.cancel()}
              style={{
                display: "flex",
                padding: "8px 16px",
                boxSizing: "border-box",
                textDecoration: "none",
                outline: "none",
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" sx={{ fill: "#A4A4A4" }} />
            </Link>
          </ListItemButton>
        </Box>
      )}
      {children ? children : ""}
    </div>
  );
}
