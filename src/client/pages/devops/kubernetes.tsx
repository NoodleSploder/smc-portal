import { Box } from '@chakra-ui/react';


const KubernetesPage = () => {
    return (
        <Box flex="1" p={8}>
            <iframe
                src="http://rancher.somanychickens.com"
                style={{ width: '100%', height: '80vh', border: 'none' }}
                title="Rancher Embedded"
            />
        </Box>
    );
};

export default KubernetesPage;
