import React from 'react';
import MainContainer from 'ui/MainContainer';
import { Title} from 'ui/Typography';
import styled from 'styled-components';
import Box from 'ui/Box';
import TableAttributes from './TableAttributes';
import { TypographyProps } from 'antd';

const AttributesPage: React.FC = () => {
  return (
    <MainContainer mt='100px'>
      <Box w='1050px' m='auto'>
        <Title $color='#4B4B4B' $size='48px'>Types and Attributes</Title>
        <ContentContainer>
          <Title $color='#4B4B4B' $size='24px'>Space Types</Title>
          <TableAttributes />
        </ContentContainer>
        <ContentContainer>
          <Title $color='#4B4B4B' $size='24px'>Attributes</Title>
          <TableAttributes />
        </ContentContainer>
        <ContentContainer>
          <Title $color='#4B4B4B' $size='24px'>Attribute Counts</Title>
          <TableAttributes />
        </ContentContainer>
      </Box>
    </MainContainer>
  )
}

export type ModifiedContent = Partial<TypographyProps> & {
  mt?: string;
}


const ContentContainer = styled.div`
  margin-top: ${(p: any) => p.mt || '50px'};
`;

export default AttributesPage;
