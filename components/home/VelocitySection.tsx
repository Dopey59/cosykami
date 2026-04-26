'use client';

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from '@/registry/magicui/scroll-based-velocity';

const SEP = (
  <span className="mx-5 inline-flex items-center opacity-40" aria-hidden>
    <svg width="14" height="14" viewBox="0 0 100 100">
      <g transform="translate(50,50)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-19" rx="9" ry="17" fill="currentColor" transform={`rotate(${a})`} />
        ))}
        <circle r="8" fill="white" />
        <circle r="3" fill="currentColor" />
      </g>
    </svg>
  </span>
);

const ROW_FR =
  <>Stickers cosy{SEP}Papeterie kawaii{SEP}Scrapbooking{SEP}Journaling{SEP}Carnets déco{SEP}Coloriage cosy{SEP}</>;

const ROW_JP =
  <>ほっこり{SEP}ステッカー{SEP}文房具{SEP}スクラップブック{SEP}ジャーナリング{SEP}かわいい{SEP}手帳{SEP}</>;

export function VelocitySection() {
  return (
    <section className="relative overflow-hidden border-y border-black/8 py-7">
      <div
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
      <ScrollVelocityContainer className="flex flex-col gap-5">
        <ScrollVelocityRow
          baseVelocity={3}
          direction={1}
          className="font-display text-[32px] font-medium uppercase tracking-[0.18em] sm:text-[64px]"
        >
          {ROW_FR}
        </ScrollVelocityRow>

        <ScrollVelocityRow
          baseVelocity={3}
          direction={-1}
          className="text-[32px] tracking-[0.12em] text-black sm:text-[64px]"
        >
          {ROW_JP}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      </div>
    </section>
  );
}
