import React from 'react';
import { Box, Typography, Card, CardContent, Button, Divider, List, ListItem, Paper } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { increaseQuantity, decreaseQuantity, clearCart, removeItemFromCart } from '../store/cartSlice';
import { addOrder } from '../store/historySlice';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
    const cart = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (cart.items.length === 0) return;

        // Save to history
        dispatch(addOrder({
            items: cart.items,
            totalPrice: cart.totalPrice,
            totalQuantity: cart.totalQuantity,
        }));

        // Clear cart
        dispatch(clearCart());

        // Navigate to history or success page
        navigate('/history');
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                Your Cart
            </Typography>

            {cart.items.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', mt: 4, borderRadius: 2 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Your cart is empty.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ mt: 2 }}>
                        Browse Menu
                    </Button>
                </Paper>
            ) : (
                <Card sx={{ mt: 3, borderRadius: 2, boxShadow: 3 }}>
                    <CardContent sx={{ p: 0 }}>
                        <List disablePadding>
                            {cart.items.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <ListItem sx={{ py: 2, px: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' } }}>
                                        <Box sx={{ flexGrow: 1, mb: { xs: 1, sm: 0 } }}>
                                            <Typography variant="h6">{item.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Button variant="outlined" size="small" onClick={() => dispatch(decreaseQuantity(item.id))} sx={{ minWidth: '32px', p: '4px' }}>-</Button>
                                            <Typography variant="body1" sx={{ minWidth: '24px', textAlign: 'center' }}>{item.quantity}</Typography>
                                            <Button variant="outlined" size="small" onClick={() => dispatch(increaseQuantity(item.id))} sx={{ minWidth: '32px', p: '4px' }}>+</Button>
                                            <Button variant="text" color="error" size="small" onClick={() => dispatch(removeItemFromCart(item.id))} sx={{ ml: 1 }}>Remove</Button>
                                        </Box>
                                    </ListItem>
                                    {index < cart.items.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>

                        <Box sx={{ p: 3, bgcolor: 'background.default', borderTop: '1px solid', borderColor: 'divider' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">Total Value:</Typography>
                                <Typography variant="h5" color="primary" fontWeight="bold">
                                    ${cart.totalPrice.toFixed(2)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button variant="outlined" color="error" onClick={() => dispatch(clearCart())}>
                                    Clear Cart
                                </Button>
                                <Button variant="contained" color="primary" size="large" onClick={handleCheckout}>
                                    Checkout
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default Cart;
