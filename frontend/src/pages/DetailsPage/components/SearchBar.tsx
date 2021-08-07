import React from 'react';
import Box from 'ui/Box';
import { Text } from 'ui/Typography';
import { Input } from 'antd';
import styled from 'styled-components';

const { Search } = Input;

const SearchBar: React.FC = () => {
  return (
    <Box w='900px' m='50px auto 0'>
      <Text $size='24px' strong block>
        Search Spaces
      </Text>
      <StyledSearch
        enterButton='Search'
        size='large'
        bordered={false}
      />
    </Box>
  );
};

const StyledSearch = styled(Search)`
  margin-top: 20px;
  background-color: #f5f5f5;
  height: 50px;
  display:flex;
  align-items:center;
  .ant-input {
    position: absolute;
    top: 5px;
    padding-left:20px;
    font-weight:bold;
  }
  .ant-btn {
    background-color: ${(p) => p.theme.highlight};
    border-color: ${(p) => p.theme.highlight};
    height: 50px;
  }
`;

export default SearchBar;
