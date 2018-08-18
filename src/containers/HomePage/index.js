import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, notification } from 'antd';
import ArticleList from '../ArticleList';
import { getArticles } from '../../actions/article';
import Logo from '../../assets/images/logo.png';
import './index.less';

export class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: false,
      currentPage: 0
    };
    this.fetchArticles = this.fetchArticles.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentWillReceiveProps(nextProps) {
    const { data, isLoading, error, currentPage } = nextProps;
    const newState = {
      data: [],
      isLoading,
      currentPage
    };

    if (error) {
      notification['error']({
        message: 'Something went wrong.',
        description: 'Please try again later.'
      });
    }

    if (!isLoading) {
      newState.data = data ? data.response.docs : [];
    }

    this.setState(newState);
  }

  fetchArticles(params = {}) {
    this.props
      .getArticles(params)
      .catch(err => console.log('=== getArticles Error ===: ', err));
  }

  goToNextPage() {
    const { currentPage } = this.state;
    this.fetchArticles({
      page: currentPage + 1
    });
  }

  goToPreviousPage() {
    const { currentPage } = this.state;
    this.fetchArticles({
      page: currentPage - 1
    });
  }

  render() {
    const { isLoading, data, currentPage } = this.state;
    return (
      <div className="homepage">
        <Row type="flex" justify="center">
          <Col xs={12} sm={12} md={12} lg={8} xl={8}>
            <img src={Logo} alt="Logo" className="homepage__logo"/>
          </Col>
        </Row>
        <Row type="flex" className="homepage__content">
          <Col span={24}>
            <ArticleList
              data={data}
              isLoading={isLoading}
              currentPage={currentPage + 1}
              handleNextClick={this.goToNextPage}
              handlePreviousClick={this.goToPreviousPage}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

HomePage.propTypes = {
  getArticles: PropTypes.func,
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  currentPage: PropTypes.number
};

const mapStateToProps = ({ article }) => ({
  data: article.data,
  isLoading: article.isLoading,
  error: article.error,
  currentPage: article.currentPage
});

export default connect(mapStateToProps, { getArticles })(HomePage);
