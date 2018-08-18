import React from 'react';
import { mount } from 'enzyme';
import { Card } from 'antd';
import { ArticleList } from './index';
import Pagination from '../../components/Pagination';
import ArticleCard from '../../components/ArticleCard';

describe('ArticleList Container', () => {
  it('should render correctly', () => {
    const wrapper = mount(<ArticleList />);
    expect(wrapper.find(Pagination).exists()).toEqual(true);
  });

  it('should render loading card', () => {
    const wrapper = mount(<ArticleList isLoading />);
    expect(wrapper.find(Card).prop('loading')).toEqual(true);
  });

  it('should render article cards', () => {
    const wrapper = mount(<ArticleList data={['a', 'b']} />);
    expect(wrapper.find(ArticleCard).exists()).toEqual(true);
  });
});
