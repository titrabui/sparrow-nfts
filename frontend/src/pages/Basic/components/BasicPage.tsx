import React from 'react';

import { Row, Select as AntdSelect, Space } from 'antd';

import styled from 'styled-components';

import MainContainer from 'ui/MainContainer';
import { Text } from 'ui/Typography';
import Select from 'ui/Select';
import Input from 'ui/Input';
import Button from 'ui/Button';
import Box from 'ui/Box';

const { Option } = Select;

const BasicPage: React.FC = () => {
  return (
    <MainContainer mt='100px'>
      <Box w='1200px' m='auto'>
        <Row justify='center' gutter={[0, 24]}>
          <StyledSpace >
          <Text>Buttons</Text>
            <Button>Button</Button>
            <Button $bgType='action'>Button</Button>
            <Button $bgType='error'>Button</Button>
            <Button $bgType='warning'>Button</Button>
            <Button $bgType='success'>Button</Button>

          </StyledSpace>

          <StyledSpace size='large'>
            <Text>Select</Text>
            <StyledSelect defaultValue='Option 1'>
              <Option value='Option 1'>Option 1</Option>
              <Option value='Option 2'>Option 2</Option>
            </StyledSelect>
            <StyledSelect defaultValue='Option 1'>
              <Option value='Option 1'>Option 1</Option>
              <Option value='Option 2'>Option 2</Option>
            </StyledSelect>
          </StyledSpace>
        </Row>
      </Box>
    </MainContainer>
  );
};

const BoxCss = `
  width : 100%; 
  font-weight : bold;
`;

const StyledSpace = styled(Space)`
  width: 100%;
  > * {
    width: 100%;
    height: 32px;
    vertical-align: middle;
  }
  button {
    width:200px;
    height:35px;
  }
`;

const StyledSelect = styled(AntdSelect)`
  width: 100%;
  color: ${(p: any) => (p['data-primary'] ? '#fff' : null)};
  .ant-select-arrow {
    color: ${({ theme }) => theme.text} !important;
  }
  font-weight: bold;
`;

export default BasicPage;
