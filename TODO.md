# 다음 할 일

## 확인 필요
- [ ] `courtcheck-autofill.user.js`의 입력창 ID(법원/연도/기호/일련번호/당사자명)가 실제 나의사건검색 사이트에서 정확히 매칭되는지 브라우저에서 직접 테스트
- [x] 법원 선택에 "지원" 2단계 드롭다운 추가 완료 (`COURT_BRANCHES`, 각 법원 공식 홈페이지 기준으로 확인) — 저장되는 값은 `"의정부지방법원 고양지원"`처럼 "법원명 + 공백 + 지원명" 형식
- [ ] 위 형식이 실제 나의사건검색 사이트의 법원 select 옵션 텍스트와 정확히 일치하는지 확인 필요 (공백 유무, 표기 방식이 다를 수 있음 — 다를 경우 `courtcheck-autofill.user.js`의 `setSelectByText`가 못 찾음)
- [x] `index.html`의 `COURT_SEARCH_URL`을 실제 검색 화면 URL(`https://ssgo.scourt.go.kr/ssgo/index.on?cortId=www`)로 수정 완료 — 기존 `https://ssgo.scourt.go.kr/ssgo/`는 403(시스템 작업 안내) 페이지였음. `www.scourt.go.kr/portal/information/events/search/search.jsp`는 이 URL을 iframe으로 감싼 포털 페이지였음
- [ ] 사건번호 형식이 `연도(4자리)+기호(한글)+일련번호(숫자)`가 아닌 사건(예: 형사/가사 등 표기가 다른 경우)이 있는지 확인하고 `parseCaseNumber` 정규식 보완
- [ ] "조회하기" 클릭 시 실제로 새 탭이 열리고 자동입력까지 되는지 최종 확인 (팝업 차단 이슈는 `openInNewTab`으로 수정함)

## 개선 아이디어
- [ ] Tampermonkey 미설치 사용자를 위한 설치 안내를 더 쉽게(스크린샷 등) 보강
- [ ] 사건 목록이 많아질 경우를 대비한 검색/필터 기능
- [ ] 모바일 화면 대응 (현재는 데스크톱 기준 레이아웃)
- [ ] GitHub Pages로 `index.html` 배포해서 어디서든 접속 가능하게 할지 검토
- [ ] 감정 진행 기록(타임라인)에 정렬/필터(예정만 보기 등) 기능 추가 검토

## 배포
- [x] `courtcheck-autofill.user.js` 커밋/푸시 완료
- [x] 저장소를 public으로 전환하여 "자동입력 스크립트 설치" 버튼의 raw GitHub URL이 정상 동작하는지 확인 (200 OK)
- [ ] Tampermonkey에서 실제로 "설치" 화면이 뜨는지, 설치 후 나의사건검색 사이트에서 자동입력이 되는지 실사용 테스트
