'use client';

import { GB, DE, ES, FR, IT, JP, KR, CN, RU, US, BR, AR, MX, PT, NL, TR, PL, SE, DK, NO, FI, GR, CZ, HU, RO, BG, UA, IN } from 'country-flag-icons/react/3x2';

const languages = [
  { code: 'en', name: 'Learn English', Flag: GB },
  { code: 'de', name: 'Deutsch lernen', Flag: DE },
  { code: 'es', name: 'Aprende Español', Flag: ES },
  { code: 'fr', name: 'Apprendre le Français', Flag: FR },
  { code: 'it', name: 'Impara l\'Italiano', Flag: IT },
  { code: 'jp', name: '日本語を学ぶ', Flag: JP },
  { code: 'kr', name: '한국어 배우기', Flag: KR },
  { code: 'cn', name: '学习中文', Flag: CN },
  { code: 'ru', name: 'Учить русский', Flag: RU },
  { code: 'us', name: 'Learn English', Flag: US },
  { code: 'br', name: 'Aprender Português', Flag: BR },
  { code: 'ar', name: 'تعلم العربية', Flag: AR },
  { code: 'mx', name: 'Aprende Español', Flag: MX },
  { code: 'pt', name: 'Aprender Português', Flag: PT },
  { code: 'nl', name: 'Leren Nederlands', Flag: NL },
  { code: 'tr', name: 'Türkçe öğren', Flag: TR },
  { code: 'pl', name: 'Naucz się polskiego', Flag: PL },
  { code: 'se', name: 'Lär dig svenska', Flag: SE },
  { code: 'dk', name: 'Lær dansk', Flag: DK },
  { code: 'no', name: 'Lær norsk', Flag: NO },
  { code: 'fi', name: 'Opi suomea', Flag: FI },
  { code: 'gr', name: 'Μάθε ελληνικά', Flag: GR },
  { code: 'cz', name: 'Nauč se česky', Flag: CZ },
  { code: 'hu', name: 'Tanulj magyarul', Flag: HU },
  { code: 'ro', name: 'Învață românește', Flag: RO },
  { code: 'bg', name: 'Учи български', Flag: BG },
  { code: 'ua', name: 'Вивчай українську', Flag: UA },
  { code: 'in', name: 'सीखें हिन्दी', Flag: IN },
].sort(() => Math.random() - 0.5).filter(lang => lang.code !== 'in');

const InfiniteScroll = () => {
  const duplicatedLanguages = [...languages, ...languages];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-black via-purple-900/10 to-black py-8">
      <div className="flex animate-scroll">
        {duplicatedLanguages.map((lang, index) => {
          const Flag = lang.Flag;
          return (
            <div
              key={`${lang.code}-${index}`}
              className="flex items-center gap-3 mx-8 whitespace-nowrap"
            >
              <div className="w-8 h-6 rounded overflow-hidden">
                <Flag className="w-full h-full object-cover" />
              </div>
              <span className="text-white/80 font-bold text-lg">
                {lang.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteScroll;
