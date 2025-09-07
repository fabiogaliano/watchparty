# VBrowser Integration

## Current Implementation

- ✅ Static neko server integration (external server)
- ✅ Direct WebSocket connection
- ✅ Shared browser session

## Next: Bundle Neko with Docker

- [ ] Add neko service to docker-compose.yml  
- [ ] Update config to use localhost neko
- [ ] Remove external server dependency

## Technical Notes

- Current: Connects to `stream.fabiogaliano.com`
- Next: Add neko service to docker-compose.yml
- Solution: Use `m1k1o/neko:chromium` Docker image (no build needed!)
