import React from 'react';
import ReactMarkdown from 'react-markdown';

const mdStyle = { color: 'white', margin: '50px', maxWidth: '800px' };

export const FAQ = () => {
  return (
    <div style={mdStyle}>
      <ReactMarkdown>
        {`
FAQ
====
What's a VBrowser?
----
A virtual browser (VBrowser) is a browser running in the cloud that a room's members can connect to. Everyone in the room sees the same thing, so it's a great way to watch videos or collaborate on tasks together.

Why did my VBrowser session stop?
----
VBrowsers will terminate automatically if no one is in the room for a while.
VBrowser sessions are limited to a maximum of 5 hours.

How do I access sites that have a "not available" message in the VBrowser?
----
Some sites may block traffic that's detected as coming from the cloud. You may need to install a VPN extension inside the virtual browser.

How come I'm not getting any audio when screensharing?
----
To share audio, you must be using Chrome/Edge and sharing a tab or desktop.

Is there a limit to how many people can be in a room?
----
Rooms are limited to 5 users maximum. Screensharing and filesharing rely on one person uploading to everyone else, so performance may vary with room size.

How do I create a room with a specific video?
----
You can use the URL format: \`/create?video=VIDEO_URL_HERE\` to create a room with a video already loaded.

What media formats are supported?
----
WatchParty supports YouTube videos, HLS streams, DASH streams, direct video files, and magnet links for torrents.
`}
      </ReactMarkdown>
    </div>
  );
};