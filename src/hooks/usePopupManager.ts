import { useCallback, useRef } from 'react';
import type { PopupConfig, AnimationType, ThemeType, PoemData } from '@/types';

const POEMS: PoemData[] = [
  { content: '河西幕中多故人，故人别来三五春。', origin: '凉州馆中与诸判官夜集', author: '岑参', category: '古诗文-抒情-离别' },
  { content: '举杯邀明月，对影成三人。', origin: '月下独酌', author: '李白', category: '古诗文-饮酒' },
  { content: '白日依山尽，黄河入海流。', origin: '登鹳雀楼', author: '王之涣', category: '古诗文-登楼' },
  { content: '春眠不觉晓，处处闻啼鸟。', origin: '春晓', author: '孟浩然', category: '古诗文-春天' },
  { content: '一行白鹭上青天，衬着我渔舟远。', origin: '渔歌子', author: '张志和', category: '古诗文-江南' },
  { content: '明月几时有，把酒问青天。', origin: '水调歌头', author: '苏轼', category: '古诗文-中秋' },
  { content: '众里寻他千百度，蓦然回首，那人却在灯火阑珊处。', origin: '青玉案·元夕', author: '辛弃疾', category: '古诗文-元宵' },
  { content: '十年生死两茫茫，不思量，自难忘。', origin: '江城子·乙卯正月二十日夜记梦', author: '苏轼', category: '古诗文-悼亡' },
  { content: '问君能有几多愁，恰似一江春水向东流。', origin: '虞美人', author: '李煜', category: '古诗文-伤感' },
  { content: '夜阑卧听风吹雨，铁马冰河入梦来。', origin: '十一月四日风雨大作', author: '陆游', category: '古诗文-爱国' },
  { content: '莫言下岭便无难，赚得行人错喜欢。', origin: '题西林壁', author: '苏轼', category: '古诗文-哲理' },
  { content: '人生如逆旅，我亦是行人。', origin: '临江仙', author: '苏轼', category: '古诗文-人生' },
  { content: '独立小桥风满袖，平林新月人归后。', origin: '生查子', author: '纳兰性德', category: '古诗文-相思' },
  { content: '山有木兮木有枝，心悦君兮君不知。', origin: '越人歌', author: '子晋', category: '古诗文-爱情' },
];

const THEMES: ThemeType[] = [
  'blue', 'green', 'orange', 'purple', 'pink', 'yellow', 
  'cyan', 'lime', 'red', 'teal', 'indigo', 'amber', 
  'rose', 'mint', 'peach', 'lavender', 'coral', 'sky', 'lemon'
];

const ANIMATIONS: AnimationType[] = [
  'top', 'bottom', 'left', 'right', 
  'topleft', 'topright', 'bottomleft', 'bottomright'
];

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomPosition = (): { top: number; left: number } => ({
  top: Math.random() * 70,
  left: Math.random() * 85,
});

export const usePopupManager = () => {
  const counterRef = useRef(0);
  const poemIndexRef = useRef(0);

  const createPopup = useCallback((): PopupConfig => {
    // 循环从固定数组中获取诗词
    const poem = POEMS[poemIndexRef.current % POEMS.length];
    poemIndexRef.current++;

    const text = poem.content;
    const author = poem.author;

    return {
      id: `popup-${Date.now()}-${counterRef.current++}`,
      text,
      author,
      theme: getRandomItem(THEMES),
      animation: getRandomItem(ANIMATIONS),
      ...getRandomPosition(),
      duration: 10000,
    };
  }, []);

  return { createPopup };
};
