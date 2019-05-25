import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Logo from "Components/Logo";
import SearchBox from "Components/SearchBox";
import { Routes } from "Components/Router";

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #081c24;
  color: white;
`;

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  width: 1000px;
  height: 111px;
`;

const MainMenu = styled.ul`
  margin-left: 20px;
  font-size: 0.7em;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Item = styled.li`
  text-transform: uppercase;
  &:not(:last-child) {
    margin-right: 20px;
  }
  position: relative;
  &:hover > ul {
    display: flex;
  }
`;

const SubMenu = styled.ul`
  text-transform: capitalize;
  display: none;
  min-width: 500px;
  position: absolute;
  padding-top: 15px;
  left: 0;
  font-size: 0.8em;
  color: #aaa;
`;
const SubItem = styled.li`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const SearchContainer = styled.section`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-left: 0 none;
  border-right: 0 none;
  border-top: 0 none;
  border-bottom: 1px solid #dedede;
`;

const HeaderComponent = ({ location: { pathname } }) => (
  <>
    <Header>
      <Content>
        <Link to={Routes.home}>
          <Logo />
        </Link>
        <MainMenu>
          <Item>
            <Link to="/about">About</Link>
          </Item>
          <Item>
            <Link to={Routes.movie.home}>Movies</Link>
            <SubMenu>
              <SubItem>
                <Link to={Routes.movie.nowPlaying}>Now Playing</Link>
              </SubItem>
              <SubItem>
                <Link to={Routes.movie.popular}>Popular</Link>
              </SubItem>
              <SubItem>
                <Link to={Routes.movie.topRated}>Top Rated</Link>
              </SubItem>
              <SubItem>
                <Link to={Routes.movie.upcoming}>Upcoming</Link>
              </SubItem>
            </SubMenu>
          </Item>
          <Item>
            <Link to={Routes.tv.home}>TV Shows</Link>
            <SubMenu>
              <SubItem>
                <Link to={Routes.tv.onTheAir}>On The Air</Link>
              </SubItem>
              <SubItem>
                <Link to={Routes.tv.airingToday}>Airing Today</Link>
              </SubItem>
              <SubItem>
                <Link to={Routes.tv.popular}>Popular</Link>
              </SubItem>
              <SubItem>
                <Link to={Routes.tv.topRated}>Top Rated</Link>
              </SubItem>
            </SubMenu>
          </Item>
        </MainMenu>
      </Content>
      <SearchContainer>
        <SearchBox />
      </SearchContainer>
    </Header>
  </>
);

export default withRouter(HeaderComponent);
