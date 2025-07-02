import { Box, Image } from '@chakra-ui/react';

type Props = {
  path: string;
};

export default function ImageViewer({ path }: Props) {
  return (
    <Box flex="1" bg="black" display="flex" alignItems="center" justifyContent="center">
      <Image
        src={`/api/file?path=${encodeURIComponent(path)}`}
        alt={path}
        maxH="100%"
        maxW="100%"
      />
    </Box>
  );
}
