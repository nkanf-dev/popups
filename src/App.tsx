import React, { useState, useCallback, useRef, useEffect } from 'react';
import './index.css';
import Popup from '@/components/Popup';
import { usePopupManager } from '@/hooks/usePopupManager';
import type { PopupConfig } from '@/types';

function App() {
  // 检查 URL 参数中是否有 debug 模式
  const isDebugMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debug');

  const [popups, setPopups] = useState<PopupConfig[]>([]);
  const [showWelcome, setShowWelcome] = useState(!isDebugMode);
  const { createPopup } = usePopupManager();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);

  const addPopup = useCallback(() => {
    const newPopup = createPopup();
    setPopups((prev) => [...prev, newPopup]);
  }, [createPopup]);

  const removePopup = useCallback((id: string) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id));
  }, []);

  const toggleAutoGenerate = useCallback(() => {
    if (isPlayingRef.current) {
      // Stop
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      isPlayingRef.current = false;
    } else {
      // Start
      isPlayingRef.current = true;
      intervalRef.current = setInterval(() => {
        addPopup();
      }, 170);
    }
  }, [addPopup]);

  const handleStartClick = useCallback(() => {
    setShowWelcome(false);
    setTimeout(() => {
      toggleAutoGenerate();
    }, 100);
  }, [toggleAutoGenerate]);

  const clearAll = useCallback(() => {
    setPopups([]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50 flex flex-col items-center justify-center p-4">
      {/* Popups Container */}
      <div className="fixed inset-0 pointer-events-none">
        {popups.map((popup) => (
          <Popup
            key={popup.id}
            config={popup}
            onComplete={removePopup}
          />
        ))}
      </div>

      {/* Welcome Dialog (Non-Debug Mode) */}
      {showWelcome && !isDebugMode && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center">
            <div className="text-6xl mb-6">🎁</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">送给你的礼物</h1>
            <p className="text-gray-600 mb-2 text-lg">一份特别的惊喜(๑´▾`๑)</p>
            <p className="text-gray-500 mb-8">点击开始按钮吧~</p>
            <button
              onClick={handleStartClick}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-200 active:scale-95 text-lg shadow-md"
            >
              🎉 开始
            </button>
          </div>
        </div>
      )}

      {/* Control Panel (Debug Mode Only) */}
      {isDebugMode && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 flex gap-3">
            {/* Manual Add Button */}
            <button
              onClick={addPopup}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 active:scale-95"
            >
              添加弹窗
            </button>

            {/* Auto Generate Button */}
            <button
              onClick={toggleAutoGenerate}
              className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-200 active:scale-95 ${
                isPlayingRef.current
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isPlayingRef.current ? '停止' : '开始'}
            </button>

            {/* Clear Button */}
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200 active:scale-95"
            >
              清空
            </button>

            {/* Counter */}
            <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-semibold">
              弹窗: {popups.length}
            </div>
          </div>
        </div>
      )}

      {/* Title (Debug Mode Only) */}
      {isDebugMode && (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">✨ 弹窗演示</h1>
          <p className="text-gray-600">随机位置、主题和动画</p>
        </div>
      )}
    </div>
  );
}

export default App;
