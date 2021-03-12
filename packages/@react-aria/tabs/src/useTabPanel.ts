/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaTabPanelProps} from '@react-types/tabs';
import {generateId} from './utils';
import {HTMLAttributes} from 'react';
import {mergeProps} from '@react-aria/utils';
import {TabListState} from '@react-stately/tabs';

interface TabPanelAria {
    /** Props for the tab panel element. */
    tabPanelProps: HTMLAttributes<HTMLElement>
}
    
export function useTabPanel<T>(props: AriaTabPanelProps, state: TabListState<T>): TabPanelAria {
  return {
    tabPanelProps: mergeProps(props, {
      id: generateId(state, state?.selectedKey, 'tabpanel'),
      'aria-labelledby': generateId(state, state?.selectedKey, 'tab'),
      tabIndex: 0,
      role: 'tabpanel'
    })
  };
}
