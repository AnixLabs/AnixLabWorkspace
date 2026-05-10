interface ImagePagesLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function ImagePagesLayout({ children, modal }: ImagePagesLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
