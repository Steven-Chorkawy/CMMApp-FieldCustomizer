import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';

import styles from './RequiredMembers.module.scss';

export interface IRequiredMembersProps {
  text: string;
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
    return (
      <div className={styles.requiredMembers}>
        {this.props.text}
      </div>
    );
  }
}
