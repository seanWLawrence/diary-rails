import React, { FC, ReactNode } from 'react';
import Loader from '../../../../components/loader';
import Error from '../error';

interface DataWrapperProps {
  data: any;
  loading: boolean;
  error?: { message: string };
  children: ({ data }: { data: any }) => ReactNode;
}

let DataWrapper: FC<DataWrapperProps> = ({
  data,
  loading,
  error,
  children,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return <>{children({ data })}</>;
};

export default DataWrapper;
