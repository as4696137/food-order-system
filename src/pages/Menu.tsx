import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid, Chip, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppDispatch } from '../store/hooks';
import { addItemToCart } from '../store/cartSlice';
import { categories, foodItems, FoodItem } from '../data/mockData';

const Menu: React.FC = () => {
    const dispatch = useAppDispatch();

    // State for modal
    const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenModal = (item: FoodItem) => {
        setSelectedItem(item);
        setQuantity(1); // Reset quantity when opening
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (selectedItem) {
            dispatch(addItemToCart({
                id: selectedItem.id,
                name: selectedItem.name,
                price: selectedItem.price,
                quantity: quantity,
            }));
            handleCloseModal();
        }
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                Our Menu
            </Typography>

            {categories.map((category) => (
                <Box key={category.id} sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 2, borderBottom: '2px solid', borderColor: 'primary.main', display: 'inline-block', pb: 0.5 }}>
                        {category.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                        {category.description}
                    </Typography>

                    <Grid container spacing={3}>
                        {foodItems
                            .filter((item) => item.categoryId === category.id)
                            .map((item) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                                    <Card
                                        onClick={() => handleOpenModal(item)}
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: '0.3s',
                                            cursor: 'pointer',
                                            '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={`/src/assets/menu_image/${category.id}/${item.id}.png`}
                                            alt={item.name}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                                <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
                                                    {item.name}
                                                </Typography>
                                                <Chip label={`$${item.price}`} color="secondary" size="small" sx={{ fontWeight: 'bold' }} />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                                                {item.description}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent card click
                                                    handleOpenModal(item);
                                                }}
                                                sx={{ mt: 'auto', borderRadius: 2 }}
                                            >
                                                Add to Cart
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            ))}

            {/* Item Modal */}
            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
                fullWidth
                maxWidth="sm"
            >
                {selectedItem && (
                    <>
                        <DialogTitle component="div" sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" fontWeight="bold">
                                {selectedItem.name}
                            </Typography>
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseModal}
                                size="small"
                                sx={{ color: 'grey.500' }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>

                        <CardMedia
                            component="img"
                            height="300"
                            image={`/src/assets/menu_image/${selectedItem.categoryId}/${selectedItem.id}.png`}
                            alt={selectedItem.name}
                            sx={{ objectFit: 'cover' }}
                        />

                        <DialogContent dividers>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h5" color="primary" fontWeight="bold">
                                    ${selectedItem.price}
                                </Typography>
                            </Box>

                            <Typography variant="body1" color="text.secondary" paragraph>
                                {selectedItem.description}
                            </Typography>

                            <Divider sx={{ my: 3 }} />

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Quantity:
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                                    <IconButton onClick={handleDecreaseQuantity} disabled={quantity <= 1} color="primary">
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography variant="h6" sx={{ minWidth: '40px', textAlign: 'center' }}>
                                        {quantity}
                                    </Typography>
                                    <IconButton onClick={handleIncreaseQuantity} color="primary">
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </DialogContent>

                        <DialogActions sx={{ p: 3, bgcolor: 'background.default' }}>
                            <Button variant="outlined" onClick={handleCloseModal} size="large" sx={{ borderRadius: 2 }}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddToCart}
                                size="large"
                                sx={{ borderRadius: 2, minWidth: '200px' }}
                            >
                                Add {quantity} to Cart - ${(selectedItem.price * quantity).toFixed(2)}
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default Menu;
