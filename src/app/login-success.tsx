import React from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToMain() {
  const router = useRouter();
  React.useEffect(() => {
    router.push('/main');
  }, [router]);
  return null;
}
