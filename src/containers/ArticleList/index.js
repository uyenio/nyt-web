import React, { Component } from 'react';
import { Row, Card, Col } from 'antd';
import PropTypes from 'prop-types';
import Pagination from '../../components/Pagination';
import ArticleCard from '../../components/ArticleCard';
import ArticleModal from '../../components/ArticleModal';
import './index.less';

export class ArticleList extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      disablePrevious: true,
      showModal: false,
      modalData: {}
    };
    this.openArticleModal = this.openArticleModal.bind(this);
    this.closeArticleModal = this.closeArticleModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { currentPage } = nextProps;
    this.setState({
      currentPage,
      disablePrevious: currentPage === 1
    });
  }

  openArticleModal(data) {
    this.setState({
      showModal: true,
      modalData: data
    });
  }

  closeArticleModal() {
    this.setState({
      showModal: false
    });
  }

  renderList(data) {
    return data.map(item => (
      <Col key={item._id} span={8} xs={24} sm={16} md={12} lg={8} xl={8}> 
        <ArticleCard data={item} handleCardClick={this.openArticleModal}
        />
      </Col>
    ));
  }

  render() {
    const {data, isLoading, handleNextClick, handlePreviousClick } = this.props;
    const { currentPage, disablePrevious, showModal, modalData } = this.state;

    return (
      <div>
        <Row gutter={8} className="article-list">
        {isLoading ? <Card loading>Loading...</Card>: this.renderList(data)}
        </Row>
        <Row type="flex" justify="center">
          <Pagination currentPage={currentPage} handlePreviousClick={handlePreviousClick}
            handleNextClick={handleNextClick} disablePrevious={disablePrevious}
          />
        </Row>
        <ArticleModal visible={showModal} data={modalData} onCancel={this.closeArticleModal}
        />
      </div>
    );
  }
}

ArticleList.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  currentPage: PropTypes.number,
  handleNextClick: PropTypes.func,
  handlePreviousClick: PropTypes.func
};

ArticleList.defaultProps = {
  data: [],
  isLoading: false
};

export default ArticleList;
