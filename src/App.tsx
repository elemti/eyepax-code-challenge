import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AppHeader } from "./header";
import { useCallback, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { inventory } from "./data";

function BasicCard({
  name,
  unitPrice,
  onAddToCart,
  isInCart,
  onRemoveFromCart,
}: {
  name: string;
  unitPrice: number;
  quantity: number;
  isInCart: boolean;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {name}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(unitPrice)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onAddToCart} disabled={isInCart}>
          Add to cart
        </Button>
        {isInCart && (
          <Button size="small" onClick={onRemoveFromCart}>
            Remove
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

function CartViewItem({
  name,
  unitPrice,
  onRemoveFromCart,
}: {
  name: string;
  unitPrice: number;
  onRemoveFromCart: () => void;
}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {name}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(unitPrice)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onRemoveFromCart}>
          Remove from cart
        </Button>
      </CardActions>
    </Card>
  );
}

function CartView({
  items,
  onRemoveFromCart,
}: {
  items: string[];
  onRemoveFromCart: (name: string) => void;
}) {
  const cartItems = useMemo(
    () => inventory.filter((item) => items.includes(item.name)),
    [items]
  );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: "8px" }}>
      {cartItems.map((item) => (
        <CartViewItem
          key={item.name}
          {...item}
          onRemoveFromCart={() => onRemoveFromCart(item.name)}
        />
      ))}
    </Box>
  );
}

function App() {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);

  const removeFromCart = useCallback(
    (name: string) =>
      setCartItems((items) => items.filter((itemName) => itemName !== name)),
    []
  );

  return (
    <>
      <AppHeader onCartClick={() => setShowCart((x) => !x)}>
        <Typography variant="h6">
          {showCart ? "Shopping Cart" : "Amazan"}
        </Typography>
      </AppHeader>
      {(() => {
        if (showCart)
          return (
            <CartView items={cartItems} onRemoveFromCart={removeFromCart} />
          );

        return (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              padding: "8px",
            }}
          >
            {inventory.map((item) => (
              <BasicCard
                key={item.name}
                {...item}
                isInCart={cartItems.includes(item.name)}
                onAddToCart={() =>
                  setCartItems((items) => items.concat(item.name))
                }
                onRemoveFromCart={() => removeFromCart(item.name)}
              />
            ))}
          </Box>
        );
      })()}
    </>
  );
}

export default App;
