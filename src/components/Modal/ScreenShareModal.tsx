import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

export const ScreenShareModal = ({
  closeModal,
  startScreenShare,
}: {
  closeModal: () => void;
  startScreenShare: (useMediaSoup: boolean) => void;
}) => {
  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>Share Your Screen</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <div>
            You're about to share your screen. Choose your preferred method:
          </div>
          <ul>
            <li>This feature is only supported on Chrome and Edge.</li>
            <li>
              Audio sharing only works if sharing your entire screen or a
              browser tab, not an application.
            </li>
          </ul>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <Button
              color="green"
              onClick={() => {
                startScreenShare(false);
                closeModal();
              }}
            >
              Start Direct Screen Share
            </Button>
            <Button
              color="orange"
              onClick={() => {
                startScreenShare(true);
                closeModal();
              }}
            >
              Start Screen Share with Relay
            </Button>
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
