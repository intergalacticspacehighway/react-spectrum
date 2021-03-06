import React from 'react';
import { CollectionBase, SingleSelection } from '@react-types/shared';
import { PartialNode } from './types';

interface TabListProps<T> extends CollectionBase<T>, SingleSelection {}

const TabList = <T>(props: TabListProps<T>) => {
  return null;
};

TabList.getCollectionNode = function* getCollectionNode<T>(
  props: TabListProps<T>
): Generator<PartialNode<T>> {
  let { children, items } = props;
  yield {
    type: 'tabList',
    hasChildNodes: true,
    'aria-label': props['aria-label'],
    *childNodes() {
      if (typeof children === 'function') {
        if (!items) {
          throw new Error(
            'props.children was a function but props.items is missing'
          );
        }

        for (let item of items) {
          yield {
            type: 'item',
            value: item,
            renderer: children,
          };
        }
      } else {
        let items: PartialNode<T>[] = [];
        React.Children.forEach(children, (child) => {
          items.push({
            type: 'item',
            element: child,
          });
        });

        yield* items;
      }
    },
  };
};

// We don't want getCollectionNode to show up in the type definition
let _TabList = TabList as <T>(props: TabListProps<T>) => JSX.Element;
export { _TabList as TabList };
