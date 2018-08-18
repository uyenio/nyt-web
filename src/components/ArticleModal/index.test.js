import React from 'react';
import { shallow } from 'enzyme';
import ArticleModal from './index';

describe('ArticleModal Component', () => {
  const TEST_DATA = {
    snippet: 'Facebook awards $200K to Internet Defense Prize winners',
    source: 'Tech Crunch',
    pub_date: '2018-08-17T14:28:02+00:00'
  };

  it('should render correctly', () => {
    const wrapper = shallow(<ArticleModal data={TEST_DATA} />);
    expect(wrapper.find('.article-modal').exists()).toEqual(true);
    expect(wrapper.find('.article-modal__snippet').text()).toEqual(TEST_DATA.snippet);
    expect(wrapper.find('.article-modal__source').text()).toEqual(`Source: ${TEST_DATA.source}`);
    expect(wrapper.find('.article-modal__date').text()).toEqual('Published Date: 17-08-2018 21:28:02');
    expect(wrapper.find('.article-modal__image').exists()).toEqual(false);
  });

  it('should render image if found', () => {
    const TEST_MULTIMEDIA = [{
      subtype: 'xlarge',
      url: 'abc/def'
    }];
    TEST_DATA.multimedia = TEST_MULTIMEDIA;
    const wrapper = shallow(<ArticleModal data={TEST_DATA} />);
    expect(wrapper.find('.article-modal').exists()).toEqual(true);
    expect(wrapper.find('.article-modal__image').exists()).toEqual(true);
  });
});