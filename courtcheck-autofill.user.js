// ==UserScript==
// @name         courtcheck 자동입력 도우미
// @namespace    courtcheck
// @version      1.0
// @description  나의사건검색 화면에서 법원/연도/기호/일련번호/당사자명을 자동으로 채웁니다. 캡차(자동입력 방지문자)는 채우지 않습니다.
// @match        https://ssgo.scourt.go.kr/ssgo/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const IDS = {
    court: 'mf_ssgoTopMainTab_contents_content1_body_sbx_cortCd',
    year: 'mf_ssgoTopMainTab_contents_content1_body_sbx_csYr',
    div: 'mf_ssgoTopMainTab_contents_content1_body_sbx_csDvsCd',
    serial: 'mf_ssgoTopMainTab_contents_content1_body_ibx_csSerial',
    party: 'mf_ssgoTopMainTab_contents_content1_body_ibx_btprNm',
  };

  function readPayload() {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) return null;
    const params = new URLSearchParams(hash);
    const raw = params.get('courtcheck');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  const data = readPayload();
  if (!data) return;

  function setSelectByText(select, text) {
    if (!text) return false;
    const target = String(text).trim();
    const opt = Array.from(select.options).find(o => o.textContent.trim() === target);
    if (!opt) return false;
    select.value = opt.value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    select.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  }

  function setInputValue(input, value) {
    const str = String(value ?? '');
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    input.focus();
    nativeSetter.call(input, '');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    for (const ch of str) {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: ch, bubbles: true }));
      nativeSetter.call(input, input.value + ch);
      input.dispatchEvent(new InputEvent('input', { bubbles: true, data: ch, inputType: 'insertText' }));
      input.dispatchEvent(new KeyboardEvent('keyup', { key: ch, bubbles: true }));
    }
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.blur();
  }

  const filled = { court: false, year: false, div: false, serial: false, party: false };

  function attemptFill() {
    if (!filled.court) {
      const el = document.getElementById(IDS.court);
      if (el) filled.court = setSelectByText(el, data.court);
    }
    if (!filled.year) {
      const el = document.getElementById(IDS.year);
      if (el) filled.year = setSelectByText(el, data.year);
    }
    if (!filled.div) {
      const el = document.getElementById(IDS.div);
      if (el) filled.div = setSelectByText(el, data.divisionCode);
    }
    if (!filled.serial) {
      const el = document.getElementById(IDS.serial);
      if (el) {
        setInputValue(el, data.serial);
        filled.serial = true;
      }
    }
    if (!filled.party) {
      const el = document.getElementById(IDS.party);
      if (el) {
        setInputValue(el, data.partyName);
        filled.party = true;
      }
    }
    return Object.values(filled).every(Boolean);
  }

  function logStatus() {
    console.log('[courtcheck 자동입력]', filled);
  }

  if (attemptFill()) {
    logStatus();
    return;
  }

  const observer = new MutationObserver(() => {
    if (attemptFill()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => {
    observer.disconnect();
    logStatus();
  }, 15000);
})();
