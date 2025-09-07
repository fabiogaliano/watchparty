import React from 'react';
import { serverPath, colorMappings, getUserImage } from '../../utils';
import {
  Icon,
  Popup,
  Button,
  Dropdown,
  Image,
  SemanticSIZES,
} from 'semantic-ui-react';
import { ProfileModal } from '../Modal/ProfileModal';
import Announce from '../Announce/Announce';
import { InviteButton } from '../InviteButton/InviteButton';
import appStyles from '../App/App.module.css';
import { MetadataContext } from '../../MetadataContext';
import config from '../../config';

export async function createRoom(
  openNewTab: boolean | undefined,
  video: string = '',
) {
  const response = await window.fetch(serverPath + '/createRoom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      video,
    }),
  });
  const data = await response.json();
  const { name } = data;
  if (openNewTab) {
    window.open('/watch' + name);
  } else {
    window.location.assign('/watch' + name);
  }
}

export class NewRoomButton extends React.Component<{
  size?: SemanticSIZES;
  openNewTab?: boolean;
}> {
  static contextType = MetadataContext;
  declare context: React.ContextType<typeof MetadataContext>;
  createRoom = async () => {
    await createRoom(this.props.openNewTab);
  };
  render() {
    return (
      <Popup
        content="Create a new room with a random URL that you can share with friends"
        trigger={
          <Button
            color="blue"
            size={this.props.size}
            icon
            labelPosition="left"
            onClick={this.createRoom}
            className={this.props.size ? '' : 'toolButton'}
            fluid
          >
            <Icon name="certificate" />
            New Room
          </Button>
        }
      />
    );
  }
}

// SignInButton removed - no authentication required in self-hosted version

// ListRoomsButton removed - permanent room management disabled in self-hosted version

export class TopBar extends React.Component<{
  hideNewRoom?: boolean;
  hideSignin?: boolean;
  hideMyRooms?: boolean;
  roomTitle?: string;
  roomDescription?: string;
  roomTitleColor?: string;
  showInviteButton?: boolean;
}> {
  static contextType = MetadataContext;
  declare context: React.ContextType<typeof MetadataContext>;
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '8px',
            rowGap: '8px',
          }}
        >
          {(this.props.roomTitle || this.props.roomDescription) && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: 10,
                marginLeft: 10,
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  color: this.props.roomTitleColor || 'white',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}
              >
                {this.props.roomTitle?.toUpperCase()}
              </div>
              <div style={{ marginTop: 4, color: 'rgb(255 255 255 / 63%)' }}>
                {this.props.roomDescription}
              </div>
            </div>
          )}
          <Announce />
          <div
            className={appStyles.mobileStack}
            style={{
              display: 'flex',
              marginLeft: 'auto',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {this.props.showInviteButton && <InviteButton />}
            {!this.props.hideNewRoom && <NewRoomButton openNewTab />}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
