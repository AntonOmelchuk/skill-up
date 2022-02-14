import { ReactNode } from 'react';

export default interface ICustomModalProps {
  visible: boolean
  children: ReactNode
  closeHandler: () => void
}
