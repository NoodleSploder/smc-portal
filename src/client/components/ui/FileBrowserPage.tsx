import {
  Box,
  Text,
  Link,
  VStack,
  Breadcrumb,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

type Item = {
  name: string;
  type: 'file' | 'directory';
};

export default function FileBrowserPage() {

  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const [path, setPath] = useState('');
  const [listing, setListing] = useState<Item[]>([]);

  const fetchListing = async (subPath: string) => {

    const res = await fetch(`/api/browse?path=${encodeURIComponent(subPath)}`);

    if (!res.ok) {
      console.error('Bad response:', res.status);
      return;
    }

    const data = await res.json();
    setPath(data.path);
    setListing(data.listing);

  };

  useEffect(() => {
    fetchListing('');
  }, []);

  const parts = path.split('/').filter(Boolean);

  return (
    <Box p={4}>

      <Box display="flex" width="100%" height="100%">
        {/* LEFT: File Tree */}
        <Box flex="1" overflow="auto">

          <Breadcrumb.Root mb={4}>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link onClick={() => fetchListing('')}>Root</Breadcrumb.Link>
              </Breadcrumb.Item>
              {parts.map((part, idx) => (
                <Breadcrumb.Item key={idx}>
                  <Breadcrumb.Link
                    onClick={() =>
                      fetchListing(parts.slice(0, idx + 1).join('/'))
                    }
                  >
                    {part}
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb.List>
          </Breadcrumb.Root>

          <VStack align="start">
            {listing.map((item) =>
              item.type === 'directory' ? (
                <Text
                  key={item.name}
                  cursor="pointer"
                  fontWeight="bold"
                  onClick={() =>
                    fetchListing(path ? `${path}/${item.name}` : item.name)
                  }
                >
                  📁 {item.name}
                </Text>
              ) : (
                <Link
                  key={item.name}
                  href={`/api/download?path=${encodeURIComponent(
                    path ? `${path}/${item.name}` : item.name
                  )}`}
                  //isExternal
                >
                  📄 {item.name}
                </Link>
              )
            )}
          </VStack>
                    {/* Your current tree code */}
        </Box>

        {/* RIGHT: 3D Viewer */}
        <Box flex="2" bg="gray.900">
          <STLViewer path={selectedFilePath} />
        </Box>
      </Box>
    </Box>
  );
}
