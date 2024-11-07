import Image, { ImageProps } from 'next/image';
import { useTheme } from 'next-themes';

interface ImageWithThemeProps extends Omit<ImageProps, 'src'> {
  light: string;
  dark: string;
  alt: string;
}

export default function ImageWithTheme(props: ImageWithThemeProps) {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === 'light' ? props.light : props.dark}
      {...props}
    />
  );
}
