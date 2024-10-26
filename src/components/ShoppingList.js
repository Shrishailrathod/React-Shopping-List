import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Snackbar,
    Container,
    Paper,
    Typography,
} from '@mui/material';
import {Grid} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios.get('https://fakestoreapi.com/products');
            setItems(response.data.map(item => item.title));
        };
        fetchItems();
    }, []);

    const handleAddItem = () => {
        if (editingIndex !== null) {
            const updatedItems = items.map((item, index) => (index === editingIndex ? inputValue : item));
            setItems(updatedItems);
            setEditingIndex(null);
        } else {
            setItems([...items, inputValue]);
        }
        setInputValue('');
        setSnackbarOpen(true);
    };

    const handleEditItem = (index) => {
        setInputValue(items[index]);
        setEditingIndex(index);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    return (
        <Container maxWidth="l" style={{ marginTop: '2px', position:'sticky'}}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" align="center"   gutterBottom>
                    Shopping List
                </Typography>
                
            <Grid container spacing={1} alignItems="center" sx={{position:'sticky'}} >
                    <Grid item xs={8}>
                        <TextField
                            label="Add Item"
                            variant="outlined"
                            fullWidth
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Button
                        sx={{padding:2, position:'sticky'}}
                            variant="contained"
                            color="primary"
                            onClick={handleAddItem}
                            fullWidth
                        >
                            {editingIndex !== null ? 'Update Item' : <b>Add Item</b>}
                        </Button>
                    </Grid>
                </Grid>
                <List style={{ marginTop: '20px' }}>
                    {items.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item} />
                            <IconButton onClick={() => handleEditItem(index)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteItem(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={2000}
                    onClose={() => setSnackbarOpen(false)}
                    message="Item added/updated"
                />
            </Paper>
        </Container>
    );
};

export default ShoppingList;