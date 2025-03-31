import { useState } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';

export const Calculator = () => {
  // State variables for inputs, result, and error handling
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [result, setResult] = useState<number | string>('');
  const [error, setError] = useState<string | null>(null);

  // Function to handle calculations based on the selected operation
  const handleCalculate = (operation: string) => {
    const num1 = parseFloat(input1);
    const num2 = parseFloat(input2);

    // Validate inputs to ensure they are numbers
    if (isNaN(num1) || isNaN(num2)) {
      setError('Only numbers are allowed');
      return;
    }

    // Perform the selected operation
    switch (operation) {
      case 'add':
        setResult(num1 + num2);
        break;
      case 'subtract':
        setResult(num1 - num2);
        break;
      case 'multiply':
        setResult(num1 * num2);
        break;
      case 'divide':
        if (num2 === 0) {
          setError('Division by zero is not allowed');
        } else {
          setResult(num1 / num2);
        }
        break;
      case 'modulus':
        if (num2 === 0) {
          setError('Division by zero is not allowed');
        } else {
          setResult(num1 % num2);
        }
        break;
      case 'sqrt':
        if (num1 < 0) {
          setError('Square root of negative numbers is not allowed');
        } else {
          setResult(Math.sqrt(num1));
        }
        break;
      default:
        setError('Invalid operation');
    }
  };

  // Function to close the error Snackbar
  const handleCloseError = () => {
    setError(null);
  };

  return (
   
    <Box
      sx={{
        maxWidth: 600, // Increased width
        minHeight: 500, // Increased height
        margin: 'auto',
        textAlign: 'center',
        mt: 5,
        backgroundColor: '#F5F5DC', // Beige background
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Calculator
      </Typography>

      {/* Input fields for numbers */}
      <TextField
        label="Enter first number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
        sx={{
          backgroundColor: '#D2B48C', // Tan color for input fields
        }}
      />
      <TextField
        label="Enter second number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        sx={{
          backgroundColor: '#D2B48C', // Tan color for input fields
        }}
      />

      {/* Buttons for operations */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mt: 2 }}>
        <Button variant="contained" onClick={() => handleCalculate('add')}>
          + Add
        </Button>
        <Button variant="contained" onClick={() => handleCalculate('subtract')}>
          - Subtract
        </Button>
        <Button variant="contained" onClick={() => handleCalculate('multiply')}>
          * Multiply
        </Button>
        <Button variant="contained" onClick={() => handleCalculate('divide')}>
          / Divide
        </Button>
        <Button variant="contained" onClick={() => handleCalculate('modulus')}>
          Modulus %
        </Button>
        <Button variant="contained" onClick={() => handleCalculate('sqrt')}>
          Square Root √
        </Button>
      </Box>

      {/* Display the result */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Result: {result}
      </Typography>

      {/* Snackbar for error messages */}
      <Snackbar open={!!error} autoHideDuration={4000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};