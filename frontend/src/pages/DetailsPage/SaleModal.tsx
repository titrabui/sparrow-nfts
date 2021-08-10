import React, { useState } from 'react';
import Modal from 'ui/Modal';
import { Text } from 'ui/Typography';
import Input from 'ui/Input';
import styled from 'styled-components';
import Button from 'ui/Button';
import { Space } from 'antd';
import { CloseCircleOutlined, CheckOutlined } from '@ant-design/icons';

interface IModalProps {
  visible: boolean;
  setOpenModal: any;
  handleOfferForSale: any;
  handleOfferForSaleToAddress: any;
}
const SaleModal: React.FC<IModalProps> = (props: IModalProps) => {
  const { visible, setOpenModal, handleOfferForSale, handleOfferForSaleToAddress } = props;
  const [value, setValue] = useState('0');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    if (address) handleOfferForSaleToAddress(value, address);
    else handleOfferForSale(value);
    setOpenModal(false);
  };
  return (
    <StyledModal
      title='Place Sale For Space'
      visible={visible}
      onCancel={() => setOpenModal(false)}
    >
      <StyledText>
        Min Price in ETH
        <StyledInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </StyledText>
      <StyledText>
        To Address
        <StyledInput
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </StyledText>
      <ButtonContainer>
        <StyledButton
          $bgType='primary'
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <CloseCircleOutlined />
          Cancel
        </StyledButton>
        <StyledButton $bgType='primary' onClick={handleSubmit}>
          <CheckOutlined />
          Submit Sale
        </StyledButton>
      </ButtonContainer>
    </StyledModal>
  );
};

const StyledText = styled(Text)`
  font-weight: bold;
  font-size: 18px;
  margin-top: 15px;
  display: block;
`;

const StyledInput = styled(Input)`
  background-color: #f5f5f5;
  height: 45px;
  border: none;
  padding-left: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

const StyledButton = styled(Button)`
  color: white;
  font-weight: bold;
  display: block;
  width: 100%;
  height: 35px;
  text-align: left;
  font-size: 16px;
  .anticon {
    font-size: 16px;
  }
`;

const ButtonContainer = styled(Space)`
  width: 100%;
  > * {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  margin: 35px 0 0px;
`;

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
  .ant-modal-body {
    padding-top: 10px;
  }
`;
export default SaleModal;
