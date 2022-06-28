import React, { useEffect,useState } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News=(props)=>{
  const[articles,setArticles]=useState([]);
  const[loading,setLoading]=useState(true);
  const[page,setPage]=useState(1);
  const[totalResult,setTotalResult]=useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /*const componentDidMount= async()=> {
    //console.log("cdm");
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8b5da5f72dcf445cb19d0b7957fc8457&page=1&pageSize=${props.pageSize}`;
    setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResult(parsedData.totalResult);
    setLoading(false);
    props.setProgress(100);
  }*/
  const updateNews=async()=> {
    //console.log("cdm");
    props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8b5da5f72dcf445cb19d0b7957fc8457&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResult(parsedData.totalResult);
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(()=>{
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)} - News Adda`;
    //eslint-disable-next-line
  },[])
  /*const handlePrevClick = async () => {
    if (page + 1 > Math.ceil(totalResult / 20)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8b5da5f72dcf445cb19d0b7957fc8457&page=${page - 1}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      setPage(page-1);
      setArticles(parsedData.articles);
      setLoading(false);
      //console.log(parsedData);
    }

  }
  const handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8b5da5f72dcf445cb19d0b7957fc8457&page=${page + 1}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    setPage(page+1);
    setArticles(parsedData.articles);
    setLoading(false);
    
  }*/
  const fetchMoreData = async () => {
    setPage(page+1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8b5da5f72dcf445cb19d0b7957fc8457&page=${page}&pageSize=${props.pageSize}`;
    //setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResult(parsedData.totalResult);
  };
    return (
      <>
        <h2 className="text-center" style={{ marginTop:'90px'}}>News Adda - Top Headlines {capitalizeFirstLetter(props.category)}</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResult}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/*!loading &&*/ articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} source={element.source.name} url={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/*<div className="conatiner d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&#8592;Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResult / 20)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &#8594;</button>
          </div>*/}
      </>
    )
  }
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.PropType = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News;