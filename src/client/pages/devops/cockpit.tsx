import { Box } from '@chakra-ui/react';


const CockpitPage = () => {
    return (
        <Box flex="1" p={8}>
            <iframe
                src="https://cockpit.somanychickens.com/cockpit/"
                style={{ width: '100%', height: '80vh', border: 'none' }}
                title="Cockpit Embedded"
            />
        </Box>
    );
};

export default CockpitPage;
