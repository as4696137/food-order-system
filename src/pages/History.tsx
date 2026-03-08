import React from 'react';
import { Box, Typography, Card, CardContent, Divider, List, ListItem, ListItemText, Grid, Chip, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearHistory } from '../store/historySlice';

const History: React.FC = () => {
    const history = useAppSelector((state) => state.history);
    const dispatch = useAppDispatch();

    return (
        <Box sx={{ flexGrow: 1, p: 3, maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                    Order History
                </Typography>
                {history.orders.length > 0 && (
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => dispatch(clearHistory())}
                    >
                        Clear History
                    </Button>
                )}
            </Box>

            {history.orders.length === 0 ? (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2, textAlign: 'center', p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
                    You have no past orders.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {history.orders.map((order) => (
                        <Grid size={{ xs: 12 }} key={order.id}>
                            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                        <Typography variant="h6" fontWeight="bold">
                                            Order #{order.id.slice(-6)}
                                        </Typography>
                                        <Chip label={new Date(order.date).toLocaleString()} size="small" variant="outlined" />
                                    </Box>

                                    <Divider sx={{ mb: 2 }} />

                                    <List disablePadding>
                                        {order.items.map((item, index) => (
                                            <React.Fragment key={item.id}>
                                                <ListItem sx={{ py: 1, px: 0 }}>
                                                    <ListItemText
                                                        primary={item.name}
                                                        secondary={`Quantity: ${item.quantity}`}
                                                    />
                                                    <Typography variant="body2" fontWeight="bold">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </Typography>
                                                </ListItem>
                                                {index < order.items.length - 1 && <Divider component="li" />}
                                            </React.Fragment>
                                        ))}
                                    </List>

                                    <Box sx={{ mt: 2, pt: 2, borderTop: '2px dashed', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            Total Items: {order.totalQuantity}
                                        </Typography>
                                        <Typography variant="h6" color="primary" fontWeight="bold">
                                            Total: ${order.totalPrice.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default History;
