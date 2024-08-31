import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';

import styles from './RequiredMembers.module.scss';
import { IFieldCustomizerCellEventParameters } from '@microsoft/sp-listview-extensibility';
import { GetActiveCommitteeMembers } from '../../../MyHelperMethods/MyHelperMethods';

export interface IRequiredMembersProps {
  text: string;
  event: IFieldCustomizerCellEventParameters;
}

const LOG_SOURCE: string = 'RequiredMembers';

export default class RequiredMembers extends React.Component<IRequiredMembersProps, {}> {
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: RequiredMembers mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: RequiredMembers unmounted');
  }

  public render(): React.ReactElement<{}> {
    const COMMITTEE_NAME = this.props.event.listItem.getValueByName('FileLeafRef');
    GetActiveCommitteeMembers(COMMITTEE_NAME)
      .then(value => {
        console.log('Count Res:', value);
      }).catch(reason => {
        console.error('Failed to query Committee');
        console.error(reason);
      });

    return (
      <div className={styles.requiredMembers}>
        {this.props.text}
      </div>
    );
  }
}
