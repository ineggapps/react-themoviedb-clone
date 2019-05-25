import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi } from "../../api";
import { Routes } from "Components/Router";

export default class extends React.Component {
  state = {
    videoId: 0,
    detail: null,
    loading: true
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

  async componentDidMount() {
    const {
      location: { pathname }
    } = this.props;
    const { videoId } = this.state;
    const { data: detail } = await this.getDetail(pathname, videoId);
    this.setState({
      detail,
      loading: false
    });
  }

  render() {
    const { loading, detail } = this.state;
    return <DetailPresenter loading={loading} detail={detail} />;
  }
}
