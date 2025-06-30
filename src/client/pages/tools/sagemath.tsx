import { Box, } from '@chakra-ui/react';

const SageMath = () => {
  return (
    <Box flex="1" p={8}>
        <iframe
            src="https://sagemath.somanychickens.com/"
            style={{ width: '100%', height: '80vh', border: 'none' }}
            title="Sage Math - Jupyter - Embedded"
        />
    </Box>
  );
};

export default SageMath;
