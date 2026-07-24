# 다음 할 일

## 확인 필요
- [ ] `courtcheck-autofill.user.js`의 입력창 ID(법원/연도/기호/일련번호/당사자명)가 실제 나의사건검색 사이트에서 정확히 매칭되는지 브라우저에서 직접 테스트
- [ ] `index.html`의 `COURT_SEARCH_URL`(`https://ssgo.scourt.go.kr/ssgo/`)이 실제 검색 화면으로 바로 연결되는 URL이 맞는지 확인 — 아니라면 정확한 진입 URL로 수정
- [ ] 사건번호 형식이 `연도(4자리)+기호(한글)+일련번호(숫자)`가 아닌 사건(예: 형사/가사 등 표기가 다른 경우)이 있는지 확인하고 `parseCaseNumber` 정규식 보완

## 개선 아이디어
- [ ] Tampermonkey 미설치 사용자를 위한 설치 안내를 더 쉽게(스크린샷 등) 보강
- [ ] 사건 목록이 많아질 경우를 대비한 검색/필터 기능
- [ ] 모바일 화면 대응 (현재는 데스크톱 기준 레이아웃)
- [ ] GitHub Pages로 `index.html` 배포해서 어디서든 접속 가능하게 할지 검토

## 배포
- [ ] `courtcheck-autofill.user.js`를 커밋/푸시한 뒤, 대시보드의 "자동입력 스크립트 설치" 버튼이 가리키는 raw GitHub URL이 정상적으로 열리는지 확인
