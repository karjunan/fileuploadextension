export type ModalProps = {
  className?: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  close?: boolean;
};
