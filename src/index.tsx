import './index.css';

import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App';
import { Home } from './components/Home';
import { Privacy, Terms, FAQ, DiscordBot } from './components/Pages/Pages';
import { TopBar } from './components/TopBar/TopBar';
import { Footer } from './components/Footer/Footer';
import { serverPath } from './utils';
import { Create } from './components/Create/Create';
import { Discord } from './components/Discord/Discord';
import 'semantic-ui-css/semantic.min.css';
import config from './config';
import { DEFAULT_STATE, MetadataContext } from './MetadataContext';
import { AccessControl } from './components/AccessControl/AccessControl';

const Debug = lazy(() => import('./components/Debug/Debug'));


// Redirect old-style URLs
if (window.location.hash && window.location.pathname === '/') {
  const hashRoomId = window.location.hash.substring(1);
  window.location.href = '/watch/' + hashRoomId;
}

class WatchParty extends React.Component {
  public state = DEFAULT_STATE;
  async componentDidMount() {
    // No auth required - enable all subscriber features
    this.setState({
      isSubscriber: true,
    });
  }
  render() {
    return (
      // <React.StrictMode>
      <MetadataContext.Provider value={this.state}>
        <AccessControl>
          <BrowserRouter>
          <Route
            path="/"
            exact
            render={(props) => {
              return (
                <React.Fragment>
                  <TopBar hideNewRoom />
                  <Home />
                  <Footer />
                </React.Fragment>
              );
            }}
          />
          <Route
            path="/create"
            exact
            render={() => {
              return <Create />;
            }}
          />
          <Route
            path="/watch/:roomId"
            exact
            render={(props) => {
              return <App urlRoomId={props.match.params.roomId} />;
            }}
          />
          <Route
            path="/r/:vanity"
            exact
            render={(props) => {
              return <App vanity={props.match.params.vanity} />;
            }}
          />
          <Route path="/terms">
            <TopBar />
            <Terms />
            <Footer />
          </Route>
          <Route path="/privacy">
            <TopBar />
            <Privacy />
            <Footer />
          </Route>
          <Route path="/faq">
            <TopBar />
            <FAQ />
            <Footer />
          </Route>
          <Route path="/discordBot">
            <TopBar />
            <DiscordBot />
            <Footer />
          </Route>
          <Route path="/discord/auth" exact>
            <Discord />
          </Route>
          <Route path="/debug">
            <TopBar />
            <Suspense fallback={null}>
              <Debug />
            </Suspense>
            <Footer />
          </Route>
          </BrowserRouter>
        </AccessControl>
      </MetadataContext.Provider>
      // </React.StrictMode>
    );
  }
}
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<WatchParty />);
