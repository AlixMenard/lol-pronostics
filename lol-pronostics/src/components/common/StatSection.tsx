import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

const SectionContainer = styled(Box)`
  margin-bottom: 16px;
`;

const SectionHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const SectionTitle = styled(Typography)`
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
`;

const SectionContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface StatSectionProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const StatSection = ({ title, children, icon }: StatSectionProps) => {
  return (
    <SectionContainer>
      <SectionHeader>
        {icon}
        <SectionTitle variant="h6">
          {title}
        </SectionTitle>
      </SectionHeader>
      <Divider sx={{ bgcolor: '#444', mb: 2 }} />
      <SectionContent>
        {children}
      </SectionContent>
    </SectionContainer>
  );
}; 