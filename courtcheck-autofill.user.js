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
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeSetter.call(input, value ?? '');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function tryFill() {
    const courtEl = document.getElementById(IDS.court);
    const yearEl = document.getElementById(IDS.year);
    const divEl = document.getElementById(IDS.div);
    const serialEl = document.getElementById(IDS.serial);
    const partyEl = document.getElementById(IDS.party);
    if (!courtEl || !yearEl || !divEl || !serialEl || !partyEl) return false;

    setSelectByText(courtEl, data.court);
    setSelectByText(yearEl, data.year);
    setSelectByText(divEl, data.divisionCode);
    setInputValue(serialEl, data.serial);
    setInputValue(partyEl, data.partyName);
    return true;
  }

  if (tryFill()) return;

  const observer = new MutationObserver(() => {
    if (tryFill()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 15000);
})();
