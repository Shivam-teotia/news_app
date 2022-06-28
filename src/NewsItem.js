import React from 'react'

const NewsItem=(props)=>{
    let { title, description, imageurl, url, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display:'flex',justifyContent:'flexEnd',position:'absolute',right:'0'}}>
            <span className="badge rounded-pill bg-danger">
              {source}
            </span>
          </div>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}.</p>
            <p class="card-text"><small className="text-muted">By {author ? author : 'unknown'} on {new Date(date).toGMTString()}</small></p>
            <a href={url} className="btn btn-sm btn-dark">Read Full news</a>
          </div>
        </div>
      </div>
    )
  }
  export default NewsItem;
