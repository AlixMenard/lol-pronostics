import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #1a1a1a;
    color: #fff;
    min-width: 400px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #333;
`;

const CloseButton = styled(IconButton)`
  color: #888;
  &:hover {
    color: #fff;
  }
`;

export interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const BaseModal = ({ 
  open, 
  onClose, 
  title, 
  maxWidth = 'sm',
  children 
}: BaseModalProps) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
    >
      <StyledDialogTitle>
        {title}
        <CloseButton onClick={onClose} size="small">
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </StyledDialog>
  );
}; 