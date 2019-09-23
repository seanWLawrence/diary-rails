import React, { FC, ReactNode } from 'react';
import Error from '../error';
import Loader from '../loader';

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
