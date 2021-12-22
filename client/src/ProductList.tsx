import React from 'react';
import { Category, Article } from './types';
import Header from './Header';
import Footer from './Footer';
//import formatter from './currency'

var intlNumberFormatValues = ['de-DE', 'currency', 'EUR'];

export var formatter = new Intl.NumberFormat(intlNumberFormatValues[0], {
  style: intlNumberFormatValues[1],
  currency: intlNumberFormatValues[2],
});

type State = {
  categories: Category[];
};


export var ArticleCard = ({ article }: { article: Article }) => {
  
  return (
    <li>
    <figure>
        <span className="aa-product-img"><img src={article.images[0].path} alt='' /></span>
        <span className="aa-add-card-btn" >Add To Cart</span>
      <figcaption>
        <h5 className="aa-product-title">{article.name}</h5>
        <span className="aa-product-price">{formatter.format(article.prices.regular.value / 100)}</span><br />
        <p className="aa-product-variantName">{article.variantName}</p>
       </figcaption>
    </figure>
    </li>
  )
};

class ArticleList extends React.Component {
  state: State = {
    categories: [],
  };

  componentDidMount() {
    this.Getdata();
  
  }
  
    Getdata = () => {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/graphql');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({
      query: `{
        categories(ids: "156126", locale: de_DE) {
          name
          articleCount
          childrenCategories {
            name
            urlPath
          }
          categoryArticles(first: 50) {
            articles {
              name
              variantName
              prices {
                currency
                regular {
                  value
                }
              }
              images(
                format: WEBP
                maxWidth: 200
                maxHeight: 200
                limit: 1
              ) {
                path
              }
            }
          }
        }
      }`,
    }));

    xhr.onload = () => {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.response);

        this.setState({ categories: response.data.categories });
      
      }
    }
  }

  render() {
    var articles = this.state.categories.map((category) => {
      return category.categoryArticles.articles.map((article, i) => {
        return <ArticleCard key={i} article={article} />;
      });
    
    });
    
    
    return (
      <React.Fragment>
      <Header />
  <section id="menu">
    <div className="container">
      <div className="menu-area">
        <div className="navbar navbar-default" role="navigation">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>          
          </div>
          <div className="navbar-collapse collapse">
          {this.state.categories.length ? (
            <ul className="nav nav-tabs aa-products-tab">
              {this.state.categories[0].childrenCategories.map(({ name, urlPath }) => {
                return (
                  <li key={name}><a href={`/${urlPath}`} className="Novtop" data-toggle="tab">{name}</a></li>
              );
              })}
            </ul>
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      </div>       
    </div>
  </section>
  <section id="aa-product">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="aa-product-area">
              <div className="aa-product-inner">
                  <div className="tab-content">
                    <div className="tab-pane fade in active" id="men">
                    <div className={'content'}>
                    <div className="tab-pane fade in active" id="men">
                    <ul className="aa-product-catg">{articles}</ul>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
  </React.Fragment>
    );
  }
}

export default ArticleList;
