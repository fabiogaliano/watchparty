import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

export class FileShareModal extends React.Component<{
  closeModal: () => void;
  startFileShare: (useMediaSoup: boolean) => void;
}> {
  render() {
    const { closeModal } = this.props;
    return (
      <Modal open={true} onClose={closeModal}>
        <Modal.Header>Share A File</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <div>
              You're about to share a file from your device. Choose your preferred method:
            </div>
            <ul>
              <li>This feature is only supported on Chrome and Edge.</li>
              <li>
                Certain codecs such as AC3 aren't supported in Chrome (they work
                in Edge due to licensing)
              </li>
            </ul>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <Button
                color="green"
                onClick={() => {
                  this.props.startFileShare(false);
                  closeModal();
                }}
              >
                Start Direct File Share
              </Button>
              <Button
                color="orange"
                onClick={() => {
                  this.props.startFileShare(true);
                  closeModal();
                }}
              >
                Start File Share with Relay
              </Button>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}