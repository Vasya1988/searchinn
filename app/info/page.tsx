'use client';

import { ReactNode } from 'react';

interface PageProps {
    children: ReactNode;
}

const Info = ({ children }: PageProps) => {
    return (
        <>
            {children}
        </>
    );
};

export default Info;
