import React from 'react';
import styled from 'styled-components';
import { ISpaceProps } from 'types/SpaceProps';
import Box from 'ui/Box';

const Avatar: React.FC<ISpaceProps> = (props: any) => {
  return (
    <Container w='1050px' h='360px' m='auto'>
      <ImageWrapper>
        <Image src={props.data.img} alt={props.data.id} />
      </ImageWrapper>
    </Container>
  );
};

const Container = styled(Box)`
  background-color: #638596;
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  position: absolute;
  bottom: 0;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export default Avatar;
