import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { HomePage } from './index';
import ArticleList from '../ArticleList';

describe('HomePage Container', () => {
  const stubGetArticles = sinon.stub().resolves({});

  it('should render correctly', () => {
    const wrapper = mount(<HomePage getArticles={stubGetArticles} />);
    expect(wrapper.find('.homepage').exists()).toEqual(true);
    expect(wrapper.find('.homepage__logo').exists()).toEqual(true);
    expect(wrapper.find('.homepage__content').exists()).toEqual(true);
    expect(wrapper.find(ArticleList).exists()).toEqual(true);
  });

  it('should call getArticles action in componentDidMount', () => {
    const spyFetchArticles = sinon.spy(HomePage.prototype, 'fetchArticles');
    mount(<HomePage getArticles={stubGetArticles} />);
    expect(spyFetchArticles.called).toEqual(true);
    expect(stubGetArticles.called).toEqual(true);
    spyFetchArticles.restore();
  });

  it('should update state correctly when receive props', () => {
    const wrapper = mount(<HomePage getArticles = {stubGetArticles} />);
    const testProps = {
      isLoading: false,
      data: {
        response: {
          docs: ['a', 'b']
        }
      },
      currentPage: 2
    };
    wrapper.setProps(testProps);
    expect(wrapper.state('currentPage')).toEqual(testProps.currentPage);
    expect(wrapper.state('data')).toEqual(['a', 'b']);
    expect(wrapper.state('isLoading')).toEqual(testProps.isLoading);
  });
});
