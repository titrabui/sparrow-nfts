import React from 'react';
import styled from 'styled-components';
import { Modal, ModalProps } from 'antd';

type ModifiedModalProps = Partial<ModalProps> & {
  $bodyCss?: string;
  $headerCss?: string;
  $footerCss?: string;
  css?: string;
  childrenCss?: string;
};

const CommonButton = styled(Modal)<ModifiedModalProps>`
  .ant-modal-header {
    padding: 8.6px 24px;
    color: rgba(0, 0, 0, 0.85);
    background: ${({ theme }) => theme.accent};
    text-align: center;
    ${(p) => p.$headerCss && p.$headerCss};
  }

  .ant-modal-content {
    background: ${({ theme }) => theme.surface};
  }

  .ant-modal-body {
    ${(p) => p.$bodyCss && p.$bodyCss};
  }
  .ant-modal-footer {
    ${(p) => p.$footerCss && p.$footerCss};
  }

  .ant-modal-close-x {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }

  ${(p) => p.css && p.css};
  > * {
    ${(p) => p.childrenCss && p.childrenCss}
  }
`;

export default CommonButton;
