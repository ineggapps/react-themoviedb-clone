import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Routes, RouteIdentifier } from "Components/Router";

const PageContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Page = styled(Link)`
  padding: 0 5px;
  &:not(:last-child) {
    margin-right: 5px;
  }
  &.selected {
    border: 3px solid #01d277;
    background-color: #01d277;
    color: white;
  }
`;

const PageSpliter = styled.span`
  margin: 0 5px;
  &:after {
    content: "...";
  }
`;

const Pager = ({ uri, currentPage, totalPages }) => (
  <PageContainer>{createPager(uri, currentPage, totalPages)}</PageContainer>
);

const createPager = (uri, currentPage, totalPages) => {
  //TODO:
  //기본 라우트 /movie, /tv 에서 페이징할 경우에는 /movie/now-playing/page/1 같은 식으로 주소를 변환해 주어야 함.
  //어떻게 해야할지 고민해 보기.
  const parsedURI = uri.includes(RouteIdentifier.page) ? uri.split(RouteIdentifier.page)[0] : uri;
  const page = {
    current: Number(currentPage),
    prev: Number(currentPage) - 1,
    next: Number(currentPage) + 1,
    total: Number(totalPages)
  };
  console.log("😊Pager() page info", page, currentPage, totalPages);
  const prev = <Page to={`${parsedURI}/page/${page.prev}`}>← Prev</Page>;
  const next = <Page to={`${parsedURI}/page/${page.next}`}>Next →</Page>;

  const front = [page.current - 3, page.current - 2, page.current - 1];
  const rear = [page.current + 1, page.current + 2, page.current + 3];

  const start = [1, 2];
  const end = [page.total - 1, page.total];

  console.log("pager um...👍👍👍", front, rear);

  return (
    <React.Fragment>
      {/* [1]Prev */}
      {page.current > 1 && prev}

      {/* [2] Start (1 2 ...) */}
      {page.current > 8 &&
        start.map((p, index) => (
          <React.Fragment>
            <Page to={`${parsedURI}/page/${p}`} key={index}>
              {p}
            </Page>{" "}
            {index === start.length - 1 && <PageSpliter />}
          </React.Fragment>
        ))}

      {/* [3] Front (n-3, n-2, n-1) */}
      {page.current - front.length > 0 &&
        front.map((p, index) => (
          <Page to={`${parsedURI}/page/${p}`} key={index}>
            {p}
          </Page>
        ))}

      {/* [4] Current */}
      <Page to="#" className="selected">
        {page.current}
      </Page>

      {/* [5] Rear (n+1, n+2, n+3) */}
      {page.current + rear.length < page.total &&
        rear.map((p, index) => (
          <Page to={`${parsedURI}/page/${p}`} key={index}>
            {p}
          </Page>
        ))}

      {/* [6] End (end-1, end) */}
      {page.current < page.total - 1 &&
        end.map((p, index) => (
          <React.Fragment>
            {index === 0 && <PageSpliter />}
            <Page to={`${parsedURI}/page/${p}`} key={index}>
              {p}
            </Page>
          </React.Fragment>
        ))}
      {page.current < page.total && next}
    </React.Fragment>
  );
};

export default Pager;

/*
1: 1 2 3 4 5 6 7 ... 991 992 Next (10)
2: Prev 1 2 3 4 5 6 7 ... 991 992 Next (11)
3: Prev 1 2 3 4 5 6 7 ... 991 992 Next (11)
4: Prev 1 2 3 4 5 6 7 ... 991 992 Next (11)
5: Prev 1 2 3 4 5 6 7 8 ... 991 992 Next (12)
6: Prev 1 2 3 4 5 6 7 8 9 ... 991 992 Next (13)
7: Prev 1 2 3 4 5 6 7 8 9 10... 991 992 Next (14)
8: Prev 1 2 ... 5 6 7 8 9 10 11 ... 991 992 Next (13)
9: Prev 1 2 ... 6 7 8 9 10 11 12 ... 991 992 Next (13)
10: Prev 1 2 ... 7 8 9 10 11 12 13 ... 991 992 Next (13)
11: Prev 1 2 ... 8 9 10 11 12 13 14 ... 991 992 Next (13)
12: Prev 1 2 ... 9 10 11 12 13 14 15 ... 991 992 Next (13)


984: Prev 1 2 ... 981 982 983 984 985 986 987  ... 991 992 Next (13) n-7 (... x2)
985: Prev 1 2 ... 982 983 984 985 986 987 988 ... 991 992 Next (13) n-7 (... x2)
986: Prev 1 2 ... 983 984 985 986 987 988 989 990 991 992 Next (14) n-6 
987: Prev 1 2 ... 984 985 986 987 988 989 990 991 992 Next (13) n-5
988: Prev 1 2 ... 985 986 987 988 989 990 991 992 Next (12) n-4 
989: Prev 1 2 ... 986 987 988 989 990 991 992 Next (11) n-3
990: Prev 1 2 ... 986 987 988 989 990 991 992 Next (11) n-2
991: Prev 1 2 ... 986 987 988 989 990 991 992 Next (11) n-1
992: Prev 1 2 ... 986 987 988 989 990 991 992 (10) n

preview
    prev min min+1     ... n-3 n-2 n-1 n n+1 n+2 n+3 ... max-1 max Next 
15: Prev 1 2 ... 12 13 14 [15] 16 17 18 ... 991 992 Next (13)
*/
