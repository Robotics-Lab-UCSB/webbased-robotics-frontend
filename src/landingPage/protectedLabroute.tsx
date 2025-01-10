import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const ProtectedLabRoute = ({ children }: { children: JSX.Element }) => {
  const { labId } = useParams<{ labId: string }>();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    console.log(labId)
    const checkLabAccess = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/auth/rejoin_lab/', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lab_id: labId }),
        });

        const data = await response.json();
        console.log(data)
        if (data.success) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } catch (err) {
        console.error('Error verifying lab access:', err);
        setHasAccess(false);
      }
    };

    checkLabAccess();
  }, [labId]);

  if (hasAccess === null) {
    return <div>Loading...</div>;
  }

  if (!hasAccess) {
    return; // Redirect unauthorized users
  }

  return children; // Render protected content for authorized users
};

export default ProtectedLabRoute;
