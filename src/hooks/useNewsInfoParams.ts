import { ProfilerProps, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { newsAPI } from '../api/news';
import { userApi } from '../api/user';

function useNewsInfoParams() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const newsId = useMemo(() => searchParams.get('id'), [searchParams]);

  // const isContinent = (value: any): value is Continent => {
  //   return ['AS', 'EU', 'NA', 'SA', 'AF', 'OC', 'AN'].includes(value);
  // };

  // const continent = useMemo(() => {
  //   const value = searchParams.get('continent');
  //   return isContinent(value) ? value : 'AS';
  // }, [searchParams]);

  // const newsTitle = useMemo(() => searchParams.get('title') || '', [searchParams]);

  const [generatingType, setGeneratingType] = useState<'fromNews' | 'fromDebateList'>('fromDebateList');
  const [newsTitle, setNewsTitle] = useState("")
  const [newsContinent, setNewsContinent] = useState("")
  useEffect(() => {
    if (newsId) {
      setGeneratingType('fromNews');
      const fetchNewsInfo = async () => {
        const userInfo = await userApi.fetchMyProfile()
        const newsDetails = await newsAPI.getNewsDetail(Number(newsId), userInfo.data.id)
        setNewsTitle(newsDetails.data.title)
        setNewsContinent(newsDetails.data.continent)
      }
      fetchNewsInfo()
    }
  }, [newsId]);

  const moveToLinkedNews = () => {
    if (newsId) {
      navigate(`/news/${newsId}`);
    }
  };

  return { newsId, newsContinent, newsTitle, generatingType, moveToLinkedNews };
}

export default useNewsInfoParams;
