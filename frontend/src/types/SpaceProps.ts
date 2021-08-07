import React from 'react';

export interface ISpace {
  id?: string;
  name?: string;
  type?: string;
  price?: string;
  bid?: string;
  owner?: string;
  img?: any;
  status?: number;
}
export interface ISpaceProps {
  data?: ISpace | undefined;
}
