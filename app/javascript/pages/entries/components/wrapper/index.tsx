import React, { FC, ReactNode } from 'react';

import './index.sass';

interface EntriesWrapperProps {
  children: ReactNode;
}

let EntriesWrapper: FC<EntriesWrapperProps> = ({ children }) => {
  return <main className="entries-wrapper__main">{children}</main>;
};

export default EntriesWrapper;
