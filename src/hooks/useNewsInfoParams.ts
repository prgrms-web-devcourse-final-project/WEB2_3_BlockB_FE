import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function useNewsInfoParams() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const newsId = useMemo(() => searchParams.get('id'), [searchParams]);

  const isContinent = (value: any): value is Continent => {
    return ['AS', 'EU', 'NA', 'SA', 'AF', 'OC', 'AN'].includes(value);
  };

  const continent = useMemo(() => {
    const value = searchParams.get('continent');
    return isContinent(value) ? value : 'AS';
  }, [searchParams]);

  const newsTitle = useMemo(() => searchParams.get('title') || '', [searchParams]);

  const [generatingType, setGeneratingType] = useState<'fromNews' | 'fromDebateList'>('fromDebateList');

  useEffect(() => {
    if (newsId) {
      setGeneratingType('fromNews');
    }
  }, [newsId]);

  const moveToLinkedNews = () => {
    if (newsId) {
      navigate(`/news/${newsId}`);
    }
  };

  return { newsId, continent, newsTitle, generatingType, moveToLinkedNews };
}

export default useNewsInfoParams;
