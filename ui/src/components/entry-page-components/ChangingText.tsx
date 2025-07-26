import { useState, useEffect, useMemo } from 'react'; // useMemo'yu import edin
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const textChangeDuration = 5;

function ChangingText() {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/about/roles`,
    fetcher
  );

  const texts = useMemo(() => {
    if (!data) return [];
    return data;
  }, [data]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length === 0) {
      return;
    }
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, textChangeDuration * 1000);

    return () => clearInterval(interval);
  }, [texts]);
  
  if (error) return <div>Bir hata oluştu.</div>;
  if (isLoading) return <div>Yükleniyor...</div>;

  return (
    <div className='text-yellow-300 text-2xl md:text-4xl mt-5 mb-5' style={{ overflow: 'hidden', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatePresence mode="wait">
        <motion.h1
          key={texts[index]}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ position: 'relative', width: '100%', textAlign: 'left' }}
        >
          {texts[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}

export default ChangingText;