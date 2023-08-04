// sections

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

// export const metadata = {
//   title: 'Minimal: The starting point for your next project',
// };

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push(PATH_AFTER_LOGIN);
  }, [router]);
  return null;
}
