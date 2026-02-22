import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui';
import { PUBLIC_URL } from '@/shared/config/url.config';
import { SITE_DESCRIPTION } from '@/shared/constants/seo.constants';

export function Hero() {
  return (
    <div className="my-24 py-20 mx-auto text-center flex flex-col items-center max-w-4xl space-y-6">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        Шопинг в удовольствие -{' '}
        <span className="text-blue-600">все в одном месте</span>
      </h1>
      <p className="text-lg text-muted-foreground">{SITE_DESCRIPTION}</p>
      <Link href={PUBLIC_URL.explorer()}>
        <Button className="bg-blue-500 hover:bg-blue-500/80">
          За покупками
          <ArrowRight className="size-4 ml-2 transition-all hover:ml-4" />
        </Button>
      </Link>
    </div>
  );
}
