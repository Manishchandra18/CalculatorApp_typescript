import  { useState } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';

export const Calculator = () => {
  // State variables for inputs, result, and error handling
  const [input, setInput] = useState<string>(''); // Single input for simplicity
  const [result, setResult] = useState<number | string>('');
  const [error, setError] = useState<string | null>(null);

  // Function to handle button clicks for digits and operations
  const handleButtonClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  // Function to handle calculations
  const handleCalculate = () => {
    try {
      // Evaluate the input string as a mathematical expression
      const evaluatedResult = eval(input);

      // Check for division by zero
      if (input.includes('/0')) {
        setError('Division by zero is not allowed');
        return;
      }

      setResult(evaluatedResult);
    } catch (err) {
      setError('Invalid input');
    }
  };

  // Function to handle special operations
  const handleSpecialOperation = (operation: string) => {
    try {
      const num = parseFloat(input);

      // Validate input to ensure it's a number
      if (isNaN(num)) {
        setError('Only numbers are allowed');
        return;
      }

      switch (operation) {
        case 'sqrt':
          if (num < 0) {
            setError('Square root of negative numbers is not allowed');
          } else {
            setResult(Math.sqrt(num));
          }
          break;
        case 'modulus':
          setResult(num % 2); // Example modulus operation
          break;
        default:
          setError('Invalid operation');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  // Function to clear the input and result
  const handleClear = () => {
    setInput('');
    setResult('');
    setError(null);
  };

  // Function to close the error Snackbar
  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        minHeight: 500,
        margin: 'auto',
        textAlign: 'center',
        mt: 5,
        backgroundColor: '#F5F5DC',
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Calculator
      </Typography>

      {/* Input field */}
      <TextField
        label="Enter expression"
        variant="outlined"
        fullWidth
        margin="normal"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{
          backgroundColor: '#D2B48C',
        }}
      />

      {/* Buttons for digits */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: 2 }}>
        {[...Array(10).keys()].map((digit) => (
          <Button
            key={digit}
            variant="contained"
            onClick={() => handleButtonClick(digit.toString())}
            sx={{ width: 60, height: 60 }}
          >
            {digit}
          </Button>
        ))}
      </Box>

      {/* Buttons for arithmetic operations */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: 2 }}>
        {['+', '-', '*', '/'].map((op) => (
          <Button
            key={op}
            variant="contained"
            onClick={() => handleButtonClick(op)}
            sx={{ width: 60, height: 60 }}
          >
            {op}
          </Button>
        ))}
        <Button variant="contained" onClick={handleCalculate} sx={{ width: 60, height: 60 }}>
          =
        </Button>
      </Box>

      {/* Buttons for special operations */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" onClick={() => handleSpecialOperation('sqrt')} sx={{ width: 120 }}>
          √ Square Root
        </Button>
        <Button variant="contained" onClick={() => handleSpecialOperation('modulus')} sx={{ width: 120 }}>
          % Modulus
        </Button>
        <Button variant="contained" onClick={handleClear} sx={{ width: 120 }}>
          Clear
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