import { TypographyProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Box from 'ui/Box';
import MainContainer from 'ui/MainContainer';
import { Title } from 'ui/Typography';
import TableAttributes from './TableAttributes';

const AttributesPage: React.FC = () => 
    <MainContainer mt='100px'>
      <Box w='1050px' m='auto'>
        <Title $color='#4B4B4B' $size='48px'>All Types</Title>
        <ContentContainer>
          <Title $color='#4B4B4B' $size='24px'>Space Types</Title>
          <TableAttributes />
        </ContentContainer>
      </Box>
    </MainContainer>

export type ModifiedContent = Partial<TypographyProps> & {
  mt?: string;
}


const ContentContainer = styled.div`
  margin-top: ${(p: any) => p.mt || '50px'};
`;

export default AttributesPage;
