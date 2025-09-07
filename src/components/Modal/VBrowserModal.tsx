import React from 'react';
import { Modal, Button, Table, Message, Dropdown } from 'semantic-ui-react';
import { MetadataContext } from '../../MetadataContext';

export class VBrowserModal extends React.Component<{
  closeModal: () => void;
  startVBrowser: (
    options: { size: string; region: string },
  ) => void;
}> {
  static contextType = MetadataContext;
  declare context: React.ContextType<typeof MetadataContext>;
  state = {
    region: 'any',
  };
  render() {
    const regionOptions = [
      {
        key: 'Any',
        text: 'Any available',
        value: 'any',
        image: { avatar: false, src: '' },
      },
      {
        key: 'US',
        text: 'US East',
        value: 'US',
        image: { avatar: false, src: '/flag-united-states.png' },
      },
      {
        key: 'USW',
        text: 'US West',
        value: 'USW',
        image: { avatar: false, src: '/flag-united-states.png' },
      },
      {
        key: 'EU',
        text: 'Europe',
        value: 'EU',
        image: { avatar: false, src: '/flag-european-union.png' },
      },
    ];
    const { closeModal, startVBrowser } = this.props;
    const LaunchButton = ({ large }: { large: boolean }) => {
      return (
        <Button
          color={large ? 'orange' : 'green'}
          onClick={() => {
            startVBrowser({
              size: large ? 'large' : '',
              region: this.state.region === 'any' ? '' : this.state.region,
            });
            closeModal();
          }}
        >
          {large ? 'Launch Large VBrowser' : 'Launch VBrowser'}
        </Button>
      );
    };

    return (
      <Modal open={true} onClose={closeModal}>
        <Modal.Header>Launch a VBrowser</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <div>
              You're about to launch a virtual browser to share in this room.
              Choose your preferred configuration below.
            </div>
            <Table definition unstackable striped celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Standard VBrowser</Table.HeaderCell>
                  <Table.HeaderCell>Large VBrowser</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Max Resolution</Table.Cell>
                  <Table.Cell>720p</Table.Cell>
                  <Table.Cell>1080p</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>CPU/RAM</Table.Cell>
                  <Table.Cell>Standard</Table.Cell>
                  <Table.Cell>Extra</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Session Length</Table.Cell>
                  <Table.Cell>5 hours</Table.Cell>
                  <Table.Cell>5 hours</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Recommended Max Viewers</Table.Cell>
                  <Table.Cell>15</Table.Cell>
                  <Table.Cell>30</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Region</Table.Cell>
                  <Table.Cell>Where available</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      selection
                      onChange={(e, { value }) =>
                        this.setState({ region: value })
                      }
                      value={this.state.region}
                      options={regionOptions}
                    ></Dropdown>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>
                    <LaunchButton large={false} />
                  </Table.Cell>
                  <Table.Cell>
                    <LaunchButton large={true} />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
