import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static PropType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      //articles: this.articles,
      articles: [],
      loading: false,
      page: 1,
      totalResult: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Adda`;
  }

  async componentDidMount() {
    //console.log("cdm");
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8b5da5f72dcf445cb19d0b7957fc8457&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResult: parsedData.totalResult,
      loading: false
    });
    this.props.setProgress(100);
  }
  async updateNews() {
    //console.log("cdm");
    //this.props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8b5da5f72dcf445cb19d0b7957fc8457&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResult: parsedData.totalResult,
      //loading: false
    });
    //this.props.setProgress(100);
  }
  handlePrevClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResult / 20)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8b5da5f72dcf445cb19d0b7957fc8457&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      //console.log(parsedData);
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      })
    }

  }
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8b5da5f72dcf445cb19d0b7957fc8457&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8b5da5f72dcf445cb19d0b7957fc8457&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResult: parsedData.totalResult,
    })
  };
  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: '30px 2px' }}>News Adda - Top Headlines {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResult}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/*!this.state.loading &&*/ this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} source={element.source.name} url={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/*<div className="conatiner d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&#8592;Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / 20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &#8594;</button>
          </div>*/}
      </>
    )
  }
}
