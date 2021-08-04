import { Select as AntdSelect, SelectProps } from 'antd';
import { OptionProps } from 'antd/lib/select';
import styled from 'styled-components';

type ModifiedSelectProps = Partial<SelectProps<any>> & {
  css?: string;
};
type ModifiedOption = Partial<OptionProps> & {
  css?: string;
};

const { Option: AntdOption } = AntdSelect;

const Select = styled(AntdSelect)<ModifiedSelectProps>`
  .ant-select-selector {
    background-color: ${({ theme }) => theme.onSurface} !important;
    color: ${({ theme }) => theme.text} !important;
  }

  .ant-select-arrow {
    color: ${({ theme }) => theme.text} !important;
  }

  ${(p) => p.css && p.css}
`;

export default Select;
