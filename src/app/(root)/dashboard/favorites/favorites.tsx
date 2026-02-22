'use client';

import { Catalog } from '@/shared/components/catalog/catalog';
import { useProfile } from '@/shared/hooks/useProfile';

export function Favorites() {
  const { user } = useProfile();

  if (!user) return null;

  return (
    <div className="my-6">
      <Catalog title="Избранное" products={user.favorites} />
    </div>
  );
}
