import { useState } from "react";
import { Box, Heading, Text, VStack, Grid, FormControl, FormLabel, Input, Button, Image } from "@chakra-ui/react";
import { FaShoppingCart, FaCreditCard } from "react-icons/fa";

const Index = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Product 1", price: 10.99, qty: 1 },
    { id: 2, name: "Product 2", price: 24.99, qty: 1 },
  ]);
  const [address, setAddress] = useState("");

  const handleQtyChange = (id, qty) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const handleRemove = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCheckout = () => {
    // TODO: Implement secure checkout logic
    console.log("Checking out with address:", address);
    console.log("Cart items:", cart);
  };

  return (
    <Box maxWidth="960px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Secure Checkout Example
      </Heading>

      <Grid templateColumns="1fr 300px" gap={10}>
        <VStack spacing={4} align="stretch">
          {cart.map((item) => (
            <Box key={item.id} borderWidth={1} borderRadius="md" padding={4} backgroundColor="gray.50">
              <Grid templateColumns="1fr 100px 100px" gap={4}>
                <Box>
                  <Heading as="h2" size="md">
                    {item.name}
                  </Heading>
                  <Text fontWeight="bold" marginTop={1}>
                    ${item.price}
                  </Text>
                </Box>
                <FormControl>
                  <FormLabel>Qty</FormLabel>
                  <Input type="number" min={1} value={item.qty} onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value))} />
                </FormControl>
                <Button colorScheme="red" variant="outline" onClick={() => handleRemove(item.id)}>
                  Remove
                </Button>
              </Grid>
            </Box>
          ))}
        </VStack>

        <Box borderWidth={1} borderRadius="md" padding={4}>
          <Heading as="h2" size="lg" marginBottom={4}>
            <FaShoppingCart /> Cart Summary
          </Heading>
          {cart.map((item) => (
            <Text key={item.id}>
              {item.name} x {item.qty}
            </Text>
          ))}
          <Text fontWeight="bold" marginTop={4}>
            Total: ${cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}
          </Text>

          <FormControl marginTop={4}>
            <FormLabel>Delivery Address</FormLabel>
            <Input type="text" value={address} onChange={handleAddressChange} placeholder="Enter delivery address" />
          </FormControl>

          <Button leftIcon={<FaCreditCard />} colorScheme="blue" size="lg" marginTop={4} onClick={handleCheckout}>
            Secure Checkout
          </Button>
        </Box>
      </Grid>

      <Box marginTop={8} textAlign="center">
        <Image src="https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzZWN1cmUlMjBwYXltZW50fGVufDB8fHx8MTcxMjcyNzQzN3ww&ixlib=rb-4.0.3&q=80&w=1080" alt="Secure Payment" maxWidth="300px" marginX="auto" />
        <Text fontSize="sm" color="gray.500">
          Your payment information is transmitted securely.
        </Text>
      </Box>
    </Box>
  );
};

export default Index;
