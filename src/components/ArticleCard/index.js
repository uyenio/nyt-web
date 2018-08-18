import React from 'react';
import PropTypes from 'prop-types';
import { Card, Tooltip, Icon } from 'antd';
import moment from 'moment';
import './index.less';
import { NYT_ASSET_ENDPOINT } from '../../constants/api'

const ArticleCard = ({data, handleCardClick}) => { 
  const headlineText = data.headline && data.headline.main;

  const coverImg =
    data.multimedia &&
    data.multimedia.length > 0 &&
    data.multimedia.find(x => x.subtype === 'wide');
  
  return (
    <Card
      title={headlineText}
      className="article-card"
      bordered={false}
      cover={coverImg && (
        <img 
          className="article-card__coverImg"
          src={`${NYT_ASSET_ENDPOINT}${coverImg.url}`}
          alt="Cover"
        />
      )}
      hoverable
      onClick={() => handleCardClick && handleCardClick(data)}
      actions={[
          <Tooltip title={`Published Date: ${moment(data.pub_date).format('DD-MM-YYYY HH:mm:ss')}`}>
            <Icon type="calendar" />
          </Tooltip>,   
          <Tooltip title={`Source: ${data.source === undefined ? 'Unknown': data.source}`}>
            <Icon type="info-circle-o" />
          </Tooltip>]}
    >  
      <p className="article-card__snippet">{data.snippet}</p>
    </Card>
  );
};

ArticleCard.propTypes = {
  data: PropTypes.shape({
    snippet: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    pub_date: PropTypes.string.isRequired,
    multimedia: PropTypes.array,
    headline: PropTypes.object
  }),
  handleCardClick: PropTypes.func
};

export default ArticleCard;
