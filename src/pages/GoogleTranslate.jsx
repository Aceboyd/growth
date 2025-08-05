import React, { useEffect, useRef } from 'react';

const GoogleTranslate = () => {
  const translateRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const getCookie = (name) => {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match ? match[2] : null;
    };

    const applySavedLanguage = () => {
      const cookieLang = getCookie('googtrans');
      if (cookieLang) {
        const lang = cookieLang.split('/')[2];
        if (lang && window.google?.translate?.TranslateElement) {
          const select = document.querySelector('select.goog-te-combo');
          if (select) {
            select.value = lang;
            select.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      }
    };

    const initializeTranslate = () => {
      if (translateRef.current) {
        translateRef.current.innerHTML = ''; // Clear only once, safely
      }

      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,es,fr,de,zh-CN,ar,hi,ja,ko,ru',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false, // Prevent automatic translation
          },
          'google_translate_element'
        );
        applySavedLanguage();
      }
    };

    if (!initializedRef.current) {
      initializedRef.current = true;

      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateInit';
      script.async = true;

      window.googleTranslateInit = () => {
        initializeTranslate();
      };

      document.body.appendChild(script);

      // Prevent Google Translate from reloading the page
      const preventReload = (e) => {
        if (e.target.classList.contains('goog-te-combo')) {
          e.preventDefault();
          e.stopPropagation();
          const select = e.target;
          const value = select.value;
          if (value) {
            select.value = value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      };

      document.addEventListener('click', preventReload);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        document.removeEventListener('click', preventReload);
        if (translateRef.current) {
          translateRef.current.innerHTML = ''; // Clean up widget
        }
        delete window.googleTranslateInit;
        initializedRef.current = false;
      };
    } else {
      initializeTranslate();
    }
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        id="google_translate_element"
        ref={translateRef}
        className="p-2 bg-gray-800/25 rounded-md"
      ></div>
    </div>
  );
};

export default GoogleTranslate;