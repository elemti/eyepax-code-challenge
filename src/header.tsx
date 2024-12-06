import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

export function AppHeader({
  children,
  onCartClick,
}: {
  children: React.ReactNode;
  onCartClick: () => void;
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {children}
          <div style={{ flex: 1 }} />
          <IconButton sx={{ color: "white" }} onClick={onCartClick}>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
