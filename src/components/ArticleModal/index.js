import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'antd';
import './index.less';
import { NYT_ASSET_ENDPOINT } from '../../constants/api'

const ArticleModal = ({data, visible, onCancel }) => { 
  const articleImg =
    data.multimedia &&
    data.multimedia.length > 0 &&
    data.multimedia.find(x => x.subtype === 'xlarge');
    
  return (
    <Modal visible={visible} onCancel={onCancel} className="article-modal" 
      footer={null}>
      <br/>
      <div>
        {articleImg && (
          <img className="article-modal__image" src={`${NYT_ASSET_ENDPOINT}${articleImg.url}`} alt="Article" />
        )}
      </div>
      <p className="article-modal__snippet">{data.snippet}</p>
      <div>
        <span className="article-modal__source">Source: {data.source === undefined ? 'Unknown': data.source}</span>
        <span className="article-modal__date">Published Date:
          {moment(data.pub_date).format(' DD-MM-YYYY HH:mm:ss')}
        </span>
      </div>
    </Modal>
  );
};

ArticleModal.propTypes = {
  data: PropTypes.shape({
    snippet: PropTypes.string,
    source: PropTypes.string,
    pub_date: PropTypes.string,
    multimedia: PropTypes.array
  }),
};

export default ArticleModal;
