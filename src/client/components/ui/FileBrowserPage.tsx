import { useEffect, useState } from 'react';
import { Box, Link, VStack, Breadcrumb } from '@chakra-ui/react';

type FileItem = {
  name: string;
  type: 'file' | 'directory';
};

type Props = {
  onSelect: (path: string) => void;
};

export default function FileBrowserPage({ onSelect }: Props) {
  const [path, setPath] = useState('');
  const [archive, setArchive] = useState<string | null>(null);
  const [listing, setListing] = useState<FileItem[]>([]);

  const fetchListing = async (subPath: string) => {
    let url = '';
    if (archive) {
      url = `/api/browse-archive?archive=${encodeURIComponent(
        archive
      )}&path=${encodeURIComponent(subPath)}`;
    } else {
      url = `/api/browse?path=${encodeURIComponent(subPath)}`;
    }

    const res = await fetch(url);
    const data: { listing: FileItem[] } = await res.json();

    setPath(subPath);
    setListing(data.listing || []);
  };

  useEffect(() => {
    fetchListing('');
  }, [archive]);

  const parts = path.split('/').filter(Boolean);

  return (
    <Box flex="1" overflow="auto" p={4} maxW="400px">
      <Breadcrumb.Root>
        <Breadcrumb.Separator>\</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link onClick={() => fetchListing('')}>
            Root
          </Breadcrumb.Link>
        </Breadcrumb.Item>

        {parts.map((part, idx) => {
          const subPath = parts.slice(0, idx + 1).join('/');
          return (
            <Breadcrumb.Item key={idx}>
              <Breadcrumb.Separator>\</Breadcrumb.Separator>
              <Breadcrumb.Link onClick={() => fetchListing(subPath)}>
                {part}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb.Root>

      <VStack align="start" >
        {listing.map((item) => {
          const itemPath = path ? `${path}/${item.name}` : item.name;

          if (item.type === 'directory') {
            return (
              <Link
                key={item.name}
                cursor="pointer"
                onClick={() => fetchListing(itemPath)}
              >
                📂 {item.name}
              </Link>
            );
          }

          if (
            !archive &&
            (item.name.toLowerCase().endsWith('.zip') ||
              item.name.toLowerCase().endsWith('.7z'))
          ) {
            return (
              <Link
                key={item.name}
                cursor="pointer"
                onClick={() => {
                  setArchive(itemPath);
                  setPath('');
                }}
              >
                📦 {item.name} [Enter]
              </Link>
            );
          }

          return (
            <Box key={item.name}>
              <Link
                href={`/api/download?path=${encodeURIComponent(itemPath)}`}
              >
                {item.name} [Download]
              </Link>{' '}
              <Link cursor="pointer" onClick={() => onSelect(itemPath)}>
                [View]
              </Link>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
