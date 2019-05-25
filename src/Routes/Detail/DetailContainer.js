import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi } from "../../api";
import { Routes } from "Components/Router";
//https://www.npmjs.com/package/get-image-colors
import getColors from "get-image-colors";
import Loader from "Components/Loader";

export default class extends React.Component {
  state = {
    videoId: 0,
    detail: null,
    colors: [],
    loading: true,
    isVideoPopup: false
  };

  constructor(props) {
    super(props);
    const {
      location: { pathname },
      match: {
        params: { id: videoId }
      }
    } = props;
    this.state = {
      videoId,
      loading: true
    };
  }

  getDetail = async (pathname, videoId) => {
    if (pathname.includes(Routes.movie.home)) {
      // console.log("🤳 getDetail() === movie");
      return movieApi.detail(videoId);
    } else {
      // console.log("🤳 getDetail() === tv");
      return tvApi.detail(videoId);
    }
  };

  parseImage = async path => {
    let arrayColor = [];
    const result = await getColors(`${Routes.image.original}${path}`).then(
      colors => (arrayColor = colors)
    );
    return arrayColor;
  };

  async componentWillMount() {
    const {
      location: { pathname }
    } = this.props;
    const { videoId } = this.state;
    const { data: detail } = await this.getDetail(pathname, videoId);
    const { backdrop_path: backdropPath } = detail;
    let colors = [
      { _rgb: [0, 0, 34, 1] },
      { _rgb: [0, 18, 66, 1] },
      { _rgb: [0, 63, 145, 1] },
      { _rgb: [0, 148, 198, 1] },
      { _rgb: [4, 15, 22, 1] }
    ];
    if (backdropPath !== undefined && backdropPath && backdropPath.length > 0) {
      colors = await this.parseImage(backdropPath);
    }
    console.log("Colors will forward to component of presenter 🐯🐯🐯", colors);
    this.setState({
      detail,
      loading: false,
      colors
    });
  }

  videoPopupClick(isVideoPopup) {
    console.log("called!", isVideoPopup);
    // this.setState({
    //   isVideoPopup
    // });
  }

  render() {
    const { loading, detail, colors, isVideoPopup } = this.state;
    if (colors === undefined) {
      //if you ignore below code in if passage, render() forward colors undefined to presenter.
      //And then browser can't get color resources.
      return <Loader />;
    }
    console.log("Colors will forward to component of presenter 🙏🙏🙏", colors);
    return (
      <DetailPresenter
        loading={loading}
        detail={detail}
        colors={colors}
        videoPopup={this.videoPopupClick}
        isVideoPopup={isVideoPopup}
      />
    );
  }
}
