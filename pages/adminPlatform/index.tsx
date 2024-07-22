// app/adminPlatform/page.tsx
import React from "react";
import { getSession } from 'next-auth/react';

const AdminPlatformPage: React.FC = () => {
  return (
    <div>
     test
    </div>
  )
};

export async function getServerSideProps(context:any) {
  const session = await getSession(context);
  console.log("admin session",session)
    if (!session || !session.user || session.user.role !== 'admin') {

    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    }
  }
  return { props: {} };
}

export default AdminPlatformPage;