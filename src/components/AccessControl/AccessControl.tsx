import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Message, Container, Header, Segment } from 'semantic-ui-react';
import { serverPath } from '../../utils';

interface AccessControlProps {
  children: React.ReactNode;
}

const ACCESS_TOKEN_KEY = 'watchparty_access_token';
const ACCESS_EXPIRY_KEY = 'watchparty_access_expiry';

export const AccessControl: React.FC<AccessControlProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberLogin, setRememberLogin] = useState(true);

  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = () => {
    const storage = rememberLogin ? localStorage : sessionStorage;
    const token = storage.getItem(ACCESS_TOKEN_KEY);
    const expiry = storage.getItem(ACCESS_EXPIRY_KEY);
    
    if (token && expiry) {
      const expiryTime = parseInt(expiry, 10);
      if (Date.now() < expiryTime) {
        setIsAuthorized(true);
        return;
      } else {
        // Token expired, clear it
        clearAuth();
      }
    }
  };

  const clearAuth = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_EXPIRY_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_EXPIRY_KEY);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setError('Please enter an access code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(serverPath + '/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessCode }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store auth token
        const storage = rememberLogin ? localStorage : sessionStorage;
        const expiryTime = Date.now() + (data.expiryHours * 60 * 60 * 1000);
        
        storage.setItem(ACCESS_TOKEN_KEY, accessCode);
        storage.setItem(ACCESS_EXPIRY_KEY, expiryTime.toString());
        
        setIsAuthorized(true);
      } else {
        setError(data.error || 'Invalid access code');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }

    setIsLoading(false);
  };

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <Container style={{ marginTop: '100px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Header as="h2" textAlign="center" style={{ marginBottom: '30px' }}>
          WatchParty Access
        </Header>
        <Segment>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Access Code</label>
              <Input
                type="password"
                placeholder="Enter access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                disabled={isLoading}
              />
            </Form.Field>
            
            <Form.Checkbox
              label="Remember login"
              checked={rememberLogin}
              onChange={(e, data) => setRememberLogin(!!data.checked)}
              disabled={isLoading}
            />
            
            {error && (
              <Message negative>
                <Message.Header>Access Denied</Message.Header>
                <p>{error}</p>
              </Message>
            )}
            
            <Button 
              type="submit" 
              primary 
              fluid 
              loading={isLoading}
              disabled={isLoading}
            >
              Access WatchParty
            </Button>
          </Form>
        </Segment>
        <div style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '12px' }}>
          Enter the access code provided by your administrator
        </div>
      </div>
    </Container>
  );
};