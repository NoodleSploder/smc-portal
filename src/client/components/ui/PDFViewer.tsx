import { Box } from '@chakra-ui/react';

type Props = {
  path: string;
};

export default function PDFViewer({ path }: Props) {
  return (
    <Box flex="1" height="100vh" bg="gray.100">
        <iframe
          src={`/api/file?path=${encodeURIComponent(path)}`}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </Box>
  );
}
