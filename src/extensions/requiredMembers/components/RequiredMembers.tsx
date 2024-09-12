import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';

import { IFieldCustomizerCellEventParameters } from '@microsoft/sp-listview-extensibility';
import { Spinner } from '@fluentui/react';
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
    const COMMITTEE_NAME = this.props.event.listItem.getValueByName('FileLeafRef');
    GetActiveCommitteeMembers(COMMITTEE_NAME)
      .then(value => {
        this.setState({ memberCount: value });
      }).catch(reason => {
        console.error('Failed to query Committee');
        console.error(reason);
      });
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: RequiredMembers unmounted');
  }

  private _doesCountEqualText = (): boolean => this.state.memberCount?.toString() === this.props.text

  public render(): React.ReactElement<{}> {
    return (
      <div>
        {
          this.state.memberCount === null ?
            <div><Spinner label={`?/${this.props.text}`} ariaLive="assertive" labelPosition="right" /></div> :
            <div
              title={this._doesCountEqualText() ? `Committee is Full` : `Committee is Missing Members!`}
              style={{ color: this._doesCountEqualText() ? 'inherit' : 'red' }}
            >
              {this.state.memberCount}/{this.props.text === "" ? 0 : this.props.text}
            </div>
        }
      </div>
    );
  }
}
