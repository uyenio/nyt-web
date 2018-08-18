import React from 'react';
import { shallow } from 'enzyme';
import ArticleCard from './index';

describe('ArticleCard Component', () => {
  const TEST_DATA = {
    snippet: 'The Reality Ecosystem: What AR/VR/XR needs to go big',
  };

  it('should render correctly', () => {
    const wrapper = shallow(<ArticleCard data={TEST_DATA} />);
    expect(wrapper.find('.article-card').exists()).toEqual(true);
    expect(wrapper.find('.article-card__snippet').text()).toEqual(TEST_DATA.snippet);
    expect(wrapper.find('.article-card__coverImg').exists()).toEqual(false);
  });
});