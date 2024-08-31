import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';

import styles from './RequiredMembers.module.scss';
import { IFieldCustomizerCellEventParameters } from '@microsoft/sp-listview-extensibility';
import { GetActiveCommitteeMembers } from '../../../MyHelperMethods/MyHelperMethods';

export interface IRequiredMembersProps {
  text: string;
  event: IFieldCustomizerCellEventParameters;
}

export interface IRequiredMembersState {
  memberCount: Number | null;
}

const LOG_SOURCE: string = 'RequiredMembers';

export default class RequiredMembers extends React.Component<IRequiredMembersProps, IRequiredMembersState> {
  constructor(props: IRequiredMembersProps) {
    super(props);
    this.state = {
      memberCount: null
    }
  }

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
        this.setState({ memberCount: value });
      }).catch(reason => {
        console.error('Failed to query Committee');
        console.error(reason);
      });

    return (
      <div className={styles.requiredMembers}>
        {this.state.memberCount === null ? <div>Loading...</div> : <div>{this.state.memberCount}/{this.props.text}</div> }
      </div>
    );
  }
}
